// aca va air la informacion de general de mi API como se llama que es lo que hace y donde va a encontrar las rutas para escribir la documentacion

import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

// options tiene el type de swaggerJSDoc.Options
const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        // openapi es la que da los lineamientos para el API
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            },
            // por si ocupo tener mas grupos van asi
            {
                name: 'Users',
                description: 'API operations related to Useres'
            }
        ],
        info: {
            title: ' REST API Node.js / Express . TypeScript',
            // esta es la version que tiene la documentacion que estoy yo haciendo
            version: '1.0.0',
            description: 'API Docs for Products By Shue Larios'
        }
    },
    // apis es donde va a encontrar los endpoints que vas a documentar
    apis: ['./src/router.ts']
}

// estas options son las que estan declaradas arriba
const swaggerSpec = swaggerJSDoc(options)

// esto me sirve para darle estilos a la barra principal de la docs de swagger
export const swaggerOptions: SwaggerUiOptions = {

    customCss: `
    .topbar-wrapper .link {
      content: url('/static/logo.jpg');
      height: 80px;
      width: 80px;
    }
      .swagger-ui .topbar{
    background-color: black;
    }
  `,
    customSiteTitle: "Documentacion REST API Express / TypeScript",
   customfavIcon: "/static/logo.jpg"
}


export default swaggerSpec
