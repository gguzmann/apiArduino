const express = require('express');
const router = express.Router();


let count = 0;
let temp = 0;
let hume = 0;
let hora = 0;

router.get('/', (req, res) => {
    console.log('Solicitud get');
    count++;
    res.json({
        ok: count,
        temperatura: temp,
        humedad: hume,
        date: hora
    })
})

router.post('/', (req, res) => {
    const {temperatura} = req.body;
    const {humedad} = req.body; 
    // humedad = 1;
    temp = temperatura;
    hume = humedad;
    
    let date = new Date()
    let min = date.getMinutes();
    let hour = date.getHours();
    let dateNow = `${hour}:${min}`
    hora = dateNow;

    console.log("Solicitud post. temperatura:", temperatura, humedad, dateNow)
    res.json({
        ok: 'post',
        date: dateNow
    })
})

module.exports = router;

