const User = require('../models/User');
const loginController = {};

//mostrar todos los usuarios
loginController.findUser = async function (req, res, next) {
    let { id } = req.params;
    let user = await User.findById(id).catch(err => {
        return next(res);
    });
    return res.status(200).json(user);
}
