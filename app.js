const express = require("express");
const app = express();
const PORT = 3002;


const {traerEstudiante, agregarEstudiante, eliminarEstudiate, actualizarEstudiante} = require ("./models/escuelaModel")
app.use(express.json())

app.get("/",(req,res)=>{
    traerEstudiante((results)=>{
        res.json(results);
    })
})

app.post("/", (req,res)=>{
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

app.delete("//:id"), (req, res) =>{
    let estudianteId = req.params.id;
    eliminarEstudiate(estudianteId,(err,results)=>{
        if (err){
            return res.send("error al eliminar estudiiante")
        }
        res.json({message: "Estudiante eliminado"})
    })
}


app.put("/",(req, res) =>{
    let estudianteId= req.params.id;
    const nuevoEstudiante = req.body;
    actualizarEstudiante(estudianteId,nuevoEstudiante,(err, results) =>{

    })
})




app.listen(PORT,() =>{
    console.log("conectado")
})