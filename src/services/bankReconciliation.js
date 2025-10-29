<<<<<<< HEAD
const db = require('../config/database');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

/**
 * Procesar archivo CSV de banco y crear conciliación
 * Formato esperado: fecha, descripción, monto, referencia
 */
const processBankCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const transactions = [];
    
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        transactions.push({
          date: row.fecha || row.date,
          description: row.descripcion || row.description,
          amount: parseFloat(row.monto || row.amount),
          reference: row.referencia || row.reference || ''
        });
      })
      .on('end', () => {
        resolve(transactions);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
};

/**
 * Calcular balance del sistema desde pagos registrados
 */
const getSystemBalance = (startDate, endDate) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        COALESCE(SUM(amount), 0) as total
      FROM payments
      WHERE DATE(payment_date) BETWEEN ? AND ?
    `;
    
    db.get(query, [startDate, endDate], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row?.total || 0);
      }
    });
  });
};

/**
 * Crear conciliación bancaria
 */
const createReconciliation = (reconciliationDate, bankBalance, systemBalance) => {
  return new Promise((resolve, reject) => {
    const difference = bankBalance - systemBalance;
    const status = difference === 0 ? 'reconciled' : 'pending';
    
    db.run(
      `INSERT INTO bank_reconciliations 
       (reconciliation_date, bank_balance, system_balance, difference, status)
       VALUES (?, ?, ?, ?, ?)`,
      [reconciliationDate, bankBalance, systemBalance, difference, status],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: this.lastID,
            reconciliationDate,
            bankBalance,
            systemBalance,
            difference,
            status
          });
        }
      }
    );
  });
};

/**
 * Obtener historial de conciliaciones
 */
const getReconciliations = (filters = {}) => {
  return new Promise((resolve, reject) => {
    let query = `
      SELECT * FROM bank_reconciliations
      WHERE 1=1
    `;
    const params = [];

    if (filters.status) {
      query += ` AND status = ?`;
      params.push(filters.status);
    }

    if (filters.startDate) {
      query += ` AND DATE(reconciliation_date) >= ?`;
      params.push(filters.startDate);
    }

    if (filters.endDate) {
      query += ` AND DATE(reconciliation_date) <= ?`;
      params.push(filters.endDate);
    }

    query += ` ORDER BY reconciliation_date DESC`;

    db.all(query, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows || []);
      }
    });
  });
};

/**
 * Obtener detalles de una conciliación específica
 */
const getReconciliationDetails = (reconciliationId) => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM bank_reconciliations WHERE id = ?`,
      [reconciliationId],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      }
    );
  });
};

/**
 * Actualizar estado de conciliación
 */
const updateReconciliationStatus = (reconciliationId, status, notes = '') => {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE bank_reconciliations 
       SET status = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [status, reconciliationId],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: reconciliationId,
            status,
            updated: this.changes > 0
          });
        }
      }
    );
  });
};

module.exports = {
  processBankCSV,
  getSystemBalance,
  createReconciliation,
  getReconciliations,
  getReconciliationDetails,
  updateReconciliationStatus
};
=======
const db = require('../config/database');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

/**
 * Procesar archivo CSV de banco y crear conciliación
 * Formato esperado: fecha, descripción, monto, referencia
 */
const processBankCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const transactions = [];
    
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        transactions.push({
          date: row.fecha || row.date,
          description: row.descripcion || row.description,
          amount: parseFloat(row.monto || row.amount),
          reference: row.referencia || row.reference || ''
        });
      })
      .on('end', () => {
        resolve(transactions);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
};

/**
 * Calcular balance del sistema desde pagos registrados
 */
const getSystemBalance = (startDate, endDate) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        COALESCE(SUM(amount), 0) as total
      FROM payments
      WHERE DATE(payment_date) BETWEEN ? AND ?
    `;
    
    db.get(query, [startDate, endDate], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row?.total || 0);
      }
    });
  });
};

/**
 * Crear conciliación bancaria
 */
const createReconciliation = (reconciliationDate, bankBalance, systemBalance) => {
  return new Promise((resolve, reject) => {
    const difference = bankBalance - systemBalance;
    const status = difference === 0 ? 'reconciled' : 'pending';
    
    db.run(
      `INSERT INTO bank_reconciliations 
       (reconciliation_date, bank_balance, system_balance, difference, status)
       VALUES (?, ?, ?, ?, ?)`,
      [reconciliationDate, bankBalance, systemBalance, difference, status],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: this.lastID,
            reconciliationDate,
            bankBalance,
            systemBalance,
            difference,
            status
          });
        }
      }
    );
  });
};

/**
 * Obtener historial de conciliaciones
 */
const getReconciliations = (filters = {}) => {
  return new Promise((resolve, reject) => {
    let query = `
      SELECT * FROM bank_reconciliations
      WHERE 1=1
    `;
    const params = [];

    if (filters.status) {
      query += ` AND status = ?`;
      params.push(filters.status);
    }

    if (filters.startDate) {
      query += ` AND DATE(reconciliation_date) >= ?`;
      params.push(filters.startDate);
    }

    if (filters.endDate) {
      query += ` AND DATE(reconciliation_date) <= ?`;
      params.push(filters.endDate);
    }

    query += ` ORDER BY reconciliation_date DESC`;

    db.all(query, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows || []);
      }
    });
  });
};

/**
 * Obtener detalles de una conciliación específica
 */
const getReconciliationDetails = (reconciliationId) => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM bank_reconciliations WHERE id = ?`,
      [reconciliationId],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      }
    );
  });
};

/**
 * Actualizar estado de conciliación
 */
const updateReconciliationStatus = (reconciliationId, status, notes = '') => {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE bank_reconciliations 
       SET status = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [status, reconciliationId],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: reconciliationId,
            status,
            updated: this.changes > 0
          });
        }
      }
    );
  });
};

module.exports = {
  processBankCSV,
  getSystemBalance,
  createReconciliation,
  getReconciliations,
  getReconciliationDetails,
  updateReconciliationStatus
};
>>>>>>> 1c44c1f2ef04d7587f963cce682ae1a54d28fd20
