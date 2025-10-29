const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const { initializeDatabase } = require('./src/config/migrations');
const { seedDatabase } = require('./src/config/seeders');
const { scheduleBackups } = require('./src/services/backup');

// Rutas
const authRoutes = require('./src/routes/auth');
const apartmentRoutes = require('./src/routes/apartments');
const portfolioRoutes = require('./src/routes/portfolio');
const paymentRoutes = require('./src/routes/payments');
const expenseRoutes = require('./src/routes/expenses');
const reportRoutes = require('./src/routes/reports');
const reconciliationRoutes = require('./src/routes/reconciliation');
const auditRoutes = require('./src/routes/audit');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Inicializar base de datos
let dbInitialized = false;

const initDB = async () => {
  try {
    await initializeDatabase();
    await seedDatabase();
    dbInitialized = true;
    console.log('✅ Base de datos inicializada correctamente');
    
    // Programar backups automáticos (diariamente a las 2:00 AM)
    scheduleBackups('0 2 * * *');
  } catch (error) {
    console.error('❌ Error inicializando base de datos:', error);
  }
};

// Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/apartments', apartmentRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/reconciliation', reconciliationRoutes);
app.use('/api/audit', auditRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    dbInitialized,
    timestamp: new Date().toISOString()
  });
});

// Servir archivos estáticos DESPUÉS de las rutas API
app.use(express.static(path.join(__dirname, 'public')));

// Servir index.html para rutas no encontradas (SPA)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, async () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  await initDB();
});

module.exports = app;