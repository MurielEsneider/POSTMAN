const { appendFile } = require('fs');
const userdb = require('../config/db');
const { callbackify } = require('util');
const res = require('express/lib/response');


function traerEstudiante(callback){
    const Estudiante = "SELECT * FROM estudiantes";
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
    let addEstudiante = "INSERT INTO estudiantes(nombre,apellido,fechaNacimiento,curso) VALUES (?,?,?,?)";
    userdb.query(addEstudiante,[nuevoEstudiante.nombre, nuevoEstudiante.apellido, nuevoEstudiante.fechaNacimiento, nuevoEstudiante.curso], (err, results)=>{
        if(err){
            console.log("Error al agregar estudiante", err)
            callback(err, null);  // Pasa el error al callback

        }
        else{
            console.log("Estudiante agregado con éxito");
            callback(null, results);  // Pasa los resultados al callback
        }
    })
}




function eliminarEstudiante(elimEstudiante, callback){
    const delEstudiante = "DELETE FROM estudiantes WHERE id=?";
    userdb.query(delEstudiante, [elimEstudiante], (err,results) =>{
        if(err){
            console.log("Error al eliminar",err);
            return callback(err);
        }
        else{
            callback(null, results)
        }
    })
}





function actualizarEstudiante(idEstudiante, nuevosDatosEstudiante, callback){
    const actEstudiante = "UPDATE estudiantes SET nombre=?,apellido=?,fechaNacimiento=?,curso=? WHERE id=?";
    userdb.query(actEstudiante,[nuevosDatosEstudiante.nombre, nuevosDatosEstudiante.apellido, nuevosDatosEstudiante.fechaNacimiento, nuevosDatosEstudiante.curso, idEstudiante], (err, result)=>{
        if(err){
            console.log("Error al actualizar estudiante")
        }
        else{
            callback(result)
        }
    })
}





function contarEstudiante(callback){
    const contEstudiante = "SELECT COUNT (id) FROM estudiantes";
    userdb.query(contEstudiante,(err, results)=>{
        if(err){
            console.log("consulta no realizada")
        }
        else{
            callback(results)
        }
    })
}


module.exports = {traerEstudiante, agregarEstudiante, eliminarEstudiante, actualizarEstudiante, contarEstudiante}
