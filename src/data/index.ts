// aca vamos a colocar un codigo que va a limpiar nuestra base de datos cuando realicemos test

import { exit } from "node:process"
import db from "../config/db"


const clearDB = async () => {
    try {
        // force true es que lo elimina correctamente
        await db.sync({ force: true })
        console.log("Datos eliminados correctamente");
        // este 0 se lo puedo colocar o no es lo mismo
        exit(0)
    } catch (error) {
        console.log(error);
        // si aca le coloco 1 es que finaliza con errores si le pongo 0 finaliza excelente
        exit(1)
    }
}
// process argv[2] es un codigo que se ejecuta en el CLR o el command line de node
if (process.argv[2] === '--clear') {
    clearDB()
}