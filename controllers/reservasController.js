let reservas = require('../models/reservasModel');

// Obtener todas las reservas o filtrar por parámetros
const obtenerReservas = (req, res) => {
  let resultado = reservas;

  const { hotel, fecha_inicio, fecha_fin, tipo_habitacion, estado, num_huespedes } = req.query;

  if (hotel) {
    resultado = resultado.filter(r => r.hotel.toLowerCase() === hotel.toLowerCase());
  }
  if (fecha_inicio && fecha_fin) {
    resultado = resultado.filter(r => r.fecha_inicio >= fecha_inicio && r.fecha_fin <= fecha_fin);
  }
  if (tipo_habitacion) {
    resultado = resultado.filter(r => r.tipo_habitacion.toLowerCase() === tipo_habitacion.toLowerCase());
  }
  if (estado) {
    resultado = resultado.filter(r => r.estado.toLowerCase() === estado.toLowerCase());
  }
  if (num_huespedes) {
    resultado = resultado.filter(r => r.num_huespedes == num_huespedes);
  }

  res.json(resultado);
};

// Crear una nueva reserva
const crearReserva = (req, res) => {
  const nuevaReserva = {
    id: reservas.length + 1,
    nombre: req.body.nombre,
    correo: req.body.correo,
    ...req.body
  };
  reservas.push(nuevaReserva);
  res.status(201).json(nuevaReserva);
};

// Obtener una reserva por ID
const obtenerReservaPorId = (req, res) => {
  const reserva = reservas.find(r => r.id == req.params.id);
  if (!reserva) {
    return res.status(404).json({ mensaje: 'Reserva no encontrada' });
  }
  res.json(reserva);
};

// Actualizar una reserva
const actualizarReserva = (req, res) => {
  const index = reservas.findIndex(r => r.id == req.params.id);
  if (index === -1) {
    return res.status(404).json({ mensaje: 'Reserva no encontrada' });
  }
  reservas[index] = { ...reservas[index], ...req.body };
  res.json(reservas[index]);
};

// Eliminar una reserva
const eliminarReserva = (req, res) => {
  const id = req.params.id;
  const reserva = reservas.find(r => r.id == id);

  if (!reserva) {
    return res.status(404).json({ mensaje: 'Reserva no encontrada' });
  }

  reservas = reservas.filter(r => r.id != id);

  console.log(`Reserva con ID ${id} eliminada correctamente.`);  // Mensaje en consola
  res.status(200).json({ mensaje: `Reserva con ID ${id} eliminada con éxito.` });  // Mensaje en la respuesta
};


// Actualizar parcialmente una reserva
const actualizarParcialReserva = (req, res) => {
  const reserva = reservas.find(r => r.id == req.params.id);
  
  if (!reserva) {
    return res.status(404).json({ mensaje: 'Reserva no encontrada' });
  }

  const { estado, correo, num_huespedes } = req.body;
  
  if (estado) {
    reserva.estado = estado;
  }
  if (correo) {
    reserva.correo = correo;
  }
  if (num_huespedes) {
    reserva.num_huespedes = num_huespedes;
  }

  res.json(reserva);
};

module.exports = {
  obtenerReservas,
  crearReserva,
  obtenerReservaPorId,
  actualizarReserva,
  eliminarReserva,
  actualizarParcialReserva
};
