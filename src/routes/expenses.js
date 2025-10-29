const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Obtener todos los gastos
router.get('/', authMiddleware, (req, res) => {
  const { categoryId, startDate, endDate } = req.query;

  let query = `SELECT e.*, ec.name as category_name
               FROM expenses e
               JOIN expense_categories ec ON e.category_id = ec.id
               WHERE 1=1`;
  const params = [];

  if (categoryId) {
    query += ` AND e.category_id = ?`;
    params.push(categoryId);
  }

  if (startDate) {
    query += ` AND e.expense_date >= ?`;
    params.push(startDate);
  }

  if (endDate) {
    query += ` AND e.expense_date <= ?`;
    params.push(endDate);
  }

  query += ` ORDER BY e.expense_date DESC`;

  db.all(query, params, (err, expenses) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener gastos' });
    }
    res.json(expenses);
  });
});

// Registrar gasto
router.post('/', authMiddleware, roleMiddleware(['Administrador', 'Contador']), (req, res) => {
  const { category_id, amount, expense_date, description, provider } = req.body;

  if (!category_id || !amount || !expense_date) {
    return res.status(400).json({ error: 'Campos requeridos: category_id, amount, expense_date' });
  }

  db.run(
    `INSERT INTO expenses (category_id, amount, expense_date, description, provider)
     VALUES (?, ?, ?, ?, ?)`,
    [category_id, amount, expense_date, description, provider],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Error al registrar gasto' });
      }
      res.status(201).json({ id: this.lastID, message: 'Gasto registrado' });
    }
  );
});

// Obtener gastos por categoría
router.get('/by-category/summary', authMiddleware, (req, res) => {
  db.all(
    `SELECT 
       ec.id,
       ec.name as category,
       COUNT(*) as expense_count,
       SUM(e.amount) as total_amount
     FROM expenses e
     JOIN expense_categories ec ON e.category_id = ec.id
     WHERE e.expense_date >= date('now', '-6 months')
     GROUP BY ec.id
     ORDER BY total_amount DESC`,
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Error al obtener resumen de gastos' });
      }
      res.json(results);
    }
  );
});

// Obtener gastos mensuales
router.get('/monthly/summary', authMiddleware, (req, res) => {
  db.all(
    `SELECT 
       strftime('%Y-%m', expense_date) as month,
       COUNT(*) as expense_count,
       SUM(amount) as total_amount
     FROM expenses
     WHERE expense_date >= date('now', '-12 months')
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

// Obtener categorías de gastos
router.get('/categories/list', authMiddleware, (req, res) => {
  db.all(
    `SELECT * FROM expense_categories ORDER BY name`,
    (err, categories) => {
      if (err) {
        return res.status(500).json({ error: 'Error al obtener categorías' });
      }
      res.json(categories);
    }
  );
});

module.exports = router;