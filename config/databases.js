/*Contiene la conexion a la base de datos */
const mongoose = require('mongoose');
const {mongodb} = require('./keys');

//abriendo la conexion
mongoose.connect(mongodb.URI,{
    useCreateIndex: true,
    useNewUrlParser:true
})
.then(db=>console.log("Conectado con exito!!!"))
.catch(err=>console.error(err));