const express = require('express');
const router = express.Router();
const { getIndex, postIndex } = require('../controllers/homeController');

router.get('/', getIndex);

//ESTE APP.GET ES PARTE DE LA PRUEBA N°50 (el error estaría en que se mandan 2 peticiones una para mostrar en /formulario y otra para hacer la petición)
router.get('/', homeController.getIndex);
//HASTA ACÁ
//raíz no es recomendable tener un post:
router.post('/formulario', postIndex);

module.exports = router;

//http://localhost:3000/formulario