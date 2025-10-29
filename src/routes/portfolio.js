<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { authMiddleware } = require('../middleware/auth');

// Obtener resumen de cartera
router.get('/summary', authMiddleware, (req, res) => {
  db.all(
    `SELECT 
       a.id,
       a.number,
       a.monthly_fee,
       COUNT(DISTINCT p.id) as total_payments,
       COALESCE(SUM(p.amount), 0) as total_paid,
       (a.monthly_fee * 6) - COALESCE(SUM(p.amount), 0) as balance_owed,
       MAX(p.payment_date) as last_payment_date
     FROM apartments a
     LEFT JOIN payments p ON a.id = p.apartment_id AND p.payment_date >= date('now', '-6 months')
     GROUP BY a.id
     ORDER BY a.number`,
    (err, portfolio) => {
      if (err) {
        return res.status(500).json({ error: 'Error al obtener cartera' });
      }

      // Calcular totales
      const totals = {
        total_apartments: portfolio.length,
        total_monthly_fee: portfolio.reduce((sum, apt) => sum + apt.monthly_fee, 0),
        total_paid: portfolio.reduce((sum, apt) => sum + apt.total_paid, 0),
        total_owed: portfolio.reduce((sum, apt) => sum + apt.balance_owed, 0),
        delinquent_count: portfolio.filter(apt => apt.balance_owed > 0).length,
        delinquency_rate: ((portfolio.filter(apt => apt.balance_owed > 0).length / portfolio.length) * 100).toFixed(2)
      };

      res.json({ portfolio, totals });
    }
  );
});

// Obtener cartera por antigüedad
router.get('/by-age', authMiddleware, (req, res) => {
  const today = new Date();
  const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sixtyDaysAgo = new Date(today.getTime() - 60 * 24 * 60 * 60 * 1000);
  const ninetyDaysAgo = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);

  db.all(
    `SELECT 
       a.id,
       a.number,
       a.monthly_fee,
       COALESCE(SUM(p.amount), 0) as total_paid,
       (a.monthly_fee * 6) - COALESCE(SUM(p.amount), 0) as balance_owed,
       MAX(p.payment_date) as last_payment_date,
       CASE 
         WHEN MAX(p.payment_date) IS NULL THEN '90+'
         WHEN MAX(p.payment_date) < ? THEN '90+'
         WHEN MAX(p.payment_date) < ? THEN '60-89'
         WHEN MAX(p.payment_date) < ? THEN '30-59'
         ELSE 'current'
       END as age_category
     FROM apartments a
     LEFT JOIN payments p ON a.id = p.apartment_id AND p.payment_date >= date('now', '-6 months')
     GROUP BY a.id
     ORDER BY age_category DESC, a.number`,
    [ninetyDaysAgo.toISOString().split('T')[0], 
     sixtyDaysAgo.toISOString().split('T')[0], 
     thirtyDaysAgo.toISOString().split('T')[0]],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Error al obtener cartera por antigüedad' });
      }

      const grouped = {
        current: results.filter(r => r.age_category === 'current'),
        '30-59': results.filter(r => r.age_category === '30-59'),
        '60-89': results.filter(r => r.age_category === '60-89'),
        '90+': results.filter(r => r.age_category === '90+')
      };

      res.json(grouped);
    }
  );
});

// Obtener estado de cuenta por apartamento
router.get('/apartment/:apartmentId', authMiddleware, (req, res) => {
  const { apartmentId } = req.params;

  db.get(
    `SELECT a.*, o.name as owner_name, o.email as owner_email
     FROM apartments a
     LEFT JOIN owners o ON a.id = o.apartment_id AND o.is_primary = 1
     WHERE a.id = ?`,
    [apartmentId],
    (err, apartment) => {
      if (err) {
        return res.status(500).json({ error: 'Error al obtener apartamento' });
      }

      if (!apartment) {
        return res.status(404).json({ error: 'Apartamento no encontrado' });
      }

      // Obtener pagos
      db.all(
        `SELECT * FROM payments WHERE apartment_id = ? ORDER BY payment_date DESC`,
        [apartmentId],
        (err, payments) => {
          if (err) {
            return res.status(500).json({ error: 'Error al obtener pagos' });
          }

          const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
          const expectedPayment = apartment.monthly_fee * 6;
          const balance = expectedPayment - totalPaid;

          res.json({
            apartment,
            payments,
            summary: {
              expected_payment: expectedPayment,
              total_paid: totalPaid,
              balance: balance,
              payment_percentage: ((totalPaid / expectedPayment) * 100).toFixed(2)
            }
          });
        }
      );
    }
  );
});

=======
const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { authMiddleware } = require('../middleware/auth');

// Obtener resumen de cartera
router.get('/summary', authMiddleware, (req, res) => {
  db.all(
    `SELECT 
       a.id,
       a.number,
       a.monthly_fee,
       COUNT(DISTINCT p.id) as total_payments,
       COALESCE(SUM(p.amount), 0) as total_paid,
       (a.monthly_fee * 6) - COALESCE(SUM(p.amount), 0) as balance_owed,
       MAX(p.payment_date) as last_payment_date
     FROM apartments a
     LEFT JOIN payments p ON a.id = p.apartment_id AND p.payment_date >= date('now', '-6 months')
     GROUP BY a.id
     ORDER BY a.number`,
    (err, portfolio) => {
      if (err) {
        return res.status(500).json({ error: 'Error al obtener cartera' });
      }

      // Calcular totales
      const totals = {
        total_apartments: portfolio.length,
        total_monthly_fee: portfolio.reduce((sum, apt) => sum + apt.monthly_fee, 0),
        total_paid: portfolio.reduce((sum, apt) => sum + apt.total_paid, 0),
        total_owed: portfolio.reduce((sum, apt) => sum + apt.balance_owed, 0),
        delinquent_count: portfolio.filter(apt => apt.balance_owed > 0).length,
        delinquency_rate: ((portfolio.filter(apt => apt.balance_owed > 0).length / portfolio.length) * 100).toFixed(2)
      };

      res.json({ portfolio, totals });
    }
  );
});

// Obtener cartera por antigüedad
router.get('/by-age', authMiddleware, (req, res) => {
  const today = new Date();
  const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sixtyDaysAgo = new Date(today.getTime() - 60 * 24 * 60 * 60 * 1000);
  const ninetyDaysAgo = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);

  db.all(
    `SELECT 
       a.id,
       a.number,
       a.monthly_fee,
       COALESCE(SUM(p.amount), 0) as total_paid,
       (a.monthly_fee * 6) - COALESCE(SUM(p.amount), 0) as balance_owed,
       MAX(p.payment_date) as last_payment_date,
       CASE 
         WHEN MAX(p.payment_date) IS NULL THEN '90+'
         WHEN MAX(p.payment_date) < ? THEN '90+'
         WHEN MAX(p.payment_date) < ? THEN '60-89'
         WHEN MAX(p.payment_date) < ? THEN '30-59'
         ELSE 'current'
       END as age_category
     FROM apartments a
     LEFT JOIN payments p ON a.id = p.apartment_id AND p.payment_date >= date('now', '-6 months')
     GROUP BY a.id
     ORDER BY age_category DESC, a.number`,
    [ninetyDaysAgo.toISOString().split('T')[0], 
     sixtyDaysAgo.toISOString().split('T')[0], 
     thirtyDaysAgo.toISOString().split('T')[0]],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Error al obtener cartera por antigüedad' });
      }

      const grouped = {
        current: results.filter(r => r.age_category === 'current'),
        '30-59': results.filter(r => r.age_category === '30-59'),
        '60-89': results.filter(r => r.age_category === '60-89'),
        '90+': results.filter(r => r.age_category === '90+')
      };

      res.json(grouped);
    }
  );
});

// Obtener estado de cuenta por apartamento
router.get('/apartment/:apartmentId', authMiddleware, (req, res) => {
  const { apartmentId } = req.params;

  db.get(
    `SELECT a.*, o.name as owner_name, o.email as owner_email
     FROM apartments a
     LEFT JOIN owners o ON a.id = o.apartment_id AND o.is_primary = 1
     WHERE a.id = ?`,
    [apartmentId],
    (err, apartment) => {
      if (err) {
        return res.status(500).json({ error: 'Error al obtener apartamento' });
      }

      if (!apartment) {
        return res.status(404).json({ error: 'Apartamento no encontrado' });
      }

      // Obtener pagos
      db.all(
        `SELECT * FROM payments WHERE apartment_id = ? ORDER BY payment_date DESC`,
        [apartmentId],
        (err, payments) => {
          if (err) {
            return res.status(500).json({ error: 'Error al obtener pagos' });
          }

          const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
          const expectedPayment = apartment.monthly_fee * 6;
          const balance = expectedPayment - totalPaid;

          res.json({
            apartment,
            payments,
            summary: {
              expected_payment: expectedPayment,
              total_paid: totalPaid,
              balance: balance,
              payment_percentage: ((totalPaid / expectedPayment) * 100).toFixed(2)
            }
          });
        }
      );
    }
  );
});

>>>>>>> 1c44c1f2ef04d7587f963cce682ae1a54d28fd20
module.exports = router;