
// import cors from "cors";
// import appRoutes from "./js/routers/appRoutes.js";

// import path from 'path';



import express from 'express';




const app = express();
const port = 3001;



//const __dirname = '';

// Middleware para servir archivos estáticos
//app.use(express.static(path.join(__dirname, 'public')));
app.use('/home',express.static('componentes'));
app.use(express.static('public'));

// app.use("/", appRoutes)

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

