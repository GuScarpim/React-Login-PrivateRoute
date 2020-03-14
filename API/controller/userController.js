const Model = require('../model/modelUsuario');

// Função para cadastrar um novo usuário
module.exports = (req, res) => {
  const data = new Model({
    username: req.body.username,
    lastname: req.body.lastname,
    password: req.body.password,
    email: req.body.email
  });
  data.save((err) => {
    if (err)
      res.send('errrrrro' + err);
    res.json({ message: 'Usuário cadastrado: ', data: data });
  });
};