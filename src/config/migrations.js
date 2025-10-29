const db = require('./database');

const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    // Tabla de Roles
    db.run(`
      CREATE TABLE IF NOT EXISTS roles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) console.error('Error creating roles table:', err);
    });

    // Tabla de Usuarios
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role_id INTEGER NOT NULL,
        is_active BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (role_id) REFERENCES roles(id)
      )
    `, (err) => {
      if (err) console.error('Error creating users table:', err);
    });

    // Tabla de Apartamentos
    db.run(`
      CREATE TABLE IF NOT EXISTS apartments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        number TEXT UNIQUE NOT NULL,
        tower TEXT,
        area DECIMAL(10,2),
        coefficient DECIMAL(10,4),
        monthly_fee DECIMAL(12,2),
        status TEXT DEFAULT 'active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) console.error('Error creating apartments table:', err);
    });

    // Tabla de Propietarios
    db.run(`
      CREATE TABLE IF NOT EXISTS owners (
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
      )
    `, (err) => {
      if (err) console.error('Error creating owners table:', err);
    });

    // Tabla de Residentes
    db.run(`
      CREATE TABLE IF NOT EXISTS residents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        apartment_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        phone TEXT,
        relationship TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (apartment_id) REFERENCES apartments(id)
      )
    `, (err) => {
      if (err) console.error('Error creating residents table:', err);
    });

    // Tabla de Vehículos
    db.run(`
      CREATE TABLE IF NOT EXISTS vehicles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        owner_id INTEGER NOT NULL,
        plate TEXT UNIQUE NOT NULL,
        brand TEXT,
        model TEXT,
        parking_spot TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (owner_id) REFERENCES owners(id)
      )
    `, (err) => {
      if (err) console.error('Error creating vehicles table:', err);
    });

    // Tabla de Mascotas
    db.run(`
      CREATE TABLE IF NOT EXISTS pets (
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
      )
    `, (err) => {
      if (err) console.error('Error creating pets table:', err);
    });

    // Tabla de Métodos de Pago
    db.run(`
      CREATE TABLE IF NOT EXISTS payment_methods (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) console.error('Error creating payment_methods table:', err);
    });

    // Tabla de Pagos
    db.run(`
      CREATE TABLE IF NOT EXISTS payments (
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
      )
    `, (err) => {
      if (err) console.error('Error creating payments table:', err);
    });

    // Tabla de Categorías de Gastos
    db.run(`
      CREATE TABLE IF NOT EXISTS expense_categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) console.error('Error creating expense_categories table:', err);
    });

    // Tabla de Gastos
    db.run(`
      CREATE TABLE IF NOT EXISTS expenses (
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
      )
    `, (err) => {
      if (err) console.error('Error creating expenses table:', err);
    });

    // Tabla de Estados de Cuenta
    db.run(`
      CREATE TABLE IF NOT EXISTS account_statements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        apartment_id INTEGER NOT NULL,
        balance_current DECIMAL(12,2),
        balance_overdue DECIMAL(12,2),
        interest DECIMAL(12,2),
        statement_date DATE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (apartment_id) REFERENCES apartments(id)
      )
    `, (err) => {
      if (err) console.error('Error creating account_statements table:', err);
    });

    // Tabla de Presupuesto
    db.run(`
      CREATE TABLE IF NOT EXISTS budget_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category_id INTEGER NOT NULL,
        budgeted_amount DECIMAL(12,2),
        year INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES expense_categories(id)
      )
    `, (err) => {
      if (err) console.error('Error creating budget_items table:', err);
    });

    // Tabla de Conciliaciones Bancarias
    db.run(`
      CREATE TABLE IF NOT EXISTS bank_reconciliations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        reconciliation_date DATE,
        bank_balance DECIMAL(12,2),
        system_balance DECIMAL(12,2),
        difference DECIMAL(12,2),
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) console.error('Error creating bank_reconciliations table:', err);
    });

    // Tabla de Bitácora de Auditoría
    db.run(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        action TEXT NOT NULL,
        model TEXT,
        old_values TEXT,
        new_values TEXT,
        ip_address TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `, (err) => {
      if (err) console.error('Error creating audit_logs table:', err);
      else {
        console.log('✅ Database tables created successfully');
        resolve();
      }
    });
  });
};

module.exports = { initializeDatabase };