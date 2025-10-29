const express = require('express');
const router = express.Router();
const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login
router.post('/login', (req, res) => {
  console.log('[AUTH] ===== LOGIN REQUEST RECEIVED =====');
  const { email, password } = req.body;

  console.log(`[AUTH] Login attempt for: ${email}`);
  console.log(`[AUTH] Password provided: ${password ? 'YES' : 'NO'}`);

  if (!email || !password) {
    console.log('[AUTH] Missing email or password');
    return res.status(400).json({ error: 'Email y contraseña requeridos' });
  }

  console.log('[AUTH] About to query database...');
  
  db.get(
    `SELECT u.id, u.name, u.email, u.password, r.name as role
     FROM users u
     JOIN roles r ON u.role_id = r.id
     WHERE u.email = ?`,
    [email],
    (err, user) => {
      console.log('[AUTH] Database callback triggered');
      
      if (err) {
        console.error('[AUTH] Database error:', err);
        return res.status(500).json({ error: 'Error en servidor' });
      }

      if (!user) {
        console.log(`[AUTH] User not found: ${email}`);
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      console.log(`[AUTH] User found: ${user.email}, comparing password...`);
      console.log(`[AUTH] Stored hash: ${user.password.substring(0, 20)}...`);
      
      try {
        const passwordMatch = bcrypt.compareSync(password, user.password);
        console.log(`[AUTH] Password match result: ${passwordMatch}`);
        
        if (!passwordMatch) {
          console.log(`[AUTH] Password mismatch for: ${email}`);
          return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        console.log(`[AUTH] Password match! Generating token for: ${email}`);

        const token = jwt.sign(
          { id: user.id, email: user.email, role: user.role, name: user.name },
          process.env.JWT_SECRET || 'salesia-secret-key-2025',
          { expiresIn: '24h' }
        );

        console.log(`[AUTH] Login successful for: ${email}`);
        console.log('[AUTH] ===== LOGIN RESPONSE SENT =====');

        res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        });
      } catch (error) {
        console.error('[AUTH] Error during authentication:', error);
        return res.status(500).json({ error: 'Error en servidor' });
      }
    }
  );
});

// Logout (simplemente retorna confirmación)
router.post('/logout', (req, res) => {
  res.json({ message: 'Sesión cerrada' });
});

module.exports = router;