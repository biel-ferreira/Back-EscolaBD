const express = require('express');
const router = express.Router()




router.get('/listarmatricula/', async (req, res)=>{
    const connection = await req.app.pool.getConnection();

    const [result] = await connection.query("SELECT * FROM matricula").catch((err)=>{
        console.log(err)
        res.status(500).send("Deu ruim")
    })

    if(result) res.json(result)
     
    
})

router.post('/criarmatricula/', async (req, res)=>{
    const connection = await req.app.pool.getConnection()

    const {id_aluno, id_turma} = req.body

    const result = await connection.query("INSERT INTO matricula (id_aluno, id_turma, dt_matricula) VALUES ('"+id_aluno+"', '"+id_turma+"', now())").catch((err)=>{
        console.log(err)
        res.status(500).send("Deu ruim")
    })
    
    connection.release()
    if(result) res.json({message:"Aluno matriculado"})
   
})

router.put('/upmatricula/', async (req, res)=>{
    const connection = await req.app.pool.getConnection()

    const {id_turma, id_aluno, id} = req.body
    

    const result = await connection.query("UPDATE matricula SET id_turma = '"+id_turma+"' WHERE id = '"+id+"' AND id_aluno = '"+id_aluno+"' ").catch((err)=>{
        console.log(err)
        res.status(500).send("Deu ruim")
    })

    if(result) res.json({message:"Matricula atualizada"})

})

router.delete('/delmatricula/', async (req, res)=>{
    const connection = await req.app.pool.getConnection()
    
    
    const {id_aluno, id} = req.body

    const result = await connection.query("DELETE FROM matricula WHERE id = '"+id+"' AND id_aluno = '"+id_aluno+"' ").catch((err)=>{
        console.log(err)
        res.status(500).send("Deu ruim")
    })

    if(result) res.json({message:"Matricula deletada"})

})

module.exports = router;