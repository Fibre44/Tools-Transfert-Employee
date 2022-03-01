const mongoose = require('mongoose');
const express = require('express');
const app = express();
const env = require('dotenv').config();

const apiCegidRoutes = require('./routes/apiCegid');
const sessionRoutes = require('./routes/session');
const optionRoutes = require('./routes/option');
const transertRoutes = require('./routes/transfert');

mongoose.connect('mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASS+'@cluster0.wbsym.mongodb.net/'+process.env.DB_HOST+'?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json());

app.use('/apiCegid',apiCegidRoutes);
app.use('/session',sessionRoutes);
app.use('/option',optionRoutes);
app.use('/transfert',transertRoutes);

module.exports = app;