import { validarConexion } from './database/connection.js';
import dotenv from 'dotenv'
import app from './app.js';



 dotenv.config()



 
console.log(process.env.DB_HOST)
 const port = process.env.NODE_PORT
app.listen(port, () => {
    console.log('listening on port ', port);
    validarConexion();
});
