const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// app.use(express.json());

//Conexion a Base de Datos
const db = config.get('mongoURI');
mongoose.connect(db,
    err => {
        if(err) throw err;
        console.log('MongoDB Connected...')
});

//Configuracion
app.set('port', process.env.PORT || 5000);
app.set('view engine', 'ejs');
app.set('views', './src/app/views'); 

//Middleware
app.use(bodyParser.urlencoded({extended: false}));

//Estilos
app.use(express.static('./src/app/assets'));

module.exports = app;