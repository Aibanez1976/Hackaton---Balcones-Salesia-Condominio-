
# 📘 MANUAL DE USO - SalesiaAdmin Pro

## Gestión de Propiedad Horizontal - Condominio Balcones de Salesia

**Versión**: 1.0  
**Fecha**: 29 de octubre de 2025  
**Autor**: Equipo de Desarrollo Hackathon Cúcuta 2025

---

## 📋 TABLA DE CONTENIDOS

1. [Introducción](#introducción)
2. [Requisitos del Sistema](#requisitos-del-sistema)
3. [Instalación y Ejecución](#instalación-y-ejecución)
4. [Acceso al Sistema](#acceso-al-sistema)
5. [Guía de Uso Paso a Paso](#guía-de-uso-paso-a-paso)
6. [Módulos Principales](#módulos-principales)
7. [Troubleshooting](#troubleshooting)
8. [Próximos Pasos](#próximos-pasos)

---

## 🎯 INTRODUCCIÓN

**SalesiaAdmin Pro** es una plataforma web de gestión de propiedad horizontal diseñada específicamente para el Condominio Balcones de Salesia. El sistema centraliza la información contable-administrativa, automatiza cálculos y genera reportes en tiempo real.

### Características Principales

✅ **Gestión de Cartera** - Seguimiento de pagos y morosidad  
✅ **Registro de Pagos y Gastos** - Entrada de datos simplificada  
✅ **Dashboard Ejecutivo** - Visualización de KPIs en tiempo real  
✅ **Reportes Exportables** - PDF y CSV para análisis  
✅ **Control de Acceso** - Roles y permisos granulares  
✅ **Datos de Prueba** - 13 apartamentos con 6 meses de histórico  

---

## 💻 REQUISITOS DEL SISTEMA

### Mínimos
- **Navegador**: Chrome, Firefox, Safari o Edge (versión reciente)
- **Conexión**: Internet (para desarrollo local, no requiere)
- **Resolución**: 1024x768 mínimo (recomendado 1366x768)

### Para Ejecutar Localmente
- **Node.js**: v14.0 o superior
- **npm**: v6.0 o superior
- **Espacio en disco**: 500 MB
- **RAM**: 512 MB mínimo

---

## 🚀 INSTALACIÓN Y EJECUCIÓN

### Paso 1: Descargar el Proyecto

```bash
# Clonar repositorio (si está disponible)
git clone <url-repositorio>
cd hackaton-admin-ph

# O descargar archivo ZIP y extraer
```

### Paso 2: Instalar Dependencias

```bash
npm install
```

Este comando instalará todas las librerías necesarias:
- Express.js (servidor web)
- SQLite3 (base de datos)
- JWT (autenticación)
- PDFKit (generación de PDF)
- ExcelJS (generación de Excel)

### Paso 3: Inicializar Base de Datos

```bash
node init-db.js
```

Este comando:
- Crea la base de datos SQLite
- Genera 16 tablas normalizadas
- Precarga 13 apartamentos
- Carga 6 meses de datos de prueba

### Paso 4: Iniciar el Servidor

```bash
npm start
```

**Salida esperada:**
```
🚀 Servidor ejecutándose en http://localhost:3000
✅ Base de datos inicializada correctamente
✅ Database seeded successfully
```

### Paso 5: Acceder a la Aplicación

Abrir navegador y navegar a:
```
http://localhost:3000
```

---

## 🔐 ACCESO AL SISTEMA

### Credenciales de Demostración

| Rol | Email | Contraseña | Permisos |
|-----|-------|-----------|----------|
| **Administrador** | admin@salesia.com | admin123 | CRUD completo + Configuración |
| **Contador** | contador@salesia.com | contador123 | Pagos, Gastos, Reportes |
| **Consulta** | consulta@salesia.com | consulta123 | Solo lectura de reportes |

### Proceso de Login

1. Abrir http://localhost:3000
2. Ingresar email en campo "Email"
3. Ingresar contraseña en campo "Contraseña"
4. Hacer clic en botón "Ingresar"
5. Esperar a que se cargue el dashboard (2-3 segundos)

**Nota**: Las credenciales están pre-llenadas para facilitar la demostración.

---

## 📖 GUÍA DE USO PASO A PASO

### 1️⃣ DASHBOARD - Visualizar Resumen Ejecutivo

**Objetivo**: Ver KPIs principales y gráficos de análisis

**Pasos**:
1. Hacer login con credenciales de administrador
2. Se abre automáticamente el Dashboard
3. Visualizar 4 tarjetas con métricas:
   - Total Apartamentos: 13
   - Cartera Total: Monto adeudado
   - Pagos (6 meses): Ingresos recibidos
   - Gastos (6 meses): Egresos totales

4. Visualizar 2 gráficos:
   - **Cartera por Antigüedad** (Doughnut): Distribución de deuda por rango de días
   - **Gastos por Categoría** (Pie): Desglose de gastos por rubro

**Exportar Dashboard**:
- Botón "Exportar PDF": Descarga resumen en PDF
- Botón "Exportar CSV": Descarga datos en Excel

---

### 2️⃣ APARTAMENTOS - Gestionar Unidades

**Objetivo**: Consultar información de los 13 apartamentos

**Pasos**:
1. Hacer clic en menú "Apartamentos"
2. Se muestra tabla con columnas:
   - Apartamento (APT-001 a APT-013)
   - Torre (Torre A o Torre B)
   - Área (85.5 m²)
   - Cuota Mensual ($1.400.000)
   - Propietarios (cantidad)
   - Residentes (cantidad)
   - Mascotas (cantidad)
   - Acciones (botón Ver)

3. Hacer clic en botón "Ver" para detalles del apartamento

**Información Disponible**:
- Propietarios registrados
- Residentes del apartamento
- Mascotas (perros y gatos)
- Vehículos estacionados

---

### 3️⃣ CARTERA - Seguimiento de Deuda

**Objetivo**: Analizar estado de pagos por apartamento

**Pasos**:
1. Hacer clic en menú "Cartera"
2. Se muestra tabla con columnas:
   - Apartamento
   - Cuota Mensual
   - Pagado (últimos 6 meses)
   - Saldo Adeudado
   - % Pago (barra de progreso)
   - Último Pago (fecha)
   - Acciones (botón Ver)

3. Analizar apartamentos por estado:
   - **Verde (100%)**: Pagos al día
   - **Amarillo (50-99%)**: Pagos parciales
   - **Rojo (<50%)**: Pagos atrasados

4. Hacer clic en botón "Ver" para detalles de cartera

**Escenarios de Prueba**:
- APT-001 a APT-009: Pagos al día (100%)
- APT-010 a APT-011: Atrasados 30-59 días (50-70%)
- APT-012 a APT-013: Atrasados 60-90+ días (20-40%)

---

### 4️⃣ PAGOS - Registrar Ingresos

**Objetivo**: Registrar pagos de cuotas ordinarias

**Pasos**:
1. Hacer clic en menú "Pagos"
2. Se muestra tabla con pagos históricos
3. Hacer clic en botón "Nuevo Pago"
4. Se abre modal con formulario:
   - **Apartamento**: Seleccionar de dropdown
   - **Monto**: Ingresar cantidad (ej: 1400000)
   - **Fecha**: Seleccionar fecha del pago
   - **Método de Pago**: Efectivo, Transferencia, Cheque o Tarjeta

5. Hacer clic en "Guardar Pago"
6. Se actualiza tabla automáticamente
7. Se recalcula cartera en tiempo real

**Validaciones**:
- Apartamento es obligatorio
- Monto debe ser número positivo
- Fecha no puede ser futura
- Método de pago es obligatorio

---

### 5️⃣ GASTOS - Registrar Egresos

**Objetivo**: Registrar gastos operacionales

**Pasos**:
1. Hacer clic en menú "Gastos"
2. Se muestra tabla con gastos históricos
3. Hacer clic en botón "Nuevo Gasto"
4. Se abre modal con formulario:
   - **Categoría**: Servicios, Seguridad, Limpieza, Reparaciones, Administración, Seguros
   - **Monto**: Ingresar cantidad
   - **Fecha**: Seleccionar fecha del gasto
   - **Descripción**: Detallar el gasto (opcional)
   - **Proveedor**: Nombre del proveedor (opcional)

5. Hacer clic en "Guardar Gasto"
6. Se actualiza tabla automáticamente
7. Se recalcula gráfico de gastos en dashboard

**Categorías Disponibles**:
- 🔧 Servicios: Servicios públicos y mantenimiento
- 🚨 Seguridad: Gastos de vigilancia
- 🧹 Limpieza: Servicios de limpieza
- 🔨 Reparaciones: Mantenimiento y reparaciones
- 📋 Administración: Gastos administrativos
- 🛡️ Seguros: Pólizas de seguros

---

### 6️⃣ REPORTES - Descargar Análisis

**Objetivo**: Generar y descargar reportes en PDF

**Pasos**:
1. Hacer clic en menú "Reportes"
2. Se muestran 2 opciones:

**Opción 1: Cartera por Antigüedad**
- Descripción: Reporte detallado de cartera vencida por rangos
- Contenido: Apartamentos agrupados por antigüedad (30/60/90+ días)
- Formato: PDF
- Botón: "Descargar PDF"

**Opción 2: Flujo de Caja**
- Descripción: Análisis de ingresos y egresos mensuales
- Contenido: Movimientos mes a mes (últimos 12 meses)
- Formato: PDF
- Botón: "Descargar PDF"

3. Hacer clic en botón "Descargar PDF"
4. Se descarga archivo automáticamente
5. Abrir con Adobe Reader o navegador

---

## 🔧 MÓDULOS PRINCIPALES

### Dashboard
- **Ubicación**: Menú principal
- **Acceso**: Todos los roles
- **Funciones**: Visualizar KPIs, gráficos, exportar datos
- **Tiempo de carga**: 2-3 segundos

### Apartamentos
- **Ubicación**: Menú principal
- **Acceso**: Admin, Contador
- **Funciones**: Consultar información de unidades
- **Datos**: 13 apartamentos con propietarios, residentes, mascotas, vehículos

### Cartera
- **Ubicación**: Menú principal
- **Acceso**: Admin, Contador, Consulta
- **Funciones**: Seguimiento de pagos y morosidad
- **Análisis**: Por antigüedad, por apartamento, por estado

### Pagos
- **Ubicación**: Menú principal
- **Acceso**: Admin, Contador
- **Funciones**: Registrar ingresos, consultar histórico
- **Validaciones**: Monto, fecha, método de pago

### Gastos
- **Ubicación**: Menú principal
- **Acceso**: Admin, Contador
- **Funciones**: Registrar egresos, categorizar gastos
- **Categorías**: 6 tipos de gastos predefinidos

### Reportes
- **Ubicación**: Menú principal
- **Acceso**: Admin, Contador, Consulta
- **Funciones**: Descargar reportes en PDF
- **Formatos**: PDF, CSV (próximamente)

---

## 🆘 TROUBLESHOOTING

### Problema: "No se puede conectar a localhost:3000"

**Solución**:
1. Verificar que el servidor está corriendo: `npm start`
2. Verificar puerto 3000 no esté en uso: `netstat -ano | findstr :3000`
3. Si está en uso, cambiar puerto en `server.js` línea 19
4. Reiniciar servidor

### Problema: "Error de base de datos"

**Solución**:
1. Eliminar archivo `data/salesia.db`
2. Ejecutar: `node init-db.js`
3. Reiniciar servidor: `npm start`

### Problema: "Login no funciona"

**Solución**:
1. Verificar credenciales correctas (ver tabla de acceso)
2. Limpiar cache del navegador (Ctrl+Shift+Delete)
3. Intentar en navegador diferente
4. Verificar servidor está corriendo

### Problema: "Gráficos no se muestran"

**Solución**:
1. Verificar conexión a internet (para CDN de Chart.js)
2. Abrir consola (F12) y buscar errores
3. Recargar página (F5)
4. Limpiar cache del navegador

### Problema: "Exportación de PDF no funciona"

**Solución**:
1. Verificar que PDFKit está instalado: `npm list pdfkit`
2. Si no está, instalar: `npm install pdfkit`
3. Reiniciar servidor
4. Intentar descarga nuevamente

---

## 📈 PRÓXIMOS PASOS

### Mejoras Planeadas (Post-Hackathon)

#### Corto Plazo (1-2 semanas)
- [ ] Módulo de comunicaciones (avisos por email)
- [ ] Conciliación bancaria (importar extractos CSV)
- [ ] Respaldo automático de base de datos
- [ ] Bitácora de cambios (auditoría)

#### Mediano Plazo (1-2 meses)
- [ ] Integración con pasarela de pagos (PSE)
- [ ] Notificaciones por WhatsApp
- [ ] Predicción de flujo de caja (IA)
- [ ] Módulo PQRS (peticiones, quejas, reclamos)

#### Largo Plazo (3-6 meses)
- [ ] App móvil (iOS/Android)
- [ ] Escalabilidad a múltiples condominios
- [ ] Integración con contabilidad (SIIGO)
- [ ] Análisis predictivo de morosidad

---

## 📞 SOPORTE

### Contacto
- **Email**: soporte@salesiaadmin.com
- **Teléfono**: +57 (7) 5XX-XXXX
- **Horario**: Lunes a Viernes, 8:00 AM - 5:00 PM

### Documentación Adicional
- README.md - Documentación técnica
- ESTRATEGIA_GANADORA_HACKATHON.md - Propuesta de valor
- ESTADO_FINAL_PROYECTO.md - Estado técnico del proyecto

---

## 