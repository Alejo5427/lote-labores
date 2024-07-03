const sql = require('mssql')
require('dotenv/config')


const dbSettings = {

    user: process.env.USER,
    password: process.env.PASSWORD,
    server: process.env.SERVER,
    database: process.env.DATABASE,
    options: { 
        trustServerCertificate: true,
        },

}

const getConnection = async() => {
    try { 
        const pool = await sql.connect(dbSettings)
        
        return pool;

    } catch (error) {
        console.error('Error en la conexion de base de datos', error.message)
        throw error;
    }
}


sql.connect(dbSettings)

module.exports = {
    getConnection
}