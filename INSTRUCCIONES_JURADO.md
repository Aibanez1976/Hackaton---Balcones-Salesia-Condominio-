# 🏆 SalesiaAdmin Pro - Instrucciones para el Jurado

## 📌 Información General del Proyecto

**Nombre del Proyecto**: SalesiaAdmin Pro  
**Hackathon**: Cúcuta 2025 - Transformación Digital de Propiedad Horizontal  
**Equipo**: Desarrollo IA Course  
**Fecha de Entrega**: 29 de octubre de 2025  
**Estado**: ✅ FASE 2 Completa - Producción Lista

---

## 🎯 Propuesta de Valor

SalesiaAdmin Pro es una **plataforma integral de gestión de propiedad horizontal** diseñada específicamente para condominios pequeños (13 apartamentos) que buscan transformación digital completa.

### Diferenciadores Clave

1. **Escalabilidad desde el inicio** - Arquitectura preparada para crecer
2. **Automatización completa** - Backups, auditoría, conciliación
3. **Seguridad empresarial** - Autenticación JWT, roles granulares, auditoría
4. **Reportería avanzada** - PDF, CSV, análisis de morosos
5. **Interfaz intuitiva** - SPA moderna, responsive, fácil de usar
6. **Datos realistas** - 6 meses de histórico, 13 apartamentos, escenarios variados

---

## 🚀 Cómo Ejecutar la Aplicación

### Opción 1: Desde GitHub (Recomendado)

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/salesia-admin-pro.git

# 2. Entrar al directorio
cd salesia-admin-pro

# 3. Instalar dependencias
npm install

# 4. Iniciar el servidor
npm start
```

### Opción 2: Desde Carpeta Local

```bash
# 1. Abrir terminal en la carpeta del proyecto
cd "c:/Users/Aiban/OneDrive/Documentos/IA -Development/IA Course/Hackaton - Admin- PH"

# 2. Instalar dependencias (si no están instaladas)
npm install

# 3. Iniciar el servidor
npm start
```

### Verificación de Inicio

Cuando veas este mensaje, el servidor está listo:

```
✅ Servidor ejecutándose en http://localhost:3000
✅ Base de datos conectada
✅ Backups automáticos configurados
```

---

## 🌐 Acceso a la Aplicación

**URL**: http://localhost:3000

### Credenciales de Prueba

| Rol | Usuario | Contraseña | Acceso |
|-----|---------|-----------|--------|
| **Admin** | admin@salesia.com | Admin123! | Completo |
| **Contador** | contador@salesia.com | Contador123! | Reportes + Conciliación |
| **Consulta** | consulta@salesia.com | Consulta123! | Solo lectura |

**Recomendación**: Inicia con usuario **Admin** para ver todas las funcionalidades.

---

## 📊 Módulos a Demostrar

### 1. Dashboard (Inicio)
**Ubicación**: Menú principal → Dashboard

**Qué ver**:
- Resumen de ingresos y egresos del mes
- Gráficos de tendencias (últimos 6 meses)
- Estado de pagos por apartamento
- Indicadores clave (KPIs)
- Apartamentos al día vs. morosos

**Datos de prueba**: 13 apartamentos, 6 meses de histórico

---

### 2. Gestión de Apartamentos
**Ubicación**: Menú → Apartamentos

**Qué ver**:
- Lista de 13 apartamentos (101-113)
- Información de propietarios
- Datos de contacto
- Estado de ocupación
- Cuota mensual por apartamento

**Funcionalidades**:
- Crear nuevo apartamento
- Editar información
- Ver historial de pagos
- Exportar listado

---

### 3. Gestión de Pagos
**Ubicación**: Menú → Pagos

**Qué ver**:
- Registro de pagos mensuales
- Historial de transacciones
- Comprobantes de pago
- Cálculo automático de cuotas
- Filtros por apartamento y mes

**Funcionalidades**:
- Registrar nuevo pago
- Editar pago
- Ver comprobante
- Exportar historial

---

### 4. Gestión de Gastos
**Ubicación**: Menú → Gastos

**Qué ver**:
- Registro de gastos comunes
- Categorización (servicios, mantenimiento, etc.)
- Presupuesto vs. Real
- Análisis de costos
- Tendencias de gasto

**Funcionalidades**:
- Crear nuevo gasto
- Editar gasto
- Categorizar gasto
- Exportar reporte

---

### 5. Cartera y Morosos
**Ubicación**: Menú → Cartera

**Qué ver**:
- Seguimiento de deudas por apartamento
- Antigüedad de cartera
- Monto adeudado
- Proyección de cobro
- Análisis de riesgo

**Funcionalidades**:
- Ver detalles de deuda
- Generar recordatorio
- Exportar cartera

---

### 6. ⭐ Conciliación Bancaria (NUEVO - FASE 2)
**Ubicación**: Menú → Conciliación

**Qué ver**:
- Importar extracto bancario (CSV)
- Procesar transacciones
- Detectar diferencias
- Generar reporte de conciliación
- Historial de conciliaciones

**Cómo probar**:
1. Haz clic en "Importar Extracto"
2. Carga un archivo CSV con transacciones
3. El sistema procesa automáticamente
4. Verifica diferencias detectadas
5. Exporta reporte de conciliación

**Archivo de prueba**: Disponible en documentación

---

### 7. ⭐ Auditoría y Bitácora (NUEVO - FASE 2)
**Ubicación**: Menú → Auditoría

**Qué ver**:
- Registro completo de cambios
- Quién hizo el cambio (usuario)
- Qué cambió (campo)
- Cuándo cambió (fecha/hora)
- Dónde cambió (módulo)
- Valores antiguos vs. nuevos

**Funcionalidades**:
- Filtrar por usuario, módulo, fecha
- Ver detalles de cambio
- Exportar bitácora (CSV)
- Restaurar backup

**Datos de prueba**: Cambios registrados desde inicio de sesión

---

### 8. Reportería
**Ubicación**: Menú → Reportes

**Qué ver**:
- Reporte de ingresos y egresos
- Top 10 morosos (NUEVO - FASE 2)
- Estado financiero
- Análisis de flujo de caja
- Proyecciones

**Funcionalidades**:
- Generar reporte PDF
- Generar reporte CSV
- Filtrar por período
- Descargar automáticamente

**Cómo probar**:
1. Selecciona tipo de reporte
2. Haz clic en "Generar PDF" o "Generar CSV"
3. El archivo se descarga automáticamente
4. Abre en navegador o Excel

---

## 🔍 Checklist de Demostración

Sigue este orden para una demostración completa:

### Fase 1: Autenticación y Seguridad (2 min)
- [ ] Intenta login con credenciales incorrectas (debe fallar)
- [ ] Login exitoso con admin@salesia.com
- [ ] Verifica que el token JWT se genera
- [ ] Navega entre módulos (verifica que funciona)
- [ ] Logout y verifica que se limpia sesión

### Fase 2: Dashboard y Datos (3 min)
- [ ] Visualiza dashboard con datos
- [ ] Verifica gráficos de tendencias
- [ ] Verifica KPIs (ingresos, egresos, morosos)
- [ ] Verifica que hay 13 apartamentos
- [ ] Verifica 6 meses de histórico

### Fase 3: Gestión de Datos (5 min)
- [ ] Abre Apartamentos (13 registros)
- [ ] Abre Pagos (historial de 6 meses)
- [ ] Abre Gastos (categorización)
- [ ] Abre Cartera (deudas por apartamento)
- [ ] Verifica filtros y búsqueda

### Fase 4: Exportación (3 min)
- [ ] Exporta reporte en PDF
- [ ] Exporta reporte en CSV
- [ ] Abre PDF en navegador
- [ ] Abre CSV en Excel
- [ ] Verifica que datos son correctos

### Fase 5: Conciliación Bancaria (3 min)
- [ ] Navega a Conciliación
- [ ] Importa archivo CSV de transacciones
- [ ] Verifica procesamiento automático
- [ ] Verifica detección de diferencias
- [ ] Exporta reporte de conciliación

### Fase 6: Auditoría y Bitácora (3 min)
- [ ] Navega a Auditoría
- [ ] Verifica registro de cambios
- [ ] Filtra por usuario
- [ ] Filtra por módulo
- [ ] Verifica valores antiguos vs. nuevos
- [ ] Exporta bitácora en CSV

### Fase 7: Roles y Permisos (2 min)
- [ ] Logout
- [ ] Login con contador@salesia.com
- [ ] Verifica acceso limitado
- [ ] Logout
- [ ] Login con consulta@salesia.com
- [ ] Verifica solo lectura

**Tiempo total**: ~20 minutos

---

## 📈 Requisitos del Hackathon - Cumplimiento

### ✅ Requisitos Funcionales

| Requisito | Estado | Ubicación |
|-----------|--------|-----------|
| Gestión de apartamentos | ✅ Completo | Menú → Apartamentos |
| Gestión de pagos | ✅ Completo | Menú → Pagos |
| Gestión de gastos | ✅ Completo | Menú → Gastos |
| Cartera de deudas | ✅ Completo | Menú → Cartera |
| Reportería | ✅ Completo | Menú → Reportes |
| Exportación PDF/CSV | ✅ Completo | Botones en cada módulo |
| Autenticación | ✅ Completo | JWT con 24h expiración |
| Roles y permisos | ✅ Completo | Admin, Contador, Consulta |

### ✅ Requisitos Técnicos

| Requisito | Estado | Detalles |
|-----------|--------|---------|
| Base de datos | ✅ Completo | SQLite con 16 tablas normalizadas |
| API REST | ✅ Completo | 40+ endpoints implementados |
| Frontend SPA | ✅ Completo | HTML5, CSS3, JavaScript vanilla |
| Seguridad | ✅ Completo | JWT, bcryptjs, CORS, validación |
| Escalabilidad | ✅ Completo | Arquitectura preparada para PostgreSQL |

### ✅ Requisitos FASE 2 (Nuevos)

| Requisito | Estado | Ubicación |
|-----------|--------|-----------|
| Conciliación Bancaria | ✅ Completo | Menú → Conciliación |
| Respaldo Automático | ✅ Completo | Auditoría → Backups |
| Bitácora de Cambios | ✅ Completo | Menú → Auditoría |
| Top Morosos | ✅ Completo | Reportes → Top Morosos |
| Auditoría Completa | ✅ Completo | Menú → Auditoría |

---

## 🎓 Transformación Digital Demostrada

### Antes (Manual)
- ❌ Registros en papel o Excel
- ❌ Cálculos manuales de cuotas
- ❌ Sin auditoría de cambios
- ❌ Reportes manuales
- ❌ Sin respaldos automáticos
- ❌ Difícil seguimiento de morosos

### Después (SalesiaAdmin Pro)
- ✅ Sistema centralizado digital
- ✅ Cálculos automáticos
- ✅ Auditoría completa de cambios
- ✅ Reportes automáticos en PDF/CSV
- ✅ Backups automáticos cada 24h
- ✅ Identificación automática de morosos
- ✅ Conciliación bancaria automática
- ✅ Acceso desde cualquier dispositivo

---

## 💾 Datos de Prueba Incluidos

### Apartamentos
- **Cantidad**: 13 (101-113)
- **Cuota mensual**: $500,000 COP
- **Propietarios**: Nombres realistas
- **Contactos**: Teléfono y email

### Histórico de Pagos
- **Período**: Mayo - Octubre 2025 (6 meses)
- **Escenarios**:
  - 8 apartamentos: Pagos al día
  - 3 apartamentos: Pagos atrasados (1-3 meses)
  - 2 apartamentos: Pagos parciales

### Gastos Comunes
- **Categorías**: Servicios, mantenimiento, seguros
- **Monto mensual**: $2,000,000 COP
- **Variación**: Realista según mes

### Transacciones Bancarias
- **Período**: Últimos 3 meses
- **Cantidad**: 50+ transacciones
- **Tipos**: Ingresos, egresos, transferencias

---

## 🔧 Información Técnica

### Stack Tecnológico

**Backend**:
- Node.js v22.20.0
- Express.js 4.18.2
- SQLite3 5.1.6
- JWT (jsonwebtoken 9.0.2)
- bcryptjs 2.4.3

**Frontend**:
- HTML5
- CSS3 (Bootstrap 5.3.0)
- JavaScript vanilla
- Chart.js 3.9.1
- PDFKit 0.13.0

**Servicios**:
- node-cron (backups automáticos)
- csv-parser (conciliación bancaria)
- multer (carga de archivos)

### Arquitectura

```
Cliente (Navegador)
    ↓
Frontend SPA (HTML/CSS/JS)
    ↓
API REST (Express.js)
    ↓
Middleware (Auth, Audit, CORS)
    ↓
Base de Datos (SQLite)
    ↓
Servicios (Backup, Reconciliation)
```

### Base de Datos

**16 Tablas Normalizadas**:
1. users
2. apartments
3. owners
4. payments
5. expenses
6. portfolio
7. bank_transactions
8. reconciliation
9. audit_logs
10. backup_history
11. payment_categories
12. expense_categories
13. apartment_services
14. payment_methods
15. notifications
16. system_config

---

## 📁 Archivos Importantes

### Documentación
- **README.md** - Descripción general
- **SETUP.md** - Guía de instalación
- **MANUAL_DE_USO.md** - Guía detallada
- **FASE2_COMPLETADA.md** - Documentación técnica
- **VALIDACION_FUNCIONAMIENTO.md** - Checklist de validación
- **ESTRATEGIA_GANADORA_FINAL_IMPLEMENTADA.md** - Estrategia del hackathon

### Código Fuente
- **server.js** - Servidor principal
- **src/config/** - Configuración
- **src/routes/** - Endpoints API
- **src/middleware/** - Middleware
- **src/services/** - Servicios
- **public/** - Frontend

### Configuración
- **package.json** - Dependencias
- **.env** - Variables de entorno
- **.gitignore** - Archivos excluidos de Git

---

## 🚨 Solución de Problemas

### El servidor no inicia
```bash
# Verificar Node.js
node --version

# Reinstalar dependencias
npm install

# Iniciar con debug
npm start
```

### Puerto 3000 ocupado
```bash
# Cambiar puerto en server.js
# Línea: const PORT = process.env.PORT || 3000;
# Cambiar a: const PORT = process.env.PORT || 3001;
```

### No puedo iniciar sesión
- Verifica credenciales exactas
- Limpia cookies (Ctrl+Shift+Delete)
- Intenta en modo incógnito

### Base de datos corrupta
```bash
# Eliminar BD
rm data/salesia.db

# Reiniciar servidor (recreará BD)
npm start
```

---

## 📞 Contacto y Soporte

**Equipo**: Desarrollo IA Course  
**Hackathon**: Cúcuta 2025  
**Fecha**: 29 de octubre de 2025

Para preguntas durante la demostración:
1. Consulta la documentación incluida
2. Revisa los archivos .md en el repositorio
3. Verifica los comentarios en el código

---

## ✅ Checklist Final Antes de Presentar

- [ ] Servidor iniciado (`npm start`)
- [ ] Acceso a http://localhost:3000
- [ ] Login funciona
- [ ] Dashboard carga correctamente
- [ ] Todos los módulos son accesibles
- [ ] Datos de prueba visibles (13 apartamentos)
- [ ] Exportación PDF funciona
- [ ] Exportación CSV funciona
- [ ] Conciliación bancaria funciona
- [ ] Auditoría muestra cambios
- [ ] Roles funcionan correctamente
- [ ] Laptop con batería cargada
- [ ] Documentación a mano

---

## 🎯 Puntos Clave a Destacar

1. **Transformación Digital Completa** - De manual a digital
2. **Automatización** - Backups, auditoría, conciliación
3. **Seguridad** - Autenticación, roles, auditoría
4. **Escalabilidad** - Preparado para crecer
5. **Usabilidad** - Interfaz intuitiva y moderna
6. **Datos Realistas** - 6 meses de histórico
7. **Reportería Avanzada** - PDF, CSV, análisis
8. **Soporte Completo** - Documentación exhaustiva

---

**¡Listo para la demostración!** 🚀

Versión: 2.0 (FASE 2 Completa)  
Última actualización: 29 de octubre de 2025  
Estado: ✅ Producción Lista
