import express from 'express';
import { leerDatos, crearDatos, eliminarDatos } from "./datos.js";

const server = express();

server.set("view engine", "ejs");

server.use(express.urlencoded());

server.use(express.static("./public"));

server.get("/", async (peticion, respuesta) => {
    try {
        let personas = await leerDatos();

        personas = personas.trim().length == 0 ? [] : personas.split(",");
        respuesta.render("index", { personas , mensaje : "<span>x cosa</span>"});
        
    }catch(e){
        respuesta.status(500);
        respuesta.send("Error en el servidor");

    }finally{
        console.log("Operación finalizada");

    }
});

server.get("/borrar", async (peticion, respuesta) => {
    try{
        await eliminarDatos(peticion.query.nombre);

        respuesta.redirect("/");

    }catch(e){
        respuesta.status(500);
        respuesta.send("Error en el servidor");

    }
});

server.post("/nuevo", async (peticion, respuesta) => {
    let { nombre } = peticion.body;

    try{
        await crearDatos(nombre);

        respuesta.redirect("/");

    }catch(e){
        respuesta.status(500);
        respuesta.send("Error en el servidor");

    }
});

server.listen(process.env.PORT || 4000);
