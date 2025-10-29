const db = require('./database');
const bcrypt = require('bcryptjs');

const seedDatabase = () => {
  return new Promise((resolve, reject) => {
    // Insertar Roles
    db.run(`INSERT OR IGNORE INTO roles (id, name, description) VALUES 
      (1, 'Administrador', 'Acceso total al sistema'),
      (2, 'Contador', 'Gestión de pagos y gastos'),
      (3, 'Consulta', 'Solo lectura de reportes')
    `, (err) => {
      if (err) console.error('Error inserting roles:', err);
    });

    // Insertar Usuarios
    const adminPassword = bcrypt.hashSync('admin123', 10);
    const contadorPassword = bcrypt.hashSync('contador123', 10);
    const consultaPassword = bcrypt.hashSync('consulta123', 10);
    
    db.run(`INSERT OR IGNORE INTO users (id, name, email, password, role_id) VALUES 
      (1, 'Administrador', 'admin@salesia.com', ?, 1),
      (2, 'Contador', 'contador@salesia.com', ?, 2),
      (3, 'Consulta', 'consulta@salesia.com', ?, 3)
    `, [adminPassword, contadorPassword, consultaPassword], (err) => {
      if (err) console.error('Error inserting users:', err);
    });

    // Insertar Métodos de Pago
    db.run(`INSERT OR IGNORE INTO payment_methods (id, name, description) VALUES 
      (1, 'Efectivo', 'Pago en efectivo'),
      (2, 'Transferencia', 'Transferencia bancaria'),
      (3, 'Cheque', 'Pago con cheque'),
      (4, 'Tarjeta', 'Pago con tarjeta de crédito')
    `, (err) => {
      if (err) console.error('Error inserting payment methods:', err);
    });

    // Insertar Categorías de Gastos
    db.run(`INSERT OR IGNORE INTO expense_categories (id, name, description) VALUES 
      (1, 'Servicios', 'Servicios públicos y mantenimiento'),
      (2, 'Seguridad', 'Gastos de seguridad'),
      (3, 'Limpieza', 'Servicios de limpieza'),
      (4, 'Reparaciones', 'Reparaciones y mantenimiento'),
      (5, 'Administración', 'Gastos administrativos'),
      (6, 'Seguros', 'Pólizas de seguros')
    `, (err) => {
      if (err) console.error('Error inserting expense categories:', err);
    });

    // Insertar 13 Apartamentos
    const apartments = [
      ['APT-001', 'Torre A', 85.5, 0.0769, 1400000],
      ['APT-002', 'Torre A', 85.5, 0.0769, 1400000],
      ['APT-003', 'Torre A', 85.5, 0.0769, 1400000],
      ['APT-004', 'Torre A', 85.5, 0.0769, 1400000],
      ['APT-005', 'Torre A', 85.5, 0.0769, 1400000],
      ['APT-006', 'Torre A', 85.5, 0.0769, 1400000],
      ['APT-007', 'Torre B', 85.5, 0.0769, 1400000],
      ['APT-008', 'Torre B', 85.5, 0.0769, 1400000],
      ['APT-009', 'Torre B', 85.5, 0.0769, 1400000],
      ['APT-010', 'Torre B', 85.5, 0.0769, 1400000],
      ['APT-011', 'Torre B', 85.5, 0.0769, 1400000],
      ['APT-012', 'Torre B', 85.5, 0.0769, 1400000],
      ['APT-013', 'Torre B', 85.5, 0.0769, 1400000]
    ];

    apartments.forEach((apt, idx) => {
      db.run(`
        INSERT OR IGNORE INTO apartments (number, tower, area, coefficient, monthly_fee) 
        VALUES (?, ?, ?, ?, ?)
      `, apt, (err) => {
        if (err) console.error(`Error inserting apartment ${idx + 1}:`, err);
      });
    });

    // Insertar Propietarios
    const owners = [
      [1, 'Juan García López', 'juan.garcia@email.com', '3001234567', '1234567890'],
      [2, 'María Rodríguez Pérez', 'maria.rodriguez@email.com', '3007654321', '1234567891'],
      [3, 'Carlos Martínez Silva', 'carlos.martinez@email.com', '3009876543', '1234567892'],
      [4, 'Ana López Gómez', 'ana.lopez@email.com', '3005555555', '1234567893'],
      [5, 'Pedro Sánchez Ruiz', 'pedro.sanchez@email.com', '3004444444', '1234567894'],
      [6, 'Laura Fernández Díaz', 'laura.fernandez@email.com', '3003333333', '1234567895'],
      [7, 'Roberto Díaz Moreno', 'roberto.diaz@email.com', '3002222222', '1234567896'],
      [8, 'Sofía Moreno Castro', 'sofia.moreno@email.com', '3001111111', '1234567897'],
      [9, 'Miguel Castro Ruiz', 'miguel.castro@email.com', '3008888888', '1234567898'],
      [10, 'Elena Ruiz Gómez', 'elena.ruiz@email.com', '3007777777', '1234567899'],
      [11, 'Francisco Gómez López', 'francisco.gomez@email.com', '3006666666', '1234567800'],
      [12, 'Gabriela López Martínez', 'gabriela.lopez@email.com', '3009999999', '1234567801'],
      [13, 'David Martínez Fernández', 'david.martinez@email.com', '3005432109', '1234567802']
    ];

    owners.forEach((owner) => {
      db.run(`
        INSERT OR IGNORE INTO owners (apartment_id, name, email, phone, document, is_primary) 
        VALUES (?, ?, ?, ?, ?, 1)
      `, owner, (err) => {
        if (err) console.error('Error inserting owner:', err);
      });
    });

    // Insertar Residentes
    const residents = [
      [1, 'Juan García López', '3001234567', 'Propietario'],
      [1, 'María García López', '3001234568', 'Esposa'],
      [2, 'María Rodríguez Pérez', '3007654321', 'Propietaria'],
      [2, 'Jorge Rodríguez', '3007654322', 'Hijo'],
      [3, 'Carlos Martínez Silva', '3009876543', 'Propietario'],
      [3, 'Lucía Martínez Silva', '3009876544', 'Hija'],
      [4, 'Ana López Gómez', '3005555555', 'Propietaria'],
      [4, 'Tomás López', '3005555556', 'Hijo'],
      [5, 'Pedro Sánchez Ruiz', '3004444444', 'Propietario'],
      [6, 'Laura Fernández Díaz', '3003333333', 'Propietaria'],
      [6, 'Martina Fernández', '3003333334', 'Hija'],
      [7, 'Roberto Díaz Moreno', '3002222222', 'Propietario'],
      [8, 'Sofía Moreno Castro', '3001111111', 'Propietaria'],
      [9, 'Miguel Castro Ruiz', '3008888888', 'Propietario'],
      [10, 'Elena Ruiz Gómez', '3007777777', 'Propietaria'],
      [11, 'Francisco Gómez López', '3006666666', 'Propietario'],
      [12, 'Gabriela López Martínez', '3009999999', 'Propietaria'],
      [13, 'David Martínez Fernández', '3005432109', 'Propietario']
    ];

    residents.forEach((resident) => {
      db.run(`
        INSERT OR IGNORE INTO residents (apartment_id, name, phone, relationship) 
        VALUES (?, ?, ?, ?)
      `, resident, (err) => {
        if (err) console.error('Error inserting resident:', err);
      });
    });

    // Insertar Vehículos con placas realistas
    const vehicles = [
      [1, 'ABC-1234', 'Toyota', 'Corolla', 'P-001'],
      [1, 'XYZ-9876', 'Honda', 'Civic', 'P-002'],
      [2, 'DEF-4567', 'Mazda', '3', 'P-003'],
      [3, 'GHI-7890', 'Nissan', 'Sentra', 'P-004'],
      [4, 'JKL-0123', 'Hyundai', 'Elantra', 'P-005'],
      [5, 'MNO-3456', 'Kia', 'Forte', 'P-006'],
      [6, 'PQR-6789', 'Chevrolet', 'Cruze', 'P-007'],
      [6, 'STU-9012', 'Ford', 'Focus', 'P-008'],
      [7, 'VWX-2345', 'Volkswagen', 'Jetta', 'P-009'],
      [8, 'YZA-5678', 'Renault', 'Logan', 'P-010'],
      [9, 'BCD-8901', 'Peugeot', '308', 'P-011'],
      [10, 'EFG-1234', 'Citroën', 'C3', 'P-012'],
      [11, 'HIJ-4567', 'Fiat', 'Uno', 'P-013'],
      [12, 'KLM-7890', 'Chevrolet', 'Spark', 'P-014'],
      [13, 'NOP-0123', 'Toyota', 'Yaris', 'P-015']
    ];

    vehicles.forEach((vehicle) => {
      db.run(`
        INSERT OR IGNORE INTO vehicles (owner_id, plate, brand, model, parking_spot) 
        VALUES (?, ?, ?, ?, ?)
      `, vehicle, (err) => {
        if (err) console.error('Error inserting vehicle:', err);
      });
    });

    // Insertar Mascotas (variedad de perros y gatos)
    const pets = [
      [1, 'Max', 'Perro', 'Labrador', 32.5, '2021-03-15', null, 'Vacunado', 1],
      [1, 'Misi', 'Gato', 'Persa', 4.2, '2020-06-20', null, 'Vacunado', 1],
      [2, 'Rocky', 'Perro', 'Pastor Alemán', 35.0, '2019-11-10', null, 'Vacunado', 1],
      [3, 'Luna', 'Gato', 'Siamés', 3.8, '2022-01-05', null, 'Pendiente', 0],
      [4, 'Buddy', 'Perro', 'Golden Retriever', 30.0, '2021-07-22', null, 'Vacunado', 1],
      [5, 'Whiskers', 'Gato', 'Bengalí', 5.5, '2020-09-14', null, 'Vacunado', 1],
      [6, 'Rex', 'Perro', 'Bulldog', 28.0, '2021-02-28', null, 'Vacunado', 1],
      [6, 'Bella', 'Gato', 'Ragdoll', 4.5, '2022-04-10', null, 'Pendiente', 0],
      [7, 'Charlie', 'Perro', 'Beagle', 15.0, '2021-05-18', null, 'Vacunado', 1],
      [8, 'Nala', 'Gato', 'Maine Coon', 6.0, '2020-08-25', null, 'Vacunado', 1],
      [9, 'Duke', 'Perro', 'Rottweiler', 45.0, '2019-12-03', null, 'Vacunado', 1],
      [10, 'Mittens', 'Gato', 'Tabby', 4.0, '2021-10-12', null, 'Vacunado', 1],
      [11, 'Daisy', 'Perro', 'Poodle', 8.0, '2022-02-20', null, 'Pendiente', 0],
      [12, 'Simba', 'Gato', 'Atigrado', 3.5, '2021-08-30', null, 'Vacunado', 1],
      [13, 'Toby', 'Perro', 'Schnauzer', 12.0, '2020-11-15', null, 'Vacunado', 1]
    ];

    pets.forEach((pet) => {
      db.run(`
        INSERT OR IGNORE INTO pets (apartment_id, name, species, breed, weight, birth_date, photo, vaccination_record, is_registered) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, pet, (err) => {
        if (err) console.error('Error inserting pet:', err);
      });
    });

    // Insertar Pagos simulados con diferentes escenarios
    const today = new Date();
    const payments = [];
    
    // Escenarios de pago:
    // APT 1-9: Pagos al día (100%)
    // APT 10-11: Pagos atrasados 30-59 días (50% de pagos)
    // APT 12-13: Pagos atrasados 60-90+ días (20% de pagos)
    
    for (let apt = 1; apt <= 13; apt++) {
      for (let month = 0; month < 6; month++) {
        const paymentDate = new Date(today.getFullYear(), today.getMonth() - month, 15);
        let shouldPay = false;
        let actualPaymentDate = paymentDate;
        
        if (apt <= 9) {
          // Apartamentos 1-9: Pagan siempre (100%)
          shouldPay = true;
          actualPaymentDate = new Date(paymentDate.getTime() + Math.random() * 5 * 24 * 60 * 60 * 1000);
        } else if (apt <= 11) {
          // Apartamentos 10-11: Pagan 70% de las veces, con retraso de 30-59 días
          shouldPay = Math.random() > 0.3;
          if (shouldPay) {
            actualPaymentDate = new Date(paymentDate.getTime() + (30 + Math.random() * 30) * 24 * 60 * 60 * 1000);
          }
        } else {
          // Apartamentos 12-13: Pagan 40% de las veces, con retraso de 60-90+ días
          shouldPay = Math.random() > 0.6;
          if (shouldPay) {
            actualPaymentDate = new Date(paymentDate.getTime() + (60 + Math.random() * 60) * 24 * 60 * 60 * 1000);
          }
        }
        
        if (shouldPay) {
          payments.push([
            apt,
            1400000,
            actualPaymentDate.toISOString().split('T')[0],
            'Cuota ordinaria',
            `REF-${apt}-${month}-${Math.floor(Math.random() * 10000)}`,
            Math.floor(Math.random() * 4) + 1
          ]);
        }
      }
    }

    payments.forEach((payment) => {
      db.run(`
        INSERT OR IGNORE INTO payments (apartment_id, amount, payment_date, concept, reference, payment_method_id) 
        VALUES (?, ?, ?, ?, ?, ?)
      `, payment, (err) => {
        if (err) console.error('Error inserting payment:', err);
      });
    });

    // Insertar Gastos simulados (6 meses)
    const expenses = [];
    const expenseCategories = [
      { category: 1, amount: 2500000, description: 'Pago servicios públicos' },
      { category: 2, amount: 1500000, description: 'Servicios de seguridad' },
      { category: 3, amount: 800000, description: 'Limpieza áreas comunes' },
      { category: 4, amount: 500000, description: 'Reparación y mantenimiento' },
      { category: 5, amount: 300000, description: 'Suministros administrativos' },
      { category: 6, amount: 5000000, description: 'Póliza de seguros' }
    ];

    const months = [
      { month: 10, year: 2025, label: 'octubre' },
      { month: 9, year: 2025, label: 'septiembre' },
      { month: 8, year: 2025, label: 'agosto' },
      { month: 7, year: 2025, label: 'julio' },
      { month: 6, year: 2025, label: 'junio' },
      { month: 5, year: 2025, label: 'mayo' }
    ];

    months.forEach((m) => {
      expenseCategories.forEach((exp, idx) => {
        const day = 1 + (idx * 5);
        expenses.push([
          exp.category,
          exp.amount,
          `${m.year}-${String(m.month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
          `${exp.description} ${m.label}`,
          'Proveedor general'
        ]);
      });
    });

    expenses.forEach((expense) => {
      db.run(`
        INSERT OR IGNORE INTO expenses (category_id, amount, expense_date, description, provider) 
        VALUES (?, ?, ?, ?, ?)
      `, expense, (err) => {
        if (err) console.error('Error inserting expense:', err);
      });
    });

    // Resolver después de insertar todos los gastos
    setTimeout(() => {
      console.log('✅ Database seeded successfully with realistic data');
      console.log('   - 13 Apartamentos');
      console.log('   - Escenarios de pago: Al día (APT 1-9), Atrasados 30-59 días (APT 10-11), Atrasados 60-90+ días (APT 12-13)');
      console.log('   - 15 Vehículos con placas realistas');
      console.log('   - 15 Mascotas (perros y gatos)');
      console.log('   - 6 meses de datos históricos de pagos y gastos');
      resolve();
    }, 1000);
  });
};

module.exports = { seedDatabase };