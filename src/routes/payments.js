const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Obtener todos los pagos
router.get('/', authMiddleware, (req, res) => {
  const { apartmentId, startDate, endDate } = req.query;

  let query = `SELECT p.*, a.number as apartment_number, pm.name as payment_method
               FROM payments p
               JOIN apartments a ON p.apartment_id = a.id
               LEFT JOIN payment_methods pm ON p.payment_method_id = pm.id
               WHERE 1=1`;
  const params = [];

  if (apartmentId) {
    query += ` AND p.apartment_id = ?`;
    params.push(apartmentId);
  }

  if (startDate) {
    query += ` AND p.payment_date >= ?`;
    params.push(startDate);
  }

  if (endDate) {
    query += ` AND p.payment_date <= ?`;
    params.push(endDate);
  }

  query += ` ORDER BY p.payment_date DESC`;

  db.all(query, params, (err, payments) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener pagos' });
    }
    res.json(payments);
  });
});

// Registrar pago
router.post('/', authMiddleware, roleMiddleware(['Administrador', 'Contador']), (req, res) => {
  const { apartment_id, amount, payment_date, concept, reference, payment_method_id } = req.body;

  if (!apartment_id || !amount || !payment_date) {
    return res.status(400).json({ error: 'Campos requeridos: apartment_id, amount, payment_date' });
  }

  db.run(
    `INSERT INTO payments (apartment_id, amount, payment_date, concept, reference, payment_method_id)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [apartment_id, amount, payment_date, concept, reference, payment_method_id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Error al registrar pago' });
      }
      res.status(201).json({ id: this.lastID, message: 'Pago registrado' });
    }
  );
});

// Obtener pagos del mes
router.get('/monthly/summary', authMiddleware, (req, res) => {
  db.all(
    `SELECT 
       strftime('%Y-%m', payment_date) as month,
       COUNT(*) as payment_count,
       SUM(amount) as total_amount
     FROM payments
     WHERE payment_date >= date('now', '-12 months')
     GROUP BY month
     ORDER BY month DESC`,
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Error al obtener resumen mensual' });
      }
      res.json(results);
    }
  );
});

module.exports = router;