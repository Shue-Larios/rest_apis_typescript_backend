import request from "supertest";
import server from "../../server";

// el post de los productos
describe("POST /api/products", () => {
    test('should display validation errors', async () => {
        // en este caso send lo mandamos vacio para comprobar las validaciones de campos vacios
        const response = await request(server).post('/api/products').send({})
        // que es lo que esperamos de respuesta
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        // toHaveLength dice que tenga una extension de 4 en arreglo
        expect(response.body.errors).toHaveLength(4)
        // negamos las revisiones
        expect(response.status).not.toBe(404)
        // toHaveLength dice que tenga una extension de 4 en arreglo
        expect(response.body.errors).not.toHaveLength(2)

    })

    // verificamos que no sera 0 el valor enviado
    test('should validate that the price is greater than 0', async () => {
        // en este caso send lo mandamos vacio para comprobar las validaciones de campos vacios
        const response = await request(server).post('/api/products').send({
            name: "Monitor Curvo - Testing",
            price: 0
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        // toHaveLength dice que tenga una extension de 4 en arreglo
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(404)
        // toHaveLength dice que tenga una extension de 4 en arreglo
        expect(response.body.errors).not.toHaveLength(2)
    })

    // verificamos que no sea un string el valor del producto
    test('should validate that the price is a number and greater than 0', async () => {
        // en este caso send lo mandamos vacio para comprobar las validaciones de campos vacios
        const response = await request(server).post('/api/products').send({
            name: "Monitor Curvo - Testing",
            price: "hola"
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        // toHaveLength dice que tenga una extension de 4 en arreglo
        expect(response.body.errors).toHaveLength(2)

        expect(response.status).not.toBe(404)
        // toHaveLength dice que tenga una extension de 4 en arreglo
        expect(response.body.errors).not.toHaveLength(4)

    })

    // esta es otra prueba
    test('should create a new product', async () => {
        // .send es lo que vamos a enviarle
        const response = await request(server).post('/api/products').send({
            name: "Mouse - Testing",
            price: 50
        })
        expect(response.status).toBe(201)
        // toHaveProperty dice que tenga la propiedad
        expect(response.body).toHaveProperty('data')

        // la contra parte de eso
        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(200)
        // toHaveProperty dice que tenga la propiedad
        expect(response.body).not.toHaveProperty('errors')
    })
})

// para el get de los productos
describe("GET /api/products", () => {
    test('should check if api/products url exists', async () => {
        const response = await request(server).get('/api/products')
        expect(response.status).not.toBe(404)
    })


    test('GEt a JSON response with products', async () => {
        const response = await request(server).get('/api/products')
        // esto es lo que esperamos que la api haga
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)
        // lo que no queremos que haga
        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty('errors')
    })
})


// valida que el producto exista por el id
describe("GET /api/products/:id", () => {
    test('should return a 404 for a non-existent product', async () => {
        //    creamos un id que sabemos que no va a existir
        const productId = 2000

        const response = await request(server).get(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe("Producto No Encontrado")
    })

    // valida que el id sea valido
    test('should check valid ID in the URL', async () => {
        const response = await request(server).get(`/api/products/not-valid-url`)
        // aca va lo que espero
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe(('ID vo valido'))
    })

    // revisa si estamos obteniendo un producto
    test('get a JSON response for a single product', async () => {
        const response = await request(server).get(`/api/products/1`)
        // aca va lo que espero
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
    })
})


// para el put 
describe("PUT /api/products/:id", () => {
    // valida que el id sea valido 
    test('should check valid ID in the URL', async () => {
        const response = await request(server).put(`/api/products/not-valid-url`).send({
            name: "Monitor Nuevo - Actualizado",
            availability: true,
            price: 300
        })
        // aca va lo que espero
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe(('ID vo valido'))
    })


    // test de si se envian campos vacios al actualizar
    test('should display validation error messages when updating a product ', async () => {
        const response = await request(server).put('/api/products/1').send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(5)
        // validando la parte que no deberia de darnos
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    // test si se manda un precio valido
    test('should validate that the price is greater than 0', async () => {
        const response = await request(server).put('/api/products/1').send({
            name: "Monitor Nuevo - Actualizado",
            availability: true,
            price: 0
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        // para obtener el mensaje que viene en el api
        expect(response.body.errors[0].msg).toBe('Precio no valido')
        // validando la parte que no deberia de darnos
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    // test para ver si un producto existe o no
    test('should return a 404 response for a non-existent product', async () => {
        const productId = 2000
        const response = await request(server).put(`/api/products/${productId}`).send({
            name: "Monitor Nuevo - Actualizado",
            availability: true,
            price: 300
        })

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        // para obtener el mensaje que viene en el api
        expect(response.body.error).toBe('Producto No Encontrado')
        // validando la parte que no deberia de darnos
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })


    // test para actualizar si el producto existe
    test('should update an existing product with valid data', async () => {
        const response = await request(server).put(`/api/products/1`).send({
            name: "Monitor Nuevo - Actualizado desde el test",
            availability: true,
            price: 300
        })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        // validando la parte que no deberia de darnos
        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('errors')
    })
})
// para el patch
describe("PATCH /api/products/:id", () => {
    // test de no existe el producto
    test('should return a 404 response for a non-existing product', async () => {
        const productId = 2000
        const response = await request(server).patch(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto No Encontrado')
        // lo que no espero que haga
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    // test para actualizar el producto
    test('should Update the product availability', async () => {
        const response = await request(server).patch(`/api/products/1`)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data.availability).toBe(false)
        // lo que no esperamos
        expect(response.status).not.toBe(400)
        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty('error')
    })
})

// para el delete
describe("DELETE /api/products/:id", () => {
    // test para una url:id no valida
    test('should check a valid ID', async () => {
        const response = await request(server).delete('/api/products/not-valid')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe("ID vo valido")
        // lo que no espero que haga
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    // test para un producto que no exista
    test('should return a 404 response for a non-existent product', async () => {
        const productId = 2000
        const response = await request(server).delete(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe("Producto No Encontrado")
        // lo que no espero que haga
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    // test de si el producto existe eliminarlo
    test('should delete a product', async () => {
        const response = await request(server).delete('/api/products/1')

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toBe('Producto Eliminado')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('errors')

    })
})