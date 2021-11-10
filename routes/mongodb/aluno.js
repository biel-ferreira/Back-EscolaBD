const express = require('express');
const mongoose = require('mongoose');
const router = express.Router()
const Aluno = require('../../models/Aluno');


mongoose.connect("mongodb://localhost:27017/Escola")

router.get('/listaraluno', async (req, res)=>{

    const alunos = await Aluno.find()
    
    return res.json(alunos);

})

router.post("/criaraluno", async (req, res) => {
    const { nome} = req.body;
    console.log(req.body);
    try {
      const alunos = new Aluno({nome});
      console.log(alunos);
      const response = await alunos.save();
      console.log(response);
      res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.put("/upaluno", async (req, res) => {
    const {id, novonome} = req.body;
    console.log(req.body);
    try {
      const alunos = await Aluno.findOneAndUpdate({_id : id }, { nome: novonome});
      console.log(alunos);
      
      res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.delete("/delaluno", async (req, res) => {
    const {nome, id} = req.body;
    console.log(req.body);
    try {
      const alunos = await Aluno.findOneAndDelete({_id : id}, {nome : nome });
      console.log(alunos);
      
      res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });


module.exports = router