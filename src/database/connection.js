import pkg from 'pg'
import dotenv from 'dotenv'


dotenv.config()
const {Pool} = pkg

export const pool = new Pool({
    user: process.env.VAR_DB_USER,
    host: process.env.VAR_DB_HOST,
    database: process.env.VAR_DB_NAME,
    password: process.env.VAR_DB_PASS,
    port: process.env.VAR_DB_PORT,
    ssl:{
        rejectUnauthorized:false
    }
 

})

export async function validarConexion (){
    try {
        const client = await pool.connect()
        const result = await client.query(`SELECT NOW()`)
        console.log('conexion exitosa a la base de datos', result.rows[0])
        client.release()
        return true;
    } catch (error) {
       console.log('Error al conectarse a la base de datos', error)
       return false;
    }
}