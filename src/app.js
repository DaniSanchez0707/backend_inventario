import express from 'express';
import dotenv from 'dotenv'
import authRoutes from './routes/authentication.routes.js'; // Asegúrate de que la ruta es correcta
import perfilRoutes from './routes/perfil.routes.js'
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config()
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
export const pth = path
const app = express();



app.use(express.json());
app.use(cors({
    origin: process.VAR_origin,
    credentials:true

}))
app.use('/api', authRoutes);
app.use('/api', perfilRoutes);

export default app;
