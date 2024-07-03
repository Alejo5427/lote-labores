const {Router} = require('express');

const { crearLote, getLote, getLoteSolo, getLoteInicio, getLoteMes, getLoteFechas } = require('../controllers/lote.controllers');

const router = Router();


router.post('/crear', crearLote)
router.get('/obtenerSolo', getLoteSolo)
router.get('/obtener', getLote)
router.post('/obtenerInicio', getLoteInicio)
router.post('/obtenerFechas', getLoteFechas)
router.post('/obtenerMes', getLoteMes)


module.exports = router