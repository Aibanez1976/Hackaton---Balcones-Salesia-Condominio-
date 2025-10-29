// Global variables
let token = null;
let currentUser = null;
let portfolioChart = null;
let expensesChart = null;

const API_BASE = '/api';

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
        token = savedToken;
        currentUser = JSON.parse(localStorage.getItem('user'));
        showMainApp();
        loadDashboard();
    }

    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', handlePaymentSubmit);
    }
    
    const expenseForm = document.getElementById('expenseForm');
    if (expenseForm) {
        expenseForm.addEventListener('submit', handleExpenseSubmit);
    }
});

// Login handler
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const loginBtn = e.target.querySelector('button[type="submit"]');
    
    // Show loading state
    loginBtn.disabled = true;
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verificando...';

    console.log('Sending login request for:', email);

    fetch(API_BASE + '/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password })
    })
    .then(function(response) {
        console.log('Response status:', response.status);
        if (!response.ok) {
            return response.json().then(function(errorData) {
                throw new Error(errorData.error || 'Credenciales inválidas');
            });
        }
        return response.json();
    })
    .then(function(data) {
        console.log('Login successful:', data);
        
        token = data.token;
        currentUser = data.user;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(currentUser));

        showMainApp();
        loadDashboard();
    })
    .catch(function(error) {
        console.error('Login error:', error);
        alert('Error: ' + error.message);
        loginBtn.disabled = false;
        loginBtn.innerHTML = 'Ingresar';
    });
}

// Logout
function logout() {
    token = null;
    currentUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    document.getElementById('loginScreen').style.display = 'block';
    document.getElementById('mainApp').style.display = 'none';
    document.getElementById('loginForm').reset();
}

// Show main app
function showMainApp() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('mainApp').style.display = 'block';
}

// Navigation
function showDashboard() {
    hideAllViews();
    document.getElementById('dashboardView').style.display = 'block';
    loadDashboard();
}

function showApartments() {
    hideAllViews();
    document.getElementById('apartmentsView').style.display = 'block';
    loadApartments();
}

function showPortfolio() {
    hideAllViews();
    document.getElementById('portfolioView').style.display = 'block';
    loadPortfolio();
}

function showPayments() {
    hideAllViews();
    document.getElementById('paymentsView').style.display = 'block';
    loadPayments();
}

function showExpenses() {
    hideAllViews();
    document.getElementById('expensesView').style.display = 'block';
    loadExpenses();
}

function showReports() {
    hideAllViews();
    document.getElementById('reportsView').style.display = 'block';

function showReconciliation() {
    hideAllViews();
    document.getElementById('reconciliationView').style.display = 'block';
    loadReconciliations();
}

function showAudit() {
    hideAllViews();
    document.getElementById('auditView').style.display = 'block';
    loadAuditLogs();
}

}

function hideAllViews() {
    var views = document.querySelectorAll('.view-section');
    for (var i = 0; i < views.length; i++) {
        views[i].style.display = 'none';
    }
}

// API calls
function apiCall(endpoint, method, body, callback) {
    method = method || 'GET';
    
    var options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    fetch(API_BASE + endpoint, options)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('API Error');
            }
            return response.json();
        })
        .then(function(data) {
            callback(null, data);
        })
        .catch(function(error) {
            console.error('API Error:', error);
            callback(error, null);
        });
}

// Dashboard
function loadDashboard() {
    apiCall('/reports/dashboard', 'GET', null, function(err, data) {
        if (err) {
            console.error('Error loading dashboard:', err);
            return;
        }

        var summary = data.summary[0];

        document.getElementById('totalApartments').textContent = summary.total_apartments;
        document.getElementById('totalPortfolio').textContent = 
            '$' + (summary.total_monthly_fee * 6).toLocaleString('es-CO');
        document.getElementById('totalPayments').textContent = 
            '$' + summary.total_paid_6months.toLocaleString('es-CO');
        document.getElementById('totalExpenses').textContent = 
            '$' + summary.total_expenses_6months.toLocaleString('es-CO');

        // Portfolio chart
        var portfolioData = data.portfolio;
        var portfolioCtx = document.getElementById('portfolioChart');
        if (portfolioCtx) {
            portfolioCtx = portfolioCtx.getContext('2d');
            
            if (portfolioChart) portfolioChart.destroy();
            portfolioChart = new Chart(portfolioCtx, {
                type: 'doughnut',
                data: {
                    labels: portfolioData.map(function(p) { return p.age_category + ' días'; }),
                    datasets: [{
                        data: portfolioData.map(function(p) { return p.amount || 0; }),
                        backgroundColor: ['#198754', '#ffc107', '#fd7e14', '#dc3545']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: { position: 'bottom' }
                    }
                }
            });
        }

        // Expenses chart
        apiCall('/expenses/by-category/summary', 'GET', null, function(err2, expensesData) {
            if (err2) {
                console.error('Error loading expenses:', err2);
                return;
            }

            var expensesCtx = document.getElementById('expensesChart');
            if (expensesCtx) {
                expensesCtx = expensesCtx.getContext('2d');
                
                if (expensesChart) expensesChart.destroy();
                expensesChart = new Chart(expensesCtx, {
                    type: 'pie',
                    data: {
                        labels: expensesData.map(function(e) { return e.category; }),
                        datasets: [{
                            data: expensesData.map(function(e) { return e.total_amount; }),
                            backgroundColor: [
                                '#0d6efd', '#6c757d', '#198754', '#ffc107', '#fd7e14', '#dc3545'
                            ]
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        plugins: {
                            legend: { position: 'bottom' }
                        }
                    }
                });
            }
        });
    });
}

// Apartments
function loadApartments() {
    apiCall('/apartments', 'GET', null, function(err, apartments) {
        if (err) {
            console.error('Error loading apartments:', err);
            return;
        }

        var tbody = document.getElementById('apartmentsTableBody');
        tbody.innerHTML = '';

        apartments.forEach(function(apt) {
            tbody.innerHTML += '<tr>' +
                '<td><strong>' + apt.number + '</strong></td>' +
                '<td>' + (apt.tower || '-') + '</td>' +
                '<td>' + (apt.area || '-') + ' m²</td>' +
                '<td>$' + apt.monthly_fee.toLocaleString('es-CO') + '</td>' +
                '<td><span class="badge badge-info">' + apt.owners_count + '</span></td>' +
                '<td><span class="badge badge-success">' + apt.residents_count + '</span></td>' +
                '<td><span class="badge badge-warning">' + apt.pets_count + '</span></td>' +
                '<td>' +
                    '<button class="btn btn-sm btn-primary" onclick="viewApartmentDetails(' + apt.id + ')">' +
                        '<i class="fas fa-eye"></i>' +
                    '</button>' +
                '</td>' +
            '</tr>';
        });
    });
}

// Portfolio
function loadPortfolio() {
    apiCall('/portfolio/summary', 'GET', null, function(err, data) {
        if (err) {
            console.error('Error loading portfolio:', err);
            return;
        }

        var tbody = document.getElementById('portfolioTableBody');
        tbody.innerHTML = '';

        data.portfolio.forEach(function(apt) {
            var percentage = ((apt.total_paid / (apt.monthly_fee * 6)) * 100).toFixed(1);
            tbody.innerHTML += '<tr>' +
                '<td><strong>' + apt.number + '</strong></td>' +
                '<td>$' + apt.monthly_fee.toLocaleString('es-CO') + '</td>' +
                '<td>$' + apt.total_paid.toLocaleString('es-CO') + '</td>' +
                '<td>$' + apt.balance_owed.toLocaleString('es-CO') + '</td>' +
                '<td>' +
                    '<div class="progress" style="height: 20px;">' +
                        '<div class="progress-bar" style="width: ' + percentage + '%">' + percentage + '%</div>' +
                    '</div>' +
                '</td>' +
                '<td>' + (apt.last_payment_date || 'N/A') + '</td>' +
                '<td>' +
                    '<button class="btn btn-sm btn-primary" onclick="viewApartmentPortfolio(' + apt.id + ')">' +
                        '<i class="fas fa-eye"></i>' +
                    '</button>' +
                '</td>' +
            '</tr>';
        });
    });
}

// Payments
function loadPayments() {
    apiCall('/payments', 'GET', null, function(err, payments) {
        if (err) {
            console.error('Error loading payments:', err);
            return;
        }

        var tbody = document.getElementById('paymentsTableBody');
        tbody.innerHTML = '';

        payments.forEach(function(payment) {
            tbody.innerHTML += '<tr>' +
                '<td><strong>' + payment.apartment_number + '</strong></td>' +
                '<td>$' + payment.amount.toLocaleString('es-CO') + '</td>' +
                '<td>' + payment.payment_date + '</td>' +
                '<td>' + (payment.concept || '-') + '</td>' +
                '<td>' + (payment.payment_method || '-') + '</td>' +
                '<td>' + (payment.reference || '-') + '</td>' +
            '</tr>';
        });

        // Load apartments for dropdown
        apiCall('/apartments', 'GET', null, function(err2, apartments) {
            if (err2) return;
            
            var select = document.getElementById('paymentApartment');
            select.innerHTML = '<option value="">Seleccionar apartamento</option>';
            apartments.forEach(function(apt) {
                select.innerHTML += '<option value="' + apt.id + '">' + apt.number + '</option>';
            });
        });
    });
}

// Expenses
function loadExpenses() {
    apiCall('/expenses', 'GET', null, function(err, expenses) {
        if (err) {
            console.error('Error loading expenses:', err);
            return;
        }

        var tbody = document.getElementById('expensesTableBody');
        tbody.innerHTML = '';

        expenses.forEach(function(expense) {
            tbody.innerHTML += '<tr>' +
                '<td><strong>' + expense.category_name + '</strong></td>' +
                '<td>$' + expense.amount.toLocaleString('es-CO') + '</td>' +
                '<td>' + expense.expense_date + '</td>' +
                '<td>' + (expense.description || '-') + '</td>' +
                '<td>' + (expense.provider || '-') + '</td>' +
            '</tr>';
        });

        // Load categories for dropdown
        apiCall('/expenses/categories/list', 'GET', null, function(err2, categories) {
            if (err2) return;
            
            var select = document.getElementById('expenseCategory');
            select.innerHTML = '<option value="">Seleccionar categoría</option>';
            categories.forEach(function(cat) {
                select.innerHTML += '<option value="' + cat.id + '">' + cat.name + '</option>';
            });
        });
    });
}

// Form handlers
function handlePaymentSubmit(e) {
    e.preventDefault();
    
    var payment = {
        apartment_id: parseInt(document.getElementById('paymentApartment').value),
        amount: parseFloat(document.getElementById('paymentAmount').value),
        payment_date: document.getElementById('paymentDate').value,
        payment_method_id: parseInt(document.getElementById('paymentMethod').value)
    };

    apiCall('/payments', 'POST', payment, function(err, result) {
        if (err) {
            alert('Error: ' + err.message);
            return;
        }
        
        alert('Pago registrado exitosamente');
        document.getElementById('paymentForm').reset();
        var modal = bootstrap.Modal.getInstance(document.getElementById('paymentModal'));
        if (modal) modal.hide();
        loadPayments();
        loadPortfolio();
    });
}

function handleExpenseSubmit(e) {
    e.preventDefault();
    
    var expense = {
        category_id: parseInt(document.getElementById('expenseCategory').value),
        amount: parseFloat(document.getElementById('expenseAmount').value),
        expense_date: document.getElementById('expenseDate').value,
        description: document.getElementById('expenseDescription').value,
        provider: document.getElementById('expenseProvider').value
    };

    apiCall('/expenses', 'POST', expense, function(err, result) {
        if (err) {
            alert('Error: ' + err.message);
            return;
        }
        
        alert('Gasto registrado exitosamente');
        document.getElementById('expenseForm').reset();
        var modal = bootstrap.Modal.getInstance(document.getElementById('expenseModal'));
        if (modal) modal.hide();
        loadExpenses();
        loadDashboard();
    });
}

// Detail views
function viewApartmentDetails(id) {
    apiCall('/apartments/' + id, 'GET', null, function(err, apartment) {
        if (err) {
            alert('Error: ' + err.message);
            return;
        }
        
        alert('Apartamento: ' + apartment.number + '\nPropietarios: ' + apartment.owners.length + 
              '\nResidentes: ' + apartment.residents.length + '\nMascotas: ' + apartment.pets.length);
    });
}

function viewApartmentPortfolio(id) {
    apiCall('/portfolio/apartment/' + id, 'GET', null, function(err, data) {
        if (err) {
            alert('Error: ' + err.message);
            return;
        }
        
        var summary = data.summary;
        alert('Apartamento: ' + data.apartment.number + '\nPagado: $' +
              summary.total_paid.toLocaleString('es-CO') + '\nSaldo: $' +
              (summary.expected_payment - summary.total_paid).toLocaleString('es-CO') +
              '\nPorcentaje: ' + summary.payment_percentage + '%');
    });
}

// Export functions
function exportDashboardPDF() {
    console.log('Exporting dashboard to PDF...');
    window.location.href = '/api/reports/dashboard/pdf';
}

function exportDashboardCSV() {
    console.log('Exporting dashboard to CSV...');
    window.location.href = '/api/reports/dashboard/csv';
}

function exportPortfolioCSV() {
    console.log('Exporting portfolio to CSV...');
    window.location.href = '/api/reports/portfolio/csv';
}

function exportPaymentsCSV() {
    console.log('Exporting payments to CSV...');
    window.location.href = '/api/reports/payments/csv';
}


// Top Delinquents
function loadTopDelinquents() {
    apiCall('/reports/top-delinquents', 'GET', null, function(err, data) {
        if (err) {
            console.error('Error loading top delinquents:', err);
            alert('Error al cargar morosos');
            return;
        }

        var tbody = document.getElementById('topDelinquentsBody');
        tbody.innerHTML = '';

        data.delinquents.forEach(function(delinquent) {
            tbody.innerHTML += '<tr>' +
                '<td><strong>' + delinquent.number + '</strong></td>' +
                '<td>' + (delinquent.owner_name || 'N/A') + '</td>' +
                '<td>' + (delinquent.phone || '-') + '</td>' +
                '<td>$' + delinquent.balance.toLocaleString('es-CO') + '</td>' +
                '<td><span class="badge bg-danger">' + delinquent.age_category + ' días</span></td>' +
            '</tr>';
        });

        document.getElementById('topDelinquentsContainer').style.display = 'block';
    });
}

// Reconciliation
function loadReconciliations() {
    apiCall('/reconciliation/list', 'GET', null, function(err, data) {
        if (err) {
            console.error('Error loading reconciliations:', err);
            return;
        }

        var tbody = document.getElementById('reconciliationTableBody');
        tbody.innerHTML = '';

        data.reconciliations.forEach(function(recon) {
            var statusBadge = recon.status === 'reconciled' ? 'bg-success' : 
                            recon.status === 'pending' ? 'bg-warning' : 'bg-danger';
            
            tbody.innerHTML += '<tr>' +
                '<td>' + recon.reconciliation_date + '</td>' +
                '<td>$' + recon.bank_balance.toLocaleString('es-CO') + '</td>' +
                '<td>$' + recon.system_balance.toLocaleString('es-CO') + '</td>' +
                '<td>$' + recon.difference.toLocaleString('es-CO') + '</td>' +
                '<td><span class="badge ' + statusBadge + '">' + recon.status + '</span></td>' +
            '</tr>';
        });
    });
}

// Handle reconciliation form
document.addEventListener('DOMContentLoaded', function() {
    const reconciliationForm = document.getElementById('reconciliationForm');
    if (reconciliationForm) {
        reconciliationForm.addEventListener('submit', handleReconciliationSubmit);
    }
});

function handleReconciliationSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('reconciliationDate', document.getElementById('reconciliationDate').value);
    formData.append('bankBalance', document.getElementById('bankBalance').value);
    formData.append('file', document.getElementById('bankFile').files[0]);

    fetch(API_BASE + '/reconciliation/upload', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        body: formData
    })
    .then(function(response) {
        if (!response.ok) {
            throw new Error('Error en conciliación');
        }
        return response.json();
    })
    .then(function(data) {
        alert(data.message);
        document.getElementById('reconciliationForm').reset();
        loadReconciliations();
    })
    .catch(function(error) {
        console.error('Error:', error);
        alert('Error: ' + error.message);
    });
}

// Audit Logs
function loadAuditLogs() {
    apiCall('/audit/logs', 'GET', null, function(err, data) {
        if (err) {
            console.error('Error loading audit logs:', err);
            return;
        }

        var tbody = document.getElementById('auditTableBody');
        tbody.innerHTML = '';

        data.logs.forEach(function(log) {
            tbody.innerHTML += '<tr>' +
                '<td>' + log.created_at + '</td>' +
                '<td>' + (log.user_name || 'Sistema') + '</td>' +
                '<td><span class="badge bg-info">' + log.action + '</span></td>' +
                '<td>' + log.model + '</td>' +
                '<td><small>' + log.ip_address + '</small></td>' +
            '</tr>';
        });
    });
}

// Backups
function performBackup() {
    if (!confirm('¿Realizar backup ahora?')) return;
    
    apiCall('/audit/backup/perform', 'POST', {}, function(err, data) {
        if (err) {
            alert('Error: ' + err.message);
            return;
        }
        
        alert('Backup realizado: ' + data.backup.fileName);
        loadBackupsList();
    });
}

function loadBackupsList() {
    apiCall('/audit/backup/list', 'GET', null, function(err, data) {
        if (err) {
            console.error('Error loading backups:', err);
            alert('Error al cargar backups');
            return;
        }

        var backupsList = '<div class="alert alert-info"><strong>Backups Disponibles:</strong><br>';
        data.backups.forEach(function(backup) {
            backupsList += backup.fileName + ' (' + backup.sizeKB + ' KB) - ' + 
                          new Date(backup.modified).toLocaleString('es-CO') + '<br>';
        });
        backupsList += '</div>';
        
        alert(backupsList);
    });
}

function exportExpensesCSV() {
    console.log('Exporting expenses to CSV...');
    window.location.href = '/api/reports/expenses/csv';
}
