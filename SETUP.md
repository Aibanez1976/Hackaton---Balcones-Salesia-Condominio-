# 🚀 SalesiaAdmin Pro - Guía de Instalación y Ejecución

## 📋 Requisitos Previos

- **Node.js** v18.0.0 o superior ([Descargar](https://nodejs.org/))
- **npm** v9.0.0 o superior (incluido con Node.js)
- **Git** ([Descargar](https://git-scm.com/))
- **Navegador moderno** (Chrome, Firefox, Edge, Safari)

## 🔧 Instalación Rápida

### Opción 1: Clonar desde GitHub

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/salesia-admin-pro.git

# Entrar al directorio
cd salesia-admin-pro

# Instalar dependencias
npm install

# Iniciar el servidor
npm start
```

### Opción 2: Instalación Local (Desarrollo)

```bash
# Si ya tienes el código descargado
cd "c:/Users/Aiban/OneDrive/Documentos/IA -Development/IA Course/Hackaton - Admin- PH"

# Instalar dependencias
npm install

# Iniciar el servidor
npm start
```

## 🌐 Acceso a la Aplicación

Una vez que el servidor esté ejecutándose, abre tu navegador y ve a:

```
http://localhost:3000
```

## 👤 Credenciales de Prueba

### Administrador
- **Usuario**: `admin@salesia.com`
- **Contraseña**: `Admin123!`
- **Rol**: Administrador (acceso completo)

### Contador
- **Usuario**: `contador@salesia.com`
- **Contraseña**: `Contador123!`
- **Rol**: Contador (reportes y conciliación)

### Consulta
- **Usuario**: `consulta@salesia.com`
- **Contraseña**: `Consulta123!`
- **Rol**: Consulta (solo lectura)

## 📊 Módulos Disponibles

### 1. **Dashboard**
- Resumen de ingresos y egresos
- Estado de pagos por apartamento
- Gráficos de tendencias
- Indicadores clave (KPIs)

### 2. **Gestión de Apartamentos**
- Registro de 13 apartamentos
- Información de propietarios
- Datos de contacto
- Estado de ocupación

### 3. **Gestión de Pagos**
- Registro de pagos mensuales
- Historial de transacciones
- Comprobantes de pago
- Cálculo automático de cuotas

### 4. **Gestión de Gastos**
- Registro de gastos comunes
- Categorización de gastos
- Presupuesto vs. Real
- Análisis de costos

### 5. **Cartera y Morosos**
- Seguimiento de deudas
- Reporte de morosos
- Antigüedad de cartera
- Proyección de cobro

### 6. **Conciliación Bancaria** ⭐ NUEVO
- Importar extractos CSV
- Procesar transacciones
- Detectar diferencias
- Generar reportes de conciliación

### 7. **Auditoría y Bitácora** ⭐ NUEVO
- Registro completo de cambios
- Quién, qué, cuándo, dónde
- Valores antiguos vs. nuevos
- Exportación de auditoría

### 8. **Reportería**
- Reportes PDF/CSV
- Top 10 morosos
- Estado financiero
- Análisis de flujo de caja

## 📁 Estructura del Proyecto

```
salesia-admin-pro/
├── public/                 # Frontend (HTML, CSS, JS)
│   ├── index.html         # Aplicación principal
│   ├── css/
│   │   └── style.css      # Estilos
│   └── js/
│       └── app.js         # Lógica frontend
├── src/                   # Backend (Node.js)
│   ├── config/
│   │   ├── database.js    # Conexión SQLite
│   │   ├── migrations.js  # Creación de tablas
│   │   └── seeders.js     # Datos de prueba
│   ├── middleware/
│   │   ├── auth.js        # Autenticación JWT
│   │   └── audit.js       # Auditoría
│   ├── routes/            # Endpoints API
│   │   ├── auth.js
│   │   ├── apartments.js
│   │   ├── payments.js
│   │   ├── expenses.js
│   │   ├── portfolio.js
│   │   ├── reports.js
│   │   ├── reconciliation.js
│   │   └── audit.js
│   └── services/          # Servicios
│       ├── backup.js      # Backups automáticos
│       └── bankReconciliation.js
├── data/
│   └── salesia.db         # Base de datos SQLite
├── server.js              # Servidor Express
├── package.json           # Dependencias
└── README.md              # Documentación

```

## 🗄️ Base de Datos

### Tablas Principales (16 tablas)

1. **users** - Usuarios del sistema
2. **apartments** - Información de apartamentos
3. **owners** - Propietarios
4. **payments** - Registro de pagos
5. **expenses** - Gastos comunes
6. **portfolio** - Cartera de deudas
7. **bank_transactions** - Transacciones bancarias
8. **reconciliation** - Conciliación bancaria
9. **audit_logs** - Bitácora de cambios
10. **backup_history** - Historial de backups
11. **payment_categories** - Categorías de pago
12. **expense_categories** - Categorías de gasto
13. **apartment_services** - Servicios por apartamento
14. **payment_methods** - Métodos de pago
15. **notifications** - Notificaciones
16. **system_config** - Configuración del sistema

### Datos de Prueba

- **13 Apartamentos** (101-113)
- **6 Meses de Histórico** (Mayo - Octubre 2025)
- **Escenarios Variados**:
  - Pagos al día
  - Pagos atrasados
  - Pagos parciales
  - Gastos comunes
  - Transacciones bancarias

## 🔐 Seguridad

- **Autenticación**: JWT con expiración de 24 horas
- **Contraseñas**: Encriptadas con bcryptjs
- **Roles**: Admin, Contador, Consulta
- **Auditoría**: Registro completo de cambios
- **CORS**: Configurado para desarrollo local

## 📊 Exportación de Datos

### Formatos Soportados

- **PDF**: Reportes formateados con PDFKit
- **CSV**: Datos tabulares para Excel
- **JSON**: Datos estructurados

### Cómo Exportar

1. Navega al módulo deseado (Reportes, Auditoría, etc.)
2. Haz clic en el botón "Exportar PDF" o "Exportar CSV"
3. El archivo se descargará automáticamente

## 🔄 Backups Automáticos

El sistema realiza backups automáticos cada 24 horas:

- **Ubicación**: `data/backups/`
- **Formato**: `salesia_backup_YYYY-MM-DD_HH-mm-ss.db`
- **Retención**: Últimos 7 backups
- **Restauración**: Disponible en módulo de Auditoría

## 🐛 Solución de Problemas

### El servidor no inicia

```bash
# Verificar que Node.js está instalado
node --version

# Verificar que npm está instalado
npm --version

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install

# Iniciar con debug
npm start -- --debug
```

### Puerto 3000 ya está en uso

```bash
# Cambiar puerto en server.js
# Línea: const PORT = process.env.PORT || 3000;
# Cambiar a: const PORT = process.env.PORT || 3001;

npm start
```

### Base de datos corrupta

```bash
# Eliminar base de datos
rm data/salesia.db

# Reiniciar servidor (recreará la BD)
npm start
```

### Error de autenticación

- Verifica que las credenciales sean correctas
- Limpia cookies del navegador (Ctrl+Shift+Delete)
- Intenta en modo incógnito

## 📈 Rendimiento

- **Tiempo de carga**: < 2 segundos
- **Respuesta API**: < 500ms
- **Usuarios simultáneos**: Hasta 50 (SQLite)
- **Tamaño BD**: ~5MB (con 6 meses de datos)

## 🚀 Escalabilidad Futura

Para escalar a múltiples condominios:

1. **Migrar a PostgreSQL** (en lugar de SQLite)
2. **Agregar multi-tenancy** (tabla `condominiums`)
3. **Implementar caché** (Redis)
4. **Usar CDN** para assets estáticos
5. **Containerizar** con Docker
6. **Desplegar en cloud** (AWS, Azure, GCP)

## 📞 Soporte

Para reportar problemas o sugerencias:

1. Abre un issue en GitHub
2. Incluye:
   - Descripción del problema
   - Pasos para reproducir
   - Capturas de pantalla
   - Versión de Node.js

## 📄 Documentación Adicional

- **README.md** - Descripción general del proyecto
- **MANUAL_DE_USO.md** - Guía detallada de funcionalidades
- **FASE2_COMPLETADA.md** - Documentación técnica de FASE 2
- **VALIDACION_FUNCIONAMIENTO.md** - Checklist de validación
- **ESTRATEGIA_GANADORA_FINAL_IMPLEMENTADA.md** - Estrategia del hackathon

## ✅ Checklist de Verificación

Después de instalar, verifica que:

- [ ] El servidor inicia sin errores
- [ ] Puedes acceder a http://localhost:3000
- [ ] Puedes iniciar sesión con las credenciales de prueba
- [ ] El dashboard carga correctamente
- [ ] Puedes navegar entre módulos
- [ ] Puedes ver datos de los 13 apartamentos
- [ ] Puedes exportar reportes en PDF/CSV
- [ ] Puedes ver la bitácora de cambios
- [ ] Puedes hacer backups manuales

## 🎯 Próximos Pasos

1. **Explorar la aplicación** - Familiarízate con todos los módulos
2. **Revisar datos de prueba** - Entiende los escenarios
3. **Probar exportaciones** - Verifica PDF y CSV
4. **Revisar documentación** - Lee los archivos .md
5. **Proporcionar feedback** - Reporta mejoras

---

**Versión**: 2.0 (FASE 2 Completa)  
**Última actualización**: 29 de octubre de 2025  
**Estado**: ✅ Producción Lista
