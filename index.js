const express = require('express');
const cors = require('cors');
const app = express();
const mysql2 = require('mysql2/promise');

const mongoose = require('mongoose');

const mysql = require('./routes/mysqlRouter')
const mongodb = require('./routes/mongodbRouter')

main().catch(err => console.log(err));

async function main() {

  await mongoose.connect('mongodb://localhost:27017/Escola');

}

app.use(express.json())
app.use(cors())

const pool = mysql2.createPool({
    host : 'localhost',
    user : 'root',
    password: 'np123',
    database: 'escola'
})

app.pool = pool;

app.use('/mongo', mongodb)
app.use('/mysql', mysql)

app.listen(4321, ()=>{
    console.log('Servidor Online')
})

