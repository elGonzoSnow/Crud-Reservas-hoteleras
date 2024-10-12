const express = require('express');
const router = express.Router();
const {
  obtenerReservas,
  crearReserva,
  obtenerReservaPorId,
  actualizarReserva,
  eliminarReserva,
  actualizarParcialReserva
} = require('../controllers/reservasController');

router.get('/', obtenerReservas);
router.post('/', crearReserva);
router.get('/:id', obtenerReservaPorId);
router.put('/:id', actualizarReserva);
router.delete('/:id', eliminarReserva);
router.patch('/:id', actualizarParcialReserva);

module.exports = router;
