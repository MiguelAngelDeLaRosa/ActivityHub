import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import conectarDB from "./config/db.js";
import usuarioRouter from './routes/usuarioRoutes.js';
import tareaRouter from './routes/tareaRoutes.js';
import listaRouter from './routes/listaRoutes.js';

const app = express();

app.use(express.json());

dotenv.config();

conectarDB();

const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOptions = {
     origin: '*' //function(origin, callback) {
    //     if(dominiosPermitidos.indexOf(origin) !== -1) { // Va a buscar si el origin o la peticion de origen esta permitida dentro de nuestro arreglo, si es asi devuelve difierente a -1
    //         // El origen del Request esta permitido
    //         callback(null, true)
    //     } else {
    //         callback(new Error('No esta permitido por CORS'));
    //     }
    // }
};

app.use(cors(corsOptions));

app.use('/api/usuarios', usuarioRouter);
app.use('/api/tareas', tareaRouter);
app.use('/api/listas', listaRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Express conectado desde el puerto: ${PORT}`);
})