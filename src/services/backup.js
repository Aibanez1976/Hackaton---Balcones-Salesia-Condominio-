const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const db = require('../config/database');

/**
 * Crear directorio de backups si no existe
 */
const ensureBackupDir = () => {
  const backupDir = path.join(__dirname, '../../backups');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  return backupDir;
};

/**
 * Realizar backup de la base de datos
 */
const performBackup = () => {
  return new Promise((resolve, reject) => {
    try {
      const backupDir = ensureBackupDir();
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupFileName = `salesia_backup_${timestamp}.db`;
      const backupPath = path.join(backupDir, backupFileName);
      
      // Copiar archivo de base de datos
      const sourceDb = path.join(__dirname, '../../data/salesia.db');
      
      fs.copyFile(sourceDb, backupPath, (err) => {
        if (err) {
          console.error('❌ Error en backup:', err);
          reject(err);
        } else {
          const fileSize = fs.statSync(backupPath).size;
          const backupInfo = {
            fileName: backupFileName,
            path: backupPath,
            size: fileSize,
            timestamp: new Date().toISOString(),
            status: 'success'
          };
          
          console.log(`✅ Backup realizado: ${backupFileName} (${(fileSize / 1024).toFixed(2)} KB)`);
          
          // Registrar en base de datos
          logBackup(backupInfo);
          resolve(backupInfo);
        }
      });
    } catch (error) {
      console.error('❌ Error en backup:', error);
      reject(error);
    }
  });
};

/**
 * Registrar backup en tabla de auditoría
 */
const logBackup = (backupInfo) => {
  db.run(
    `INSERT INTO audit_logs (user_id, action, model, new_values, created_at)
     VALUES (NULL, 'BACKUP', 'DATABASE', ?, CURRENT_TIMESTAMP)`,
    [JSON.stringify(backupInfo)],
    (err) => {
      if (err) {
        console.error('Error logging backup:', err);
      }
    }
  );
};

/**
 * Obtener lista de backups disponibles
 */
const getBackupsList = () => {
  return new Promise((resolve, reject) => {
    try {
      const backupDir = ensureBackupDir();
      
      fs.readdir(backupDir, (err, files) => {
        if (err) {
          reject(err);
        } else {
          const backups = files
            .filter(f => f.endsWith('.db'))
            .map(f => {
              const filePath = path.join(backupDir, f);
              const stats = fs.statSync(filePath);
              return {
                fileName: f,
                size: stats.size,
                sizeKB: (stats.size / 1024).toFixed(2),
                created: stats.birthtime,
                modified: stats.mtime
              };
            })
            .sort((a, b) => b.modified - a.modified);
          
          resolve(backups);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Restaurar backup
 */
const restoreBackup = (backupFileName) => {
  return new Promise((resolve, reject) => {
    try {
      const backupDir = ensureBackupDir();
      const backupPath = path.join(backupDir, backupFileName);
      const sourceDb = path.join(__dirname, '../../data/salesia.db');
      
      // Verificar que el archivo existe
      if (!fs.existsSync(backupPath)) {
        reject(new Error('Backup file not found'));
        return;
      }
      
      // Crear backup del estado actual antes de restaurar
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const preRestoreBackup = path.join(backupDir, `pre_restore_${timestamp}.db`);
      
      fs.copyFile(sourceDb, preRestoreBackup, (err) => {
        if (err) {
          reject(err);
          return;
        }
        
        // Restaurar desde backup
        fs.copyFile(backupPath, sourceDb, (err) => {
          if (err) {
            reject(err);
          } else {
            console.log(`✅ Backup restaurado: ${backupFileName}`);
            resolve({
              restored: true,
              backupFile: backupFileName,
              preRestoreBackup: `pre_restore_${timestamp}.db`,
              timestamp: new Date().toISOString()
            });
          }
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Eliminar backup antiguo
 */
const deleteBackup = (backupFileName) => {
  return new Promise((resolve, reject) => {
    try {
      const backupDir = ensureBackupDir();
      const backupPath = path.join(backupDir, backupFileName);
      
      if (!fs.existsSync(backupPath)) {
        reject(new Error('Backup file not found'));
        return;
      }
      
      fs.unlink(backupPath, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log(`✅ Backup eliminado: ${backupFileName}`);
          resolve({
            deleted: true,
            backupFile: backupFileName
          });
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Limpiar backups antiguos (mantener últimos N backups)
 */
const cleanOldBackups = (keepCount = 10) => {
  return new Promise(async (resolve, reject) => {
    try {
      const backups = await getBackupsList();
      
      if (backups.length > keepCount) {
        const toDelete = backups.slice(keepCount);
        const deleted = [];
        
        for (const backup of toDelete) {
          try {
            await deleteBackup(backup.fileName);
            deleted.push(backup.fileName);
          } catch (err) {
            console.error(`Error deleting ${backup.fileName}:`, err);
          }
        }
        
        console.log(`🧹 Limpieza de backups: ${deleted.length} archivos eliminados`);
        resolve({
          cleaned: true,
          deletedCount: deleted.length,
          deletedFiles: deleted
        });
      } else {
        resolve({
          cleaned: false,
          message: `Solo hay ${backups.length} backups, no se necesita limpieza`
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Programar backups automáticos
 * Por defecto: diariamente a las 2:00 AM
 */
const scheduleBackups = (cronExpression = '0 2 * * *') => {
  cron.schedule(cronExpression, async () => {
    try {
      console.log('⏰ Iniciando backup automático programado...');
      await performBackup();
      await cleanOldBackups(10); // Mantener últimos 10 backups
    } catch (error) {
      console.error('❌ Error en backup automático:', error);
    }
  });
  
  console.log(`📅 Backups automáticos programados: ${cronExpression}`);
};

module.exports = {
  performBackup,
  getBackupsList,
  restoreBackup,
  deleteBackup,
  cleanOldBackups,
  scheduleBackups,
  ensureBackupDir
};
