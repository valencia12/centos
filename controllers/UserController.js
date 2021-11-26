const User = require('../models/User');
const userController = {};

//mostrar todos los usuarios
userController.index = async function (req, res, next) {
    //extrallendo a todos los usuarios
    let users = await User.find();
    return res.status(200).json(users);
}

//buscar usuario
userController.findUser = async function (req, res, next) {
    let { id } = req.params;
    let user = await User.findById(id).catch(err => {
        return next(res);
    });
    return res.status(200).json(user);
}
//crear usario
userController.store = async function (req, res, next) {
    let user = new User();
    user.fullname = req.body.fullname;
    user.name = req.body.name;
    user.surname = req.body.surname;
    user.pass = req.body.pass;
    user.email = req.body.email;
    user.address = req.body.address;
    user.birth = req.body.birth;
    user.admin = req.body.admin;

    try {
        await user.save();
        return res.status(200).json({ "message": "Usuario agregado con exito" });
    } catch (err) {
        return res.status(500).json({ err: err, message: "Por favor revise sus datos" });
    }

}

//modificar usuario
userController.update = async function (req, res, next) {
    let { id } = req.params;
    let user = {
        fullname: req.body.fullname,
        name: req.body.name,
        surname: req.body.surname,
        pass: req.body.pass,
        email: req.body.email,
        address: req.body.address,
        birth: req.body.birth,
        admin: req.body.admin
    }
    console.log(user);
    try {
        await User.update({ _id: id }, user);
        res.status(200).json({ "message": "Usuario actualizado con exito" });
    }
    catch (err) {
        return res.status(500).json({ err: err, message: "Por favor revise sus datos" });
    }
}

//eliminar usuario
userController.delete = async function (req, res, next) {
    let { id } = req.params;
    await User.remove({ _id: id });
    res.status(200).json({ "message": "Usuario Eliminado con exito" });
}


module.exports = userController;