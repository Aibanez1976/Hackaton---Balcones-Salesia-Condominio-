# 📤 Instrucciones para Subir a GitHub

## ⚠️ IMPORTANTE: node_modules NO se subirá

El archivo `.gitignore` está configurado para **excluir automáticamente** la carpeta `node_modules/`. Esto es correcto y deseado.

---

## 🚀 Pasos para Subir a GitHub

### Paso 1: Crear Repositorio en GitHub

1. Ve a https://github.com/new
2. Nombre del repositorio: `salesia-admin-pro`
3. Descripción: "SalesiaAdmin Pro - Transformación Digital de Propiedad Horizontal"
4. Selecciona: **Public** (para que el jurado pueda verlo)
5. NO selecciones "Initialize this repository with a README" (ya tenemos uno)
6. Haz clic en **Create repository**

### Paso 2: Copiar la URL del Repositorio

Después de crear el repositorio, GitHub te mostrará una URL como:
```
https://github.com/tu-usuario/salesia-admin-pro.git
```

Cópiala (la necesitarás en el siguiente paso)

---

## 💻 Paso 3: Ejecutar Comandos en Terminal

Abre una terminal en la carpeta del proyecto y ejecuta estos comandos **uno por uno**:

### 3.1 Configurar Git (primera vez)
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@example.com"
```

### 3.2 Inicializar repositorio local
```bash
git init
```

### 3.3 Agregar todos los archivos (excepto node_modules)
```bash
git add .
```

**Verificación**: Ejecuta esto para ver qué archivos se van a subir:
```bash
git status
```

Deberías ver:
- ✅ Todos los archivos .md
- ✅ Todos los archivos de código (src/, public/)
- ✅ package.json
- ✅ .gitignore
- ❌ NO deberías ver node_modules/

### 3.4 Crear el primer commit
```bash
git commit -m "Initial commit: SalesiaAdmin Pro FASE 2 Completa - Transformacion Digital de Propiedad Horizontal"
```

### 3.5 Renombrar rama a 'main'
```bash
git branch -M main
```

### 3.6 Agregar el repositorio remoto
```bash
git remote add origin https://github.com/tu-usuario/salesia-admin-pro.git
```

**Reemplaza** `tu-usuario` con tu usuario de GitHub

### 3.7 Subir a GitHub
```bash
git push -u origin main
```

Se te pedirá autenticación. Usa:
- **Usuario**: Tu usuario de GitHub
- **Contraseña**: Tu token de acceso personal (o contraseña si tienes autenticación básica habilitada)

---

## ✅ Verificación

Después de ejecutar `git push`, verifica que todo se subió correctamente:

1. Ve a https://github.com/tu-usuario/salesia-admin-pro
2. Deberías ver:
   - ✅ Todos los archivos .md
   - ✅ Carpeta `src/`
   - ✅ Carpeta `public/`
   - ✅ Carpeta `data/`
   - ✅ Archivo `package.json`
   - ✅ Archivo `.gitignore`
   - ❌ NO deberías ver carpeta `node_modules/`

---

## 🔑 Generar Token de Acceso Personal (si es necesario)

Si GitHub te pide contraseña y no funciona, necesitas un token:

1. Ve a https://github.com/settings/tokens
2. Haz clic en **Generate new token**
3. Dale un nombre: "SalesiaAdmin Pro"
4. Selecciona permisos: `repo` (acceso completo a repositorios)
5. Haz clic en **Generate token**
6. **Copia el token** (solo aparecerá una vez)
7. Usa el token como contraseña en `git push`

---

## 📋 Checklist de Verificación

- [ ] Repositorio creado en GitHub
- [ ] URL del repositorio copiada
- [ ] Git configurado localmente
- [ ] Repositorio inicializado (`git init`)
- [ ] Archivos agregados (`git add .`)
- [ ] Verificado que node_modules NO está incluido (`git status`)
- [ ] Primer commit creado (`git commit`)
- [ ] Rama renombrada a main (`git branch -M main`)
- [ ] Remote agregado (`git remote add origin`)
- [ ] Push realizado (`git push -u origin main`)
- [ ] Verificado en GitHub que los archivos están presentes
- [ ] Verificado que node_modules NO está en GitHub

---

## 🚨 Solución de Problemas

### Error: "fatal: not a git repository"
**Solución**: Asegúrate de estar en la carpeta correcta:
```bash
cd "c:/Users/Aiban/OneDrive/Documentos/IA -Development/IA Course/Hackaton - Admin- PH"
git init
```

### Error: "fatal: remote origin already exists"
**Solución**: Elimina el remote anterior:
```bash
git remote remove origin
git remote add origin https://github.com/tu-usuario/salesia-admin-pro.git
```

### Error: "Permission denied (publickey)"
**Solución**: Usa HTTPS en lugar de SSH:
```bash
git remote set-url origin https://github.com/tu-usuario/salesia-admin-pro.git
```

### Error: "fatal: The current branch main has no upstream branch"
**Solución**: Usa el comando correcto:
```bash
git push -u origin main
```

### node_modules se está subiendo
**Solución**: El `.gitignore` ya está configurado. Si aún así se sube:
```bash
git rm -r --cached node_modules/
git commit -m "Remove node_modules from tracking"
git push
```

---

## 📱 Compartir URL con el Jurado

Una vez que todo esté en GitHub, comparte esta URL con el jurado:

```
https://github.com/tu-usuario/salesia-admin-pro
```

El jurado podrá:
1. Ver todo el código fuente
2. Ver la documentación
3. Clonar el repositorio
4. Ejecutar `npm install` y `npm start`

---

## 🎯 Resumen Rápido

```bash
# 1. Configurar Git
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@example.com"

# 2. Inicializar y agregar archivos
git init
git add .

# 3. Crear commit
git commit -m "Initial commit: SalesiaAdmin Pro FASE 2 Completa"

# 4. Configurar rama y remote
git branch -M main
git remote add origin https://github.com/tu-usuario/salesia-admin-pro.git

# 5. Subir a GitHub
git push -u origin main
```

---

## ✨ Resultado Final

Después de completar estos pasos:

- ✅ Repositorio en GitHub
- ✅ Código fuente visible
- ✅ Documentación completa
- ✅ node_modules excluido
- ✅ Listo para que el jurado lo revise
- ✅ Listo para clonar e instalar

---

**¡Listo para presentar!** 🏆

---

**Versión**: 2.0  
**Fecha**: 29 de octubre de 2025  
**Estado**: ✅ Instrucciones Completas
