const express = require('express');
const router = express.Router()



router.get('/listaraluno/', async (req, res)=>{
    const connection = await req.app.pool.getConnection();
    res.setHeader("Access-Control-Allow-Origin", "*");
    const [result] = await connection.query("SELECT * FROM aluno").catch((err)=>{
        console.log(err)
        res.status(500).send("Deu ruim")
    })
    connection.release()
    if(result) res.json(result)
     
    })

router.post('/criaraluno/', async (req, res)=>{
    const connection = await req.app.pool.getConnection()

    const {nome} = req.body
    console.log(typeof nome)
    if(!nome || typeof nome !== 'string'){
        return res.status(404).json({erro: "nome nao informado"})
    }
    const [resultaluno] = await connection.query("INSERT INTO aluno (nome) VALUES ('"+nome+"')").catch((err)=>{
        console.log(err)
        res.status(500).send("Deu ruim")
    })   
    
    if(resultaluno) res.json({id:resultaluno.insertId})
    
    

})

router.put('/upaluno/', async (req, res)=>{
    const connection = await req.app.pool.getConnection()
    
    const {nome, id_aluno} = req.body
    

    const result = await connection.query("UPDATE aluno SET nome = '"+nome+"' WHERE id = '"+id_aluno+"' ").catch((err)=>{
        console.log(err)
        res.status(500).send("Deu ruim")
    })
    
    if(result) res.json({message:"Aluno atualizado"})

})

router.delete('/delaluno/', async (req, res)=>{
    const connection = await req.app.pool.getConnection()
    
    
    const {nome, id_aluno} = req.body

    const result = await connection.query("DELETE FROM aluno WHERE nome = '"+nome+"' AND id = '"+id_aluno+"'").catch((err)=>{
        console.log(err)
        res.status(500).send("Deu ruim")
    })

    if(result) res.json({message:"Aluno deletado"})

})

module.exports = router;