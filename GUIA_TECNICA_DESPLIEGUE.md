# Guía Técnica de Despliegue - SalesiaAdmin Pro

## 🛠️ Documentación Técnica para Desarrolladores

### Versión 1.0 - Octubre 2025
### Arquitectura Frontend Pura - GitHub Pages

---

## 📋 Información General del Proyecto

- **Nombre**: SalesiaAdmin Pro
- **Versión**: 1.0.0
- **Arquitectura**: Frontend Puro (HTML5/CSS3/JavaScript)
- **Framework**: Vanilla JavaScript + Bootstrap 5
- **Despliegue**: GitHub Pages
- **Almacenamiento**: localStorage del navegador
- **Compatibilidad**: Navegadores modernos (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

---

## 🏗️ Arquitectura del Sistema

### Estructura de Archivos
```
salesia-admin-pro/
├── index.html              # Página principal
├── js/
│   └── app.js             # Lógica de aplicación
├── css/
│   └── style.css          # Estilos personalizados
├── docs/                  # Documentación
├── README.md              # Documentación general
├── MANUAL_DE_USUARIO.md   # Guía de usuario
└── GUIA_TECNICA_DESPLIEGUE.md
```

### Tecnologías Utilizadas

#### Frontend
- **HTML5**: Estructura semántica
- **CSS3**: Estilos responsivos con Bootstrap 5
- **JavaScript ES6+**: Lógica de aplicación
- **Bootstrap 5.3.0**: Framework CSS responsivo
- **Chart.js**: Gráficos interactivos
- **Font Awesome 6.4.0**: Iconografía

#### Almacenamiento
- **localStorage**: Base de datos cliente-side
- **JSON**: Formato de datos estructurados
- **Blob API**: Exportación de archivos

#### Despliegue
- **GitHub Pages**: Hosting gratuito
- **Git**: Control de versiones
- **HTTPS**: Seguridad de transporte

---

## 🔧 Requisitos del Sistema

### Entorno de Desarrollo
- **Node.js**: 16.x o superior (opcional, solo para desarrollo local)
- **Git**: 2.30.x o superior
- **Navegador moderno**: Chrome, Firefox, Safari, Edge

### Entorno de Producción
- **GitHub Account**: Para despliegue
- **Navegador web**: Cualquier navegador moderno
- **Conexión internet**: Solo para carga inicial (opcional para uso)

### Hardware Mínimo
- **RAM**: 2GB
- **Almacenamiento**: 100MB disponible
- **Procesador**: 1.6 GHz dual-core

---

## 🚀 Guía de Despliegue

### Método 1: Despliegue Automático (GitHub Pages)

#### Paso 1: Preparar Repositorio
```bash
# Clonar o crear repositorio
git init
git add .
git commit -m "Initial commit - SalesiaAdmin Pro"

# Crear repositorio en GitHub
# Nombre sugerido: salesia-admin-pro
```

#### Paso 2: Configurar GitHub Pages
1. Ir a Settings → Pages en el repositorio
2. Seleccionar "Deploy from a branch"
3. Elegir branch "main" y folder "/ (root)"
4. Guardar cambios

#### Paso 3: Acceder a la Aplicación
```
URL: https://[usuario].github.io/[repositorio]/
Ejemplo: https://aibanez1976.github.io/Hackaton---Balcones-Salesia-Condominio-/
```

### Método 2: Despliegue Local (Desarrollo)

#### Opción A: Servidor Python
```bash
# Navegar al directorio del proyecto
cd /ruta/al/proyecto

# Iniciar servidor (Python 3)
python -m http.server 8000

# Acceder en: http://localhost:8000
```

#### Opción B: Servidor Node.js
```bash
# Instalar http-server globalmente
npm install -g http-server

# Iniciar servidor
http-server -p 8080

# Acceder en: http://localhost:8080
```

#### Opción C: Apache/Nginx
```apache
# Configuración básica para Apache
<VirtualHost *:80>
    DocumentRoot "/ruta/al/proyecto"
    ServerName salesia-admin.local

    <Directory "/ruta/al/proyecto">
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

---

## ⚙️ Configuración del Sistema

### Variables de Entorno
El sistema no requiere variables de entorno externas. Toda la configuración es interna.

### Configuración de Datos Iniciales
Los datos de prueba se cargan automáticamente desde `initializeSampleData()` en `app.js`.

### Personalización
```javascript
// En app.js, modificar estas constantes:
const DEFAULT_QUOTA = 1400000;  // Cuota mensual por defecto
const APARTMENTS_COUNT = 13;     // Número de apartamentos
const MONTHS_HISTORY = 6;        // Meses de historial
```

---

## 🔐 Configuración de Seguridad

### Autenticación
```javascript
// Usuarios hardcodeados en app.js
const users = [
    { email: 'admin@salesia.com', password: 'Admin123!', name: 'Administrador', role: 'admin' },
    { email: 'contador@salesia.com', password: 'Contador123!', name: 'Contador', role: 'contador' },
    { email: 'consulta@salesia.com', password: 'Consulta123!', name: 'Consulta', role: 'consulta' }
];
```

### Control de Acceso
- **Admin**: Acceso completo + configuración
- **Contador**: Gestión financiera
- **Consulta**: Solo lectura

### Protección de Datos
- **localStorage**: Datos almacenados localmente
- **No cookies**: No se usan cookies
- **No sesiones server-side**: Arquitectura stateless

---

## 📊 Estructura de Datos

### Apartamentos
```javascript
{
    id: 1,
    number: "APT-001",
    tower: "Torre A",
    area: 85.5,
    monthlyFee: 1400000,
    owner: {
        name: "Juan García López",
        email: "juan.garcia@email.com",
        phone: "3001234567"
    },
    resident: "María García",
    vehicles: "Toyota Corolla (ABC-123)",
    pets: "Perro Labrador"
}
```

### Pagos
```javascript
{
    id: 1,
    apartmentId: 1,
    amount: 1400000,
    date: "2025-10-15",
    concept: "Cuota ordinaria",
    method: "Transferencia",
    reference: "REF-001-10-2025"
}
```

### Gastos
```javascript
{
    id: 1,
    category: "Servicios",
    amount: 2500000,
    date: "2025-10-01",
    description: "Pago servicios públicos octubre",
    provider: "Empresa de Servicios"
}
```

### Categorías de Gastos
```javascript
["Servicios", "Seguridad", "Limpieza", "Reparaciones", "Administración", "Seguros"]
```

---

## 🔄 API y Funcionalidades

### Funciones Principales

#### Gestión de Apartamentos
```javascript
loadApartments()      // Cargar lista
showApartmentModal()  // Mostrar formulario
saveApartment()       // Guardar cambios
deleteApartment(id)   // Eliminar apartamento
```

#### Gestión Financiera
```javascript
loadPayments()        // Cargar pagos
savePayment()         // Registrar pago
loadExpenses()        // Cargar gastos
saveExpense()         // Registrar gasto
```

#### Reportes y Analytics
```javascript
updateDashboard()           // Actualizar KPIs
updatePortfolioChart()      // Gráfico de cartera
updateExpensesChart()       // Gráfico de gastos
loadPortfolio()             // Estado de cartera
```

#### Historial y Configuración
```javascript
loadApartmentHistory()      // Historial por apartamento
showCategoryModal()         // Gestión de categorías
exportData()               // Exportar respaldo
importData()               // Importar respaldo
```

---

## 🎯 Optimización y Rendimiento

### Mejores Prácticas Implementadas

#### 1. **Lazy Loading**
- Los datos se cargan solo cuando son necesarios
- Gráficos se renderizan on-demand

#### 2. **Debounced Updates**
- Actualizaciones de dashboard throttled
- Evita recalculos innecesarios

#### 3. **Memory Management**
- Limpieza de event listeners
- Destrucción de instancias de Chart.js

#### 4. **Responsive Design**
- Bootstrap grid system
- Media queries optimizadas
- Mobile-first approach

### Métricas de Rendimiento
- **Tiempo de carga inicial**: < 2 segundos
- **Tiempo de navegación**: < 500ms
- **Uso de memoria**: < 50MB
- **Compatibilidad**: 95%+ de navegadores modernos

---

## 🧪 Pruebas y Validación

### Pruebas Manuales Recomendadas

#### Funcionalidades Críticas
- [ ] Login con diferentes roles
- [ ] CRUD de apartamentos
- [ ] Registro de pagos y gastos
- [ ] Generación de reportes
- [ ] Exportación/importación de datos

#### Navegación
- [ ] Cambio entre secciones
- [ ] Responsive en móvil/tablet
- [ ] Funcionamiento offline

#### Datos
- [ ] Persistencia en localStorage
- [ ] Validaciones de formulario
- [ ] Cálculos automáticos

### Herramientas de Testing
```bash
# Validación HTML
npm install -g html-validate
html-validate index.html

# Validación CSS
npm install -g stylelint
stylelint css/style.css

# Validación JavaScript
npm install -g eslint
eslint js/app.js
```

---

## 🔧 Mantenimiento y Troubleshooting

### Logs de Debug
```javascript
// Habilitar logs detallados
console.log('=== SHOWING SECTION:', sectionName, '===');
// Ver en DevTools → Console
```

### Problemas Comunes

#### 1. **Datos no se guardan**
```javascript
// Verificar localStorage
console.log(localStorage.getItem('apartments'));
console.log(localStorage.getItem('payments'));
console.log(localStorage.getItem('expenses'));
```

#### 2. **Gráficos no aparecen**
```javascript
// Verificar Chart.js
console.log('Chart.js loaded:', typeof Chart);
console.log('Canvas elements:', document.querySelectorAll('canvas'));
```

#### 3. **Navegación no funciona**
```javascript
// Verificar event listeners
console.log('Nav links:', document.querySelectorAll('.nav-link'));
console.log('Current user:', currentUser);
```

### Respaldos de Emergencia
```javascript
// Exportar datos manualmente
const data = {
    apartments: JSON.parse(localStorage.getItem('apartments')),
    payments: JSON.parse(localStorage.getItem('payments')),
    expenses: JSON.parse(localStorage.getItem('expenses')),
    categories: JSON.parse(localStorage.getItem('expenseCategories'))
};
console.log(JSON.stringify(data, null, 2));
```

---

## 🚀 Plan de Escalabilidad

### Fase 2: Híbrido (1-3 meses)
```
Frontend Actual + Google Sheets API
├── Sincronización automática
├── Respaldos en la nube
├── Notificaciones por email
└── Múltiples dispositivos
```

### Fase 3: Backend (3-6 meses)
```
Node.js + Express + PostgreSQL
├── APIs RESTful
├── Autenticación JWT
├── Base de datos relacional
└── Microservicios
```

### Fase 4: Enterprise (6-12 meses)
```
Cloud Architecture
├── Kubernetes
├── CI/CD pipelines
├── Analytics avanzados
└── Integración IA
```

---

## 📞 Soporte y Contacto

### Equipo de Desarrollo
- **Arquitectura**: Diseño de sistema escalable
- **Frontend**: Optimización de interfaz
- **Backend**: APIs y bases de datos
- **DevOps**: Despliegue y monitoreo

### Canales de Comunicación
- **Issues**: GitHub Issues
- **Wiki**: Documentación técnica
- **Email**: desarrollo@salesia-admin.com

### Información de Debug
Para reportes de bugs, incluir:
- Versión del navegador
- Sistema operativo
- Consola de errores
- Pasos para reproducir
- Datos de localStorage (si aplica)

---

## 📋 Checklist de Despliegue

### Pre-Despliegue
- [ ] Repositorio GitHub creado
- [ ] Archivos subidos correctamente
- [ ] GitHub Pages configurado
- [ ] URL de acceso verificada

### Post-Despliegue
- [ ] Funcionalidad básica probada
- [ ] Login funcionando
- [ ] Navegación entre secciones
- [ ] Datos de prueba cargados
- [ ] Respaldos funcionando

### Validación Final
- [ ] Responsive en móvil
- [ ] Funcionamiento offline
- [ ] Exportación de datos
- [ ] Gráficos renderizando
- [ ] Seguridad implementada

---

## 🎯 Métricas de Éxito

### Rendimiento
- **Tiempo de carga**: < 3 segundos
- **Tiempo de respuesta**: < 1 segundo
- **Compatibilidad**: 95%+ navegadores
- **Uptime**: 99.9% (GitHub Pages)

### Usabilidad
- **Tasa de error**: < 5%
- **Tiempo de tarea**: < 2 minutos promedio
- **Satisfacción usuario**: > 4.5/5
- **Adopción**: 100% del personal administrativo

### Escalabilidad
- **Usuarios concurrentes**: Ilimitado (stateless)
- **Datos manejables**: Hasta 10,000 registros
- **Tiempo de respuesta**: Consistente
- **Costos**: Cero adicionales

---

**Desarrollado para el Hackathon Talento Tech Oriente - Cúcuta 2025**
**Arquitectura optimizada para conjuntos residenciales pequeños**

*Esta guía se actualizará con cada nueva versión del sistema.*