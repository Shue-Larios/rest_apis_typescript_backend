import { Column, DataType, Default, Model, Table } from "sequelize-typescript";

// asi creo una tabla para mi base de datos

// Decoradores
// este es el nombre de la tabla
@Table({
    tableName: 'products'
})

// aca van hacer las columnas de la tabla

// para reescribir y definir nuestros modelos Model
class Product extends Model {
    // aqui hay que definir los atributos que va a tener este producto 
    // definimos la columna con su nombre y el tipo de dato
    @Column({
        // aca va air el tipo de dato que se le pondria a la base de datos con ese DataType como no hay VarChar le ponemos String
        type: DataType.STRING(100)
    })
    // este es el nombre de la columna y el tipo de dato
    declare name: string

    @Column({
        // lo float son especiales cuando tienes numero con decimales
        // (6,2) seria un numero como 123,456.00
        // type: DataType.FLOAT(6, 2) // como postgress no soporta esta sintaxis usamos la de abajo
        type: DataType.FLOAT
    })
   declare price: number

    // con esta linea le indico que este campo va a tener un valor por defecto de true y asi evito mandar ese dato la ves que lo creo
    @Default(true) 
    @Column({
        type: DataType.BOOLEAN
    })
   declare availability: boolean

}

export default Product