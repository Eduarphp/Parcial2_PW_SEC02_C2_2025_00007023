const express = require('express');
const router = express.Router();
const controller = require('../controllers/cuentasController');

router.get('/cuentasBalance', controller.cuentasBalance);
router.get('/balance', controller.cuentasBalance); 

router.get('/', (req, res, next) => {
  if (req.query && req.query.queryParam) {
    return controller.query(req, res);
  }
  next();
});

router.get('/', controller.getAll);

router.get('/:id', controller.getById);

module.exports = router;
