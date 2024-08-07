import { pool } from "../database/connection.js";
import bcrypt from "bcryptjs";
import { generarToken } from "../config/jwt.js";



export const registroUsuario = async (req, res) => {
  const { nombre_usuario, contrasena, nombre_completo, email, rol_id } =
    req.body;
  
  try {
 
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(contrasena, salt);

    const client = await pool.connect();

   
    const queryEmail = "SELECT * FROM verificar_email_registro($1)";
    const resultEmail = await client.query(queryEmail, [email]);

    if (resultEmail.rows.length >= 1) {
      client.release();
      return res.status(404).json({ message: "Este correo ya está asociado a un usuario" });
    }


    const queryUsuario = "SELECT * FROM verificar_nombre_usuario_registro($1)";
    const resultUsuario = await client.query(queryUsuario, [nombre_usuario]);

    if (resultUsuario.rows.length >= 1) {
      client.release();
      return res.status(404).json({ message: "Este nombre de usuario ya está asociado" });
    }

    const queryRegistrar = 'SELECT registrar_usuario($1, $2, $3, $4, $5)';
    const resultRegistrar = await client.query(queryRegistrar, [nombre_usuario, hash, nombre_completo, email, rol_id]);

    client.release();


    console.log(resultRegistrar.rows.length);

    client.release();
    res.status(200).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};


export const login = async  (req, res) => {
    try {
        const {nombre_usuario, contrasena} = req.body
        
      
         const client = await pool.connect()

         const queryTenerUsuario = 'SELECT * FROM tener_usuario_login($1)'
         const resultUsuario = await client.query(queryTenerUsuario, [nombre_usuario])
        console.log(resultUsuario.rows.length)
         if(resultUsuario.rows.length < 1){
          client.release()
          return res.status(404).json({message: 'Credenciales incorrectas'});
         } 

         const queryContrasena = 'SELECT * FROM tener_contrasena($1)'
         const resultContrasena = await client.query(queryContrasena, [nombre_usuario])

         const contrasenaActual = resultContrasena.rows[0].contrasena_result

        const comparacionContrasena  = await bcrypt.compare(contrasena, contrasenaActual)

        if(!comparacionContrasena){
        client.release()
        return res.status(400).json({message: 'Credenciales incorrectas'})
        } 
   
        const queryRol = 'SELECT * FROM obtener_rol($1)'
        const resultRol = await client.query(queryRol, [nombre_usuario])
        const id_rol = resultRol.rows[0].rol_id
        const nombre_rol = resultRol.rows[0].nombre

        console.log(id_rol)
        console.log(nombre_rol)
       const token = await generarToken(req.body)
       
       res.cookie("Token", token)
       client.release();
      return res.status(200).json({message: 'Credenciales correctas', Token: token, user: [{nombre_usuario: nombre_usuario, rol: nombre_rol, id_rol: id_rol}] })


    } catch (error) {
        console.error('Error al acceder', error);
    }
}