const express = require('express');
const app = express();

app.get('/', (_req, res) => {
  res.json({
    nombre: 'Julio Alexander Rivera Aguilar',
    expediente: '25824',
    codigo: 'RA22-I04-001',
  });
});

app.get('/health', (_req, res) => res.json({ status: 'OK' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`API en ${PORT}`));
