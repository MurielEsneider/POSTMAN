const mysql = require("mysql2")
const userdb = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123454321",
    database: "Escuela"
})

userdb.connect((e)=>{
    if(e){
        console.log("esta feo")
    }
    else{
        console.log("maquina")
    }
})
module.exports = userdb