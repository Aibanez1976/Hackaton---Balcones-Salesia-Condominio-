<<<<<<< HEAD
const db = require('../config/database');

/**
 * Middleware para registrar cambios en la bitácora de auditoría
 * Registra: usuario, acción, modelo, valores antiguos, valores nuevos, IP
 */
const auditLog = (action, model) => {
  return (req, res, next) => {
    // Guardar datos originales del body
    req.auditData = {
      action,
      model,
      userId: req.user?.id || null,
      ipAddress: req.ip || req.connection.remoteAddress,
      oldValues: null,
      newValues: req.body
    };
    next();
  };
};

/**
 * Registrar cambio en la base de datos
 */
const logAuditChange = (userId, action, model, oldValues, newValues, ipAddress) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO audit_logs (user_id, action, model, old_values, new_values, ip_address)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        userId,
        action,
        model,
        JSON.stringify(oldValues),
        JSON.stringify(newValues),
        ipAddress
      ],
      function(err) {
        if (err) {
          console.error('Error logging audit:', err);
          reject(err);
        } else {
          resolve(this.lastID);
        }
      }
    );
  });
};

/**
 * Obtener historial de auditoría
 */
const getAuditLogs = (filters = {}) => {
  return new Promise((resolve, reject) => {
    let query = `
      SELECT 
        al.id,
        al.user_id,
        u.name as user_name,
        al.action,
        al.model,
        al.old_values,
        al.new_values,
        al.ip_address,
        al.created_at
      FROM audit_logs al
      LEFT JOIN users u ON al.user_id = u.id
      WHERE 1=1
    `;
    const params = [];

    if (filters.action) {
      query += ` AND al.action = ?`;
      params.push(filters.action);
    }

    if (filters.model) {
      query += ` AND al.model = ?`;
      params.push(filters.model);
    }

    if (filters.userId) {
      query += ` AND al.user_id = ?`;
      params.push(filters.userId);
    }

    if (filters.startDate) {
      query += ` AND DATE(al.created_at) >= ?`;
      params.push(filters.startDate);
    }

    if (filters.endDate) {
      query += ` AND DATE(al.created_at) <= ?`;
      params.push(filters.endDate);
    }

    query += ` ORDER BY al.created_at DESC LIMIT 1000`;

    db.all(query, params, (err, rows) => {
      if (err) {
        console.error('Error fetching audit logs:', err);
        reject(err);
      } else {
        resolve(rows || []);
      }
    });
  });
};

module.exports = {
  auditLog,
  logAuditChange,
  getAuditLogs
};
=======
const db = require('../config/database');

/**
 * Middleware para registrar cambios en la bitácora de auditoría
 * Registra: usuario, acción, modelo, valores antiguos, valores nuevos, IP
 */
const auditLog = (action, model) => {
  return (req, res, next) => {
    // Guardar datos originales del body
    req.auditData = {
      action,
      model,
      userId: req.user?.id || null,
      ipAddress: req.ip || req.connection.remoteAddress,
      oldValues: null,
      newValues: req.body
    };
    next();
  };
};

/**
 * Registrar cambio en la base de datos
 */
const logAuditChange = (userId, action, model, oldValues, newValues, ipAddress) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO audit_logs (user_id, action, model, old_values, new_values, ip_address)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        userId,
        action,
        model,
        JSON.stringify(oldValues),
        JSON.stringify(newValues),
        ipAddress
      ],
      function(err) {
        if (err) {
          console.error('Error logging audit:', err);
          reject(err);
        } else {
          resolve(this.lastID);
        }
      }
    );
  });
};

/**
 * Obtener historial de auditoría
 */
const getAuditLogs = (filters = {}) => {
  return new Promise((resolve, reject) => {
    let query = `
      SELECT 
        al.id,
        al.user_id,
        u.name as user_name,
        al.action,
        al.model,
        al.old_values,
        al.new_values,
        al.ip_address,
        al.created_at
      FROM audit_logs al
      LEFT JOIN users u ON al.user_id = u.id
      WHERE 1=1
    `;
    const params = [];

    if (filters.action) {
      query += ` AND al.action = ?`;
      params.push(filters.action);
    }

    if (filters.model) {
      query += ` AND al.model = ?`;
      params.push(filters.model);
    }

    if (filters.userId) {
      query += ` AND al.user_id = ?`;
      params.push(filters.userId);
    }

    if (filters.startDate) {
      query += ` AND DATE(al.created_at) >= ?`;
      params.push(filters.startDate);
    }

    if (filters.endDate) {
      query += ` AND DATE(al.created_at) <= ?`;
      params.push(filters.endDate);
    }

    query += ` ORDER BY al.created_at DESC LIMIT 1000`;

    db.all(query, params, (err, rows) => {
      if (err) {
        console.error('Error fetching audit logs:', err);
        reject(err);
      } else {
        resolve(rows || []);
      }
    });
  });
};

module.exports = {
  auditLog,
  logAuditChange,
  getAuditLogs
};
>>>>>>> 1c44c1f2ef04d7587f963cce682ae1a54d28fd20
