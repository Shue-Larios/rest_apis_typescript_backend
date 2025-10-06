import { Router } from "express"
import { createProduct, deleteProduct, getProduct, getProductById, updateAvailability, updateProduct } from "./handlers/product"
import { body, param } from "express-validator"
import { handleInputErrors } from "./middleware"

const router = Router()

/**
 * esto siempre tiene que ir en esto  ES MUY IMPORTANTE USAR EL TAB PARA DAR ESPACIOS
 *  @swagger 
 * components:
 *   schemas:
 *      Product:
 *          type: object
 *          properties: 
 *              id:
 *                  type: integer
 *                  description: The Product ID
 *                  example: 1
 *              name:
 *                  type: string
 *                  description: The Product Name
 *                  example: Monitor Curvo de 42 Pulgadas
 *              price:
 *                  type: number
 *                  description: The Product price
 *                  example: 300
 *              availability:
 *                  type: boolean
 *                  description: The Product availability
 *                  example: true
 */

//Routing 
// Request (req) es lo que tu envias
// response (res) es lo que obtengo cuando envio el req
router.get("/", getProduct)

// esta es la forma de documentar el endpoint de la url de arriba
// * @swagger  siempre tiene que ir
// tags: - Products  este es al grupo que va a estar asociada tiene que tener el mismo nombre que en los tags de los options de swagger.ts
//  summary es la descripcion
//   $ref: '#/components/schemas/Product' este Product es el schema que definimos arriba en el swagger/components/schema
// DOCUMENTACION PARA LA URL DE ARRIBA
/**
*  @swagger 
* /api/products:
*       get:
*          summary: Get  a list of products
*          tags: 
*              - Products 
*          description: Return a list of product
*          responses: 
*                 200:
*                     description: Successful response
*                     content:
*                           application/json:
*                                   schema:
*                                       type: array
*                                       items:
*                                         $ref: '#/components/schemas/Product'
*  
*/


// para obtener un producto por su ID
// usando router dinamico :id
// como se nombre la variable del router dinamico es como voy acceder a el
router.get("/:id",
    // validar si lo q manda el usuario es un parametro id
    param("id").isInt().withMessage("ID vo valido"),
    handleInputErrors,
    getProductById)


// DOCUMENTACION PARA LA URL DE ARRIBA
// - in: path dice que el parametro tiene que estar en la URL y ahi si muestra la informacion en la url de swagger
/**
*  @swagger 
* /api/products/{id}:
*       get:
*          summary: Get  a product by ID
*          tags: 
*              - Products 
*          description: Return a product based on its unique ID
*          parameters:
*             - in: path
*               name: id
*               description: The Id of the product to retrieve
*               required: true
*               schema: 
*                   type: integer
*          responses: 
*                 200:
*                     description: Successful response
*                     content:
*                           application/json:
*                                   schema:
*                                         $ref: '#/components/schemas/Product'
*                 404:
*                     description: Not found
*                 400:
*                     description: Bad Request - Invalid ID
*/





// router.post("/", (req, res) => {
// aca en esta funcion podria poner todo el codigo necesario para crear un registro pero puede ser que se haga muy grande entonces separamos el codigo en los handles que son peque;as funciones 
//     // es una forma de mandar datos hacia la pantalla
//     res.json("Res desde post")
// })



router.post("/",
    //  Validacion
    // notEmpty revisa que no este vacio ese valor
    // withMessage es el mensaje que se muestra en caso que no se cumpla
    // run(req) recupera lo que nosotros enviamos al servidor y asi entra la validacion
    // utilizar await.check en funciones asincronas y body en funciones NO asincronas
    body('name').notEmpty().withMessage("El nombre del producto no puede ir vacio"),
    body('price')
        .isNumeric().withMessage("Valor no valido")
        .notEmpty().withMessage("El Precio del producto no puede ir vacio")
        // esta linea seria como una validacion personalizada se hace con custom value es el valor que se introduce
        .custom(value => value > 0).withMessage("Precio no valido"),
    // Fin Validacion
    // Middleware
    handleInputErrors,
    // como separamos el codigo en handlers llamamos la funcion aca
    createProduct)


// DOCUMENTACION PARA LA URL DE ARRIBA
/**
*  @swagger 
* /api/products:
*       post:
*          summary: Creates a new Product
*          tags: 
*              - Products 
*          description: Return a new record in the database
*          requestBody:
*               required: true
*               content:
*                      application/json:
*                           schema: 
*                               type: object
*                               properties:
*                                   name:
*                                       type: string
*                                       example: "Monitor Cuvro 49 pulgadas"
*                                   price:
*                                       type: number
*                                       example: "300"
*          responses: 
*                 201:
*                     description: Successful response
*                     content:
*                           application/json:
*                                   schema:
*                                         $ref: '#/components/schemas/Product'
*                 400:
*                     description: Bad Request - Invalid input data
*/

// put realiza modificaciones Completas con lo que le estoy enviando
router.put("/:id",
    param("id").isInt().withMessage("ID vo valido"),
    body('name').notEmpty().withMessage("El nombre del producto no puede ir vacio"),
    body('price')
        .isNumeric().withMessage("Valor no valido")
        .notEmpty().withMessage("El Precio del producto no puede ir vacio")
        // esta linea seria como una validacion personalizada se hace con custom value es el valor que se introduce
        .custom(value => value > 0).withMessage("Precio no valido"),
    body("availability").isBoolean().withMessage("Valor para disponibilidad no valido"),
    handleInputErrors,
    updateProduct)


// DOCUMENTACION PARA LA URL DE ARRIBA
/**
*  @swagger 
* /api/products/{id}:
*       put:
*          summary: update a product with user input
*          tags: 
*              - Products 
*          description: Return the updated product
*          parameters:
*             - in: path
*               name: id
*               description: The Id of the product to retrieve
*               required: true
*               schema: 
*                   type: integer
*          requestBody:
*               required: true
*               content:
*                      application/json:
*                           schema: 
*                               type: object
*                               properties:
*                                   name:
*                                       type: string
*                                       example: "Monitor Cuvro 49 pulgadas"
*                                   price:
*                                       type: number
*                                       example: "300"
*                                   availability:
*                                       type: bollean
*                                       example: true
*          responses: 
*                 200:
*                     description: Successful response
*                     content:
*                           application/json:
*                                   schema:
*                                         $ref: '#/components/schemas/Product'
*                 
*                 400:
*                     description: Bad Request - Invalid ID or Invalid input data
*                 404:
*                     description: Product Not Found
*/





// solo hace modificaciones a lo que yo stoy enviando
router.patch("/:id",
    param("id").isInt().withMessage("ID vo valido"),
    handleInputErrors,
    updateAvailability)


// DOCUMENTACION PARA LA URL DE ARRIBA
/**
*  @swagger 
* /api/products:
*       patch:
*          summary: Update Product availability
*          tags: 
*              - Products 
*          description: Return the updated availability
*          parameters:
*             - in: path
*               name: id
*               description: The Id of the product to retrieve
*               required: true
*               schema: 
*                   type: integer
*          responses: 
*                 200:
*                     description: Successful response
*                     content:
*                           application/json:
*                                   schema:
*                                         $ref: '#/components/schemas/Product'
*                 400:
*                     description: Bad Request - Invalid ID
*                 404:
*                     description: Product Not Found
*/




router.delete("/:id",
    param("id").isInt().withMessage("ID vo valido"),
    handleInputErrors,
    deleteProduct
)

// DOCUMENTACION PARA LA URL DE ARRIBA
/**
*  @swagger 
* /api/products:
*       delete:
*          summary: Deletes a Product  by a given ID
*          tags: 
*              - Products 
*          description: Return a confirmation message
*          parameters:
*             - in: path
*               name: id
*               description: The Id of the product to delete
*               required: true
*               schema: 
*                   type: integer
*          responses: 
*                 200:
*                     description: Successful response
*                     content:
*                           application/json:
*                                   schema:                          
*                                        type: string
*                                        value: "Producto Eliminado"
*                 400:
*                     description: Bad Request - Invalid ID
*                 404:
*                     description: Product Not Found
*/




export default router