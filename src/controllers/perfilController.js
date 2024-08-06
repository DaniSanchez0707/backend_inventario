import {__filename, __dirname, pth } from '../app.js';

export const getImage = (req, res) => {
    const imagePath = pth.join(__dirname, '../src/assets/1.png'); // Asegúrate de que la ruta es correcta
    console.log(imagePath)
    console.log(__dirname);
    console.log(__filename)
    res.sendFile(imagePath);
};
