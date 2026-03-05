// para crear un producto(registro) en la base de datos

import { Request, Response } from "express"
import Product from "../models/Product.model"

// funcion para obtener todos los productos
export const getProduct = async (req: Request, res: Response) => {
   try {
      // Product es el nombre del modelo
      // findAll es para traer todos los registros para obtener siempre usar los de find
      const products = await Product.findAll({
         // asi aplicariamos un orden descendente al campo price
         order: [
            ['id', 'DESC']
         ],
         // para quitar los campos que no necesitamos
         // attributes: { exclude: ['createdAt', 'updatedAt'] }
         // asi aplicaria un limite
         // limit: 2
      })
      res.json({ data: products });
   } catch (error) {
      console.log(error)
   }
}

// funcion para tener un producto por su ID
export const getProductById = async (req: Request, res: Response) => {
   try {
      // asi obtengo el valor del router dinamico
      // const { id } = req.params
      const { id } = req.params as { id: string };
      // findByPkes para traer por primary key
      const product = await Product.findByPk(id) as Product
      // comprobando si el producto existe
      if (!product) {
         res.status(404).json({
            error: "Producto No Encontrado"
         })
         return
      }
      res.json({ data: product });
   } catch (error) {
      console.log(error)
   }
}



// funcion para crear un producto
// siempre que vamos a interactuar con los models las funciones tienen que ser asincronas
export const createProduct = async (req: Request, res: Response) => {
   // lo coloco asi por si de casualidad llega a generar un error me muestre en consola el error
   try {
      // es una forma mas sencilla de guardar los datos en la base es hacerlo con create
      const product = await Product.create(req.body)
      res.status(201).json({ data: product })

      // // esta es otra forma de hacerlo con new
      // const product = new Product(req.body)
      // // para almacenarlo en la base de datos
      // const savedProducto = await product.save()
      // // asi regreso los datos de la base de datos al postman para verlos
      // res.json({ data: savedProducto })


      //    // para ver una respuesta en el postman
      //   res.json("Desde el hanldres de post")

   } catch (error) {
      console.log(error);
   }
}

export const updateProduct = async (req: Request, res: Response) => {

   // revisar primero que el producto exista
   // asi obtengo el valor del router dinamico
     const { id } = req.params as { id: string };
   // findByPkes para traer por primary key
   const product = await Product.findByPk(id) as Product
   // comprobando si el producto existe
   if (!product) {
      res.status(404).json({
         error: "Producto No Encontrado"
      })
      return
   }
   // Actualizar
   // para obtener los datos que el usuario manda req.body
   await product.update(req.body)
   // para almacenar el cambio
   await product.save()

   res.json({ data: product })
}


export const updateAvailability = async (req: Request, res: Response) => {
   // revisar primero que el producto exista
   // asi obtengo el valor del router dinamico
  const { id } = req.params as { id: string };
   // findByPkes para traer por primary key
   const product = await Product.findByPk(id) as Product
   // comprobando si el producto existe
   if (!product) {
      res.status(404).json({
         error: "Producto No Encontrado"
      })
      return
   }
   // Actualizar
   product.availability = !product.dataValues.availability
   // para almacenar el cambio
   await product.save()

   res.json({ data: product })
}


export const deleteProduct = async (req: Request, res: Response) => {
   // revisar primero que el producto exista
   // asi obtengo el valor del router dinamico
  const { id } = req.params as { id: string };
   // findByPkes para traer por primary key
   const product = await Product.findByPk(id) as Product
   // comprobando si el producto existe
   if (!product) {
      res.status(404).json({
         error: "Producto No Encontrado"
      })
      return
   }
   // con destroy elimino un registro
   await product.destroy()
   res.json({ data: "Producto Eliminado" })

}