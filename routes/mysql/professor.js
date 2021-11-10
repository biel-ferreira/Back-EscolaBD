const express = require('express');
const router = express.Router()

router.get('/listarprofessor/', async (req, res)=>{
    const connection = await req.app.pool.getConnection();

    const [result] = await connection.query("SELECT * FROM aluno").catch((err)=>{
        console.log(err)
        res.status(500).send("Deu ruim")
    })

    if(result) res.json(result)
     
})

router.post('/criarprofessor/', async (req, res)=>{
    const connection = await req.app.pool.getConnection()

    const {nome} = req.body
    if(!nome || typeof nome !== 'string'){
        return res.status(404).json({erro: "nome nao informado"})
    }
    const result = await connection.query("INSERT INTO professor (nome) VALUES ('"+nome+"')").catch((err)=>{
        console.log(err)
        res.status(500).send("Deu ruim")
    })

    if(result) res.json({message:"Professor cadastrado"})

})

router.put('/upprofessor/:id', async (req, res)=>{
    const connection = await req.app.pool.getConnection()
    
    const {nome} = req.body
    const {id} = req.params
    if(!nome){
        return res.status(404).json({erro : "nome nao informado"})
    }
   
    const result = await connection.query("UPDATE professor SET nome = '"+nome+"' WHERE id = '"+id+"' ").catch((err)=>{
        console.log(err)
        return res.status(500).send("Deu ruim")
    })
    if(result[0].affectedRows == 0){
        return res.status(404).json({erro : "Professor nao encontrado"})
    }
    return res.status(200).json({Mensagem: "Professor atualizado"})

    
    // if(result) res.json({message:"Professor atualizado"})

})

router.delete('/delprofessor/:id', async (req, res)=>{
    const connection = await req.app.pool.getConnection()
    
    
    const {id} = req.params

    const result = await connection.query("DELETE FROM professor WHERE id = '"+id+"' ").catch((err)=>{
        console.log(err)
        res.status(500).send("Deu ruim")
    })

    if(result) res.json({message:"Professor deletado"})

})

module.exports = router;
