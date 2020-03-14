const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const jwt = require('jwt-simple');
const cors = require('cors');

const mongoURI = 'mongodb+srv://GuScarpim:12345@cluster0-edmvi.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass%20Community&retryWrites=true&ssl=true'
// const mongoURI = 'Sua url do mongo';

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3007;
const router = express.Router();

app.use('/api/v1', router);
/*Rotas*/
const rotas = require('../route/rotas')
router.route('/usuarios').get(require('../JWT'), rotas.getUsuarios).post(rotas.postUsuarios);
router.route('/login').post(rotas.login);

mongoose.connect(mongoURI, { useUnifiedTopology: true, useNewUrlParser: true });
app.listen(port);
console.log('conectado a porta ' + port);