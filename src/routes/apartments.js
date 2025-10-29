const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Obtener todos los apartamentos
router.get('/', authMiddleware, (req, res) => {
  db.all(
    `SELECT a.*, 
            COUNT(DISTINCT o.id) as owners_count,
            COUNT(DISTINCT r.id) as residents_count,
            COUNT(DISTINCT v.id) as vehicles_count,
            COUNT(DISTINCT p.id) as pets_count
     FROM apartments a
     LEFT JOIN owners o ON a.id = o.apartment_id
     LEFT JOIN residents r ON a.id = r.apartment_id
     LEFT JOIN vehicles v ON o.id = v.owner_id
     LEFT JOIN pets p ON a.id = p.apartment_id
     GROUP BY a.id
     ORDER BY a.number`,
    (err, apartments) => {
      if (err) {
        return res.status(500).json({ error: 'Error al obtener apartamentos' });
      }
      res.json(apartments);
    }
  );
});

// Obtener apartamento por ID
router.get('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;

  db.get(
    `SELECT a.*, 
            COUNT(DISTINCT o.id) as owners_count,
            COUNT(DISTINCT r.id) as residents_count
     FROM apartments a
     LEFT JOIN owners o ON a.id = o.apartment_id
     LEFT JOIN residents r ON a.id = r.apartment_id
     WHERE a.id = ?
     GROUP BY a.id`,
    [id],
    (err, apartment) => {
      if (err) {
        return res.status(500).json({ error: 'Error al obtener apartamento' });
      }

      if (!apartment) {
        return res.status(404).json({ error: 'Apartamento no encontrado' });
      }

      // Obtener propietarios
      db.all(
        'SELECT * FROM owners WHERE apartment_id = ?',
        [id],
        (err, owners) => {
          if (err) {
            return res.status(500).json({ error: 'Error al obtener propietarios' });
          }

          // Obtener residentes
          db.all(
            'SELECT * FROM residents WHERE apartment_id = ?',
            [id],
            (err, residents) => {
              if (err) {
                return res.status(500).json({ error: 'Error al obtener residentes' });
              }

              // Obtener mascotas
              db.all(
                'SELECT * FROM pets WHERE apartment_id = ?',
                [id],
                (err, pets) => {
                  if (err) {
                    return res.status(500).json({ error: 'Error al obtener mascotas' });
                  }

                  res.json({
                    ...apartment,
                    owners,
                    residents,
                    pets
                  });
                }
              );
            }
          );
        }
      );
    }
  );
});

// Crear apartamento
router.post('/', authMiddleware, roleMiddleware(['Administrador']), (req, res) => {
  const { number, tower, area, coefficient, monthly_fee } = req.body;

  if (!number || !monthly_fee) {
    return res.status(400).json({ error: 'Campos requeridos: number, monthly_fee' });
  }

  db.run(
    `INSERT INTO apartments (number, tower, area, coefficient, monthly_fee) 
     VALUES (?, ?, ?, ?, ?)`,
    [number, tower, area, coefficient, monthly_fee],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Error al crear apartamento' });
      }
      res.status(201).json({ id: this.lastID, message: 'Apartamento creado' });
    }
  );
});

// Actualizar apartamento
router.put('/:id', authMiddleware, roleMiddleware(['Administrador']), (req, res) => {
  const { id } = req.params;
  const { number, tower, area, coefficient, monthly_fee, status } = req.body;

  db.run(
    `UPDATE apartments 
     SET number = ?, tower = ?, area = ?, coefficient = ?, monthly_fee = ?, status = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [number, tower, area, coefficient, monthly_fee, status, id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Error al actualizar apartamento' });
      }
      res.json({ message: 'Apartamento actualizado' });
    }
  );
});

module.exports = router;