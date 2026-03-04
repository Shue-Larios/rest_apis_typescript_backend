// Configuracion del servidor 

import express, { response } from "express"
import colors from "colors"
import cors, { CorsOptions } from "cors"
import morgan from "morgan"
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, { swaggerOptions } from "./config/swagger"
import router from "./router"
import path from 'path';
import db from "./config/db"


// instancia de axios
const server = express()

// permitir conexiones
const corsOptions: CorsOptions = {
    // el origin es que es lo que me esta enviando la peticion
    origin: function (origin, callback) {
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
            callback(new Error('Error de CORS'))

        }
    }
}
// para que el servidor ejecute las opciones cel cors
server.use(cors(corsOptions))

// para poner mi logo en el swagger
server.use('/static', express.static(path.join(__dirname, '..', 'src')));

// leer datos de formularios habilitar la lectura de los json
server.use(express.json())

server.use(morgan('dev'))

// .use() es un metodo que engloba todos los verbos http y se ejecuta en cada uno de ellos
// primero hay que pasarle la url y despues donde estan los verbos get, post etc
// aca se configura como la URL estandar y dentro del router se adicionas en resto
server.use("/api/products", router)

// Conectar a base de datos hecha en Render con postgres
export async function ConnectDB() {
    try {
        // uno de sus metodos de Sequelize authenticate es para autenticarse
        await db.authenticate()
        // este sync lo que va hacer en caso de que vayamos creando nuevos modelos, nuevas columnas a la base de datos va air agregandolas  
        db.sync()
          console.log(colors.blue.bold("Conexion exitosa a la base de datos"))

    } catch (error) {
        // obtenemos un posible error

        // de esta forma la vamos a ver en la terminal en caso de que algo salga mal
        console.log(colors.red.bold("Hubo un error al conectar a la BD"))
    }
}

ConnectDB()

//  Docs
// utilizar una ruta que no se haya utilizado anteriormente en este caso '/docs'
// swaggerUi.serve de esta forma tenemos el cliente de swagger express y nos da una URL 
// swaggerUi.setup(swaggerSpec) es la configuracion que donde estan las rutas y todo eso
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions))

export default server