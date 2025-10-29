const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.join(__dirname, 'data', 'salesia.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
    process.exit(1);
  } else {
    console.log('✅ Connected to SQLite database');
    initDB();
  }
});

db.run('PRAGMA foreign_keys = ON');

const initDB = () => {
  db.serialize(() => {
    // Create tables
    db.run(`CREATE TABLE IF NOT EXISTS roles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role_id INTEGER NOT NULL,
      is_active BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (role_id) REFERENCES roles(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS apartments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      number TEXT UNIQUE NOT NULL,
      tower TEXT,
      area DECIMAL(10,2),
      coefficient DECIMAL(10,4),
      monthly_fee DECIMAL(12,2),
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS owners (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      apartment_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      document TEXT UNIQUE,
      is_primary BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (apartment_id) REFERENCES apartments(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS residents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      apartment_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      phone TEXT,
      relationship TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (apartment_id) REFERENCES apartments(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS vehicles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      owner_id INTEGER NOT NULL,
      plate TEXT UNIQUE NOT NULL,
      brand TEXT,
      model TEXT,
      parking_spot TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (owner_id) REFERENCES owners(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS pets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      apartment_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      species TEXT,
      breed TEXT,
      weight DECIMAL(8,2),
      birth_date DATE,
      photo TEXT,
      vaccination_record TEXT,
      is_registered BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (apartment_id) REFERENCES apartments(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS payment_methods (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      apartment_id INTEGER NOT NULL,
      amount DECIMAL(12,2) NOT NULL,
      payment_date DATE NOT NULL,
      concept TEXT,
      reference TEXT,
      payment_method_id INTEGER,
      receipt_file TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (apartment_id) REFERENCES apartments(id),
      FOREIGN KEY (payment_method_id) REFERENCES payment_methods(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS expense_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_id INTEGER NOT NULL,
      amount DECIMAL(12,2) NOT NULL,
      expense_date DATE NOT NULL,
      description TEXT,
      provider TEXT,
      invoice_file TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES expense_categories(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS account_statements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      apartment_id INTEGER NOT NULL,
      balance_current DECIMAL(12,2),
      balance_overdue DECIMAL(12,2),
      interest DECIMAL(12,2),
      statement_date DATE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (apartment_id) REFERENCES apartments(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS budget_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_id INTEGER NOT NULL,
      budgeted_amount DECIMAL(12,2),
      year INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES expense_categories(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS bank_reconciliations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      reconciliation_date DATE,
      bank_balance DECIMAL(12,2),
      system_balance DECIMAL(12,2),
      difference DECIMAL(12,2),
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      action TEXT NOT NULL,
      model TEXT,
      old_values TEXT,
      new_values TEXT,
      ip_address TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`, () => {
      console.log('✅ All tables created');
      seedData();
    });
  });
};

const seedData = () => {
  // Check if data already exists
  db.get('SELECT COUNT(*) as count FROM users', (err, row) => {
    if (err) {
      console.error('Error checking users:', err);
      return;
    }

    if (row.count > 0) {
      console.log('✅ Database already seeded');
      db.close();
      return;
    }

    console.log('Seeding database...');

    // Insert roles
    db.run(`INSERT INTO roles (id, name, description) VALUES 
      (1, 'Administrador', 'Acceso total al sistema'),
      (2, 'Contador', 'Gestión de pagos y gastos'),
      (3, 'Consulta', 'Solo lectura de reportes')
    `);

    // Insert users
    const adminPassword = bcrypt.hashSync('admin123', 10);
    const contadorPassword = bcrypt.hashSync('contador123', 10);
    
    db.run(`INSERT INTO users (id, name, email, password, role_id) VALUES 
      (1, 'Administrador', 'admin@salesia.com', ?, 1),
      (2, 'Contador', 'contador@salesia.com', ?, 2)
    `, [adminPassword, contadorPassword]);

    // Insert payment methods
    db.run(`INSERT INTO payment_methods (id, name, description) VALUES 
      (1, 'Efectivo', 'Pago en efectivo'),
      (2, 'Transferencia', 'Transferencia bancaria'),
      (3, 'Cheque', 'Pago con cheque'),
      (4, 'Tarjeta', 'Pago con tarjeta de crédito')
    `);

    // Insert expense categories
    db.run(`INSERT INTO expense_categories (id, name, description) VALUES 
      (1, 'Servicios', 'Servicios públicos y mantenimiento'),
      (2, 'Seguridad', 'Gastos de seguridad'),
      (3, 'Limpieza', 'Servicios de limpieza'),
      (4, 'Reparaciones', 'Reparaciones y mantenimiento'),
      (5, 'Administración', 'Gastos administrativos'),
      (6, 'Seguros', 'Pólizas de seguros')
    `);

    // Insert apartments
    for (let i = 1; i <= 13; i++) {
      const tower = i <= 6 ? 'Torre A' : 'Torre B';
      db.run(`INSERT INTO apartments (number, tower, area, coefficient, monthly_fee) 
        VALUES (?, ?, 85.5, 0.0769, 450000)
      `, [`APT-${String(i).padStart(3, '0')}`, tower]);
    }

    // Insert owners
    const owners = [
      ['Juan García López', 'juan.garcia@email.com', '3001234567', '1234567890'],
      ['María Rodríguez Pérez', 'maria.rodriguez@email.com', '3007654321', '1234567891'],
      ['Carlos Martínez Silva', 'carlos.martinez@email.com', '3009876543', '1234567892'],
      ['Ana López Gómez', 'ana.lopez@email.com', '3005555555', '1234567893'],
      ['Pedro Sánchez Ruiz', 'pedro.sanchez@email.com', '3004444444', '1234567894'],
      ['Laura Fernández Díaz', 'laura.fernandez@email.com', '3003333333', '1234567895'],
      ['Roberto Díaz Moreno', 'roberto.diaz@email.com', '3002222222', '1234567896'],
      ['Sofía Moreno Castro', 'sofia.moreno@email.com', '3001111111', '1234567897'],
      ['Miguel Castro Ruiz', 'miguel.castro@email.com', '3008888888', '1234567898'],
      ['Elena Ruiz Gómez', 'elena.ruiz@email.com', '3007777777', '1234567899'],
      ['Francisco Gómez López', 'francisco.gomez@email.com', '3006666666', '1234567800'],
      ['Gabriela López Martínez', 'gabriela.lopez@email.com', '3009999999', '1234567801'],
      ['David Martínez Fernández', 'david.martinez@email.com', '3005432109', '1234567802']
    ];

    owners.forEach((owner, idx) => {
      db.run(`INSERT INTO owners (apartment_id, name, email, phone, document, is_primary) 
        VALUES (?, ?, ?, ?, ?, 1)
      `, [idx + 1, ...owner]);
    });

    console.log('✅ Database seeded successfully');
    db.close();
  });
};