const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

//Forma em que o usuário deverá ser criado
const UsuarioSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  lastname: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

//Cria um hash para cada senha criada
UsuarioSchema.pre('save', (next) => {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(5, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

//Verifica se a senha é válida
UsuarioSchema.methods.verificarSenha = (password, next) => {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return next(err);
    next(isMatch);
  });
};
module.exports = mongoose.model('Usuario', UsuarioSchema);