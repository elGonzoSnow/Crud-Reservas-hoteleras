require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  urlBase: process.env.URL_BASE || '/api'
};

module.exports = config;
