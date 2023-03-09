const express = require('express');
const router = express.Router();
const { getIndex, postIndex } = require('../controllers/homeController');

router.get('/', getIndex);

//raíz no es recomendable tener un post:
router.post('/formulario', postIndex);

module.exports = router;
