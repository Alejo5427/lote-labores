
const { getGrupoLabores,agregarGrupoLabor, cambiarEstadoGrupoLabor, getGrupoLaboresDesactivado } = require('../controllers/grupo-labores.controllers');

const {Router} = require('express');

const router = Router();


router.get('/obtener', getGrupoLabores)

router.get('/obtenerDesactivado', getGrupoLaboresDesactivado)

router.post('/agregar', agregarGrupoLabor)

router.post('/desactivar', cambiarEstadoGrupoLabor)



module.exports = router