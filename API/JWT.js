const model = require('./model/modelUsuario');
const jwt = require('jwt-simple');
const segredo = 'scarpim';

// Faz a verificacao do token
module.exports = (req, res, next) => {
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

  if (token) {
    try {
// decode para ver se o token expirou
      var decoded = jwt.decode(token, segredo);
      console.log('decodando ' + decoded);
//se o token estiver expirado
      if (decoded.exp <= Date.now()) {
        res.json(400, { error: 'Token expirou, faça o login novamente' });
      }
//Token inválido
      model.findOne({ _id: decoded.iss }, (err, user) => {
        if (err)
          res.status(500).json({ message: "erro ao procurar usuario do token." })
// Se tiver usuario na req.user: 
        req.user = user;
        console.log('Usuário encontrado ' + req.user)
        return next();
      });
//Token errado
    } catch (err) {
      return res.status(401).json({ message: 'Error: Token inexistente' });
    }
  } else {
    res.json(401, { message: 'Token não encontrado' })
  }
};