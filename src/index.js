import { validarConexion } from './database/connection.js';
import dotenv from 'dotenv'
import app from './app.js';



 dotenv.config()

 const port = process.env.NODE_PORT
app.listen(port, () => {
    console.log('listening on port ', port);
    validarConexion();
});
