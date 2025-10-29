<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { authMiddleware } = require('../middleware/auth');
const { logAuditChange } = require('../middleware/audit');
const bankReconciliation = require('../services/bankReconciliation');

// Configurar multer para uploads
const upload = multer({
  dest: path.join(__dirname, '../../uploads/bank_statements'),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos CSV'));
    }
  }
});

// Crear directorio de uploads si no existe
const uploadsDir = path.join(__dirname, '../../uploads/bank_statements');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

/**
 * POST /api/reconciliation/upload
 * Subir archivo CSV del banco y crear conciliación
 */
router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { reconciliationDate, bankBalance } = req.body;

    if (!reconciliationDate || !bankBalance) {
      return res.status(400).json({ 
        error: 'reconciliationDate y bankBalance son requeridos' 
      });
    }

    // Procesar CSV
    const transactions = await bankReconciliation.processBankCSV(req.file.path);

    // Obtener balance del sistema
    const systemBalance = await bankReconciliation.getSystemBalance(
      reconciliationDate,
      reconciliationDate
    );

    // Crear conciliación
    const reconciliation = await bankReconciliation.createReconciliation(
      reconciliationDate,
      parseFloat(bankBalance),
      systemBalance
    );

    // Registrar en auditoría
    await logAuditChange(
      req.user.id,
      'CREATE',
      'bank_reconciliation',
      null,
      reconciliation,
      req.ip
    );

    // Limpiar archivo temporal
    fs.unlink(req.file.path, (err) => {
      if (err) console.error('Error deleting temp file:', err);
    });

    res.json({
      success: true,
      reconciliation,
      transactionsProcessed: transactions.length,
      message: reconciliation.status === 'reconciled' 
        ? 'Conciliación completada exitosamente' 
        : 'Conciliación creada con diferencias'
    });
  } catch (error) {
    console.error('Error uploading bank statement:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/reconciliation/list
 * Obtener lista de conciliaciones
 */
router.get('/list', authMiddleware, async (req, res) => {
  try {
    const { status, startDate, endDate } = req.query;
    
    const reconciliations = await bankReconciliation.getReconciliations({
      status,
      startDate,
      endDate
    });

    res.json({
      success: true,
      count: reconciliations.length,
      reconciliations
    });
  } catch (error) {
    console.error('Error fetching reconciliations:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/reconciliation/:id
 * Obtener detalles de una conciliación
 */
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const reconciliation = await bankReconciliation.getReconciliationDetails(req.params.id);

    if (!reconciliation) {
      return res.status(404).json({ error: 'Reconciliation not found' });
    }

    res.json({
      success: true,
      reconciliation
    });
  } catch (error) {
    console.error('Error fetching reconciliation:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * PUT /api/reconciliation/:id/status
 * Actualizar estado de conciliación
 */
router.put('/:id/status', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'reconciled', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const oldReconciliation = await bankReconciliation.getReconciliationDetails(req.params.id);
    const result = await bankReconciliation.updateReconciliationStatus(req.params.id, status);

    // Registrar en auditoría
    await logAuditChange(
      req.user.id,
      'UPDATE',
      'bank_reconciliation',
      oldReconciliation,
      { ...oldReconciliation, status },
      req.ip
    );

    res.json({
      success: true,
      message: 'Status actualizado',
      result
    });
  } catch (error) {
    console.error('Error updating reconciliation status:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/reconciliation/summary/stats
 * Obtener resumen de conciliaciones
 */
router.get('/summary/stats', authMiddleware, async (req, res) => {
  try {
    const reconciliations = await bankReconciliation.getReconciliations();

    const stats = {
      total: reconciliations.length,
      reconciled: reconciliations.filter(r => r.status === 'reconciled').length,
      pending: reconciliations.filter(r => r.status === 'pending').length,
      rejected: reconciliations.filter(r => r.status === 'rejected').length,
      totalDifference: reconciliations.reduce((sum, r) => sum + (r.difference || 0), 0)
    };

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Error fetching reconciliation stats:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
=======
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { authMiddleware } = require('../middleware/auth');
const { logAuditChange } = require('../middleware/audit');
const bankReconciliation = require('../services/bankReconciliation');

// Configurar multer para uploads
const upload = multer({
  dest: path.join(__dirname, '../../uploads/bank_statements'),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos CSV'));
    }
  }
});

// Crear directorio de uploads si no existe
const uploadsDir = path.join(__dirname, '../../uploads/bank_statements');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

/**
 * POST /api/reconciliation/upload
 * Subir archivo CSV del banco y crear conciliación
 */
router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { reconciliationDate, bankBalance } = req.body;

    if (!reconciliationDate || !bankBalance) {
      return res.status(400).json({ 
        error: 'reconciliationDate y bankBalance son requeridos' 
      });
    }

    // Procesar CSV
    const transactions = await bankReconciliation.processBankCSV(req.file.path);

    // Obtener balance del sistema
    const systemBalance = await bankReconciliation.getSystemBalance(
      reconciliationDate,
      reconciliationDate
    );

    // Crear conciliación
    const reconciliation = await bankReconciliation.createReconciliation(
      reconciliationDate,
      parseFloat(bankBalance),
      systemBalance
    );

    // Registrar en auditoría
    await logAuditChange(
      req.user.id,
      'CREATE',
      'bank_reconciliation',
      null,
      reconciliation,
      req.ip
    );

    // Limpiar archivo temporal
    fs.unlink(req.file.path, (err) => {
      if (err) console.error('Error deleting temp file:', err);
    });

    res.json({
      success: true,
      reconciliation,
      transactionsProcessed: transactions.length,
      message: reconciliation.status === 'reconciled' 
        ? 'Conciliación completada exitosamente' 
        : 'Conciliación creada con diferencias'
    });
  } catch (error) {
    console.error('Error uploading bank statement:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/reconciliation/list
 * Obtener lista de conciliaciones
 */
router.get('/list', authMiddleware, async (req, res) => {
  try {
    const { status, startDate, endDate } = req.query;
    
    const reconciliations = await bankReconciliation.getReconciliations({
      status,
      startDate,
      endDate
    });

    res.json({
      success: true,
      count: reconciliations.length,
      reconciliations
    });
  } catch (error) {
    console.error('Error fetching reconciliations:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/reconciliation/:id
 * Obtener detalles de una conciliación
 */
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const reconciliation = await bankReconciliation.getReconciliationDetails(req.params.id);

    if (!reconciliation) {
      return res.status(404).json({ error: 'Reconciliation not found' });
    }

    res.json({
      success: true,
      reconciliation
    });
  } catch (error) {
    console.error('Error fetching reconciliation:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * PUT /api/reconciliation/:id/status
 * Actualizar estado de conciliación
 */
router.put('/:id/status', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'reconciled', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const oldReconciliation = await bankReconciliation.getReconciliationDetails(req.params.id);
    const result = await bankReconciliation.updateReconciliationStatus(req.params.id, status);

    // Registrar en auditoría
    await logAuditChange(
      req.user.id,
      'UPDATE',
      'bank_reconciliation',
      oldReconciliation,
      { ...oldReconciliation, status },
      req.ip
    );

    res.json({
      success: true,
      message: 'Status actualizado',
      result
    });
  } catch (error) {
    console.error('Error updating reconciliation status:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/reconciliation/summary/stats
 * Obtener resumen de conciliaciones
 */
router.get('/summary/stats', authMiddleware, async (req, res) => {
  try {
    const reconciliations = await bankReconciliation.getReconciliations();

    const stats = {
      total: reconciliations.length,
      reconciled: reconciliations.filter(r => r.status === 'reconciled').length,
      pending: reconciliations.filter(r => r.status === 'pending').length,
      rejected: reconciliations.filter(r => r.status === 'rejected').length,
      totalDifference: reconciliations.reduce((sum, r) => sum + (r.difference || 0), 0)
    };

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Error fetching reconciliation stats:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
>>>>>>> 1c44c1f2ef04d7587f963cce682ae1a54d28fd20
