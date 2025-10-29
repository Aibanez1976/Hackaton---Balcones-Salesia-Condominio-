# GUÍA COMPLETA - SUBIR A GITHUB
## SalesiaAdmin Pro - Hackathon Cúcuta 2025

**Fecha**: 29 de octubre de 2025  
**Objetivo**: Subir el repositorio completo a GitHub sin node_modules

---

## 📋 PASO 1: PREPARAR EL REPOSITORIO LOCAL

### 1.1 Verificar que .gitignore existe
```bash
# El archivo .gitignore ya está creado en la raíz del proyecto
# Contiene: node_modules/, package-lock.json, backups/, uploads/, etc.
```

### 1.2 Verificar estado actual
```bash
cd "c:/Users/Aiban/OneDrive/Documentos/IA -Development/IA Course/Hackaton - Admin- PH"
git status
```

**Resultado esperado**:
- Archivos sin seguimiento (untracked files)
- node_modules/ NO debe aparecer (está en .gitignore)

---

## 🔧 PASO 2: INICIALIZAR GIT (Si no está inicializado)

### 2.1 Inicializar repositorio
```bash
git init
```

### 2.2 Agregar configuración de usuario
```bash
git config user.name "Tu Nombre"
git config user.email "tu.email@example.com"
```

### 2.3 Agregar todos los archivos (excepto los en .gitignore)
```bash
git add .
```

### 2.4 Verificar archivos a subir
```bash
git status
```

**Archivos que DEBEN aparecer**:
- ✅ src/ (carpeta completa)
- ✅ public/ (carpeta completa)
- ✅ data/ (carpeta con salesia.db)
- ✅ *.md (todos los documentos)
- ✅ package.json
- ✅ server.js
- ✅ .gitignore
- ✅ .env (si existe)

**Archivos que NO deben aparecer**:
- ❌ node_modules/
- ❌ backups/
- ❌ uploads/
- ❌ .vscode/

---

## 📝 PASO 3: CREAR COMMIT INICIAL

### 3.1 Crear primer commit
```bash
git commit -m "Initial commit: SalesiaAdmin Pro - FASE 2 Completa

- Implementación de Conciliación Bancaria
- Implementación de Respaldo Automático
- Implementación de Bitácora de Cambios
- Implementación de Reporte Top Morosos
- 16 endpoints API nuevos
- Documentación completa
- Validación 100% exitosa"
```

### 3.2 Verificar commit
```bash
git log --oneline
```

---

## 🌐 PASO 4: CREAR REPOSITORIO EN GITHUB

### 4.1 Ir a GitHub
```
https://github.com/new
```

### 4.2 Crear nuevo repositorio
- **Repository name**: `salesia-admin-pro` (o tu nombre preferido)
- **Description**: "Sistema de Gestión de Propiedad Horizontal - Hackathon Cúcuta 2025"
- **Visibility**: Public (para que el jurado pueda verlo)
- **Initialize this repository with**: NO seleccionar nada
- Click: **Create repository**

### 4.3 Copiar la URL del repositorio
```
https://github.com/TU_USUARIO/salesia-admin-pro.git
```

---

## 🚀 PASO 5: CONECTAR Y SUBIR A GITHUB

### 5.1 Agregar remote
```bash
git remote add origin https://github.com/TU_USUARIO/salesia-admin-pro.git
```

### 5.2 Renombrar rama a main (si es necesario)
```bash
git branch -M main
```

### 5.3 Subir al repositorio
```bash
git push -u origin main
```

**Nota**: Si pide autenticación:
- Usar token de GitHub (recomendado)
- O usar usuario y contraseña

---

## 📦 PASO 6: VERIFICAR EN GITHUB

### 6.1 Ir al repositorio en GitHub
```
https://github.com/TU_USUARIO/salesia-admin-pro
```

### 6.2 Verificar que aparecen:
- ✅ Carpeta `src/`
- ✅ Carpeta `public/`
- ✅ Carpeta `data/`
- ✅ Archivo `package.json`
- ✅ Archivo `server.js`
- ✅ Archivo `README.md`
- ✅ Archivo `.gitignore`
- ✅ Todos los documentos .md

### 6.3 Verificar que NO aparecen:
- ❌ Carpeta `node_modules/`
- ❌ Carpeta `backups/`
- ❌ Carpeta `uploads/`

---

## 📥 PASO 7: INSTRUCCIONES PARA CLONAR Y EJECUTAR

### 7.1 Crear archivo SETUP.md
```markdown
# Instrucciones de Instalación

## Clonar el repositorio
\`\`\`bash
git clone https://github.com/TU_USUARIO/salesia-admin-pro.git
cd salesia-admin-pro
\`\`\`

## Instalar dependencias
\`\`\`bash
npm install
\`\`\`

## Ejecutar el servidor
\`\`\`bash
npm start
\`\`\`

## Acceder a la aplicación
```
http://localhost:3000
```

## Credenciales de prueba
- Email: admin@salesia.com
- Contraseña: admin123
```

### 7.2 Agregar SETUP.md al repositorio
```bash
git add SETUP.md
git commit -m "Add setup instructions"
git push
```

---

## 🔍 VERIFICACIÓN FINAL

### Checklist de GitHub
- [x] Repositorio creado
- [x] Todos los archivos subidos
- [x] node_modules NO está en el repositorio
- [x] .gitignore está presente
- [x] README.md visible
- [x] Documentación completa
- [x] Código fuente completo
- [x] package.json presente

### Tamaño esperado del repositorio
```
Sin node_modules: ~5-10 MB
Con node_modules: ~500+ MB (por eso lo excluimos)
```

---

## 📊 ESTRUCTURA DEL REPOSITORIO EN GITHUB

```
salesia-admin-pro/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   ├── migrations.js
│   │   └── seeders.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── audit.js
│   ├── services/
│   │   ├── bankReconciliation.js
│   │   └── backup.js
│   └── routes/
│       ├── auth.js
│       ├── apartments.js
│       ├── portfolio.js
│       ├── payments.js
│       ├── expenses.js
│       ├── reports.js
│       ├── reconciliation.js
│       └── audit.js
├── public/
│   ├── index.html
│   ├── test.html
│   ├── js/
│   │   └── app.js
│   └── css/
│       └── style.css
├── data/
│   └── salesia.db
├── server.js
├── package.json
├── .gitignore
├── README.md
├── SETUP.md
└── [Documentación .md]
```

---

## ⚠️ SOLUCIÓN DE PROBLEMAS

### Problema: "fatal: not a git repository"
```bash
# Solución: Inicializar git
git init
```

### Problema: "Permission denied (publickey)"
```bash
# Solución: Usar token en lugar de SSH
# O generar clave SSH: ssh-keygen -t ed25519
```

### Problema: "node_modules está en el repositorio"
```bash
# Solución: Remover del repositorio
git rm -r --cached node_modules/
git commit -m "Remove node_modules"
git push
```

### Problema: "Archivo muy grande"
```bash
# Si algún archivo supera 100MB:
# Usar Git LFS (Large File Storage)
git lfs install
git lfs track "*.db"
git add .gitattributes
git commit -m "Add Git LFS"
git push
```

---

## 🎯 COMANDOS RÁPIDOS

### Subir cambios futuros
```bash
git add .
git commit -m "Descripción del cambio"
git push
```

### Ver historial
```bash
git log --oneline
```

### Ver cambios pendientes
```bash
git status
```

### Descargar cambios del servidor
```bash
git pull
```

---

## 📱 COMPARTIR CON EL JURADO

### URL del repositorio
```
https://github.com/TU_USUARIO/salesia-admin-pro
```

### Instrucciones para el jurado
1. Clonar: `git clone https://github.com/TU_USUARIO/salesia-admin-pro.git`
2. Instalar: `npm install`
3. Ejecutar: `npm start`
4. Acceder: `http://localhost:3000`
5. Login: admin@salesia.com / admin123

---

## ✅ CHECKLIST FINAL

- [ ] .gitignore creado
- [ ] Git inicializado
- [ ] Primer commit realizado
- [ ] Repositorio creado en GitHub
- [ ] Remote agregado
- [ ] Código subido a GitHub
- [ ] Verificar que node_modules NO está
- [ ] SETUP.md creado
- [ ] README.md actualizado
- [ ] URL compartida con el jurado

---

**Generado**: 29 de octubre de 2025  
**Estado**: Listo para subir a GitHub
