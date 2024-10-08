const express = require("express");
const app = express();
const PORT = 3002;


const {traerEstudiante, agregarEstudiante, eliminarEstudiante, actualizarEstudiante, contarEstudiante} = require ("./models/estudiantesModel")
const { traerProfesor, agregarProfesor, eliminarProfesor, actualizarProfesor, contarProfesor, } = require("./models/profesoresModel");
const { traerMatricula,agregarMatricula, eliminarMatriculaE,eliminarMatriculaP ,actualizarMatricula,contarMatricula} = require("./models/matriculaModel");

app.use(express.json())


////////////////////TRAER///////////////////////////////




app.get("/estudiantes",(req,res)=>{
    traerEstudiante((results)=>{
        res.json(results);
    })
})

app.get("/profesores",(req,res)=>{
    traerProfesor((results)=>{
        res.json(results);
    })
})

app.get("/matriculas",(req,res)=>{
    traerMatricula((results)=>{
        res.json(results);
    })
})





////////////////////TRAER///////////////////////////////
////////////////////AGREGAR///////////////////////////////




app.post("/estudiantes", (req,res)=>{
    const nuevoEstudiante = req.body;
    
    if(!nuevoEstudiante.nombre || !nuevoEstudiante.apellido || !nuevoEstudiante.fechaNacimiento || !nuevoEstudiante.curso){
        return res.send("Faltan datos");
    }
    else{
        agregarEstudiante(nuevoEstudiante,(result)=>{
            res.json({menssage:"Agregado"})
        })
    }
})

app.post("/profesores", (req,res)=>{
    const nuevoProfesor = req.body;
    
    if(!nuevoProfesor.nombre || !nuevoProfesor.apellido || !nuevoProfesor.fechaNacimiento || !nuevoProfesor.curso){
        return res.send("Faltan datos");
    }
    else{
        agregarProfesor(nuevoProfesor,(result)=>{
            res.json({menssage:"Agregado"})
        })
    }
})

app.post("/matriculas", (req,res)=>{
    const nuevaMatricula = req.body;
    
    if(!nuevaMatricula.idEstudianteMatricula || !nuevaMatricula.fechaMatricula || !nuevaMatricula.idProfesorMatricula ){
        return res.send("Faltan datos");
    }
    else{
        agregarMatricula(nuevaMatricula,(result)=>{
            res.json({menssage:"matricula agregada"})
        })
    }
})




////////////////////AGREGAR///////////////////////////////
////////////////////ELIMINAR///////////////////////////////




app.delete("/estudiantes/:id", (req, res) => {
    let elimEstudiante = req.params.id;
    eliminarEstudiante(elimEstudiante, (err, results) => {
        if (err) {
            return res.send("Error al eliminar el Estudiante");
        }
        res.json({ message: "Estudiante eliminado" });
    });
});

app.delete("/profesores/:id", (req, res) => {
    let elimProfesor = req.params.id;
    eliminarProfesor(elimProfesor, (err, results) => {
        if (err) {
            return res.send("Error al eliminar el Profesor");
        }
        res.json({ message: "Profesor eliminado" });
    });
});

app.delete("/matriculasE/:id", (req, res) => {
    let elimMatricula = req.params.id;
    eliminarMatriculaE(elimMatricula, (err, results) => {
        if (err) {
            return res.send("Error al eliminar el matricula");
        }
        res.json({ message: "matricula eliminado" });
    });
});

app.delete("/matriculasP/:id", (req, res) => {
    let elimMatricula = req.params.id;
    eliminarMatriculaP(elimMatricula, (err, results) => {
        if (err) {
            return res.send("Error al eliminar el matricula");
        }
        res.json({ message: "matricula eliminado" });
    });
});





////////////////////ELIMINAR///////////////////////////////
////////////////////ACTUALIZAR///////////////////////////////




app.put("/estudiantes/:id",(req, res) =>{
    let idEstudiante= req.params.id;
    const nuevosDatosEstudiante = req.body;
    actualizarEstudiante(idEstudiante,nuevosDatosEstudiante,(err, result) =>{
        if(!err){
            console.error("Error al actualizar datos del estudiante")
        }
        else{
            return res.json ({mensaje:"Datos del estudiante actualizados"})
        }
    })
})

app.put("/profesores/:id",(req, res) =>{
    let idProfesor= req.params.id;
    const nuevosDatosProfesor = req.body;
    actualizarProfesor(idProfesor,nuevosDatosProfesor,(err, result) =>{
        if(!err){
            console.error("Error al actualizar datos del profesor")
        }
        else{
            return res.json ({mensaje:"Datos del profesor actualizados"})
        }
    })
})

app.put("/matriculas/:id",(req, res) =>{
    let idMatricula= req.params.id;
    const nuevosDatosMatricula = req.body;
    actualizarMatricula(idMatricula,nuevosDatosMatricula,(err, result) =>{
        if(!err){
            console.error("Error al actualizar datos de matricula")
        }
        else{
            return res.json ({mensaje:"Datos de matricula actualizados"})
        }
    })
})





////////////////////ACTUALIZAR///////////////////////////////
////////////////////CONTAR///////////////////////////////




app.get("/estudiantess",(req,res)=>{
    contarEstudiante((results)=>{
        res.json(results);
    })
})

app.get("/profesoress",(req,res)=>{
    contarProfesor((results)=>{
        res.json(results);
    })
})

app.get("/matriculass",(req,res)=>{
    contarMatricula((results)=>{
        res.json(results);
    })
})




////////////////////CONTAR///////////////////////////////



app.listen(PORT,() =>{
    console.log("conectado")
})