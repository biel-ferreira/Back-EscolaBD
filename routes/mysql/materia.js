const express = require('express');
const router = express.Router()


router.post('/listarmateria/', async (req, res)=>{
    const connection = await req.app.pool.getConnection();

    const [result] = await connection.query("SELECT * FROM materia").catch((err)=>{
        console.log(err)
        res.status(500).send("Deu ruim")
    })

    if(result) res.json(result)
     
    
})

router.post('/criarmateria/', async (req, res)=>{
    const connection = await req.app.pool.getConnection()

    const {nome, ds_materia, carga_horaria, id_categoria, obrigatorio} = req.body

    const result = await connection.query("INSERT INTO materia (nome, ds_materia, carga_horaria, id_categoria, obrigatorio) VALUES ('"+nome+"', '"+ds_materia+"', '"+carga_horaria+"', '"+id_categoria+"', '"+obrigatorio+"')").catch((err)=>{
        console.log(err)
        res.status(500).send("Deu ruim")
    })

    if(result) res.json({message:"Materia cadastrada"})

})

router.put('/upmateria/:id', async (req, res)=>{
    const connection = await req.app.pool.getConnection()

    const {nome, ds_materia, carga_horaria, obrigatorio} = req.body
    const {id} = req.params

    const result = await connection.query("UPDATE materia SET nome = '"+nome+"', ds_materia = '"+ds_materia+"', carga_horaria = '"+carga_horaria+"', obrigatorio = '"+obrigatorio+"' WHERE id = '"+id+"' ").catch((err)=>{
        console.log(err)
        res.status(500).send("Deu ruim")
    })

    if(result) res.json({message:"Materia atualizada"})

})

router.delete('/delmateria/:id', async (req, res)=>{
    const connection = await req.app.pool.getConnection()
    
    
    const {id} = req.params

    const result = await connection.query("DELETE FROM materia WHERE id = '"+id+"' ").catch((err)=>{
        console.log(err)
        res.status(500).send("Deu ruim")
    })

    if(result) res.json({message:"Materia deletada"})

})

module.exports = router;