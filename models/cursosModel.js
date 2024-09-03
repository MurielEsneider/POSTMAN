const { appendFile } = require('fs');
const userdb = require('../config/db');
const { callbackify } = require('util');
const res = require('express/lib/response');


function traerCurso(callback){
    const Curso = "SELECT * FROM cursos";
    userdb.query(Curso,(err, results)=>{
        if(err){
            console.log("consulta no realizada")
        }
        else{
            callback(results)
        }
    })
}



function agregarCurso( nuevoCurso, callback){
    let addCurso = "INSERT INTO cursos(nombre,descripcion) VALUES (?,?)";
    userdb.query(addCurso,[nuevoCurso.nombre, nuevoCurso.descripcion], (err, results)=>{
        if(err){
            console.log("Error al agregar matricula", err);
            return callback(err, null);
        }
        else{
            callback(null, results);
        }
    })
}


function eliminarCurso(elimEstudiante, callback) {
    // Primero, obtenemos el cursoId del estudiante
    userdb.query('SELECT cursoId FROM estudiantes WHERE id = ?', [elimEstudiante], (err, results) => {
        if (err) {
            console.log("Error al obtener el ID del estudiante", err);
            return callback(err);
        }

        if (results.length === 0) {
            return callback(new Error('Estudiante no encontrado'));
        }

        const cursoId = results[0].cursoId;

        userdb.query('DELETE FROM cursos WHERE id = ?', [cursoId], (err) => {
            if (err) {
                console.log("Error al eliminar el curso", err);
                return callback(err);
            }

            userdb.query('DELETE FROM estudiantes WHERE id = ?', [elimEstudiante], (err) => {
                if (err) {
                    console.log("Error al eliminar al estudiante", err);
                    return callback(err);
                }

                callback(null, { message: 'Curso y estudiante eliminados' });
            });
        });
    });
}












function actualizarEstudiante(idEstudiante, nuevosDatosEstudiante, callback){
    const actEstudiante = "UPDATE estudiantes SET nombre=?,apellido=?,fechaNacimiento=?,curso=? WHERE id=?";
    userdb.query(actEstudiante,[nuevosDatosEstudiante.nombre, nuevosDatosEstudiante.apellido, nuevosDatosEstudiante.fechaNacimiento, nuevosDatosEstudiante.curso, idEstudiante], (err, result)=>{
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


module.exports = {traerCurso, agregarCurso, eliminarCurso, }
