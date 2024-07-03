const express = require('express')
const cors = require('cors')
const {getConnection} = require('../database/config')

require('dotenv/config');


class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT

        this.paths = {
            labores: '/labores',
            grupoLabores: '/grupo-labores',
            laborRealizada: '/labor-realizada',
            lote: '/lote',
        }


        this.middlewares();

        this.routes();

        this.connectDB()
    }

    async connectDB() {
        await getConnection()  
    }

    middlewares() {
        this.app.use(express.json());

        this.app.use(express.urlencoded({extended: false}))

        this.app.use(cors());
    }


    routes() {
        this.app.use(this.paths.labores, require('../routes/labores.routes'))
        this.app.use(this.paths.grupoLabores, require('../routes/grupo-labores.routes'))
        this.app.use(this.paths.laborRealizada, require('../routes/labor-realizada.routes'))
        this.app.use(this.paths.lote, require('../routes/lote.routes'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Labores esta escuchando y ejecutandose en el puerto de http://localhost:${this.port}`);
        })
    }

}


module.exports = Server

