
const express = require('express');

const mongoListar = require('./mongodb/aluno')

const router = express.Router()

router.use('/aluno', mongoListar)

module.exports = router