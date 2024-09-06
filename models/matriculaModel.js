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
    let addMatricula = "INSERT INTO matriculas(idEstudianteMatricula,fechaMatricula,idProfesorMatricula) VALUES (?,?,?)";
    userdb.query(addMatricula,[nuevaMatricula.idEstudianteMatricula, nuevaMatricula.fechaMatricula, nuevaMatricula.idProfesorMatricula], (err, results)=>{
        if(err){
            console.log("Error al agregar matricula", err);
            return callback(err, null);
        }
        else{
            callback(null, results);
        }
    })
}




function eliminarMatriculaE(elimMatricula, callback) {
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



function eliminarMatriculaP(elimMatricula, callback) {
    userdb.query('SELECT idProfesorMatricula FROM matriculas WHERE id = ?', [elimMatricula], (err, results) => {
        if (err) {
            console.log("Error al obtener el ID del profesor", err);
            return callback(err);
        }

        if (results.length === 0) {
            return callback(new Error('Matrícula no encontrada'));
        }

        const elimProfesor = results[0].idProfesorMatricula;

        userdb.query('DELETE FROM matriculas WHERE id = ?', [elimMatricula], (err) => {
            if (err) {
                console.log("Error al eliminar la matrícula", err);
                return callback(err);
            }
            userdb.query('DELETE FROM profesores WHERE id = ?', [elimProfesor], (err) => {
                if (err) {
                    console.log("Error al eliminar al estudiante", err);
                    return callback(err);
                }
                callback(null, { message: 'Matrícula y estudiante eliminados' });
            });
        });
    });
}







function actualizarMatricula(idMatricula, nuevosDatosMatricula, callback) {
    const actMatricula = "UPDATE matriculas SET idEstudianteMatricula = ?, fechaMatricula = ?, idProfesorMatricula = ? WHERE id = ?";
    userdb.query(actMatricula, [nuevosDatosMatricula.idEstudianteMatricula, nuevosDatosMatricula.fechaMatricula, nuevosDatosMatricula.idProfesorMatricula, idMatricula], (err, result) => {
        if(err) {
            console.log("Error al actualizar matricula:", err);
        } 
        else {
            callback(result);
        }
    });
}





function contarMatricula(callback){
    const contMatricula = "SELECT COUNT (id) FROM matriculas";
    userdb.query(contMatricula,(err, results)=>{
        if(err){
            console.log("consulta no realizada")
        }
        else{
            callback(results)
        }
    })
}


module.exports = {traerMatricula, agregarMatricula, eliminarMatriculaE,eliminarMatriculaP, actualizarMatricula, contarMatricula}
