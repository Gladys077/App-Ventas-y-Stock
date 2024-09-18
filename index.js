
// import cors from "cors";



import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactDOMServer from 'react-dom/server';
import {App} from'./componentes/pages_react/app.js';


import express from 'express';



const html = ReactDOMServer.renderToString(App);

const app = express();
app.disable('x-powered-by')
const port = 3001;






//Gladys
app.use(express.static(html));
//app.use('/home',express.static('componentes'));

//Luma
//app.use(express.static('public'));




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

