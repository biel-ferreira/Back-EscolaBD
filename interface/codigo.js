

let red;


const mgbd = () =>{
    document.querySelector("#conteudo1").style.display = "none";
    document.querySelector("#conteudo1_m").style.display = "block";
}
const sqlbd = () =>{
    document.querySelector("#conteudo1").style.display = "block";
    document.querySelector("#conteudo1_m").style.display = "none";
}
    
               

// document.getElementById("mongobt").onclick = function(){
//     let div2 = document.querySelector("#conteudo1");
//     let div = document.querySelector("#conteudo1_m");
    
//     if(div.style.display !== "block"){
//         div.style.display = "none";
//         div2.style.display = "block";
//     }
   
// }
   
//   cument.getElementById("sqlbt").onclick = function(){
    
// }

document.getElementById("botaoLA").onclick = function(){

    document.getElementById("res1").innerHTML="";
    fetch(`http://localhost:4321/mysql/aluno/listaraluno`).then((response) => {
          response.json().then((body) => {
            
            for(var i = 0; i<body.length;i++){
                var item = body[i]; 
                const p = document.createElement("li");
                p.innerText = item.nome + " - " + item.id;
                p.classList.add("resposta");
                p.setAttribute("class", "resposta");
                document.querySelector("#res1").appendChild(p);

            }
  });
});
}
document.getElementById("botaoLM").onclick = function(){

    document.getElementById("res1").innerHTML="";
    fetch(`http://localhost:4321/mysql/matricula/listarmatricula`).then((response) => {
          response.json().then((body) => {
             
            for(var i = 0; i<body.length;i++){
                var item = body[i]; 
                
                const p = document.createElement("li");
                p.innerText = item.id + " - " + item.id_aluno + " - " + item.dt_matricula;
                p.classList.add("resposta");
                p.setAttribute("class", "resposta");
                document.querySelector("#res1").appendChild(p);

            }

  });
});
}
document.getElementById("botaoLT").onclick = function(){

    document.getElementById("res1").innerHTML="";
    fetch(`http://localhost:4321/mysql/turma/listarturma`).then((response) => {
          response.json().then((body) => {
             
            for(var i = 0; i<body.length;i++){
                var item = body[i]; 
            
                const p = document.createElement("li");
                p.innerText = item.id + " - " + item.ds_ano + " - " + item.ds_classe + " - " + item.ds_turno;
                p.classList.add("resposta");
                p.setAttribute("class", "resposta");
                document.querySelector("#res1").appendChild(p);

            }

  });
});
}

document.getElementById("botaoM").onclick = async function(){
    document.getElementById("resp").innerHTML="";
    const nomeA = document.getElementById("nome").value;
    
    // document.getElementById("res1").innerHTML="";
    const response = await fetch(`http://localhost:4321/mysql/aluno/criaraluno`, {
        method: "post",
        body : JSON.stringify({"nome" : nomeA}),
        headers : {"Content-type" : "application/json"}

    })
        
        const resposta = await response.json()
       
        const idturma = document.getElementById("turma").value;

 const matricularesponse = await fetch(`http://localhost:4321/mysql/matricula/criarmatricula`, {
        method: "post",
        body : JSON.stringify({
            "id_aluno" : resposta.id,
            "id_turma" : idturma
        }),
        headers : {"Content-type" : "application/json"}
    });
    console.log(matricularesponse)
    document.getElementById("nome").value="";
    document.getElementById("turma").value="";
    document.getElementById("turma").value="";
}

document.getElementById("botaoEX").onclick = function(){
    const nomeA = document.getElementById("nome").value;
    const idA = document.getElementById("id_aluno").value;
    // document.getElementById("res1").innerHTML="";
    fetch(`http://localhost:4321/mysql/aluno/delaluno`, {
        method: "delete",
        body : JSON.stringify({"nome" : nomeA, "id_aluno" : idA}),
        headers : {"Content-type" : "application/json"}
    }).then((response) => {
       
});
document.getElementById("nome").value="";
document.getElementById("id_aluno").value="";
document.getElementById("turma").value="";
}

document.getElementById("botaoMT").onclick = function(){
    const nomeA = document.getElementById("nome").value;
    const idA = document.getElementById("id_aluno").value;
    // document.getElementById("res1").innerHTML="";
    fetch(`http://localhost:4321/mysql/aluno/upaluno`, {
        method: "put",
        body : JSON.stringify({"nome" : nomeA, "id_aluno" : idA}),
        headers : {"Content-type" : "application/json"}
    }).then((response) => {
        
});
document.getElementById("nome").value="";
document.getElementById("id_aluno").value="";
document.getElementById("turma").value="";

}


// ------------------------------------------------------------------------------------- //



document.getElementById("botaoLA_m").onclick = function(){

    document.getElementById("res1_m").innerHTML="";
    fetch(`http://localhost:4321/mongo/aluno/listaraluno`).then((response) => {
          response.json().then((body) => {
              
            for(var i = 0; i<body.length;i++){
                var item = body[i]; 
                const p = document.createElement("li");
                p.innerText = item.nome + " - " + item._id;
                p.classList.add("resposta");
                p.setAttribute("class", "resposta");
                document.querySelector("#res1_m").appendChild(p);

            }
  });
});
}


document.getElementById("botaoM_m").onclick = async function(){
    document.getElementById("resp_m").innerHTML="";
    const nomeA = document.getElementById("nome_m").value;
    
    // document.getElementById("res1").innerHTML="";
    const response = await fetch(`http://localhost:4321/mongo/aluno/criaraluno`, {
        method: "post",
        body : JSON.stringify({"nome" : nomeA}),
        headers : {"Content-type" : "application/json"}

    })
        
        document.getElementById("nome_m").value="";
        
       

//  const matricularesponse = await fetch(`http://localhost:4321/mongo/matricula/criarmatricula`, {
//         method: "post",
//         body : JSON.stringify({
//             "id_aluno" : resposta.id,
//             "id_turma" : idturma
//         }),
//         headers : {"Content-type" : "application/json"}
//     });
    // console.log(matricularesponse)
}

document.getElementById("botaoEX_m").onclick = function(){
    const nomeA = document.getElementById("nome_m").value;
    const idA = document.getElementById("id_aluno_m").value;
    // document.getElementById("res1").innerHTML="";
    fetch(`http://localhost:4321/mongo/aluno/delaluno`, {
        method: "delete",
        body : JSON.stringify({"nome" : nomeA, "id":idA}),
        headers : {"Content-type" : "application/json"}
    }).then((response) => {
        
});
document.getElementById("nome_m").value="";
document.getElementById("id_aluno_m").value="";

}

document.getElementById("botaoMT_m").onclick = function(){
    const nomeA = document.getElementById("nome_m").value;
    const idA = document.getElementById("id_aluno_m").value;
    
    fetch(`http://localhost:4321/mongo/aluno/upaluno`, {
        method: "put",
        body : JSON.stringify({"id" : idA, "novonome" : nomeA}),
        headers : {"Content-type" : "application/json"}
    }).then((response) => {
        
});
document.getElementById("nome_m").value="";
document.getElementById("id_aluno_m").value="";

}
