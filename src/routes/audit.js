const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const { getAuditLogs } = require('../middleware/audit');
const backup = require('../services/backup');

/**
 * GET /api/audit/logs
 * Obtener bitácora de auditoría con filtros
 */
router.get('/logs', authMiddleware, async (req, res) => {
  try {
    const { action, model, userId, startDate, endDate } = req.query;

    const logs = await getAuditLogs({
      action,
      model,
      userId,
      startDate,
      endDate
    });

    res.json({
      success: true,
      count: logs.length,
      logs
    });
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/audit/logs/summary
 * Resumen de actividades por usuario
 */
router.get('/logs/summary', authMiddleware, async (req, res) => {
  try {
    const logs = await getAuditLogs();

    // Agrupar por usuario
    const summary = {};
    logs.forEach(log => {
      const userName = log.user_name || 'Sistema';
      if (!summary[userName]) {
        summary[userName] = {
          totalActions: 0,
          actions: {}
        };
      }
      summary[userName].totalActions++;
      summary[userName].actions[log.action] = (summary[userName].actions[log.action] || 0) + 1;
    });

    res.json({
      success: true,
      summary
    });
  } catch (error) {
    console.error('Error fetching audit summary:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/audit/logs/export
 * Exportar bitácora a CSV
 */
router.get('/logs/export', authMiddleware, async (req, res) => {
  try {
    const logs = await getAuditLogs();

    // Crear CSV
    let csv = 'ID,Usuario,Acción,Modelo,Valores Antiguos,Valores Nuevos,IP,Fecha\n';
    
    logs.forEach(log => {
      const row = [
        log.id,
        `"${log.user_name || 'Sistema'}"`,
        log.action,
        log.model,
        `"${(log.old_values || '').replace(/"/g, '""')}"`,
        `"${(log.new_values || '').replace(/"/g, '""')}"`,
        log.ip_address,
        log.created_at
      ];
      csv += row.join(',') + '\n';
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="audit_logs.csv"');
    res.send(csv);
  } catch (error) {
    console.error('Error exporting audit logs:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/backup/perform
 * Realizar backup manual
 */
router.post('/backup/perform', authMiddleware, async (req, res) => {
  try {
    const backupInfo = await backup.performBackup();

    res.json({
      success: true,
      message: 'Backup realizado exitosamente',
      backup: backupInfo
    });
  } catch (error) {
    console.error('Error performing backup:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/backup/list
 * Obtener lista de backups disponibles
 */
router.get('/backup/list', authMiddleware, async (req, res) => {
  try {
    const backups = await backup.getBackupsList();

    res.json({
      success: true,
      count: backups.length,
      backups
    });
  } catch (error) {
    console.error('Error fetching backups:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/backup/restore
 * Restaurar backup
 */
router.post('/backup/restore', authMiddleware, async (req, res) => {
  try {
    const { backupFileName } = req.body;

    if (!backupFileName) {
      return res.status(400).json({ error: 'backupFileName es requerido' });
    }

    const result = await backup.restoreBackup(backupFileName);

    res.json({
      success: true,
      message: 'Backup restaurado exitosamente',
      result
    });
  } catch (error) {
    console.error('Error restoring backup:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * DELETE /api/backup/:fileName
 * Eliminar backup
 */
router.delete('/backup/:fileName', authMiddleware, async (req, res) => {
  try {
    const result = await backup.deleteBackup(req.params.fileName);

    res.json({
      success: true,
      message: 'Backup eliminado',
      result
    });
  } catch (error) {
    console.error('Error deleting backup:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/backup/clean
 * Limpiar backups antiguos
 */
router.post('/backup/clean', authMiddleware, async (req, res) => {
  try {
    const { keepCount = 10 } = req.body;

    const result = await backup.cleanOldBackups(keepCount);

    res.json({
      success: true,
      message: 'Limpieza de backups completada',
      result
    });
  } catch (error) {
    console.error('Error cleaning backups:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
