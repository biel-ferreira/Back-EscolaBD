
const mongoose = require('mongoose');

const Turma = mongoose.Schema({
    ativo : Boolean,
    classe : {
        ano : Number,
        serie : String
    },
    materia : {
        nome : String,
        descricao : String,
        carga_horaria : Number,
        obrigatorio : Boolean
    },
    professor : {
        nome : String
    }
})

const Aluno = mongoose.model("Aluno", {
    nome: String,
    turma: [Turma]
    
})

module.exports = Aluno




