const express = require('express');
const morgan = require('morgan');
const config = require('./config');
const cors = require("cors");

const app= express();

const corsOptions = {
    origin: "http://localhost:5173", // Cambiar esto a la URL  aplicación React
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
const autor = require('./modules/autor/routes');
const articulo = require('./modules/articulo/routes');
const institucion = require('./modules/institucion/routes');
const autorArticulo = require('./modules/autorArticulo/routes');
const error = require('./network/errors');

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// configuracion
app.set('port', config.app.port);

// rutas
app.use('/api/autor',autor);
app.use('/api/articulo',articulo);
app.use('/api/institucion',institucion);
app.use('/api/autorArticulo',autorArticulo);
app.use(error);

module.exports = app;
