// describe es una de jest por eso no se importa de ningun lado
// espera dos parametros el primero el nombre del test y de segundo un callback
// describe es el que agrupa las purebas y it o test son cada prueba
// describe("nuestro primer test", () => {
//     // it y test aca son lo mismo asi que se puede hacer con cualquier de las dos
//     it('debe revisar que 1 + 1 sean 2', () => {
//         // expect es como decir que es lo que espero, un error una respuesta 
//         // toBe es el valor con el cual lo voy a comprar
//         expect(1 + 1).toBe(2)
//     })

//      test('debe revisar que 1 + 1 no sean 3', () => {
//         // expect es como decir que es lo que espero, un error una respuesta 
//         // toBe es el valor con el cual lo voy a comprar
//         expect(1 + 1).not.toBe(3)
//     })
// })


import { ConnectDB } from "../server";
// importacion de instancia de Sequelize
import db from "../config/db";


// // las pruebas siempre tiene que ir acompañadas de lo que debe hacer pero tambien de lo que NO debe hacer
// describe('get /api', () => {
//     test('should send back a json response', async () => {
//         const res = await request(server).get('/api')
//         // lo que debe hacer
//         // comprobar el contenido de una ruta
//         expect(res.status).toBe(200)
//         expect(res.headers['content-type']).toMatch(/json/)
//         // aca la comprobacion tiene que se igual igual a lo que recibo
//         expect(res.body.msg).toBe('Desde API')
//         // asi puedo acceder directamente al contenido que recibo de la prueba de la api
//         // console.log(res.body.msg);
//         // lo que NO debe hacer
//         expect(res.status).not.toBe(404)
//         expect(res.body.msg).not.toBe('desde api')
//     })
// })

// TODO ESTE CODIGO PUEDE SER GENERAL PARA PROBAR LOS TRYCATCH

// forzar errores para probar los catchs usando mock
// en jest un mock se refiere a una tecnica para las pruebas para simular el comportamiento de ciertos modulos funciones o objetos en este entorno 
// aca se pasa la ubicacion de la configuracion de la base de datos
jest.mock('../config/db')


describe('ConnectDB', () => {
    test('should handle database connection error', async () => {
        // authenticate es el mismo que esta en ConnectDB
        // spyOn crea una funcion en el ambiente del mock que es todo simulado le pasamos la base y el metodo que queremos observar su comportamiento
        // mockRejectedValueOnce lanzamos una excepcion para que se vaya al error del trycatch 
        jest.spyOn(db, 'authenticate')
            .mockRejectedValueOnce(new Error("Hubo un error al conectar a la BD"))
        const consoleSpy = jest.spyOn(console, 'log')
        // aca mando a llamar la funcion para que se ejeucte
        await ConnectDB()
        // toHaveBeenCalledWith funciona solo con mock
        expect(consoleSpy).toHaveBeenCalledWith(
            // stringContaining que contenga un texto dice
            expect.stringContaining("Hubo un error al conectar a la BD")
        )
    })
})
