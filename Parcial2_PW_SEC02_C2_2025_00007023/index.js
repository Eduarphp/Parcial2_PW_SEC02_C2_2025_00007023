const express = require('express');
const app = express();
const cuentasRouter = require('./routes/cuentas');
const controller = require('./controllers/cuentasController');

const PORT = 3130;

app.use(express.json());

app.use('/cuentas', cuentasRouter);

app.get('/cuenta/:id', controller.getById);

app.get('/', (req, res) => {
  res.send('Servidor API de Cuentas ejecutándose en puerto ' + PORT);
});


app.listen(PORT, () => {
  console.log(` Servidor escuchando en http://localhost:${PORT}`);
});