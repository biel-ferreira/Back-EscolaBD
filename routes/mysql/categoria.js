const express = require('express');
const router = express.Router()



router.post('/listarcategoria/', async (req, res)=>{
    const connection = await req.app.pool.getConnection();

    const [result] = await connection.query("SELECT * FROM categoria").catch((err)=>{
        console.log(err)
        res.status(500).send("Deu ruim")
    })

    if(result) res.json(result)
     
    
})

router.post('/criarcategoria/', async (req, res)=>{
    const connection = await req.app.pool.getConnection()

    const {nome} = req.body

    if(!nome || typeof nome !== 'string'){
        return res.status(404).json({erro: "nome nao informado"})
    }
    const result = await connection.query("INSERT INTO categoria (nome) VALUES ('"+nome+"')").catch((err)=>{
        console.log(err)
        res.status(500).send("Deu ruim")
    })

    if(result) res.json({message:"Categoria cadastrada"})

})

router.put('/upcategoria/:id', async (req, res)=>{
    const connection = await req.app.pool.getConnection()

    const {nome} = req.body
    const {id} = req.params

    const result = await connection.query("UPDATE categoria SET nome = '"+nome+"' WHERE id = '"+id+"' ").catch((err)=>{
        console.log(err)
        res.status(500).send("Deu ruim")
    })

    if(result) res.json({message:"Categoria atualizada"})

})

router.delete('/delcategoria/:id', async (req, res)=>{
    const connection = await req.app.pool.getConnection()
    
    
    const {id} = req.params

    const result = await connection.query("DELETE FROM categoria WHERE id = '"+id+"' ").catch((err)=>{
        console.log(err)
        res.status(500).send("Deu ruim")
    })

    if(result) res.json({message:"Categoria deletada"})

})

module.exports = router;