const express = require('express');
const router = express.Router();
const app = express();
const professor = require('./mysql/professor')
const aluno = require('./mysql/aluno')
const matricula = require('./mysql/matricula')
const materia = require('./mysql/materia')
const categoria = require('./mysql/categoria')
const turma = require('./mysql/turma')


router.use('/professor', professor)

router.use('/aluno', aluno)

router.use('/matricula', matricula)

router.use('/materia', materia)

router.use('/categoria', categoria)

router.use('/turma', turma)

module.exports = router;