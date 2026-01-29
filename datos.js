import {readFile, writeFile} from "fs";

export function leerDatos(){
    return new Promise((succes, fail) => {
        readFile("./personas.txt", (error, content) => {
            if(!error){
                return succes(content.toString());
            }
            fail("error al leer datos");
        });
    });
};

export function crearDatos(nombre){
    return new Promise((succes, failed) => {
        leerDatos()
        .then(datos => {
            let personas = datos.trim().length == 0 ? [] : datos.split(",");
            personas.push(nombre);
            writeFile("./personas.txt", personas.join(","), error => {
                if(!error) {
                    return succes();
                }
                failed("error al escribir datos");
            })
        })
        .catch(error => failed(error));
    });
};

export function eliminarDatos(nombre){
    return new Promise((succes, failed) => {
        leerDatos()
        .then(datos => {
            let personas = datos.trim().length == 0 ? [] : datos.split(",");
            personas = personas.filter(persona => persona != nombre);
            writeFile("./personas.txt", personas.join(","), error => {
                if(!error) {
                    return succes();
                }
                failed("error al escribir datos");
            })
        })
        .catch(error => failed(error));
    });
};

/* try {
    let personas = await leerDatos();
    console.log(personas);
    await crearDatos("Luciano");
    console.log("Persona agregada");
    personas = await leerDatos();
    console.log(personas);
    await eliminarDatos("Luciano");
    console.log("Persona eliminada");
    personas = await leerDatos();
    console.log(personas);
}catch(e){
    console.log(e);
}finally{
    console.log("Proceso terminado");
}; */

