import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const generarToken = async (usuario) => {
    try {
        const token = jwt.sign({username: usuario.nombre_usuario}, process.env.SECRET_KEY, {expiresIn: '24h'}) 
        return token
    } catch (error) {
        console.log('Error al generar el token:', error);
    }
}