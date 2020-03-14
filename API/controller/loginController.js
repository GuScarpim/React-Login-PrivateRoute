const Usuario = require('../model/modelUsuario');
const jwt = require('jwt-simple');
const moment = require('moment');
const segredo = 'scarpim'

//Essa função serve para buscar e verificar se o email/senha estão corretos
module.exports = (req, res) => {
  var password = req.body.password || '';
  var email = req.body.email || '';
  if (password == '' || email == '') {
    return res.send(401);
  }
//Procurar email
  Usuario.findOne({ email: email }, (err, user) => {
    if (err) {
      return res.send(401)
    }
// Se a senha estiver correta
    user.verificarSenha(password, (isMatch) => {
      if (!isMatch) {
        return res.send(401);
      }
//Essa parte fará com que o token da senha expire a cada 2 dias
      var expirar = moment().add(2, 'days').valueOf();
      var token = jwt.encode({
        iss: user.id,
        exp: expirar
      }, segredo);
      return res.json({
        token: token,
        expirar: expirar,
        user: user.toJSON()
      });
    });
  });
};