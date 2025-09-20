import 'dotenv/config.js';
import express from 'express';
import dbConnect from './src/helpers/dbConnect.helper.js';
import router from './src/routes/index.router.js';
import errorHandler from './src/middlewares/errorHandler.mid.js';
import cookieParser from 'cookie-parser';

const server = express();
const PORT = 8080;

const ready = () => {
    console.log(`Server ready http://localhost:${PORT}/`);
    dbConnect();
}

server.listen(PORT, ready);

/* MIDDLEWARES */
/* ACCESO A QUERYPARAMS */
server.use(express.urlencoded({ extended: true }));
/* LEER FORMATO JSON */
server.use(express.json());
/* COOKIE PARSER */
server.use(cookieParser(process.env.COOKIE_KEY));

/* ROUTES */
server.use('/', router);
/* ERRORHANDLER */
server.use(errorHandler);