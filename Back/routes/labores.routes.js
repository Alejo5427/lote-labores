
const {getLabores, agregarLabor, editarLabor, estadoLabor, getLaboresIncompletas, getLaboresEditar, validarCodigo} = require('../controllers/labores.controllers.js')

const {Router} = require('express')

const router = Router();

router.get('/obtener', getLabores)
router.get('/obtenerIncompleto', getLaboresIncompletas)

router.post('/validarCodigo', validarCodigo)
router.post('/obtenerEditar', getLaboresEditar)
router.post('/agregar', agregarLabor)
router.post('/editar', editarLabor)
router.post('/estado', estadoLabor)

module.exports = router