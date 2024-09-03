const { appendFile } = require('fs');
const userdb = require('../config/db');
const { callbackify } = require('util');
const res = require('express/lib/response');


function traerMatricula(callback){
    const Matricula = "SELECT * FROM matriculas";
    userdb.query(Matricula,(err, results)=>{
        if(err){
            console.log("consulta no realizada")
        }
        else{
            callback(results)
        }
    })
}



function agregarMatricula( nuevaMatricula, callback){
    let addMatricula = "INSERT INTO matriculas(idEstudianteMatricula,fechaMatricula) VALUES (?,?)";
    userdb.query(addMatricula,[nuevaMatricula.idEstudianteMatricula, nuevaMatricula.fechaMatricula], (err, results)=>{
        if(err){
            console.log("Error al agregar matricula", err);
            return callback(err, null);
        }
        else{
            callback(null, results);
        }
    })
}


function eliminarMatricula(elimMatricula, callback) {
    userdb.query('SELECT idEstudianteMatricula FROM matriculas WHERE id = ?', [elimMatricula], (err, results) => {
        if (err) {
            console.log("Error al obtener el ID del estudiante", err);
            return callback(err);
        }

        if (results.length === 0) {
            return callback(new Error('Matrícula no encontrada'));
        }

        const elimEstudiante = results[0].idEstudianteMatricula;

        userdb.query('DELETE FROM matriculas WHERE id = ?', [elimMatricula], (err) => {
            if (err) {
                console.log("Error al eliminar la matrícula", err);
                return callback(err);
            }
            userdb.query('DELETE FROM estudiantes WHERE id = ?', [elimEstudiante], (err) => {
                if (err) {
                    console.log("Error al eliminar al estudiante", err);
                    return callback(err);
                }

                callback(null, { message: 'Matrícula y estudiante eliminados' });
            });
        });
    });
}












function actualizarMatricula(idMatricula, nuevosDatosMatricula, callback){
    const actMatricula = "UPDATE matriculas SET idEstudianteMatricula=?,fechaMatricula=?";
    userdb.query(actMatricula,[nuevosDatosMatricula.idEstudianteMatricula, nuevosDatosMatricula.fechaMatricula, idMatricula], (err, result)=>{
        if(err){
            console.log("Error al agregar estudiante")
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


module.exports = {traerMatricula, agregarMatricula, eliminarMatricula, actualizarMatricula, contarEstudiante}
