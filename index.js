
// import cors from "cors";
// import appRoutes from "./js/routers/appRoutes.js";

// import path from 'path';


import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import {App} from'./componentes/pages_react/app.js';


const html = ReactDOMServer.renderToString(App);

const app = express();
app.disable('x-powered-by')
const port = 3001;



//const __dirname = '';

// Middleware para servir archivos estáticos
//app.use(express.static(path.join(__dirname, 'public')));

//Gladys
app.use(express.static(html));
//Luma
//app.use(express.static('public'));




/* Ruta para el index
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});*/

/*app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});*/

/*app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'componentes', 'indexGLA.html'));

});*/

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});


const api = express();
const portApi = 8080;
api.disable('x-powered-by');

api.use(express.json());

api.get('/', (req, res)=>{
res.send('<h1>Hola Lio</h1>')
});

api.listen(portApi, () => {
    console.log(`Servidor escuchando en http://localhost:${portApi}`);
});

