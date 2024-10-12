const express = require('express');
const config = require('./config/config');
const reservasRoutes = require('./routes/reservasRoutes');

const app = express();

app.use(express.json());
app.use(config.urlBase + '/reservas', reservasRoutes);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
