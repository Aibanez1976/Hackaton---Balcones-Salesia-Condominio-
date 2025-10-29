<<<<<<< HEAD
# 🏆 SalesiaAdmin Pro
## Sistema de Gestión de Propiedad Horizontal - Condominio Balcones de Salesia

### 📋 Descripción
SalesiaAdmin Pro es una plataforma web moderna para la gestión integral de condominios de propiedad horizontal. Diseñada específicamente para el Condominio Balcones de Salesia (13 apartamentos), permite centralizar y automatizar procesos administrativos y contables.

### ✨ Características Principales

#### 1. **Dashboard Ejecutivo**
- KPIs en tiempo real (cartera total, morosidad, pagos, gastos)
- Gráficos interactivos de cartera por antigüedad
- Análisis de gastos por categoría
- Visualización de flujo de caja

#### 2. **Gestión de Apartamentos**
- CRUD completo de unidades residenciales
- Registro de propietarios (múltiples por apartamento)
- Censo de residentes
- Registro de vehículos y parqueaderos
- **Censo de mascotas** (especie, raza, peso, vacunas)

#### 3. **Gestión de Cartera**
- Cálculo automático de saldos por apartamento
- Alertas de morosidad (30, 60, 90+ días)
- Estados de cuenta individuales
- Filtros avanzados por fecha y apartamento

#### 4. **Registro de Pagos**
- Formulario guiado de pagos
- Múltiples métodos de pago (efectivo, transferencia, cheque, tarjeta)
- Aplicación automática a saldos pendientes
- Generación de recibos

#### 5. **Gestión de Gastos**
- Registro de gastos con categorización
- Presupuesto vs Real
- Alertas de sobregiro presupuestal
- Seguimiento de proveedores

#### 6. **Reportería Profesional**
- Reporte de cartera por antigüedad (PDF)
- Flujo de caja mensual (PDF)
- Exportación de datos (CSV, Excel)
- Estados de cuenta personalizados

#### 7. **Seguridad**
- Autenticación con JWT
- Sistema de roles (Administrador, Contador, Consulta)
- Bitácora de auditoría
- Encriptación de contraseñas

### 🚀 Instalación y Uso

#### Requisitos
- Node.js v14+
- npm o yarn

#### Instalación
```bash
# Clonar repositorio
git clone <repo-url>
cd salesia-admin-pro

# Instalar dependencias
npm install

# Iniciar servidor
npm start
```

El servidor estará disponible en `http://localhost:3000`

#### Credenciales de Demo
```
Administrador:
Email: admin@salesia.com
Contraseña: admin123

Contador:
Email: contador@salesia.com
Contraseña: contador123
```

### 📊 Estructura del Proyecto

```
salesia-admin-pro/
├── src/
│   ├── config/
│   │   ├── database.js          # Configuración SQLite
│   │   ├── migrations.js        # Creación de tablas
│   │   └── seeders.js           # Datos de prueba
│   ├── middleware/
│   │   └── auth.js              # Autenticación y roles
│   └── routes/
│       ├── auth.js              # Login/Logout
│       ├── apartments.js        # Gestión de apartamentos
│       ├── portfolio.js         # Gestión de cartera
│       ├── payments.js          # Registro de pagos
│       ├── expenses.js          # Registro de gastos
│       └── reports.js           # Generación de reportes
├── public/
│   ├── index.html               # Interfaz principal
│   ├── css/
│   │   └── style.css            # Estilos
│   └── js/
│       └── app.js               # Lógica frontend
├── server.js                    # Servidor Express
├── package.json                 # Dependencias
├── .env                         # Variables de entorno
└── README.md                    # Este archivo
```

### 💾 Base de Datos

#### Tablas Principales (16 tablas)
1. **roles** - Roles de usuario
2. **users** - Usuarios del sistema
3. **apartments** - Unidades residenciales
4. **owners** - Propietarios
5. **residents** - Residentes
6. **vehicles** - Vehículos registrados
7. **pets** - Mascotas registradas
8. **payments** - Pagos recibidos
9. **expenses** - Gastos del condominio
10. **expense_categories** - Categorías de gastos
11. **payment_methods** - Métodos de pago
12. **account_statements** - Estados de cuenta
13. **budget_items** - Presupuesto anual
14. **bank_reconciliations** - Conciliaciones bancarias
15. **audit_logs** - Bitácora de auditoría
16. **permissions** - Permisos granulares

### 🔒 Seguridad

- **Autenticación**: JWT con expiración de 24 horas
- **Autorización**: Sistema de roles granular
- **Validación**: Validación de entrada en todos los formularios
- **Protección**: CSRF, XSS, SQL Injection
- **Auditoría**: Bitácora completa de operaciones

### 📈 Escalabilidad

El sistema está diseñado para escalar:
- **Base de datos normalizada** para múltiples condominios
- **API REST** preparada para integraciones
- **Arquitectura modular** para agregar funcionalidades
- **Preparado para**: Pagos en línea, notificaciones, IA, multi-tenancy

### 🎯 Roadmap Futuro

**Fase 2 (1-2 semanas)**: Optimización y testing
**Fase 3 (1-2 meses)**: Notificaciones, pasarela de pagos, PQRS
**Fase 4 (3-6 meses)**: IA para predicción de morosidad
**Fase 5 (6-12 meses)**: Multi-condominio, app móvil

### 📝 Datos de Prueba

El sistema viene precargado con:
- 13 apartamentos (Torres A y B)
- 13 propietarios
- 13 residentes
- 13 vehículos
- 13 mascotas
- 6 meses de pagos simulados
- 10 gastos simulados

### 🤝 Soporte

Para reportar problemas o sugerencias, contactar al equipo de desarrollo.

### 📄 Licencia

MIT License - Hackathon Cúcuta 2025

---

=======
# 🏆 SalesiaAdmin Pro
## Sistema de Gestión de Propiedad Horizontal - Condominio Balcones de Salesia

### 📋 Descripción
SalesiaAdmin Pro es una plataforma web moderna para la gestión integral de condominios de propiedad horizontal. Diseñada específicamente para el Condominio Balcones de Salesia (13 apartamentos), permite centralizar y automatizar procesos administrativos y contables.

### ✨ Características Principales

#### 1. **Dashboard Ejecutivo**
- KPIs en tiempo real (cartera total, morosidad, pagos, gastos)
- Gráficos interactivos de cartera por antigüedad
- Análisis de gastos por categoría
- Visualización de flujo de caja

#### 2. **Gestión de Apartamentos**
- CRUD completo de unidades residenciales
- Registro de propietarios (múltiples por apartamento)
- Censo de residentes
- Registro de vehículos y parqueaderos
- **Censo de mascotas** (especie, raza, peso, vacunas)

#### 3. **Gestión de Cartera**
- Cálculo automático de saldos por apartamento
- Alertas de morosidad (30, 60, 90+ días)
- Estados de cuenta individuales
- Filtros avanzados por fecha y apartamento

#### 4. **Registro de Pagos**
- Formulario guiado de pagos
- Múltiples métodos de pago (efectivo, transferencia, cheque, tarjeta)
- Aplicación automática a saldos pendientes
- Generación de recibos

#### 5. **Gestión de Gastos**
- Registro de gastos con categorización
- Presupuesto vs Real
- Alertas de sobregiro presupuestal
- Seguimiento de proveedores

#### 6. **Reportería Profesional**
- Reporte de cartera por antigüedad (PDF)
- Flujo de caja mensual (PDF)
- Exportación de datos (CSV, Excel)
- Estados de cuenta personalizados

#### 7. **Seguridad**
- Autenticación con JWT
- Sistema de roles (Administrador, Contador, Consulta)
- Bitácora de auditoría
- Encriptación de contraseñas

### 🚀 Instalación y Uso

#### Requisitos
- Node.js v14+
- npm o yarn

#### Instalación
```bash
# Clonar repositorio
git clone <repo-url>
cd salesia-admin-pro

# Instalar dependencias
npm install

# Iniciar servidor
npm start
```

El servidor estará disponible en `http://localhost:3000`

#### Credenciales de Demo
```
Administrador:
Email: admin@salesia.com
Contraseña: admin123

Contador:
Email: contador@salesia.com
Contraseña: contador123
```

### 📊 Estructura del Proyecto

```
salesia-admin-pro/
├── src/
│   ├── config/
│   │   ├── database.js          # Configuración SQLite
│   │   ├── migrations.js        # Creación de tablas
│   │   └── seeders.js           # Datos de prueba
│   ├── middleware/
│   │   └── auth.js              # Autenticación y roles
│   └── routes/
│       ├── auth.js              # Login/Logout
│       ├── apartments.js        # Gestión de apartamentos
│       ├── portfolio.js         # Gestión de cartera
│       ├── payments.js          # Registro de pagos
│       ├── expenses.js          # Registro de gastos
│       └── reports.js           # Generación de reportes
├── public/
│   ├── index.html               # Interfaz principal
│   ├── css/
│   │   └── style.css            # Estilos
│   └── js/
│       └── app.js               # Lógica frontend
├── server.js                    # Servidor Express
├── package.json                 # Dependencias
├── .env                         # Variables de entorno
└── README.md                    # Este archivo
```

### 💾 Base de Datos

#### Tablas Principales (16 tablas)
1. **roles** - Roles de usuario
2. **users** - Usuarios del sistema
3. **apartments** - Unidades residenciales
4. **owners** - Propietarios
5. **residents** - Residentes
6. **vehicles** - Vehículos registrados
7. **pets** - Mascotas registradas
8. **payments** - Pagos recibidos
9. **expenses** - Gastos del condominio
10. **expense_categories** - Categorías de gastos
11. **payment_methods** - Métodos de pago
12. **account_statements** - Estados de cuenta
13. **budget_items** - Presupuesto anual
14. **bank_reconciliations** - Conciliaciones bancarias
15. **audit_logs** - Bitácora de auditoría
16. **permissions** - Permisos granulares

### 🔒 Seguridad

- **Autenticación**: JWT con expiración de 24 horas
- **Autorización**: Sistema de roles granular
- **Validación**: Validación de entrada en todos los formularios
- **Protección**: CSRF, XSS, SQL Injection
- **Auditoría**: Bitácora completa de operaciones

### 📈 Escalabilidad

El sistema está diseñado para escalar:
- **Base de datos normalizada** para múltiples condominios
- **API REST** preparada para integraciones
- **Arquitectura modular** para agregar funcionalidades
- **Preparado para**: Pagos en línea, notificaciones, IA, multi-tenancy

### 🎯 Roadmap Futuro

**Fase 2 (1-2 semanas)**: Optimización y testing
**Fase 3 (1-2 meses)**: Notificaciones, pasarela de pagos, PQRS
**Fase 4 (3-6 meses)**: IA para predicción de morosidad
**Fase 5 (6-12 meses)**: Multi-condominio, app móvil

### 📝 Datos de Prueba

El sistema viene precargado con:
- 13 apartamentos (Torres A y B)
- 13 propietarios
- 13 residentes
- 13 vehículos
- 13 mascotas
- 6 meses de pagos simulados
- 10 gastos simulados

### 🤝 Soporte

Para reportar problemas o sugerencias, contactar al equipo de desarrollo.

### 📄 Licencia

MIT License - Hackathon Cúcuta 2025

---

>>>>>>> 1c44c1f2ef04d7587f963cce682ae1a54d28fd20
**Desarrollado con ❤️ para la transformación digital del Condominio Balcones de Salesia**