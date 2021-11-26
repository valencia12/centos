const Product = require('../models/Product');
const productController = {};

//mostrar todos los Products
productController.index = async function (req, res, next) {
    //extrallendo a todos los Products
    let products = await Product.find();
    return res.status(200).json(products);
}

//buscar Product
productController.findProduct = async function (req, res, next) {
    let { id } = req.params;
    let product = await Product.findById(id).catch(err => {
        return next(res);
    });
    return res.status(200).json(product);
}
//crear Product
productController.store = async function (req, res, next) {
    let product = new Product();
    product.socialsec = req.body.socialsec;
    product.name = req.body.name;
    product.surname = req.body.surname;
    product.fullname = req.body.fullname;
    product.salary = req.body.salary;
    product.date = req.body.date;

    try {
        await product.save();
        return res.status(200).json({ "message": "Expediente agregado con exito" });
    } catch (err) {
        return res.status(500).json({ err: err, message: "Por favor revise sus datos" });
    }

}

//modificar Product
productController.update = async function (req, res, next) {
    let { id } = req.params;
    let product = {
        socialsec: req.body.socialsec,
        name: req.body.name,
        surname:req.body.surname,
        fullname: req.body.fullname,
        salary: req.body.salary,
        date: req.body.date,
    }
    console.log(product);
    try {
        await Product.update({ _id: id }, product);
        res.status(200).json({ "message": "expediente actualizado con exito" });
    }
    catch (err) {
        return res.status(500).json({ err: err, message: "Por favor revise sus datos" });
    }
}

//eliminar product
productController.delete = async function (req, res, next) {
    let { id } = req.params;
    await Product.remove({ _id: id });
    res.status(200).json({ "message": "Expediente Eliminado con exito" });
}


module.exports = productController;