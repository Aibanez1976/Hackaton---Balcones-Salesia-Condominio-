// SalesiaAdmin Pro - Frontend Application
// GitHub Pages compatible version with localStorage

// Global variables
let currentUser = null;
let apartments = [];
let payments = [];
let expenses = [];
let expenseCategories = [];

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    loadData();
    setupEventListeners();
    showSection('dashboard');
    updateDashboard();
}

// Setup event listeners
function setupEventListeners() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);

    // Modal forms
    document.getElementById('apartmentForm').addEventListener('submit', (e) => e.preventDefault());
    document.getElementById('paymentForm').addEventListener('submit', (e) => e.preventDefault());
    document.getElementById('expenseForm').addEventListener('submit', (e) => e.preventDefault());
}

// Authentication
function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const users = [
        { email: 'admin@salesia.com', password: 'Admin123!', name: 'Administrador', role: 'admin' },
        { email: 'contador@salesia.com', password: 'Contador123!', name: 'Contador', role: 'contador' },
        { email: 'consulta@salesia.com', password: 'Consulta123!', name: 'Consulta', role: 'consulta' }
    ];

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = user;
        document.getElementById('loginModal').classList.add('d-none');
        document.getElementById('app').classList.remove('d-none');
        document.getElementById('userName').textContent = user.name;
        updateUIForRole(user.role);
        loadAllData();
    } else {
        document.getElementById('loginError').classList.remove('d-none');
        document.getElementById('loginError').textContent = 'Credenciales incorrectas';
    }
}

function logout() {
    currentUser = null;
    document.getElementById('app').classList.add('d-none');
    document.getElementById('loginModal').classList.remove('d-none');
    document.getElementById('loginForm').reset();
    document.getElementById('loginError').classList.add('d-none');
}

function updateUIForRole(role) {
    // Hide/show elements based on role
    const adminElements = document.querySelectorAll('.admin-only');
    const contadorElements = document.querySelectorAll('.contador-only');

    if (role === 'consulta') {
        adminElements.forEach(el => el.style.display = 'none');
        contadorElements.forEach(el => el.style.display = 'none');
    } else if (role === 'contador') {
        adminElements.forEach(el => el.style.display = 'none');
    }

    // Update navigation visibility
    const settingsNav = document.querySelector('[onclick="showSection(\'settings\')"]');
    const historyNav = document.querySelector('[onclick="showSection(\'history\')"]');

    if (settingsNav) {
        settingsNav.style.display = (role === 'admin') ? '' : 'none';
    }
    if (historyNav) {
        historyNav.style.display = (role === 'admin' || role === 'contador') ? '' : 'none';
    }
}

// Data management
function loadData() {
    // Load sample data if not exists
    if (!localStorage.getItem('apartments')) {
        initializeSampleData();
    }

    apartments = JSON.parse(localStorage.getItem('apartments')) || [];
    payments = JSON.parse(localStorage.getItem('payments')) || [];
    expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenseCategories = JSON.parse(localStorage.getItem('expenseCategories')) || [
        'Servicios', 'Seguridad', 'Limpieza', 'Reparaciones', 'Administración', 'Seguros'
    ];
}

function saveData() {
    localStorage.setItem('apartments', JSON.stringify(apartments));
    localStorage.setItem('payments', JSON.stringify(payments));
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('expenseCategories', JSON.stringify(expenseCategories));
}

function initializeSampleData() {
    // Sample apartments
    apartments = [
        { id: 1, number: 'APT-001', tower: 'Torre A', area: 85.5, monthlyFee: 1400000, owner: { name: 'Juan García López', email: 'juan.garcia@email.com', phone: '3001234567' }, resident: { name: 'Juan García López', vehicles: 'Toyota Corolla (ABC-123)', pets: 'Perro Labrador' } },
        { id: 2, number: 'APT-002', tower: 'Torre A', area: 85.5, monthlyFee: 1400000, owner: { name: 'María Rodríguez Pérez', email: 'maria.rodriguez@email.com', phone: '3007654321' }, resident: { name: 'María Rodríguez Pérez', vehicles: 'Mazda 3 (XYZ-456)', pets: 'Gato Siamés' } },
        { id: 3, number: 'APT-003', tower: 'Torre A', area: 85.5, monthlyFee: 1400000, owner: { name: 'Carlos Martínez Silva', email: 'carlos.martinez@email.com', phone: '3009876543' }, resident: { name: 'Ana Silva Martínez', vehicles: 'Chevrolet Spark (DEF-789)', pets: 'Ninguna' } },
        { id: 4, number: 'APT-004', tower: 'Torre A', area: 85.5, monthlyFee: 1400000, owner: { name: 'Ana López Gómez', email: 'ana.lopez@email.com', phone: '3005555555' }, resident: { name: 'Ana López Gómez', vehicles: 'Renault Logan (GHI-012)', pets: 'Pájaro Canario' } },
        { id: 5, number: 'APT-005', tower: 'Torre A', area: 85.5, monthlyFee: 1400000, owner: { name: 'Pedro Sánchez Ruiz', email: 'pedro.sanchez@email.com', phone: '3004444444' }, resident: { name: 'Pedro Sánchez Ruiz', vehicles: 'Nissan Versa (JKL-345)', pets: 'Perro Beagle' } },
        { id: 6, number: 'APT-006', tower: 'Torre A', area: 85.5, monthlyFee: 1400000, owner: { name: 'Laura Fernández Díaz', email: 'laura.fernandez@email.com', phone: '3003333333' }, resident: { name: 'Laura Fernández Díaz', vehicles: 'Hyundai i10 (MNO-678)', pets: 'Gato Persa' } },
        { id: 7, number: 'APT-007', tower: 'Torre B', area: 85.5, monthlyFee: 1400000, owner: { name: 'Roberto Díaz Moreno', email: 'roberto.diaz@email.com', phone: '3002222222' }, resident: { name: 'Roberto Díaz Moreno', vehicles: 'Kia Rio (PQR-901)', pets: 'Ninguna' } },
        { id: 8, number: 'APT-008', tower: 'Torre B', area: 85.5, monthlyFee: 1400000, owner: { name: 'Sofía Moreno Castro', email: 'sofia.moreno@email.com', phone: '3001111111' }, resident: { name: 'Sofía Moreno Castro', vehicles: 'Ford Fiesta (STU-234)', pets: 'Conejo Holandés' } },
        { id: 9, number: 'APT-009', tower: 'Torre B', area: 85.5, monthlyFee: 1400000, owner: { name: 'Miguel Castro Ruiz', email: 'miguel.castro@email.com', phone: '3008888888' }, resident: { name: 'Miguel Castro Ruiz', vehicles: 'Chevrolet Aveo (VWX-567)', pets: 'Perro Pastor Alemán' } },
        { id: 10, number: 'APT-010', tower: 'Torre B', area: 85.5, monthlyFee: 1400000, owner: { name: 'Elena Ruiz Gómez', email: 'elena.ruiz@email.com', phone: '3007777777' }, resident: { name: 'Elena Ruiz Gómez', vehicles: 'Toyota Yaris (YZA-890)', pets: 'Gato Maine Coon' } },
        { id: 11, number: 'APT-011', tower: 'Torre B', area: 85.5, monthlyFee: 1400000, owner: { name: 'Francisco Gómez López', email: 'francisco.gomez@email.com', phone: '3006666666' }, resident: { name: 'Francisco Gómez López', vehicles: 'Honda Fit (BCD-123)', pets: 'Ninguna' } },
        { id: 12, number: 'APT-012', tower: 'Torre B', area: 85.5, monthlyFee: 1400000, owner: { name: 'Gabriela López Martínez', email: 'gabriela.lopez@email.com', phone: '3009999999' }, resident: { name: 'Gabriela López Martínez', vehicles: 'Nissan March (EFG-456)', pets: 'Pez Betta' } },
        { id: 13, number: 'APT-013', tower: 'Torre B', area: 85.5, monthlyFee: 1400000, owner: { name: 'David Martínez Fernández', email: 'david.martinez@email.com', phone: '3005432109' }, resident: { name: 'David Martínez Fernández', vehicles: 'Mazda 2 (HIJ-789)', pets: 'Perro Chihuahua' } }
    ];

    // Sample payments (6 months of realistic data)
    payments = [];
    const paymentMethods = ['Efectivo', 'Transferencia', 'Cheque', 'Tarjeta'];
    const today = new Date();

    apartments.forEach(apt => {
        for (let month = 0; month < 6; month++) {
            const paymentDate = new Date(today.getFullYear(), today.getMonth() - month, 15);
            let shouldPay = false;

            // Realistic payment patterns
            if (apt.id <= 9) {
                // Apartments 1-9: Always pay (100%)
                shouldPay = true;
            } else if (apt.id <= 11) {
                // Apartments 10-11: Pay 70% of the time
                shouldPay = Math.random() > 0.3;
            } else {
                // Apartments 12-13: Pay 40% of the time
                shouldPay = Math.random() > 0.6;
            }

            if (shouldPay) {
                payments.push({
                    id: payments.length + 1,
                    apartmentId: apt.id,
                    amount: apt.monthlyFee,
                    date: paymentDate.toISOString().split('T')[0],
                    concept: 'Cuota ordinaria',
                    method: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
                    reference: `REF-${apt.id}-${month}-${Math.floor(Math.random() * 10000)}`
                });
            }
        }
    });

    // Sample expenses
    expenses = [
        { id: 1, category: 'Servicios', amount: 2500000, date: '2025-10-01', description: 'Pago servicios públicos octubre', provider: 'Empresa de Servicios' },
        { id: 2, category: 'Seguridad', amount: 1500000, date: '2025-10-01', description: 'Servicios de seguridad octubre', provider: 'Empresa de Seguridad' },
        { id: 3, category: 'Limpieza', amount: 800000, date: '2025-10-01', description: 'Limpieza áreas comunes octubre', provider: 'Servicio de Limpieza' },
        { id: 4, category: 'Reparaciones', amount: 500000, date: '2025-10-05', description: 'Reparación ascensor', provider: 'Técnicos Especializados' },
        { id: 5, category: 'Administración', amount: 300000, date: '2025-10-01', description: 'Suministros administrativos', provider: 'Proveedor General' },
        { id: 6, category: 'Seguros', amount: 5000000, date: '2025-10-01', description: 'Póliza de seguros anual', provider: 'Compañía de Seguros' },
        { id: 7, category: 'Servicios', amount: 2500000, date: '2025-09-01', description: 'Pago servicios públicos septiembre', provider: 'Empresa de Servicios' },
        { id: 8, category: 'Seguridad', amount: 1500000, date: '2025-09-01', description: 'Servicios de seguridad septiembre', provider: 'Empresa de Seguridad' },
        { id: 9, category: 'Limpieza', amount: 800000, date: '2025-09-01', description: 'Limpieza áreas comunes septiembre', provider: 'Servicio de Limpieza' },
        { id: 10, category: 'Reparaciones', amount: 300000, date: '2025-09-10', description: 'Mantenimiento general', provider: 'Técnicos Especializados' }
    ];

    saveData();
}

function loadAllData() {
    loadApartments();
    loadPayments();
    loadExpenses();
    loadPortfolio();
    updateDashboard();
    updateExpenseCategorySelect();
    loadHistoryApartments();
    initializeSettings();
}

// Navigation
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('d-none');
    });

    // Show selected section
    document.getElementById(sectionName + '-section').classList.remove('d-none');

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[onclick="showSection('${sectionName}')"]`).classList.add('active');
}

// Dashboard functions
function updateDashboard() {
    // Update KPIs
    document.getElementById('totalApartments').textContent = apartments.length;

    const totalPayments = payments.reduce((sum, p) => sum + p.amount, 0);
    document.getElementById('totalPayments').textContent = '$' + totalPayments.toLocaleString();

    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    document.getElementById('totalExpenses').textContent = '$' + totalExpenses.toLocaleString();

    const totalPortfolio = apartments.length * 1400000 * 6; // 6 months
    document.getElementById('totalPortfolio').textContent = '$' + totalPortfolio.toLocaleString();

    // Update settings counters
    document.getElementById('totalApartmentsCount').textContent = apartments.length;
    document.getElementById('totalPaymentsCount').textContent = payments.length;
    document.getElementById('totalExpensesCount').textContent = expenses.length;

    // Update charts
    updatePortfolioChart();
    updateExpensesChart();
}

function updatePortfolioChart() {
    const ctx = document.getElementById('portfolioChart');

    // Destroy existing chart if it exists
    if (window.portfolioChartInstance) {
        window.portfolioChartInstance.destroy();
    }

    // Calculate portfolio by age
    const currentDate = new Date();
    const portfolioByAge = {
        'Al día': 0,
        '1-30 días': 0,
        '31-60 días': 0,
        '61-90 días': 0,
        '90+ días': 0
    };

    apartments.forEach(apt => {
        const aptPayments = payments.filter(p => p.apartmentId === apt.id);
        const lastPayment = aptPayments.sort((a, b) => new Date(b.date) - new Date(a.date))[0];

        if (lastPayment) {
            const daysSincePayment = Math.floor((currentDate - new Date(lastPayment.date)) / (1000 * 60 * 60 * 24));
            if (daysSincePayment <= 30) portfolioByAge['Al día']++;
            else if (daysSincePayment <= 60) portfolioByAge['1-30 días']++;
            else if (daysSincePayment <= 90) portfolioByAge['31-60 días']++;
            else if (daysSincePayment <= 120) portfolioByAge['61-90 días']++;
            else portfolioByAge['90+ días']++;
        } else {
            portfolioByAge['90+ días']++;
        }
    });

    window.portfolioChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(portfolioByAge),
            datasets: [{
                data: Object.values(portfolioByAge),
                backgroundColor: ['#28a745', '#ffc107', '#fd7e14', '#dc3545', '#6c757d']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function updateExpensesChart() {
    const ctx = document.getElementById('expensesChart');

    // Destroy existing chart if it exists
    if (window.expensesChartInstance) {
        window.expensesChartInstance.destroy();
    }

    const expensesByCategory = {};
    expenses.forEach(exp => {
        expensesByCategory[exp.category] = (expensesByCategory[exp.category] || 0) + exp.amount;
    });

    window.expensesChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(expensesByCategory),
            datasets: [{
                data: Object.values(expensesByCategory),
                backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545', '#6c757d', '#17a2b8']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Apartments functions
function loadApartments() {
    const tbody = document.getElementById('apartmentsTableBody');
    tbody.innerHTML = '';

    apartments.forEach(apt => {
        const residentName = apt.resident?.name || 'No especificado';
        const vehicles = apt.resident?.vehicles || 'Ninguno';
        const pets = apt.resident?.pets || 'Ninguna';

        const row = `
            <tr>
                <td>${apt.number}</td>
                <td>${apt.tower}</td>
                <td>${apt.area} m²</td>
                <td>$${apt.monthlyFee.toLocaleString()}</td>
                <td>${apt.owner.name}</td>
                <td>${residentName}</td>
                <td>${vehicles}</td>
                <td>${pets}</td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="viewApartment(${apt.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    ${currentUser?.role === 'admin' ? `
                    <button class="btn btn-sm btn-warning" onclick="editApartment(${apt.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteApartment(${apt.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                    ` : ''}
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function showApartmentModal(apartment = null) {
    const modal = new bootstrap.Modal(document.getElementById('apartmentModal'));
    const form = document.getElementById('apartmentForm');

    if (apartment) {
        document.getElementById('apartmentModalTitle').textContent = 'Editar Censo del Apartamento';
        document.getElementById('apartmentNumber').value = apartment.number;
        document.getElementById('apartmentTower').value = apartment.tower;
        document.getElementById('apartmentArea').value = apartment.area;
        document.getElementById('apartmentFee').value = apartment.monthlyFee;
        document.getElementById('ownerName').value = apartment.owner.name;
        document.getElementById('residentName').value = apartment.resident?.name || '';
        document.getElementById('ownerEmail').value = apartment.owner.email;
        document.getElementById('ownerPhone').value = apartment.owner.phone;
        document.getElementById('vehicles').value = apartment.resident?.vehicles || '';
        document.getElementById('pets').value = apartment.resident?.pets || '';
    } else {
        document.getElementById('apartmentModalTitle').textContent = 'Nuevo Apartamento';
        form.reset();
    }

    modal.show();
}

function saveApartment() {
    const formData = {
        number: document.getElementById('apartmentNumber').value,
        tower: document.getElementById('apartmentTower').value,
        area: parseFloat(document.getElementById('apartmentArea').value),
        monthlyFee: parseInt(document.getElementById('apartmentFee').value),
        owner: {
            name: document.getElementById('ownerName').value,
            email: document.getElementById('ownerEmail').value,
            phone: document.getElementById('ownerPhone').value
        },
        resident: {
            name: document.getElementById('residentName').value,
            vehicles: document.getElementById('vehicles').value,
            pets: document.getElementById('pets').value
        }
    };

    // Check if apartment already exists
    const existingIndex = apartments.findIndex(a => a.number === formData.number);
    if (existingIndex >= 0) {
        apartments[existingIndex] = { ...apartments[existingIndex], ...formData };
    } else {
        formData.id = apartments.length + 1;
        apartments.push(formData);
    }

    saveData();
    loadApartments();
    loadHistoryApartments(); // Update history dropdown
    bootstrap.Modal.getInstance(document.getElementById('apartmentModal')).hide();

    alert('Censo del apartamento guardado exitosamente');
}

// Payments functions
function loadPayments() {
    const tbody = document.getElementById('paymentsTableBody');
    tbody.innerHTML = '';

    payments.slice(-20).reverse().forEach(payment => { // Show last 20 payments
        const apartment = apartments.find(a => a.id === payment.apartmentId);
        const row = `
            <tr>
                <td>${apartment ? apartment.number : 'N/A'}</td>
                <td>$${payment.amount.toLocaleString()}</td>
                <td>${new Date(payment.date).toLocaleDateString()}</td>
                <td>${payment.concept}</td>
                <td>${payment.method}</td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="viewPayment(${payment.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    ${currentUser?.role !== 'consulta' ? `
                    <button class="btn btn-sm btn-danger" onclick="deletePayment(${payment.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                    ` : ''}
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });

    // Update payment apartment options
    const select = document.getElementById('paymentApartment');
    select.innerHTML = '';
    apartments.forEach(apt => {
        select.innerHTML += `<option value="${apt.id}">${apt.number} - ${apt.owner.name}</option>`;
    });
}

function showPaymentModal() {
    const modal = new bootstrap.Modal(document.getElementById('paymentModal'));
    document.getElementById('paymentForm').reset();
    document.getElementById('paymentDate').value = new Date().toISOString().split('T')[0];
    modal.show();
}

function savePayment() {
    const apartmentId = parseInt(document.getElementById('paymentApartment').value);
    const payment = {
        id: payments.length + 1,
        apartmentId: apartmentId,
        amount: parseInt(document.getElementById('paymentAmount').value),
        date: document.getElementById('paymentDate').value,
        concept: document.getElementById('paymentConcept').value,
        method: document.getElementById('paymentMethod').value,
        reference: document.getElementById('paymentReference').value
    };

    payments.push(payment);
    saveData();
    loadPayments();
    updateDashboard();
    bootstrap.Modal.getInstance(document.getElementById('paymentModal')).hide();

    alert('Pago registrado exitosamente');
}

// Expenses functions
function loadExpenses() {
    const tbody = document.getElementById('expensesTableBody');
    tbody.innerHTML = '';

    expenses.slice(-20).reverse().forEach(expense => { // Show last 20 expenses
        const row = `
            <tr>
                <td>${expense.category}</td>
                <td>$${expense.amount.toLocaleString()}</td>
                <td>${new Date(expense.date).toLocaleDateString()}</td>
                <td>${expense.description}</td>
                <td>${expense.provider}</td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="viewExpense(${expense.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    ${currentUser?.role !== 'consulta' ? `
                    <button class="btn btn-sm btn-danger" onclick="deleteExpense(${expense.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                    ` : ''}
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function showExpenseModal() {
    const modal = new bootstrap.Modal(document.getElementById('expenseModal'));
    document.getElementById('expenseForm').reset();
    document.getElementById('expenseDate').value = new Date().toISOString().split('T')[0];
    updateExpenseCategorySelect();
    modal.show();
}

function saveExpense() {
    const expense = {
        id: expenses.length + 1,
        category: document.getElementById('expenseCategory').value,
        amount: parseInt(document.getElementById('expenseAmount').value),
        date: document.getElementById('expenseDate').value,
        description: document.getElementById('expenseDescription').value,
        provider: document.getElementById('expenseProvider').value
    };

    expenses.push(expense);
    saveData();
    loadExpenses();
    updateDashboard();
    bootstrap.Modal.getInstance(document.getElementById('expenseModal')).hide();

    alert('Gasto registrado exitosamente');
}

// Portfolio functions
function loadPortfolio() {
    const tbody = document.getElementById('portfolioTableBody');
    tbody.innerHTML = '';

    apartments.forEach(apt => {
        const aptPayments = payments.filter(p => p.apartmentId === apt.id);
        const totalPaid = aptPayments.reduce((sum, p) => sum + p.amount, 0);
        const expectedPayments = 6; // 6 months
        const expectedTotal = apt.monthlyFee * expectedPayments;
        const percentagePaid = ((totalPaid / expectedTotal) * 100).toFixed(1);

        const lastPayment = aptPayments.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
        const lastPaymentDate = lastPayment ? new Date(lastPayment.date).toLocaleDateString() : 'Nunca';

        const status = percentagePaid >= 80 ? 'Al día' : percentagePaid >= 50 ? 'Moroso' : 'Moroso Crítico';

        const row = `
            <tr>
                <td>${apt.number}</td>
                <td>${apt.owner.name}</td>
                <td>$${(expectedTotal - totalPaid).toLocaleString()}</td>
                <td>${lastPaymentDate}</td>
                <td>${percentagePaid}%</td>
                <td><span class="badge bg-${status === 'Al día' ? 'success' : status === 'Moroso' ? 'warning' : 'danger'}">${status}</span></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Report functions
function generatePortfolioReport() {
    alert('Generando reporte de cartera...\n\nEsta función simularía la generación de un PDF con el estado actual de la cartera.');
}

function generateCashFlowReport() {
    alert('Generando reporte de flujo de caja...\n\nEsta función simularía la generación de un PDF con el análisis de ingresos vs egresos.');
}

function generateTopDelinquentsReport() {
    alert('Generando reporte de top morosos...\n\nEsta función simularía la generación de un PDF con el ranking de propietarios morosos.');
}

// Utility functions
function viewApartment(id) {
    const apt = apartments.find(a => a.id === id);
    if (apt) {
        const residentInfo = apt.resident ? `
Residente: ${apt.resident.name}
Vehículos: ${apt.resident.vehicles || 'Ninguno'}
Mascotas: ${apt.resident.pets || 'Ninguna'}` : 'No hay información de residente';

        alert(`Censo del Apartamento ${apt.number}:\n\nPropietario: ${apt.owner.name}\nEmail: ${apt.owner.email}\nTeléfono: ${apt.owner.phone}\n\n${residentInfo}\n\nÁrea: ${apt.area} m²\nCuota Mensual: $${apt.monthlyFee.toLocaleString()}`);
    }
}

function viewPayment(id) {
    const payment = payments.find(p => p.id === id);
    if (payment) {
        const apt = apartments.find(a => a.id === payment.apartmentId);
        alert(`Detalles del Pago:\n\nApartamento: ${apt?.number}\nMonto: $${payment.amount.toLocaleString()}\nFecha: ${new Date(payment.date).toLocaleDateString()}\nConcepto: ${payment.concept}\nMétodo: ${payment.method}\nReferencia: ${payment.reference}`);
    }
}

function viewExpense(id) {
    const expense = expenses.find(e => e.id === id);
    if (expense) {
        alert(`Detalles del Gasto:\n\nCategoría: ${expense.category}\nMonto: $${expense.amount.toLocaleString()}\nFecha: ${new Date(expense.date).toLocaleDateString()}\nDescripción: ${expense.description}\nProveedor: ${expense.provider}`);
    }
}

function deleteApartment(id) {
    if (confirm('¿Está seguro de eliminar este apartamento?')) {
        apartments = apartments.filter(a => a.id !== id);
        saveData();
        loadApartments();
        alert('Apartamento eliminado');
    }
}

function deletePayment(id) {
    if (confirm('¿Está seguro de eliminar este pago?')) {
        payments = payments.filter(p => p.id !== id);
        saveData();
        loadPayments();
        updateDashboard();
        alert('Pago eliminado');
    }
}

function deleteExpense(id) {
    if (confirm('¿Está seguro de eliminar este gasto?')) {
        expenses = expenses.filter(e => e.id !== id);
        saveData();
        loadExpenses();
        updateDashboard();
        alert('Gasto eliminado');
    }
}

// Category management functions
function updateExpenseCategorySelect() {
    const select = document.getElementById('expenseCategory');
    select.innerHTML = '';
    expenseCategories.forEach(category => {
        select.innerHTML += `<option value="${category}">${category}</option>`;
    });
}

function showCategoryModal() {
    console.log('Opening category modal');
    const modalElement = document.getElementById('categoryModal');
    if (!modalElement) {
        console.error('Category modal element not found');
        return;
    }
    const modal = new bootstrap.Modal(modalElement);
    loadCategoriesList();
    modal.show();
}

function loadCategoriesList() {
    console.log('Loading categories list:', expenseCategories);
    const tbody = document.getElementById('categoriesTableBody');
    tbody.innerHTML = '';

    expenseCategories.forEach((category, index) => {
        const row = `
            <tr>
                <td>${category}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editCategory(${index})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteCategory(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function addNewCategory() {
    const categoryName = prompt('Ingrese el nombre de la nueva categoría:');
    if (categoryName && categoryName.trim()) {
        const trimmedName = categoryName.trim();
        if (expenseCategories.includes(trimmedName)) {
            alert('Esta categoría ya existe');
            return;
        }
        expenseCategories.push(trimmedName);
        saveData();
        updateExpenseCategorySelect();
        loadCategoriesList();
        alert('Categoría añadida exitosamente');
    }
}

function addNewCategoryFromExpense() {
    const categoryName = prompt('Ingrese el nombre de la nueva categoría:');
    if (categoryName && categoryName.trim()) {
        const trimmedName = categoryName.trim();
        if (expenseCategories.includes(trimmedName)) {
            alert('Esta categoría ya existe');
            return;
        }
        expenseCategories.push(trimmedName);
        saveData();
        updateExpenseCategorySelect();
        // Select the newly added category
        document.getElementById('expenseCategory').value = trimmedName;
        alert('Categoría añadida exitosamente');
    }
}

function editCategory(index) {
    const currentName = expenseCategories[index];
    const newName = prompt('Editar categoría:', currentName);
    if (newName && newName.trim() && newName.trim() !== currentName) {
        const trimmedName = newName.trim();
        if (expenseCategories.includes(trimmedName)) {
            alert('Esta categoría ya existe');
            return;
        }
        expenseCategories[index] = trimmedName;
        saveData();
        updateExpenseCategorySelect();
        loadCategoriesList();
        alert('Categoría actualizada exitosamente');
    }
}

function deleteCategory(index) {
    if (confirm(`¿Está seguro de eliminar la categoría "${expenseCategories[index]}"?`)) {
        expenseCategories.splice(index, 1);
        saveData();
        updateExpenseCategorySelect();
        loadCategoriesList();
        alert('Categoría eliminada exitosamente');
    }
}

// Initialize settings section
function initializeSettings() {
    console.log('Initializing settings section');
    updateSettingsCounters();
}

// Update settings counters
function updateSettingsCounters() {
    document.getElementById('totalApartmentsCount').textContent = apartments.length;
    document.getElementById('totalPaymentsCount').textContent = payments.length;
    document.getElementById('totalExpensesCount').textContent = expenses.length;
}

// Export/Import functions
function exportData() {
    const data = {
        apartments: apartments,
        payments: payments,
        expenses: expenses,
        expenseCategories: expenseCategories,
        exportDate: new Date().toISOString(),
        version: '1.0'
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});

    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `salesia-admin-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert('Datos exportados exitosamente');
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const importedData = JSON.parse(e.target.result);

                    // Validate data structure
                    if (importedData.apartments && importedData.payments && importedData.expenses) {
                        if (confirm('¿Está seguro de importar estos datos? Se reemplazarán los datos actuales.')) {
                            apartments = importedData.apartments || [];
                            payments = importedData.payments || [];
                            expenses = importedData.expenses || [];
                            expenseCategories = importedData.expenseCategories || ['Servicios', 'Seguridad', 'Limpieza', 'Reparaciones', 'Administración', 'Seguros'];

                            saveData();
                            loadAllData();
                            alert('Datos importados exitosamente');
                        }
                    } else {
                        alert('El archivo no tiene el formato correcto');
                    }
                } catch (error) {
                    alert('Error al leer el archivo: ' + error.message);
                }
            };
            reader.readAsText(file);
        }
    };

    input.click();
}

// History functions
function loadHistoryApartments() {
    const select = document.getElementById('historyApartmentSelect');
    select.innerHTML = '<option value="">Seleccione un apartamento...</option>';
    apartments.forEach(apt => {
        select.innerHTML += `<option value="${apt.id}">${apt.number} - ${apt.owner.name}</option>`;
    });
}

function loadApartmentHistory() {
    const apartmentId = document.getElementById('historyApartmentSelect').value;
    const historyType = document.getElementById('historyTypeSelect').value;
    const period = document.getElementById('historyPeriodSelect').value;

    console.log('Loading history for apartment:', apartmentId, 'Type:', historyType, 'Period:', period);

    if (!apartmentId) {
        document.getElementById('historyTableBody').innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-muted">
                    Seleccione un apartamento para ver su historial
                </td>
            </tr>
        `;
        document.getElementById('apartmentSummary').classList.add('d-none');
        return;
    }

    const apartment = apartments.find(a => a.id == apartmentId);
    const tbody = document.getElementById('historyTableBody');
    const summaryDiv = document.getElementById('apartmentSummary');

    // Calculate date filter
    let dateFilter = null;
    if (period !== 'all') {
        const now = new Date();
        if (period === '1month') dateFilter = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        else if (period === '3months') dateFilter = new Date(now.getFullYear(), now.getMonth() - 3, 1);
        else if (period === '6months') dateFilter = new Date(now.getFullYear(), now.getMonth() - 6, 1);
    }

    // Get all related transactions
    let transactions = [];

    // Add payments
    if (historyType === 'all' || historyType === 'payments') {
        const aptPayments = payments.filter(p => p.apartmentId == apartmentId);
        aptPayments.forEach(payment => {
            if (!dateFilter || new Date(payment.date) >= dateFilter) {
                transactions.push({
                    date: payment.date,
                    type: 'Pago',
                    concept: payment.concept,
                    amount: payment.amount,
                    status: 'Completado',
                    details: `Método: ${payment.method}${payment.reference ? ` | Ref: ${payment.reference}` : ''}`,
                    cssClass: 'table-success'
                });
            }
        });
    }

    // Add related expenses (if apartment has expenses or general expenses)
    if (historyType === 'all' || historyType === 'expenses') {
        // For now, show all expenses as they might be related to the apartment
        // In a real scenario, you might want to tag expenses by apartment
        expenses.forEach(expense => {
            if (!dateFilter || new Date(expense.date) >= dateFilter) {
                transactions.push({
                    date: expense.date,
                    type: 'Gasto',
                    concept: `${expense.category}: ${expense.description}`,
                    amount: -expense.amount, // Negative for expenses
                    status: 'Completado',
                    details: `Proveedor: ${expense.provider}`,
                    cssClass: 'table-danger'
                });
            }
        });
    }

    // Sort by date (most recent first)
    transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    console.log('Found', transactions.length, 'transactions');

    // Update summary
    const totalPayments = transactions.filter(t => t.type === 'Pago').reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = Math.abs(transactions.filter(t => t.type === 'Gasto').reduce((sum, t) => sum + t.amount, 0));
    const balance = totalPayments - totalExpenses;

    summaryDiv.innerHTML = `
        <h5><i class="fas fa-home"></i> ${apartment.number} - ${apartment.owner.name}</h5>
        <div class="row">
            <div class="col-md-3">
                <strong>Pagos Totales:</strong> $${totalPayments.toLocaleString()}
            </div>
            <div class="col-md-3">
                <strong>Gastos Relacionados:</strong> $${totalExpenses.toLocaleString()}
            </div>
            <div class="col-md-3">
                <strong>Saldo:</strong> $${balance.toLocaleString()}
            </div>
            <div class="col-md-3">
                <strong>Transacciones:</strong> ${transactions.length}
            </div>
        </div>
    `;
    summaryDiv.classList.remove('d-none');

    // Update table
    if (transactions.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-muted">
                    No hay transacciones para mostrar en el período seleccionado
                </td>
            </tr>
        `;
    } else {
        tbody.innerHTML = '';
        transactions.forEach(transaction => {
            const row = `
                <tr class="${transaction.cssClass}">
                    <td>${new Date(transaction.date).toLocaleDateString()}</td>
                    <td><span class="badge bg-${transaction.type === 'Pago' ? 'success' : 'danger'}">${transaction.type}</span></td>
                    <td>${transaction.concept}</td>
                    <td class="${transaction.amount >= 0 ? 'text-success' : 'text-danger'}">
                        ${transaction.amount >= 0 ? '+' : ''}$${Math.abs(transaction.amount).toLocaleString()}
                    </td>
                    <td>${transaction.status}</td>
                    <td>${transaction.details}</td>
                </tr>
            `;
            tbody.innerHTML += row;
        });
    }
}
