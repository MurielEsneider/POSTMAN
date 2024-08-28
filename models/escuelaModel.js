const { appendFile } = require('fs');
const userdb = require('../config/db');
const { callbackify } = require('util');
const res = require('express/lib/response');


function traerEstudiante(callback){
    const Estudiante = "SELECT * FROM  estudiantes";
    userdb.query(Estudiante,(err, results)=>{
        if(err){
            console.log("consulta no realizada")
        }
        else{
            callback(results)
        }
    })
}


function agregarEstudiante(nuevoEstudiante, callback){
    let Estudiante = "INSERT INTO estudiantes(nombre,apellido,fechaNacimiento,curso) VALUES (?,?,?,?)";
    userdb.query(Estudiante,[nuevoEstudiante.nombre, nuevoEstudiante.apellido, nuevoEstudiante.fechaNacimiento, nuevoEstudiante.curso], (err, results)=>{
        if(err){
            console.log("Error al agregar estudiante")
        }
        else{
            callback(results);
        }
    })
}


function eliminarEstudiate(eliminarEstudiate, callback){
    const Estudiante = "DELETE FROM estudiantes WHERE id=?";
    userdb.query(Estudiante, [eliminarEstudiate], (err,results) =>{
        if(err){
            console.log("Error al eliminar")
        }
        else{
            callback(results)
        }
    })
}




function actualizarEstudiante(nuevosDatosEstudiante){
    const Estudiante = "UPDATE estudiantes SET nombre=?,apellido=?,fechaNacimiento=?,curso=? WHERE id=?";
    userdb.query(Estudiante,[nuevosDatosEstudiante,nombre, nuevosDatosEstudiante,apellido, nuevosDatosEstudiante,fechaNacimiento, nuevosDatosEstudiante,curso], (err, results)=>{
        if(err){
            console.log("Error al agregar estudiante")
        }
        else{
            callback(results);
        }
    })
}




module.exports = {traerEstudiante, agregarEstudiante, eliminarEstudiate, actualizarEstudiante}
