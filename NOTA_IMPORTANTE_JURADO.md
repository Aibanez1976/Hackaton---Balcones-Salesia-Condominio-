# ⚠️ NOTA IMPORTANTE PARA EL JURADO

## 🎯 CÓMO ACCEDER A LA APLICACIÓN COMPLETA

### ❌ GitHub Pages - Solo Frontend Estático
**URL**: https://aibanez1976.github.io/Hackaton---Balcones-Salesia-Condominio-/

**Limitación**: GitHub Pages **SOLO sirve archivos estáticos** (HTML, CSS, JS).  
**NO puede ejecutar**: El backend de Node.js (autenticación, base de datos, API REST).

**Resultado**: Verá la pantalla de login pero **NO podrá autenticarse** porque el servidor backend no está corriendo.

---

## ✅ INSTALACIÓN LOCAL - APLICACIÓN COMPLETA (RECOMENDADO)

### Opción 1: Con node_modules Incluido (Más Rápido - 2 minutos)

```bash
# 1. Clonar el repositorio
git clone https://github.com/Aibanez1976/Hackaton---Balcones-Salesia-Condominio-.git

# 2. Entrar al directorio
cd Hackaton---Balcones-Salesia-Condominio-

# 3. Iniciar el servidor (node_modules ya incluido)
npm start

# 4. Acceder en navegador
http://localhost:3000
```

### Opción 2: Instalación Completa (5 minutos)

```bash
# 1. Clonar el repositorio
git clone https://github.com/Aibanez1976/Hackaton---Balcones-Salesia-Condominio-.git

# 2. Entrar al directorio
cd Hackaton---Balcones-Salesia-Condominio-

# 3. Instalar dependencias
npm install

# 4. Iniciar el servidor
npm start

# 5. Acceder en navegador
http://localhost:3000
```

---

## 🔑 CREDENCIALES DE ACCESO

### Para Instalación Local (Backend Funcionando)

| Rol | Usuario | Contraseña | Acceso |
|-----|---------|-----------|--------|
| **Admin** | admin@salesia.com | admin123 | Completo |
| **Contador** | contador@salesia.com | contador123 | Reportes + Conciliación |
| **Consulta** | consulta@salesia.com | consulta123 | Solo lectura |

**IMPORTANTE**: Las contraseñas son en minúsculas sin símbolos especiales.

---

## 📋 VERIFICACIÓN DE FUNCIONAMIENTO

### ✅ Después de ejecutar `npm start`, verifica:

1. **Servidor iniciado**: Verás el mensaje "🚀 Servidor ejecutándose en http://localhost:3000"
2. **Base de datos**: Verás "✅ Base de datos inicializada correctamente"
3. **Backups**: Verás "✅ Backups automáticos configurados"

### ✅ En el navegador (http://localhost:3000):

1. **Login**: Ingresa con admin@salesia.com / admin123
2. **Dashboard**: Verás KPIs y gráficos con datos
3. **Apartamentos**: Verás 13 apartamentos (101-113)
4. **Pagos**: Verás historial de 6 meses
5. **Gastos**: Verás gastos categorizados
6. **Cartera**: Verás deudas por apartamento
7. **Conciliación**: Podrás importar CSV
8. **Auditoría**: Verás bitácora de cambios
9. **Reportes**: Podrás exportar PDF/CSV

---

## 🎯 POR QUÉ INSTALACIÓN LOCAL ES NECESARIA

### GitHub Pages (Solo Frontend)
- ✅ Sirve HTML, CSS, JS
- ❌ NO ejecuta Node.js
- ❌ NO ejecuta backend
- ❌ NO tiene base de datos
- ❌ NO tiene autenticación
- ❌ NO tiene API REST

### Instalación Local (Aplicación Completa)
- ✅ Sirve HTML, CSS, JS
- ✅ Ejecuta Node.js
- ✅ Ejecuta backend
- ✅ Tiene base de datos SQLite
- ✅ Tiene autenticación JWT
- ✅ Tiene API REST (40+ endpoints)
- ✅ Tiene backups automáticos
- ✅ Tiene auditoría completa

---

## 🚀 REQUISITOS PREVIOS

### Software Necesario
- **Node.js** v18.0.0 o superior ([Descargar](https://nodejs.org/))
- **npm** v9.0.0 o superior (incluido con Node.js)
- **Git** ([Descargar](https://git-scm.com/))
- **Navegador moderno** (Chrome, Firefox, Edge, Safari)

### Verificar Instalación
```bash
# Verificar Node.js
node --version

# Verificar npm
npm --version

# Verificar Git
git --version
```

---

## 🎓 RESUMEN

### ❌ GitHub Pages
- **Propósito**: Mostrar el frontend estático
- **Limitación**: NO ejecuta backend
- **Uso**: Ver diseño y estructura

### ✅ Instalación Local (RECOMENDADO)
- **Propósito**: Demostrar aplicación completa
- **Ventaja**: Backend + Frontend + BD funcionando
- **Uso**: Demostración completa de funcionalidades

---

## 📞 SOPORTE

Si tienes problemas con la instalación:

1. **Verifica Node.js**: `node --version` (debe ser v18+)
2. **Reinstala dependencias**: `npm install`
3. **Inicia servidor**: `npm start`
4. **Accede**: http://localhost:3000

---

## 🏆 CONCLUSIÓN

**Para una demostración completa de SalesiaAdmin Pro**, es **NECESARIO** ejecutar la aplicación localmente usando `npm start`.

GitHub Pages solo muestra el frontend estático, pero la **verdadera potencia** del sistema (autenticación, base de datos, API REST, backups, auditoría, conciliación) **requiere el backend de Node.js**.

---

**Versión**: 2.0  
**Fecha**: 29 de octubre de 2025  
**Estado**: ✅ LISTO PARA INSTALACIÓN LOCAL  
**Equipo**: Desarrollo IA Course  
**Hackathon**: Cúcuta 2025
