import express from 'express';
import router from './src/routes/index.router.js';
import errorHandler from './src/middlewares/errorHandler.mid.js';

const server = express();
const PORT = 8080;

const ready = () => console.log(`Server ready http://localhost:${PORT}/`);

server.listen(PORT, ready);

/* MIDDLEWARES */
/* ACCESO A QUERYPARAMS */
server.use(express.urlencoded({ extended: true }));
/* LEER FORMATO JSON */
server.use(express.json());

/* ROUTES */
server.use('/', router);
/* ERRORHANDLER */
server.use(errorHandler);