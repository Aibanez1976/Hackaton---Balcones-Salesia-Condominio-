# 🚀 GUÍA RÁPIDA - SalesiaAdmin Pro

## ¿Cómo Usar el Sistema?

### 1. **Iniciar el Servidor**

El servidor ya está corriendo en `http://localhost:3000`

Si necesitas reiniciarlo:
```bash
npm start
```

### 2. **Credenciales de Acceso**

**Administrador:**
- Email: `admin@salesia.com`
- Contraseña: `admin123`

**Contador:**
- Email: `contador@salesia.com`
- Contraseña: `contador123`

### 3. **Funcionalidades Principales**

#### Dashboard
- Visualiza KPIs en tiempo real
- Cartera total, morosidad, pagos y gastos
- Gráficos interactivos

#### Apartamentos
- Listado de 13 apartamentos
- Información de propietarios, residentes, vehículos
- Censo de mascotas

#### Cartera
- Estado de pagos por apartamento
- Porcentaje de pago
- Último pago registrado

#### Pagos
- Registra nuevos pagos
- Múltiples métodos de pago
- Historial de pagos

#### Gastos
- Registra gastos por categoría
- Seguimiento de proveedores
- Historial de gastos

#### Reportes
- Cartera por antigüedad (PDF)
- Flujo de caja (PDF)
- Exportación de datos

### 4. **Datos de Prueba Precargados**

- **13 Apartamentos** (Torres A y B)
- **13 Propietarios** con contacto
- **13 Residentes**
- **13 Vehículos** con parqueaderos
- **13 Mascotas** con vacunas
- **6 meses de pagos** simulados
- **10 gastos** simulados

### 5. **Estructura del Proyecto**

```
salesia-admin-pro/
├── server.js                 # Servidor principal
├── init-db.js               # Inicialización de BD
├── package.json             # Dependencias
├── .env                     # Variables de entorno
├── src/
│   ├── config/              # Configuración
│   ├── middleware/          # Autenticación
│   └── routes/              # APIs
├── public/
│   ├── index.html           # Interfaz
│   ├── css/style.css        # Estilos
│   └── js/app.js            # Lógica frontend
└── data/
    └── salesia.db           # Base de datos SQLite
```

### 6. **APIs Disponibles**

**Autenticación:**
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout

**Apartamentos:**
- `GET /api/apartments` - Listar
- `GET /api/apartments/:id` - Detalle
- `POST /api/apartments` - Crear
- `PUT /api/apartments/:id` - Actualizar

**Cartera:**
- `GET /api/portfolio/summary` - Resumen
- `GET /api/portfolio/by-age` - Por antigüedad
- `GET /api/portfolio/apartment/:id` - Por apartamento

**Pagos:**
- `GET /api/payments` - Listar
- `POST /api/payments` - Registrar
- `GET /api/payments/monthly/summary` - Resumen mensual

**Gastos:**
- `GET /api/expenses` - Listar
- `POST /api/expenses` - Registrar
- `GET /api/expenses/by-category/summary` - Por categoría
- `GET /api/expenses/monthly/summary` - Resumen mensual

**Reportes:**
- `GET /api/reports/dashboard` - Dashboard
- `GET /api/reports/portfolio-age/pdf` - Cartera PDF
- `GET /api/reports/cash-flow/pdf` - Flujo de caja PDF

### 7. **Seguridad**

- ✅ Autenticación JWT
- ✅ Roles y permisos
- ✅ Validación de entrada
- ✅ Protección CSRF/XSS
- ✅ Bitácora de auditoría

### 8. **Troubleshooting**

**Si el login no funciona:**
1. Ejecuta: `node init-db.js`
2. Reinicia el servidor: `npm start`
3. Intenta nuevamente

**Si hay errores de base de datos:**
1. Elimina `data/salesia.db`
2. Ejecuta: `node init-db.js`
3. Reinicia el servidor

### 9. **Próximos Pasos**

- Agregar notificaciones por email/WhatsApp
- Integrar pasarela de pagos
- Implementar IA para predicción de morosidad
- Crear app móvil
- Expandir a multi-condominio

---

**¡El sistema está listo para usar! 🎉**