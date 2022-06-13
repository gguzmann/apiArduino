const express = require('express');
const router = express.Router();


let count = 0;
const listaArduinos = [];
const infoArduinos = [];

let date = new Date();
let min = date.getMinutes();
let hour = date.getHours() - 4;
// let hour = date.getHours();
let fecha = `${hour}:${min}`;

router.get('/', (req, res) => {
    console.log('Solicitud get');
    count++;
    let resumenArduino = [];

    listaArduinos.forEach(element => {
        const registersByArduino = infoArduinos.filter(x => x.id == element);
        const current = registersByArduino[registersByArduino.length - 1];

        if (current != undefined) {
            resumenArduino.push({
                id: element,
                cantidad_registros: registersByArduino.length,
                temperatura_actual: current.temperatura,
                humerdad_actual: current.humedad,
                registros: registersByArduino
            })
        }
    });

    
    res.json({
        msg: 'get',
        fecha,
        visitas: count,
        info: resumenArduino
    })
})

router.post('/', (req, res) => {
    const { temperatura, humedad, id } = req.body;

    const info = {
        id,
        temperatura,
        humedad,
        fecha: fecha
    }

    if (!listaArduinos.includes(id)) {
        listaArduinos.push(info.id)
    }

    infoArduinos.push(info);

    console.log("Solicitud post. temperatura:", info)
    res.json({
        msg: 'post',
        info
    })
})

module.exports = router;

