// nuestro archivo principal

import colors from "colors";
import server from "./server";

const port = process.env.PORT  
// 4mil seria el puerto en el que estoy corriendo el servidor
server.listen(port, () => {
    console.log(colors.cyan.bold(`desde api en el puerto ${port}`))
})