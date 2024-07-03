
const { getConnection } = require('../database/config');

require('dotenv/config')



const getGrupoLabores = async (req, res) => {
    try {
        const pool =  await getConnection()
        const query = `SELECT * FROM Grupo_Labores WHERE Activo = 1`

        const resultado = await pool.request().query(query)

        
        res.status(202).send(resultado.recordsets)


    } catch (error) {
        console.error('error en la base de datos', error)
        res.status(500).json({ error: 'Error interno del servidor' });
    }
    
    
}


const getGrupoLaboresDesactivado = async (req, res) => {
    try {
        const pool =  await getConnection()
        const query = `SELECT * FROM Grupo_Labores WHERE Activo = 0`

        const resultado = await pool.request().query(query)

        
        res.status(202).send(resultado.recordsets)


    } catch (error) {
        console.error('error en la base de datos', error)
        res.status(500).json({ error: 'Error interno del servidor' });
    }
    
}

const agregarGrupoLabor = async (req, res) => {
    try {
        const {nombre} = req.body
        console.log(nombre);
        
        const pool = await getConnection()

        const query = `
        INSERT INTO Grupo_Labores VALUES ('${nombre}', 1)`
    
        const resultado = await pool.request().query(query)
    
        res.status(201).send({message: 'Grupo labor creado correctamente'})
        
    } catch (error) {
        console.error('Error en la base de datos', error)
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}



const cambiarEstadoGrupoLabor = async (req, res) => {

   
    try {
        


        const {grupoLabor, valor} = req.body
        const pool = await getConnection()
        const query = `
       UPDATE Grupo_Labores
        SET Activo = ${valor}
        WHERE Nombre = '${grupoLabor}'
        `

        if (valor === 0) {

            const queryVerificar = `SELECT * FROM Labores
            INNER JOIN Grupo_Labores ON Grupo_Labores.ID = Labores.Codigo_Grupo_Labor
            WHERE Grupo_Labores.Nombre = '${grupoLabor}' AND Labores.Activo = 1`

            const resultadoQuery = await pool.request().query(queryVerificar)
            const resultadoVerificar = resultadoQuery.recordset

            if (resultadoVerificar.length > 0) {
                return res.status(401).send({error: 'No se puede desactivar grupo de labor si una labor lo esta usando'})
            }



            
            
        }


        // const resultado = await pool.request().query(query)

        res.status(202).send({message: 'Cambio hecho exitosamente!'})

    } catch (error) {
        console.error('Error en la base de datos', error)
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}




module.exports = {
    getGrupoLabores,
    getGrupoLaboresDesactivado,
    agregarGrupoLabor,
    cambiarEstadoGrupoLabor
}
