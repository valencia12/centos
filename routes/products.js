var express = require('express');
var router = express.Router();
const productController = require('../controllers/ProductController');
  //mostrar todos los producto
  router.get('/', productController.index);
  //mostrar un producto
  router.get('/:id',productController.findProduct);
  //insertar producto
  router.post('/',productController.store);
  //actualizar producto
  router.put('/:id',productController.update);
  //eliminando producto
  router.delete('/:id',productController.delete);
module.exports = router;
