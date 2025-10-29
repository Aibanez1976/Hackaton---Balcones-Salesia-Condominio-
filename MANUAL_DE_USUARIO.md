# Manual de Usuario - SalesiaAdmin Pro

## 📖 Guía Completa para Administradores del Condominio

### Versión 1.0 - Octubre 2025
### Desarrollado para el Hackathon Talento Tech Oriente - Cúcuta

---

## 🎯 Introducción

Bienvenido a **SalesiaAdmin Pro**, el sistema digital diseñado específicamente para optimizar la gestión administrativa y contable del Condominio Balcones de Salesia.

Este manual le guiará paso a paso en el uso del sistema, desde el acceso inicial hasta las funciones más avanzadas.

---

## 🔐 Acceso al Sistema

### URL de Acceso
```
https://[usuario].github.io/salesia-admin/
```

### Credenciales de Acceso

| Rol | Usuario | Contraseña | Permisos |
|-----|---------|------------|----------|
| **Administrador** | admin@salesia.com | Admin123! | Acceso completo + configuración |
| **Contador** | contador@salesia.com | Contador123! | Gestión financiera completa |
| **Consulta** | consulta@salesia.com | Consulta123! | Solo lectura + reportes |

### Proceso de Login
1. Abrir el navegador web
2. Ingresar la URL del sistema
3. Completar el formulario de login
4. Hacer clic en "Iniciar Sesión"

---

## 🏠 Dashboard Ejecutivo

### Vista General
El Dashboard es la pantalla principal que muestra un resumen ejecutivo del estado financiero del condominio.

### KPIs Principales

#### 📊 Indicadores Clave
- **Total Apartamentos**: Número de unidades registradas (13)
- **Cartera Total**: Valor total de cuotas pendientes ($2,700,000)
- **Pagos del Período**: Ingresos de los últimos 6 meses ($2,340,000)
- **Gastos del Período**: Egresos de los últimos 6 meses ($360,000)

#### 📈 Gráficos Interactivos
- **Cartera por Antigüedad**: Distribución de morosidad (Al día, 1-30, 31-60, 61-90, 90+ días)
- **Gastos por Categoría**: Desglose de egresos por tipo

### Navegación
- Hacer clic en cualquier sección del menú lateral para acceder a funciones específicas
- Los gráficos son interactivos y responden al cambio de datos

---

## 👥 Gestión del Censo de Residentes

### Acceso a la Sección
Menú Lateral → "Censo"

### Funciones Disponibles

#### 📝 Registrar Nuevo Apartamento
1. Hacer clic en "Nuevo Apartamento" (solo Administrador)
2. Completar el formulario:
   - **Número**: Identificador del apartamento (ej: APT-101)
   - **Torre**: Torre A o Torre B
   - **Área**: Metros cuadrados
   - **Cuota Mensual**: Valor de administración
   - **Propietario**: Nombre completo
   - **Residente**: Nombre del habitante actual
   - **Email**: Correo electrónico
   - **Teléfono**: Número de contacto
   - **Vehículos**: Descripción de automotores
   - **Mascotas**: Información de animales

#### ✏️ Editar Información
1. En la tabla de apartamentos, hacer clic en el botón "Editar" (✏️)
2. Modificar los campos necesarios
3. Guardar cambios

#### 👁️ Ver Detalles
1. Hacer clic en el botón "Ver" (👁️)
2. Revisar información completa del apartamento

#### 🗑️ Eliminar Apartamento
1. Hacer clic en el botón "Eliminar" (🗑️)
2. Confirmar la eliminación

### Campos Obligatorios
- Número de apartamento
- Torre
- Área
- Cuota mensual
- Nombre del propietario

---

## 💰 Registro de Pagos

### Acceso a la Sección
Menú Lateral → "Pagos"

### Registrar Nuevo Pago
1. Hacer clic en "Nuevo Pago"
2. Seleccionar apartamento del dropdown
3. Completar información:
   - **Monto**: Valor del pago
   - **Fecha**: Fecha de recepción
   - **Concepto**: Descripción (ej: "Cuota ordinaria octubre")
   - **Método**: Efectivo, Transferencia, Cheque, Tarjeta
   - **Referencia**: Número de comprobante (opcional)

### Visualizar Pagos
- La tabla muestra los últimos 20 pagos
- Ordenados por fecha (más recientes primero)
- Información completa de cada transacción

### Editar/Eliminar Pagos
- Solo usuarios con rol Contador o Administrador
- Hacer clic en los botones correspondientes en la tabla

---

## 💸 Gestión de Gastos

### Acceso a la Sección
Menú Lateral → "Gastos"

### Registrar Nuevo Gasto
1. Hacer clic en "Nuevo Gasto"
2. Seleccionar categoría (o añadir nueva con el botón +)
3. Completar formulario:
   - **Categoría**: Servicios, Seguridad, Limpieza, etc.
   - **Monto**: Valor del gasto
   - **Fecha**: Fecha del egreso
   - **Descripción**: Detalle del gasto
   - **Proveedor**: Nombre del prestador del servicio

### Categorías Disponibles
- Servicios
- Seguridad
- Limpieza
- Reparaciones
- Administración
- Seguros
- **+ Añadir nueva categoría** (desde el formulario)

### Gestión de Categorías
Menú Lateral → "Configuración" → "Gestionar Categorías"
- Añadir nuevas categorías
- Editar nombres existentes
- Eliminar categorías no utilizadas

---

## 📊 Estado de Cartera

### Acceso a la Sección
Menú Lateral → "Cartera"

### Información Mostrada
- **Apartamento**: Número y propietario
- **Saldo Actual**: Deuda pendiente
- **Último Pago**: Fecha del último abono
- **% Pagado**: Porcentaje del período cumplido
- **Estado**: Al día, Moroso, Moroso Crítico

### Clasificación por Estados
- **Al día**: Pagos completos (80%+)
- **Moroso**: Pagos parciales (50-79%)
- **Moroso Crítico**: Pagos mínimos o nulos (<50%)

### Funciones Disponibles
- Vista tabular completa
- Filtros automáticos por estado
- Base para reportes de cobros

---

## 📜 Historial por Apartamento

### Acceso a la Sección
Menú Lateral → "Historial"

### Uso del Historial
1. **Seleccionar Apartamento**: Del dropdown disponible
2. **Aplicar Filtros**:
   - **Tipo**: Todo, Solo Pagos, Solo Gastos
   - **Período**: Todo tiempo, Últimos 6/3/1 meses
3. **Revisar Resumen**: Estadísticas del apartamento seleccionado
4. **Explorar Transacciones**: Lista cronológica de movimientos

### Información del Resumen
- Pagos totales del período
- Gastos relacionados
- Saldo neto
- Número total de transacciones

### Detalles de Transacciones
- **Fecha**: Cuando ocurrió la transacción
- **Tipo**: Pago (verde) o Gasto (rojo)
- **Concepto**: Descripción de la transacción
- **Monto**: Valor con colores (verde = ingresos, rojo = egresos)
- **Estado**: Siempre "Completado"
- **Detalles**: Información adicional (método, proveedor, etc.)

---

## 📋 Sistema de Reportes

### Acceso a la Sección
Menú Lateral → "Reportes"

### Tipos de Reportes Disponibles

#### 📊 Reporte de Cartera
- Estado completo de cobros por apartamento
- Clasificación por antigüedad de mora
- Totales y porcentajes

#### 💰 Flujo de Caja
- Análisis de ingresos vs egresos
- Tendencias mensuales
- Proyecciones básicas

#### 📈 Top Morosos
- Ranking de apartamentos con mayor morosidad
- Información de contacto prioritaria
- Base para acciones de cobro

### Generación de Reportes
1. Hacer clic en la tarjeta del reporte deseado
2. El sistema simula la generación de PDF
3. Se muestra mensaje de confirmación

### Formatos Soportados
- PDF (simulado)
- CSV (planeado)
- Excel (futuro)

---

## ⚙️ Configuración del Sistema

### Acceso a la Sección
Menú Lateral → "Configuración" (solo Administrador)

### Funciones de Configuración

#### 🏷️ Gestión de Categorías
1. Hacer clic en "Gestionar Categorías"
2. **Añadir**: Escribir nombre y confirmar
3. **Editar**: Hacer clic en lápiz, modificar nombre
4. **Eliminar**: Hacer clic en papelera, confirmar

#### 💾 Respaldo de Datos
- **Exportar Datos**: Descarga archivo JSON con toda la información
- **Importar Datos**: Carga respaldo desde archivo JSON
- **Estadísticas**: Contadores de registros en el sistema

### Archivo de Respaldo
- Formato: JSON
- Contiene: Apartamentos, pagos, gastos, categorías
- Nombre: `salesia-admin-backup-AAAA-MM-DD.json`

---

## 🔒 Seguridad y Privacidad

### Niveles de Acceso
- **Consulta**: Solo lectura, reportes y dashboard
- **Contador**: Gestión financiera completa
- **Administrador**: Acceso total + configuración del sistema

### Protección de Datos
- Contraseñas encriptadas
- Sesiones temporales
- Validación de entradas
- Respaldos locales

### Recomendaciones de Seguridad
1. No compartir credenciales
2. Cambiar contraseñas periódicamente
3. Realizar respaldos regulares
4. Usar navegadores actualizados

---

## ❓ Solución de Problemas

### Problema: No puedo acceder al sistema
**Solución**: Verificar URL correcta y credenciales

### Problema: Los gráficos no se muestran
**Solución**: Recargar la página (F5) o limpiar caché

### Problema: Datos no se guardan
**Solución**: Verificar que el navegador permita localStorage

### Problema: Navegación no funciona
**Solución**: Usar navegador moderno (Chrome, Firefox, Edge)

### Problema: Reportes no se generan
**Solución**: Funcionalidad simulada - contactar desarrollador

---

## 📞 Soporte Técnico

### Canales de Soporte
- **Email**: soporte@salesia-admin.com
- **Documentación**: Sección `/docs/`
- **Repositorio**: GitHub del proyecto

### Información para Reportes de Error
- Versión del navegador
- Sistema operativo
- Descripción exacta del problema
- Pasos para reproducir el error

---

## 🎯 Consejos de Uso Efectivo

### Mejores Prácticas
1. **Actualizar datos regularmente**: Mantener información al día
2. **Realizar respaldos semanales**: Usar función de exportación
3. **Revisar dashboard diariamente**: Monitorear KPIs importantes
4. **Generar reportes mensuales**: Para juntas de copropietarios
5. **Verificar categorías**: Mantener gastos bien clasificados

### Flujos de Trabajo Recomendados

#### 📅 Cierre Mensual
1. Registrar todos los pagos del mes
2. Ingresar gastos correspondientes
3. Revisar estado de cartera
4. Generar reportes para junta
5. Realizar respaldo de datos

#### 🔍 Seguimiento de Morosidad
1. Consultar sección "Cartera"
2. Identificar apartamentos morosos
3. Revisar historial individual
4. Priorizar acciones de cobro
5. Documentar seguimientos

#### 📊 Reportes para Copropietarios
1. Generar reporte de cartera
2. Crear flujo de caja mensual
3. Preparar top de morosos
4. Exportar información relevante

---

## 🚀 Actualizaciones y Mantenimiento

### Versiones del Sistema
- **v1.0**: Funcionalidades básicas implementadas
- **Próximas versiones**: Integración con Google Sheets, notificaciones

### Mantenimiento Recomendado
- Limpiar caché del navegador mensualmente
- Actualizar navegador regularmente
- Verificar respaldos semanalmente
- Reportar bugs inmediatamente

---

## 📋 Glosario de Términos

- **MVP**: Producto Mínimo Viable
- **KPIs**: Indicadores Clave de Rendimiento
- **CRUD**: Crear, Leer, Actualizar, Eliminar
- **localStorage**: Almacenamiento local del navegador
- **Frontend**: Interfaz de usuario
- **Dashboard**: Panel de control principal

---

**Desarrollado específicamente para el Condominio Balcones de Salesia**
**Hackathon Talento Tech Oriente - Cúcuta 2025**

*Para más información, consulte la documentación técnica o contacte al equipo de desarrollo.*