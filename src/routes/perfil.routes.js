import { Router } from 'express';
import { getImage } from '../controllers/perfilController.js';

const router = Router();

router.get('/getImage', getImage);

export default router;
