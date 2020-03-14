'use strict';

module.exports = {
  getUsuarios: (req, res) => {
    res.json({ message: "Dados dos usuários válidos, verifique no console" })
  },
  postUsuarios: require('../controller/userController'),
  login: require('../controller/loginController')
}
