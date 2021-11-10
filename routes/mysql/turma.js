const express = require('express');
const router = express.Router()



router.get('/listarturma/', async (req, res)=>{
    const connection = await req.app.pool.getConnection();

    const [result] = await connection.query("SELECT * FROM turma").catch((err)=>{
        console.log(err)
        res.status(500).send("Deu ruim")
    })
    connection.release()
    if(result) res.json(result)
     
    
})

router.post('/criarturma/', async (req, res)=>{
    const connection = await req.app.pool.getConnection()

    const {id_professor, id_materia, ds_ano, ds_classe, ds_turno, ds_ativo} = req.body

    const result = await connection.query("INSERT INTO turma (id_professor, id_materia, ds_ano, ds_classe, ds_turno, ds_ativo) VALUES ('"+id_professor+"', '"+id_materia+"', '"+ds_ano+"', '"+ds_classe+"', '"+ds_turno+"', '"+ds_ativo+"')").catch((err)=>{
        console.log(err)
        res.status(500).send("Deu ruim")
    
    })
    console.log(result)
    

    if(result) res.json({message:"Turma criada"})
    
   

})

router.put('/upturma/', async (req, res)=>{
    const connection = await req.app.pool.getConnection()

    const {id_professor, id_materia, ds_ano, ds_classe, ds_turno, id} = req.body
    

    const result = await connection.query("UPDATE turma SET ds_ano = '"+ds_ano+"', ds_classe = '"+ds_classe+"', ds_turno = '"+ds_turno+"', id_professor = '"+id_professor+"' WHERE id = '"+id+"' AND id_materia = '"+id_materia+"' ").catch((err)=>{
        console.log(err)
        res.status(500).send("Deu ruim")
    })

    if(result) res.json({message:"Turma atualizada"})

})

router.delete('/delturma/', async (req, res)=>{
    const connection = await req.app.pool.getConnection()
    
    
    const {id_materia, id} = req.body

    const result = await connection.query("DELETE FROM turma WHERE id = '"+id+"'").catch((err)=>{
        console.log(err)
        res.status(500).send("Deu ruim")
    })

    if(result[0].affectedRows == 0){
        
        return res.status(404).json({erro: "Turma nao encontrada"}) 
    }
    return res.status(201).json({Mensagem: "Turma deletada"})

})

router.put('/desturma/', async (req, res)=>{
    const connection = await req.app.pool.getConnection()
    
    
    const {ds_ativo, id, id_materia} = req.body

    const result = await connection.query("UPDATE turma SET ds_ativo = '"+ds_ativo+"' WHERE id = '"+id+"' AND id_materia = '"+id_materia+"' ").catch((err)=>{
        console.log(err)
        return res.status(500).send("Deu ruim")
    })

    if(result) res.json({message:"Turma desligada"})

})

module.exports = router;