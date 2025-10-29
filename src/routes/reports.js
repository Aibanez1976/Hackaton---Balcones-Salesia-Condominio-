<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { authMiddleware } = require('../middleware/auth');
const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');

// Dashboard summary
router.get('/dashboard', authMiddleware, (req, res) => {
  console.log('[REPORTS] Dashboard request received');
  
  db.all(
    `SELECT
       COUNT(DISTINCT a.id) as total_apartments,
       SUM(a.monthly_fee) as total_monthly_fee,
       COALESCE(SUM(p.amount), 0) as total_paid_6months,
       COALESCE(SUM(e.amount), 0) as total_expenses_6months
     FROM apartments a
     LEFT JOIN payments p ON a.id = p.apartment_id AND p.payment_date >= date('now', '-6 months')
     LEFT JOIN expenses e ON e.expense_date >= date('now', '-6 months')`,
    (err, summary) => {
      if (err) {
        console.error('[REPORTS] Error getting summary:', err);
        return res.status(500).json({ error: 'Error al obtener resumen' });
      }

      console.log('[REPORTS] Summary data:', summary);

      // Obtener cartera por antigüedad
      db.all(
        `SELECT
           age_category,
           COUNT(*) as count,
           SUM(balance) as amount
         FROM (
           SELECT
             a.id,
             a.monthly_fee,
             COALESCE(p.total_paid, 0) as total_paid,
             (a.monthly_fee * 6) - COALESCE(p.total_paid, 0) as balance,
             CASE
               WHEN p.last_payment IS NULL THEN '90+'
               WHEN p.last_payment < date('now', '-90 days') THEN '90+'
               WHEN p.last_payment < date('now', '-60 days') THEN '60-89'
               WHEN p.last_payment < date('now', '-30 days') THEN '30-59'
               ELSE 'current'
             END as age_category
           FROM apartments a
           LEFT JOIN (
             SELECT apartment_id, SUM(amount) as total_paid, MAX(payment_date) as last_payment
             FROM payments
             WHERE payment_date >= date('now', '-6 months')
             GROUP BY apartment_id
           ) p ON a.id = p.apartment_id
         )
         GROUP BY age_category`,
        (err, portfolio) => {
          if (err) {
            console.error('[REPORTS] Error getting portfolio:', err);
            return res.status(500).json({ error: 'Error al obtener cartera' });
          }

          console.log('[REPORTS] Portfolio data:', portfolio);
          console.log('[REPORTS] Sending dashboard response');

          res.json({
            summary: summary,
            portfolio: portfolio
          });
        }
      );
    }
  );
});

// Reporte de cartera por antigüedad (PDF)
router.get('/portfolio-age/pdf', authMiddleware, (req, res) => {
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="cartera-por-antiguedad.pdf"');

  doc.pipe(res);

  doc.fontSize(20).text('REPORTE DE CARTERA POR ANTIGÜEDAD', { align: 'center' });
  doc.fontSize(10).text(`Fecha: ${new Date().toLocaleDateString('es-CO')}`, { align: 'center' });
  doc.moveDown();

  db.all(
    `SELECT 
       a.number,
       a.monthly_fee,
       COALESCE(SUM(p.amount), 0) as total_paid,
       (a.monthly_fee * 6) - COALESCE(SUM(p.amount), 0) as balance,
       MAX(p.payment_date) as last_payment,
       CASE 
         WHEN MAX(p.payment_date) IS NULL THEN '90+'
         WHEN MAX(p.payment_date) < date('now', '-90 days') THEN '90+'
         WHEN MAX(p.payment_date) < date('now', '-60 days') THEN '60-89'
         WHEN MAX(p.payment_date) < date('now', '-30 days') THEN '30-59'
         ELSE 'current'
       END as age_category
     FROM apartments a
     LEFT JOIN payments p ON a.id = p.apartment_id AND p.payment_date >= date('now', '-6 months')
     GROUP BY a.id
     ORDER BY age_category DESC, a.number`,
    (err, results) => {
      if (err) {
        doc.text('Error al generar reporte');
        doc.end();
        return;
      }

      doc.fontSize(12).text('Detalle por Apartamento:', { underline: true });
      doc.moveDown(0.5);

      results.forEach(row => {
        doc.fontSize(9).text(
          `${row.number} | Cuota: $${row.monthly_fee.toLocaleString()} | Pagado: $${row.total_paid.toLocaleString()} | Saldo: $${row.balance.toLocaleString()} | Antigüedad: ${row.age_category} días`,
          { width: 500 }
        );
      });

      doc.moveDown();
      const totals = {
        total_balance: results.reduce((sum, r) => sum + r.balance, 0),
        delinquent: results.filter(r => r.balance > 0).length
      };

      doc.fontSize(11).text(`Total Cartera Vencida: $${totals.total_balance.toLocaleString()}`, { bold: true });
      doc.text(`Apartamentos Morosos: ${totals.delinquent}`);

      doc.end();
    }
  );
});

// Reporte de flujo de caja (PDF)
router.get('/cash-flow/pdf', authMiddleware, (req, res) => {
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="flujo-caja.pdf"');

  doc.pipe(res);

  doc.fontSize(20).text('REPORTE DE FLUJO DE CAJA', { align: 'center' });
  doc.fontSize(10).text(`Fecha: ${new Date().toLocaleDateString('es-CO')}`, { align: 'center' });
  doc.moveDown();

  db.all(
    `SELECT 
       strftime('%Y-%m', payment_date) as month,
       SUM(amount) as total
     FROM payments
     WHERE payment_date >= date('now', '-12 months')
     GROUP BY month
     ORDER BY month DESC`,
    (err, payments) => {
      if (err) {
        doc.text('Error al generar reporte');
        doc.end();
        return;
      }

      db.all(
        `SELECT 
           strftime('%Y-%m', expense_date) as month,
           SUM(amount) as total
         FROM expenses
         WHERE expense_date >= date('now', '-12 months')
         GROUP BY month
         ORDER BY month DESC`,
        (err, expenses) => {
          if (err) {
            doc.text('Error al generar reporte');
            doc.end();
            return;
          }

          doc.fontSize(12).text('Ingresos por Mes:', { underline: true });
          doc.moveDown(0.5);
          payments.forEach(row => {
            doc.fontSize(9).text(`${row.month}: $${row.total.toLocaleString()}`);
          });

          doc.moveDown();
          doc.fontSize(12).text('Egresos por Mes:', { underline: true });
          doc.moveDown(0.5);
          expenses.forEach(row => {
            doc.fontSize(9).text(`${row.month}: $${row.total.toLocaleString()}`);
          });

          doc.end();
        }
      );
    }
  );
});

// Dashboard export to PDF
router.get('/dashboard/pdf', authMiddleware, (req, res) => {
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="dashboard.pdf"');
  
  doc.pipe(res);
  
  doc.fontSize(20).text('DASHBOARD - RESUMEN EJECUTIVO', { align: 'center' });
  doc.fontSize(10).text(`Fecha: ${new Date().toLocaleDateString('es-CO')}`, { align: 'center' });
  doc.moveDown();
  
  db.all(
    `SELECT
       COUNT(DISTINCT a.id) as total_apartments,
       SUM(a.monthly_fee) as total_monthly_fee,
       COALESCE(SUM(p.amount), 0) as total_paid_6months,
       COALESCE(SUM(e.amount), 0) as total_expenses_6months
     FROM apartments a
     LEFT JOIN payments p ON a.id = p.apartment_id AND p.payment_date >= date('now', '-6 months')
     LEFT JOIN expenses e ON e.expense_date >= date('now', '-6 months')`,
    (err, summary) => {
      if (err) {
        doc.text('Error al generar reporte');
        doc.end();
        return;
      }
      
      const s = summary[0];
      doc.fontSize(12).text('RESUMEN FINANCIERO', { underline: true });
      doc.moveDown(0.5);
      doc.fontSize(10).text(`Total Apartamentos: ${s.total_apartments}`);
      doc.text(`Cartera Total (6 meses): $${(s.total_monthly_fee * 6).toLocaleString('es-CO')}`);
      doc.text(`Pagos Recibidos (6 meses): $${s.total_paid_6months.toLocaleString('es-CO')}`);
      doc.text(`Gastos (6 meses): $${s.total_expenses_6months.toLocaleString('es-CO')}`);
      doc.moveDown();
      
      doc.fontSize(10).text('Generado por SalesiaAdmin Pro');
      doc.end();
    }
  );
});

// Dashboard export to CSV
router.get('/dashboard/csv', authMiddleware, (req, res) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Dashboard');
  
  worksheet.columns = [
    { header: 'Métrica', key: 'metric', width: 30 },
    { header: 'Valor', key: 'value', width: 20 }
  ];
  
  db.all(
    `SELECT
       COUNT(DISTINCT a.id) as total_apartments,
       SUM(a.monthly_fee) as total_monthly_fee,
       COALESCE(SUM(p.amount), 0) as total_paid_6months,
       COALESCE(SUM(e.amount), 0) as total_expenses_6months
     FROM apartments a
     LEFT JOIN payments p ON a.id = p.apartment_id AND p.payment_date >= date('now', '-6 months')
     LEFT JOIN expenses e ON e.expense_date >= date('now', '-6 months')`,
    (err, summary) => {
      if (err) {
        res.status(500).json({ error: 'Error al exportar' });
        return;
      }
      
      const s = summary[0];
      worksheet.addRows([
        { metric: 'Total Apartamentos', value: s.total_apartments },
        { metric: 'Cartera Total (6 meses)', value: `$${(s.total_monthly_fee * 6).toLocaleString('es-CO')}` },
        { metric: 'Pagos Recibidos (6 meses)', value: `$${s.total_paid_6months.toLocaleString('es-CO')}` },
        { metric: 'Gastos (6 meses)', value: `$${s.total_expenses_6months.toLocaleString('es-CO')}` },
        { metric: 'Fecha de Generación', value: new Date().toLocaleDateString('es-CO') }
      ]);
      
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename="dashboard.xlsx"');
      
      workbook.xlsx.write(res).then(() => {
        res.end();
      });
    }
  );
});


// Reporte de Top Morosos (JSON)
router.get('/top-delinquents', authMiddleware, (req, res) => {
  const { limit = 10 } = req.query;

  db.all(
    `SELECT 
       a.id,
       a.number,
       a.monthly_fee,
       o.name as owner_name,
       o.phone,
       o.email,
       COALESCE(SUM(p.amount), 0) as total_paid,
       (a.monthly_fee * 6) - COALESCE(SUM(p.amount), 0) as balance,
       MAX(p.payment_date) as last_payment,
       CASE 
         WHEN MAX(p.payment_date) IS NULL THEN '90+'
         WHEN MAX(p.payment_date) < date('now', '-90 days') THEN '90+'
         WHEN MAX(p.payment_date) < date('now', '-60 days') THEN '60-89'
         WHEN MAX(p.payment_date) < date('now', '-30 days') THEN '30-59'
         ELSE 'current'
       END as age_category,
       CASE 
         WHEN MAX(p.payment_date) IS NULL THEN 999
         WHEN MAX(p.payment_date) < date('now', '-90 days') THEN 90
         WHEN MAX(p.payment_date) < date('now', '-60 days') THEN 60
         WHEN MAX(p.payment_date) < date('now', '-30 days') THEN 30
         ELSE 0
       END as days_overdue
     FROM apartments a
     LEFT JOIN owners o ON a.id = o.apartment_id AND o.is_primary = 1
     LEFT JOIN payments p ON a.id = p.apartment_id AND p.payment_date >= date('now', '-6 months')
     GROUP BY a.id
     HAVING balance > 0
     ORDER BY balance DESC, days_overdue DESC
     LIMIT ?`,
    [parseInt(limit)],
    (err, results) => {
      if (err) {
        console.error('Error fetching top delinquents:', err);
        return res.status(500).json({ error: 'Error al obtener morosos' });
      }

      const stats = {
        total_delinquents: results.length,
        total_debt: results.reduce((sum, r) => sum + r.balance, 0),
        average_debt: results.length > 0 ? results.reduce((sum, r) => sum + r.balance, 0) / results.length : 0,
        by_age_category: {
          'current': results.filter(r => r.age_category === 'current').length,
          '30-59': results.filter(r => r.age_category === '30-59').length,
          '60-89': results.filter(r => r.age_category === '60-89').length,
          '90+': results.filter(r => r.age_category === '90+').length
        }
      };

      res.json({
        success: true,
        stats,
        delinquents: results
      });
    }
  );
});

// Reporte de Top Morosos (PDF)
router.get('/top-delinquents/pdf', authMiddleware, (req, res) => {
  const { limit = 10 } = req.query;
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="top-morosos.pdf"');

  doc.pipe(res);

  doc.fontSize(20).text('REPORTE DE TOP MOROSOS', { align: 'center' });
  doc.fontSize(10).text(`Fecha: ${new Date().toLocaleDateString('es-CO')}`, { align: 'center' });
  doc.moveDown();

  db.all(
    `SELECT 
       a.id,
       a.number,
       a.monthly_fee,
       o.name as owner_name,
       o.phone,
       o.email,
       COALESCE(SUM(p.amount), 0) as total_paid,
       (a.monthly_fee * 6) - COALESCE(SUM(p.amount), 0) as balance,
       MAX(p.payment_date) as last_payment,
       CASE 
         WHEN MAX(p.payment_date) IS NULL THEN '90+'
         WHEN MAX(p.payment_date) < date('now', '-90 days') THEN '90+'
         WHEN MAX(p.payment_date) < date('now', '-60 days') THEN '60-89'
         WHEN MAX(p.payment_date) < date('now', '-30 days') THEN '30-59'
         ELSE 'current'
       END as age_category
     FROM apartments a
     LEFT JOIN owners o ON a.id = o.apartment_id AND o.is_primary = 1
     LEFT JOIN payments p ON a.id = p.apartment_id AND p.payment_date >= date('now', '-6 months')
     GROUP BY a.id
     HAVING balance > 0
     ORDER BY balance DESC
     LIMIT ?`,
    [parseInt(limit)],
    (err, results) => {
      if (err) {
        doc.text('Error al generar reporte');
        doc.end();
        return;
      }

      const totalDebt = results.reduce((sum, r) => sum + r.balance, 0);

      doc.fontSize(12).text('Ranking de Deudores:', { underline: true });
      doc.moveDown(0.5);

      results.forEach((row, index) => {
        doc.fontSize(9).text(
          `${index + 1}. Apt ${row.number} | Propietario: ${row.owner_name || 'N/A'} | Deuda: $${row.balance.toLocaleString()} | Antigüedad: ${row.age_category} días`,
          { width: 500 }
        );
        if (row.phone) {
          doc.fontSize(8).text(`   Teléfono: ${row.phone}`, { width: 500 });
        }
        if (row.email) {
          doc.fontSize(8).text(`   Email: ${row.email}`, { width: 500 });
        }
        doc.moveDown(0.3);
      });

      doc.moveDown();
      doc.fontSize(11).text(`Total Deuda (Top ${results.length}): $${totalDebt.toLocaleString()}`, { bold: true });
      doc.text(`Promedio de Deuda: $${(totalDebt / results.length).toLocaleString()}`);

      doc.end();
    }
  );
});

// Reporte de Top Morosos (CSV)
router.get('/top-delinquents/csv', authMiddleware, (req, res) => {
  const { limit = 10 } = req.query;

  db.all(
    `SELECT 
       a.number,
       o.name as owner_name,
       o.phone,
       o.email,
       a.monthly_fee,
       COALESCE(SUM(p.amount), 0) as total_paid,
       (a.monthly_fee * 6) - COALESCE(SUM(p.amount), 0) as balance,
       MAX(p.payment_date) as last_payment,
       CASE 
         WHEN MAX(p.payment_date) IS NULL THEN '90+'
         WHEN MAX(p.payment_date) < date('now', '-90 days') THEN '90+'
         WHEN MAX(p.payment_date) < date('now', '-60 days') THEN '60-89'
         WHEN MAX(p.payment_date) < date('now', '-30 days') THEN '30-59'
         ELSE 'current'
       END as age_category
     FROM apartments a
     LEFT JOIN owners o ON a.id = o.apartment_id AND o.is_primary = 1
     LEFT JOIN payments p ON a.id = p.apartment_id AND p.payment_date >= date('now', '-6 months')
     GROUP BY a.id
     HAVING balance > 0
     ORDER BY balance DESC
     LIMIT ?`,
    [parseInt(limit)],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Error al exportar' });
        return;
      }

      let csv = 'Apartamento,Propietario,Teléfono,Email,Cuota Mensual,Pagado,Deuda,Último Pago,Antigüedad\n';

      results.forEach(row => {
        const csvRow = [
          row.number,
          `"${row.owner_name || 'N/A'}"`,
          row.phone || '',
          row.email || '',
          row.monthly_fee,
          row.total_paid,
          row.balance,
          row.last_payment || 'Nunca',
          row.age_category
        ];
        csv += csvRow.join(',') + '\n';
      });

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="top-morosos.csv"');
      res.send(csv);
    }
  );
});

module.exports = router;

=======
const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { authMiddleware } = require('../middleware/auth');
const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');

// Dashboard summary
router.get('/dashboard', authMiddleware, (req, res) => {
  console.log('[REPORTS] Dashboard request received');
  
  db.all(
    `SELECT
       COUNT(DISTINCT a.id) as total_apartments,
       SUM(a.monthly_fee) as total_monthly_fee,
       COALESCE(SUM(p.amount), 0) as total_paid_6months,
       COALESCE(SUM(e.amount), 0) as total_expenses_6months
     FROM apartments a
     LEFT JOIN payments p ON a.id = p.apartment_id AND p.payment_date >= date('now', '-6 months')
     LEFT JOIN expenses e ON e.expense_date >= date('now', '-6 months')`,
    (err, summary) => {
      if (err) {
        console.error('[REPORTS] Error getting summary:', err);
        return res.status(500).json({ error: 'Error al obtener resumen' });
      }

      console.log('[REPORTS] Summary data:', summary);

      // Obtener cartera por antigüedad
      db.all(
        `SELECT
           age_category,
           COUNT(*) as count,
           SUM(balance) as amount
         FROM (
           SELECT
             a.id,
             a.monthly_fee,
             COALESCE(p.total_paid, 0) as total_paid,
             (a.monthly_fee * 6) - COALESCE(p.total_paid, 0) as balance,
             CASE
               WHEN p.last_payment IS NULL THEN '90+'
               WHEN p.last_payment < date('now', '-90 days') THEN '90+'
               WHEN p.last_payment < date('now', '-60 days') THEN '60-89'
               WHEN p.last_payment < date('now', '-30 days') THEN '30-59'
               ELSE 'current'
             END as age_category
           FROM apartments a
           LEFT JOIN (
             SELECT apartment_id, SUM(amount) as total_paid, MAX(payment_date) as last_payment
             FROM payments
             WHERE payment_date >= date('now', '-6 months')
             GROUP BY apartment_id
           ) p ON a.id = p.apartment_id
         )
         GROUP BY age_category`,
        (err, portfolio) => {
          if (err) {
            console.error('[REPORTS] Error getting portfolio:', err);
            return res.status(500).json({ error: 'Error al obtener cartera' });
          }

          console.log('[REPORTS] Portfolio data:', portfolio);
          console.log('[REPORTS] Sending dashboard response');

          res.json({
            summary: summary,
            portfolio: portfolio
          });
        }
      );
    }
  );
});

// Reporte de cartera por antigüedad (PDF)
router.get('/portfolio-age/pdf', authMiddleware, (req, res) => {
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="cartera-por-antiguedad.pdf"');

  doc.pipe(res);

  doc.fontSize(20).text('REPORTE DE CARTERA POR ANTIGÜEDAD', { align: 'center' });
  doc.fontSize(10).text(`Fecha: ${new Date().toLocaleDateString('es-CO')}`, { align: 'center' });
  doc.moveDown();

  db.all(
    `SELECT 
       a.number,
       a.monthly_fee,
       COALESCE(SUM(p.amount), 0) as total_paid,
       (a.monthly_fee * 6) - COALESCE(SUM(p.amount), 0) as balance,
       MAX(p.payment_date) as last_payment,
       CASE 
         WHEN MAX(p.payment_date) IS NULL THEN '90+'
         WHEN MAX(p.payment_date) < date('now', '-90 days') THEN '90+'
         WHEN MAX(p.payment_date) < date('now', '-60 days') THEN '60-89'
         WHEN MAX(p.payment_date) < date('now', '-30 days') THEN '30-59'
         ELSE 'current'
       END as age_category
     FROM apartments a
     LEFT JOIN payments p ON a.id = p.apartment_id AND p.payment_date >= date('now', '-6 months')
     GROUP BY a.id
     ORDER BY age_category DESC, a.number`,
    (err, results) => {
      if (err) {
        doc.text('Error al generar reporte');
        doc.end();
        return;
      }

      doc.fontSize(12).text('Detalle por Apartamento:', { underline: true });
      doc.moveDown(0.5);

      results.forEach(row => {
        doc.fontSize(9).text(
          `${row.number} | Cuota: $${row.monthly_fee.toLocaleString()} | Pagado: $${row.total_paid.toLocaleString()} | Saldo: $${row.balance.toLocaleString()} | Antigüedad: ${row.age_category} días`,
          { width: 500 }
        );
      });

      doc.moveDown();
      const totals = {
        total_balance: results.reduce((sum, r) => sum + r.balance, 0),
        delinquent: results.filter(r => r.balance > 0).length
      };

      doc.fontSize(11).text(`Total Cartera Vencida: $${totals.total_balance.toLocaleString()}`, { bold: true });
      doc.text(`Apartamentos Morosos: ${totals.delinquent}`);

      doc.end();
    }
  );
});

// Reporte de flujo de caja (PDF)
router.get('/cash-flow/pdf', authMiddleware, (req, res) => {
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="flujo-caja.pdf"');

  doc.pipe(res);

  doc.fontSize(20).text('REPORTE DE FLUJO DE CAJA', { align: 'center' });
  doc.fontSize(10).text(`Fecha: ${new Date().toLocaleDateString('es-CO')}`, { align: 'center' });
  doc.moveDown();

  db.all(
    `SELECT 
       strftime('%Y-%m', payment_date) as month,
       SUM(amount) as total
     FROM payments
     WHERE payment_date >= date('now', '-12 months')
     GROUP BY month
     ORDER BY month DESC`,
    (err, payments) => {
      if (err) {
        doc.text('Error al generar reporte');
        doc.end();
        return;
      }

      db.all(
        `SELECT 
           strftime('%Y-%m', expense_date) as month,
           SUM(amount) as total
         FROM expenses
         WHERE expense_date >= date('now', '-12 months')
         GROUP BY month
         ORDER BY month DESC`,
        (err, expenses) => {
          if (err) {
            doc.text('Error al generar reporte');
            doc.end();
            return;
          }

          doc.fontSize(12).text('Ingresos por Mes:', { underline: true });
          doc.moveDown(0.5);
          payments.forEach(row => {
            doc.fontSize(9).text(`${row.month}: $${row.total.toLocaleString()}`);
          });

          doc.moveDown();
          doc.fontSize(12).text('Egresos por Mes:', { underline: true });
          doc.moveDown(0.5);
          expenses.forEach(row => {
            doc.fontSize(9).text(`${row.month}: $${row.total.toLocaleString()}`);
          });

          doc.end();
        }
      );
    }
  );
});

// Dashboard export to PDF
router.get('/dashboard/pdf', authMiddleware, (req, res) => {
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="dashboard.pdf"');
  
  doc.pipe(res);
  
  doc.fontSize(20).text('DASHBOARD - RESUMEN EJECUTIVO', { align: 'center' });
  doc.fontSize(10).text(`Fecha: ${new Date().toLocaleDateString('es-CO')}`, { align: 'center' });
  doc.moveDown();
  
  db.all(
    `SELECT
       COUNT(DISTINCT a.id) as total_apartments,
       SUM(a.monthly_fee) as total_monthly_fee,
       COALESCE(SUM(p.amount), 0) as total_paid_6months,
       COALESCE(SUM(e.amount), 0) as total_expenses_6months
     FROM apartments a
     LEFT JOIN payments p ON a.id = p.apartment_id AND p.payment_date >= date('now', '-6 months')
     LEFT JOIN expenses e ON e.expense_date >= date('now', '-6 months')`,
    (err, summary) => {
      if (err) {
        doc.text('Error al generar reporte');
        doc.end();
        return;
      }
      
      const s = summary[0];
      doc.fontSize(12).text('RESUMEN FINANCIERO', { underline: true });
      doc.moveDown(0.5);
      doc.fontSize(10).text(`Total Apartamentos: ${s.total_apartments}`);
      doc.text(`Cartera Total (6 meses): $${(s.total_monthly_fee * 6).toLocaleString('es-CO')}`);
      doc.text(`Pagos Recibidos (6 meses): $${s.total_paid_6months.toLocaleString('es-CO')}`);
      doc.text(`Gastos (6 meses): $${s.total_expenses_6months.toLocaleString('es-CO')}`);
      doc.moveDown();
      
      doc.fontSize(10).text('Generado por SalesiaAdmin Pro');
      doc.end();
    }
  );
});

// Dashboard export to CSV
router.get('/dashboard/csv', authMiddleware, (req, res) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Dashboard');
  
  worksheet.columns = [
    { header: 'Métrica', key: 'metric', width: 30 },
    { header: 'Valor', key: 'value', width: 20 }
  ];
  
  db.all(
    `SELECT
       COUNT(DISTINCT a.id) as total_apartments,
       SUM(a.monthly_fee) as total_monthly_fee,
       COALESCE(SUM(p.amount), 0) as total_paid_6months,
       COALESCE(SUM(e.amount), 0) as total_expenses_6months
     FROM apartments a
     LEFT JOIN payments p ON a.id = p.apartment_id AND p.payment_date >= date('now', '-6 months')
     LEFT JOIN expenses e ON e.expense_date >= date('now', '-6 months')`,
    (err, summary) => {
      if (err) {
        res.status(500).json({ error: 'Error al exportar' });
        return;
      }
      
      const s = summary[0];
      worksheet.addRows([
        { metric: 'Total Apartamentos', value: s.total_apartments },
        { metric: 'Cartera Total (6 meses)', value: `$${(s.total_monthly_fee * 6).toLocaleString('es-CO')}` },
        { metric: 'Pagos Recibidos (6 meses)', value: `$${s.total_paid_6months.toLocaleString('es-CO')}` },
        { metric: 'Gastos (6 meses)', value: `$${s.total_expenses_6months.toLocaleString('es-CO')}` },
        { metric: 'Fecha de Generación', value: new Date().toLocaleDateString('es-CO') }
      ]);
      
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename="dashboard.xlsx"');
      
      workbook.xlsx.write(res).then(() => {
        res.end();
      });
    }
  );
});


// Reporte de Top Morosos (JSON)
router.get('/top-delinquents', authMiddleware, (req, res) => {
  const { limit = 10 } = req.query;

  db.all(
    `SELECT 
       a.id,
       a.number,
       a.monthly_fee,
       o.name as owner_name,
       o.phone,
       o.email,
       COALESCE(SUM(p.amount), 0) as total_paid,
       (a.monthly_fee * 6) - COALESCE(SUM(p.amount), 0) as balance,
       MAX(p.payment_date) as last_payment,
       CASE 
         WHEN MAX(p.payment_date) IS NULL THEN '90+'
         WHEN MAX(p.payment_date) < date('now', '-90 days') THEN '90+'
         WHEN MAX(p.payment_date) < date('now', '-60 days') THEN '60-89'
         WHEN MAX(p.payment_date) < date('now', '-30 days') THEN '30-59'
         ELSE 'current'
       END as age_category,
       CASE 
         WHEN MAX(p.payment_date) IS NULL THEN 999
         WHEN MAX(p.payment_date) < date('now', '-90 days') THEN 90
         WHEN MAX(p.payment_date) < date('now', '-60 days') THEN 60
         WHEN MAX(p.payment_date) < date('now', '-30 days') THEN 30
         ELSE 0
       END as days_overdue
     FROM apartments a
     LEFT JOIN owners o ON a.id = o.apartment_id AND o.is_primary = 1
     LEFT JOIN payments p ON a.id = p.apartment_id AND p.payment_date >= date('now', '-6 months')
     GROUP BY a.id
     HAVING balance > 0
     ORDER BY balance DESC, days_overdue DESC
     LIMIT ?`,
    [parseInt(limit)],
    (err, results) => {
      if (err) {
        console.error('Error fetching top delinquents:', err);
        return res.status(500).json({ error: 'Error al obtener morosos' });
      }

      const stats = {
        total_delinquents: results.length,
        total_debt: results.reduce((sum, r) => sum + r.balance, 0),
        average_debt: results.length > 0 ? results.reduce((sum, r) => sum + r.balance, 0) / results.length : 0,
        by_age_category: {
          'current': results.filter(r => r.age_category === 'current').length,
          '30-59': results.filter(r => r.age_category === '30-59').length,
          '60-89': results.filter(r => r.age_category === '60-89').length,
          '90+': results.filter(r => r.age_category === '90+').length
        }
      };

      res.json({
        success: true,
        stats,
        delinquents: results
      });
    }
  );
});

// Reporte de Top Morosos (PDF)
router.get('/top-delinquents/pdf', authMiddleware, (req, res) => {
  const { limit = 10 } = req.query;
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="top-morosos.pdf"');

  doc.pipe(res);

  doc.fontSize(20).text('REPORTE DE TOP MOROSOS', { align: 'center' });
  doc.fontSize(10).text(`Fecha: ${new Date().toLocaleDateString('es-CO')}`, { align: 'center' });
  doc.moveDown();

  db.all(
    `SELECT 
       a.id,
       a.number,
       a.monthly_fee,
       o.name as owner_name,
       o.phone,
       o.email,
       COALESCE(SUM(p.amount), 0) as total_paid,
       (a.monthly_fee * 6) - COALESCE(SUM(p.amount), 0) as balance,
       MAX(p.payment_date) as last_payment,
       CASE 
         WHEN MAX(p.payment_date) IS NULL THEN '90+'
         WHEN MAX(p.payment_date) < date('now', '-90 days') THEN '90+'
         WHEN MAX(p.payment_date) < date('now', '-60 days') THEN '60-89'
         WHEN MAX(p.payment_date) < date('now', '-30 days') THEN '30-59'
         ELSE 'current'
       END as age_category
     FROM apartments a
     LEFT JOIN owners o ON a.id = o.apartment_id AND o.is_primary = 1
     LEFT JOIN payments p ON a.id = p.apartment_id AND p.payment_date >= date('now', '-6 months')
     GROUP BY a.id
     HAVING balance > 0
     ORDER BY balance DESC
     LIMIT ?`,
    [parseInt(limit)],
    (err, results) => {
      if (err) {
        doc.text('Error al generar reporte');
        doc.end();
        return;
      }

      const totalDebt = results.reduce((sum, r) => sum + r.balance, 0);

      doc.fontSize(12).text('Ranking de Deudores:', { underline: true });
      doc.moveDown(0.5);

      results.forEach((row, index) => {
        doc.fontSize(9).text(
          `${index + 1}. Apt ${row.number} | Propietario: ${row.owner_name || 'N/A'} | Deuda: $${row.balance.toLocaleString()} | Antigüedad: ${row.age_category} días`,
          { width: 500 }
        );
        if (row.phone) {
          doc.fontSize(8).text(`   Teléfono: ${row.phone}`, { width: 500 });
        }
        if (row.email) {
          doc.fontSize(8).text(`   Email: ${row.email}`, { width: 500 });
        }
        doc.moveDown(0.3);
      });

      doc.moveDown();
      doc.fontSize(11).text(`Total Deuda (Top ${results.length}): $${totalDebt.toLocaleString()}`, { bold: true });
      doc.text(`Promedio de Deuda: $${(totalDebt / results.length).toLocaleString()}`);

      doc.end();
    }
  );
});

// Reporte de Top Morosos (CSV)
router.get('/top-delinquents/csv', authMiddleware, (req, res) => {
  const { limit = 10 } = req.query;

  db.all(
    `SELECT 
       a.number,
       o.name as owner_name,
       o.phone,
       o.email,
       a.monthly_fee,
       COALESCE(SUM(p.amount), 0) as total_paid,
       (a.monthly_fee * 6) - COALESCE(SUM(p.amount), 0) as balance,
       MAX(p.payment_date) as last_payment,
       CASE 
         WHEN MAX(p.payment_date) IS NULL THEN '90+'
         WHEN MAX(p.payment_date) < date('now', '-90 days') THEN '90+'
         WHEN MAX(p.payment_date) < date('now', '-60 days') THEN '60-89'
         WHEN MAX(p.payment_date) < date('now', '-30 days') THEN '30-59'
         ELSE 'current'
       END as age_category
     FROM apartments a
     LEFT JOIN owners o ON a.id = o.apartment_id AND o.is_primary = 1
     LEFT JOIN payments p ON a.id = p.apartment_id AND p.payment_date >= date('now', '-6 months')
     GROUP BY a.id
     HAVING balance > 0
     ORDER BY balance DESC
     LIMIT ?`,
    [parseInt(limit)],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Error al exportar' });
        return;
      }

      let csv = 'Apartamento,Propietario,Teléfono,Email,Cuota Mensual,Pagado,Deuda,Último Pago,Antigüedad\n';

      results.forEach(row => {
        const csvRow = [
          row.number,
          `"${row.owner_name || 'N/A'}"`,
          row.phone || '',
          row.email || '',
          row.monthly_fee,
          row.total_paid,
          row.balance,
          row.last_payment || 'Nunca',
          row.age_category
        ];
        csv += csvRow.join(',') + '\n';
      });

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="top-morosos.csv"');
      res.send(csv);
    }
  );
});

module.exports = router;

>>>>>>> 1c44c1f2ef04d7587f963cce682ae1a54d28fd20
module.exports = router;