# SalesiaAdmin Pro - Sistema de Gestión de Propiedad Horizontal

## 📋 Descripción del Proyecto

SalesiaAdmin Pro es una solución digital completa para la gestión administrativa y contable del Condominio Balcones de Salesia. Desarrollado como prototipo funcional para el Hackathon Talento Tech Oriente - Cúcuta 2025, este sistema permite organizar, consolidar y analizar toda la información contable-administrativa del conjunto residencial.

## 🎯 Problema Resuelto

El Condominio Balcones de Salesia administra 13 apartamentos con procesos manuales que generan:
- Duplicidad de datos
- Errores de digitación
- Archivos dispersos
- Demoras en cierres contables
- Poca visibilidad del flujo de caja
- Dificultad para generar reportes

## ✨ Solución Implementada

### Arquitectura Frontend Pura
- **Tecnología**: HTML5, CSS3, JavaScript ES6+, Bootstrap 5, Chart.js
- **Almacenamiento**: localStorage del navegador
- **Despliegue**: GitHub Pages (sin servidor requerido)
- **Compatibilidad**: Navegadores modernos

### Funcionalidades Principales

#### 1. **Dashboard Ejecutivo**
- KPIs en tiempo real (apartamentos, cartera total, pagos, gastos)
- Gráficos interactivos de cartera por antigüedad
- Visualización de gastos por categoría
- Alertas de morosidad

#### 2. **Gestión del Censo de Residentes**
- Registro completo de apartamentos
- Información de propietarios y residentes
- Control de vehículos y mascotas
- Actualización de datos administrativos

#### 3. **Registro de Pagos y Gastos**
- Formularios intuitivos para ingresos
- Categorización dinámica de gastos
- Validaciones automáticas
- Historial completo de transacciones

#### 4. **Estado de Cartera**
- Saldos automáticos por apartamento
- Clasificación por antigüedad (30/60/90+ días)
- Alertas de morosidad
- Reportes de cobros pendientes

#### 5. **Historial por Apartamento**
- Vista completa de transacciones por unidad
- Filtros por tipo y período
- Resumen estadístico personalizado
- Trazabilidad histórica

#### 6. **Sistema de Reportes**
- Exportación a PDF/CSV
- Reportes de cartera, flujo de caja, gastos por categoría
- Top de morosos
- Resúmenes mensuales

#### 7. **Configuración del Sistema**
- Gestión dinámica de categorías de gastos
- Exportación/importación de datos
- Estadísticas del sistema
- Personalización de parámetros

## 🔐 Seguridad Implementada

### Control de Acceso
- **Autenticación**: Usuario/contraseña por rol
- **Roles definidos**:
  - **Administrador**: Acceso completo (CRUD + configuración)
  - **Contador**: Gestión financiera completa
  - **Consulta**: Solo lectura y reportes

### Protección de Datos
- **Encriptación local** de datos sensibles
- **Bitácora de cambios** automática
- **Respaldos exportables** (JSON)
- **Validaciones** de entrada de datos

## 📊 Ventajas Competitivas del Enfoque Frontend

### Para Conjuntos Residenciales de 15 Unidades

#### 1. **Cero Costos de Infraestructura**
- Sin servidores dedicados
- Sin bases de datos externas
- Sin costos de hosting mensual
- Despliegue gratuito en GitHub Pages

#### 2. **Mantenimiento Mínimo**
- Actualizaciones automáticas vía navegador
- Sin dependencias de servidor
- Respaldos locales automáticos
- Compatibilidad universal

#### 3. **Flexibilidad Operativa**
- Funciona sin conexión a internet
- Acceso desde cualquier dispositivo
- Sincronización opcional con Google Sheets
- Escalabilidad horizontal sin límites

#### 4. **Rapidez de Implementación**
- Despliegue en minutos
- Sin configuración compleja
- Interfaz familiar (web)
- Capacitación mínima requerida

#### 5. **Escalabilidad Inteligente**
- Crece con el conjunto residencial
- Migración futura a soluciones enterprise
- APIs preparadas para integración
- Arquitectura modular

## 🏗️ Arquitectura y Escalabilidad

### Diseño Actual (MVP)
```
Frontend Puro
├── HTML5/CSS3/JavaScript
├── localStorage (base de datos cliente)
├── Bootstrap 5 + Chart.js
└── GitHub Pages (despliegue)
```

### Ruta de Escalabilidad Futura
```
Fase 2: Híbrido
├── Frontend existente
├── Google Sheets API (sincronización)
└── Respaldos automáticos

Fase 3: Enterprise
├── Backend Node.js/Express
├── Base de datos PostgreSQL
├── APIs RESTful
└── Autenticación JWT

Fase 4: Cloud-Native
├── Microservicios
├── Kubernetes
├── Integración IA
└── Analytics avanzados
```

## 📈 Impacto Esperado

### Métricas de Mejora
- **Tiempo de reportes**: 90% reducción
- **Errores de digitación**: 95% disminución
- **Trazabilidad**: 100% digital
- **Acceso a información**: 24/7 disponible
- **Costos operativos**: 70% reducción

### Beneficios para el Condominio
- **Transparencia total** para copropietarios
- **Toma de decisiones** basada en datos
- **Cumplimiento normativo** automatizado
- **Profesionalización** de la gestión
- **Valorización** del conjunto residencial

## 🚀 Guía de Uso Rápida

### Acceso al Sistema
1. Abrir navegador web moderno
2. Ir a: `https://[usuario].github.io/salesia-admin/`
3. Iniciar sesión con credenciales:
   - **Admin**: admin@salesia.com / Admin123!
   - **Contador**: contador@salesia.com / Contador123!
   - **Consulta**: consulta@salesia.com / Consulta123!

### Navegación Principal
- **Dashboard**: Vista general del estado financiero
- **Censo**: Gestión de apartamentos y residentes
- **Pagos**: Registro de ingresos
- **Gastos**: Control de egresos
- **Cartera**: Estado de cobros
- **Historial**: Transacciones por apartamento
- **Reportes**: Generación de informes
- **Configuración**: Personalización del sistema

## 📋 Requisitos del Sistema

### Navegador
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Hardware Mínimo
- 2GB RAM
- 1GB espacio disponible
- Conexión internet (opcional)

### Sistema Operativo
- Windows 10+
- macOS 10.15+
- Linux Ubuntu 18.04+
- Android/iOS (navegador móvil)

## 🔄 Plan de Evolución Post-Hackathon

### Fase 1 (Inmediata - 1 mes)
- Implementación en producción
- Capacitación del personal administrativo
- Migración de datos históricos

### Fase 2 (Corto plazo - 3 meses)
- Integración con Google Sheets
- Notificaciones por email
- Respaldos automáticos en la nube

### Fase 3 (Mediano plazo - 6 meses)
- Aplicación móvil nativa
- Integración con pasarelas de pago
- Módulo de comunicaciones

### Fase 4 (Largo plazo - 12 meses)
- Inteligencia artificial para predicciones
- Integración con sistemas contables
- Analytics avanzados

## 👥 Equipo Desarrollador

- **Arquitectura**: Diseño de sistema escalable
- **Frontend**: Interfaz de usuario intuitiva
- **Backend**: Lógica de negocio optimizada
- **Documentación**: Manuales completos

## 📞 Soporte y Contacto

Para soporte técnico o consultas:
- Email: soporte@salesia-admin.com
- Documentación: `/docs/`
- Repositorio: GitHub

## 📄 Licencia

Este proyecto es de código abierto bajo licencia MIT, desarrollado específicamente para el Condominio Balcones de Salesia como parte del Hackathon Talento Tech Oriente - Cúcuta 2025.

---

**Desarrollado con ❤️ para el Condominio Balcones de Salesia**
**Hackathon Talento Tech Oriente - Cúcuta 2025**