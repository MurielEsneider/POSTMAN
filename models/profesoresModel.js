const { appendFile } = require('fs');
const userdb = require('../config/db');
const { callbackify } = require('util');
const res = require('express/lib/response');


function traerProfesor(callback){
    const Profesor = "SELECT * FROM profesores";
    userdb.query(Profesor,(err, results)=>{
        if(err){
            console.log("consulta no realizada")
        }
        else{
            callback(results)
        }
    })
}



function agregarProfesor(nuevoProfesor, callback){
    let addProfesor = "INSERT INTO profesores(nombre,apellido,fechaNacimiento,curso) VALUES (?,?,?,?)";
    userdb.query(addProfesor,[nuevoProfesor.nombre, nuevoProfesor.apellido, nuevoProfesor.fechaNacimiento, nuevoProfesor.curso], (err, results)=>{
        if(err){
            console.log("Error al agregar profesores")
        }
        else{
            console.log("profesor agregado con éxito");
            callback(results);
        }
    })
}




function eliminarProfesor(elimProfesor, callback){
    const delProfesor = "DELETE FROM profesores WHERE id=?";
    userdb.query(delProfesor, [elimProfesor], (err,results) =>{
        if(err){
            console.log("Error al eliminar")
            return callback(err);
        }
        else{
            callback(null, results)
        }
    })
}





function actualizarProfesor(idProfesor, nuevosDatosProfesor, callback){
    const actProfesor = "UPDATE profesores SET nombre=?,apellido=?,fechaNacimiento=?,curso=? WHERE id=?";
    userdb.query(actProfesor,[nuevosDatosProfesor.nombre, nuevosDatosProfesor.apellido, nuevosDatosProfesor.fechaNacimiento, nuevosDatosProfesor.curso, idProfesor], (err, result)=>{
        if(err){
            console.log("Error al agregar profesores")
        }
        else{
            callback(result)
        }
    })
}





function contarProfesor(callback){
    const contProfesor = "SELECT COUNT (id) FROM profesores";
    userdb.query(contProfesor,(err, results)=>{
        if(err){
            console.log("consulta no realizada")
        }
        else{
            callback(results)
        }
    })
}


module.exports = {traerProfesor, agregarProfesor, eliminarProfesor, actualizarProfesor, contarProfesor}
