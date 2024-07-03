
const {Router} = require('express');
const { laborRealizada,  filtradoLaboresPorFecha, filtradoLaboresPorMes, getLaboresRealizadas, filtradoLaboresFechaGrafico, filtradoLaboresMesGrafico, getLaboresRealizadasGrafico } = require('../controllers/labor-realizada.controllers');

const router = Router();



router.get('/obtener', getLaboresRealizadas)
router.get('/obtenerFiltro', getLaboresRealizadasGrafico)
router.post('/agregar', laborRealizada)
router.post('/filtrarFecha', filtradoLaboresPorFecha)
router.post('/graficoFecha', filtradoLaboresFechaGrafico)
router.post('/filtrarMes', filtradoLaboresPorMes)
router.post('/graficoMes', filtradoLaboresMesGrafico)


module.exports = router