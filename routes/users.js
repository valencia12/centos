var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
  //mostrar todos los producto
  router.get('/', userController.index);
  //mostrar un producto
  router.get('/:id',userController.findUser);
  //insertar producto
  router.post('/',userController.store);
  //actualizar producto
  router.put('/:id',userController.update);
  //eliminando producto
  router.delete('/:id',userController.delete);
module.exports = router;
