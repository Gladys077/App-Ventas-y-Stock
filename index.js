
// import cors from "cors";
// import appRoutes from "./js/routers/appRoutes.js";

// import path from 'path';



import express from 'express';
//import path from'path';


const app = express();
app.disable('x-powered-by')
const port = 3001;



//const __dirname = '';

// Middleware para servir archivos estáticos
//app.use(express.static(path.join(__dirname, 'public')));

//Gladys
app.use('/home',express.static('componentes'));
//Luma
app.use(express.static('public'));




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

