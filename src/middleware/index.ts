import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"

// siempre que trabajo con middleware tengo que tener el req y res

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
    // para recuperar los mensajes de error es con validationResult
    let errors = validationResult(req)
    // para revisar si el arreglo esta vacio
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return
    }
    // con next le digo que pase a la siguiente funcion que esta en el router
    next()
}