import { Sequelize } from "sequelize-typescript"
import dotenv from "dotenv"

// asi mandamos a llamar las variables de entorno
dotenv.config()


const db = new Sequelize(process.env.DATABASE_URL!, {
    //para agregar el modelo de las columnas de la base de datos 
    // __dirname es una funcion especial de Node.JS que nos retorna la ubicacion del archivo que lo esta mandando a llamar y le digo que todos los archivos que tengan ts en models sean considerados modelos
    models: [__dirname + '/../models/**/*'],
    // para que no me mande nada a la consola
    logging: false
    // estas son las opciones para la conexion
    // error: SSL/TLS required se soluciona con esto ?ssl=true o con las lineas de abajo
    // dialectOptions: {
    //     ssl: {
    //         require: false
    //     }
    // }
})

export default db