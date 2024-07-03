
const { getConnection } = require('../database/config');



require('dotenv/config')



const validarCodigo = async(req, res) => {

    try {
        
                
            const {valor} = req.body

            const codigo = parseInt(valor)

            
            const pool = await getConnection()

            const queryVerificarCodigo = `SELECT * FROM Labores WHERE Codigo = ${codigo}`


            const resultadoVerificarCodigo = await pool.request().query(queryVerificarCodigo)


            console.log('Llegue aqui');
            

             res.status(202).send(resultadoVerificarCodigo.recordset)




    } catch (error) {
        console.error(error)
        res.status(500).send({error: 'Error interno en la base de datos'})
    }


}

// const getLabores = async (req, res) => {
//     try {
//         const pool = await getConnection()
        
//         const query = `SELECT Labor.Codigo, Labor.Nombre, Descripcion, Color, Grupo_Labor.Nombre AS Grupo_Labor FROM Labor
//             INNER JOIN Grupo_Labores AS Grupo_Labor ON Labor.Codigo_Grupo_Labor = Grupo_Labor.Codigo
//             AND Labor.Activo = 1 AND Labor.Incompleto = 0`

//         const resultado = await pool.request().query(query)

        
        
//         res.status(202).send(resultado.recordset)
//     } catch (error) {
//         console.error('error en la base de datos', error)
//         res.status(500).json({ error: 'Error interno del servidor' });
//     }
    
// }



const getLabores = async (req, res) => {
    try {
        const pool = await getConnection()
        
        const query = `SELECT Labor.Codigo, Labor.Nombre, Descripcion, Color, Grupo_Labor.Nombre AS Grupo_Labor FROM Labores AS Labor
            INNER JOIN Grupo_Labores AS Grupo_Labor ON Labor.Codigo_Grupo_Labor = Grupo_Labor.ID
            AND Labor.Activo = 1 AND Labor.Incompleto = 0`

        const resultado = await pool.request().query(query)

        
        
        res.status(202).send(resultado.recordset)
    } catch (error) {
        console.error('error en la base de datos', error)
        res.status(500).json({ error: 'Error interno del servidor' });
    }
    
}



// const getLaboresEditar = async (req, res) => {
//     try {
        
//         const {idUser} = req.body

//         const pool = await getConnection()
        
//         const query = `SELECT Labor.Nombre AS Nombre, Descripcion, GrupoLabor.Nombre AS NombreLabor,Color FROM Labor
//                         INNER JOIN Grupo_Labores AS GrupoLabor ON GrupoLabor.Codigo = Labor.Codigo_Grupo_Labor
//                         WHERE Labor.Codigo = ${idUser}`
        
//         const resultado = await pool.request().query(query)
    
//         res.status(202).send(resultado.recordset)

//     } catch (error) {
//         console.error(error)
//         res.status(500).send({error: 'Error interno del servidor'})
//     }

// }

const getLaboresEditar = async (req, res) => {
    try {
        
        const {idUser} = req.body

        const pool = await getConnection()
        
        const query = `
                        SELECT Labor.Nombre AS Nombre, Labor.Descripcion AS Descripcion, Grupo_Labor.Nombre AS NombreLabor, Labor.Color AS Color FROM Labores AS Labor
                        INNER JOIN Grupo_Labores AS Grupo_Labor ON Grupo_Labor.ID = Labor.Codigo_Grupo_Labor
                        WHERE Labor.ID = ${idUser}`
        
        const resultado = await pool.request().query(query)
    
        res.status(202).send(resultado.recordset)

    } catch (error) {
        console.error(error)
        res.status(500).send({error: 'Error interno del servidor'})
    }

}

// const getLaboresIncompletas = async(req, res) => {

//     try {
//         const pool = await getConnection()

//         const query = `SELECT Labor.Codigo, Labor.Nombre, Descripcion, Color, Grupo_Labor.Nombre AS Grupo_Labor FROM Labor
//                 INNER JOIN Grupo_Labores AS Grupo_Labor ON Labor.Codigo_Grupo_Labor = Grupo_Labor.Codigo
//                 AND Labor.Activo = 1 AND Labor.Incompleto = 1`

//         const resultado = await pool.request().query(query)
    
//         res.status(202).send(resultado.recordset)
//     } catch (error) {
//         console.error('error en la base de datos', error)
//         res.status(500).json({ error: 'Error interno del servidor' });
//     }
// }

const getLaboresIncompletas = async(req, res) => {

    try {
        const pool = await getConnection()

        const query = `SELECT Labor.Codigo, Labor.Nombre, Descripcion, Color, Grupo_Labor.Nombre AS Grupo_Labor FROM Labores AS Labor
            INNER JOIN Grupo_Labores AS Grupo_Labor ON Labor.Codigo_Grupo_Labor = Grupo_Labor.ID
            AND Labor.Activo = 1 AND Labor.Incompleto = 1`

        const resultado = await pool.request().query(query)
    
        res.status(202).send(resultado.recordset)
    } catch (error) {
        console.error('error en la base de datos', error)
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}


const agregarLabor = async(req, res) => {
    try {
        const {nombre, descripcion, grupoLabor, color, codigo} = req.body

        const pool = await getConnection()



        const queryVerificarCodigo = `SELECT * FROM Labores WHERE Codigo = ${codigo}`

        
        const resultadoVerificarCodigo = await pool.request().query(queryVerificarCodigo)



        
        
        
        if(resultadoVerificarCodigo.recordset.length > 0) {

            return res.status(400).send('Codigo ya existente, elige otro ')

        }


        const queryCodigoGrupo = `SELECT ID FROM Grupo_Labores WHERE Nombre = '${grupoLabor}'`

        const resultadoCodigoGrupo = await pool.request().query(queryCodigoGrupo)

        

        const codigoGrupoLabor = resultadoCodigoGrupo.recordset[0].ID


        

        
        const query = `INSERT INTO Labores VALUES 
        ( ${parseInt(codigo)}, '${nombre}', '${descripcion}', ${codigoGrupoLabor}, '${color}', 1 , 0)`


        const resultado = await pool.request().query(query)

        res.status(201).send({message: 'Datos ingresados correctamente'})
        
    } catch (error) {
        console.error('error en la base de datos', error)
        res.status(500).json({ error: 'Error interno del servidor' });
    }

}



// const agregarLabor = async (req, res) => {
//     try {
//         const {nombre, descripcion, grupoLabor, color} = req.body


        
//         const pool = await getConnection()

//         const queryCodigoGrupo = `SELECT Codigo FROM Grupo_Labores WHERE Nombre = '${grupoLabor}'`

//         const resultadoCodigoGrupo = await pool.request().query(queryCodigoGrupo)

//         const codigoGrupoLabor = resultadoCodigoGrupo.recordset[0].Codigo
        


//         const query = `
//         INSERT INTO Labor VALUES(
//         '${nombre}', '${descripcion}', '${codigoGrupoLabor}', '${color}', 1, 0
//         )`

//         const resultado = await pool.request().query(query)

//         res.status(201).send({message: 'Datos ingresados correctamente'})
        
//     } catch (error) {
//         console.error('error en la base de datos', error)
//         res.status(500).json({ error: 'Error interno del servidor' });
//     }
// }

const editarLabor =  async(req, res) => {

    try {
        const {nombre, descripcion, grupoLabor, color, codigo} = req.body
        
            console.log(nombre, descripcion, grupoLabor, color, codigo);
            

            const pool = await getConnection();

            const queryCodigoGrupo = `SELECT ID FROM Grupo_Labores WHERE Nombre = '${grupoLabor}'`
            const resultadoCodigoGrupo = await pool.request().query(queryCodigoGrupo)
            const codigoGrupoLabor = resultadoCodigoGrupo.recordset[0].ID


            const query = `UPDATE Labores
            SET
            Nombre = CASE WHEN '${nombre}' <> '' THEN '${nombre}' ELSE Nombre END,
            Descripcion = CASE WHEN '${descripcion}' <> '' THEN '${descripcion}' ELSE Descripcion END,
            Codigo_Grupo_Labor = CASE WHEN '${codigoGrupoLabor}' <> '' THEN '${codigoGrupoLabor}' ELSE Codigo_Grupo_Labor END,
            Color = CASE WHEN '${color}' <> '' THEN '${color}' ELSE Color END
            WHERE
            Codigo = '${codigo}'`
            const resultado = await pool.request().query(query)
            return res.status(201).send({message: 'Cambio de estado hecho exitosamente'})
        
        

    } catch (error) {
        console.error('Error interno en la base de datos', error)
        res.status(500).json({error: 'Error interno del servidor'})
    }

}


// const editarLabor =  async(req, res) => {

//     try {
//         const {nombre, descripcion, grupoLabor, color, idUser} = req.body
        
//         if (!grupoLabor) {
//             const pool = await getConnection();
//             const query = `UPDATE Labor
//             SET
//             Nombre = CASE WHEN '${nombre}' <> '' THEN '${nombre}' ELSE Nombre END,
//             Descripcion = CASE WHEN '${descripcion}' <> '' THEN '${descripcion}' ELSE Descripcion END,
//             Codigo_Grupo_Labor = CASE WHEN '${grupoLabor}' <> '' THEN '${grupoLabor}' ELSE Codigo_Grupo_Labor END,
//             Color = CASE WHEN '${color}' <> '' THEN '${color}' ELSE Color END
        
//             WHERE
//             Codigo = '${idUser}'`
//             const resultado = await pool.request().query(query)
//             return res.status(201).send({message: 'Cambio de estado hecho exitosamente'})
//         }
        

        

//         const pool = await getConnection();
        
        
//         const queryCodigoGrupo = `SELECT Codigo FROM Grupo_Labores WHERE Nombre = '${grupoLabor}'`
        
//         const resultadoCodigoGrupo = await pool.request().query(queryCodigoGrupo)
        
//         const codigoGrupoLabor = resultadoCodigoGrupo.recordset[0].Codigo
        
//         const query = `UPDATE Labores
//         SET
//             Nombre = CASE WHEN '${nombre}' <> '' THEN '${nombre}' ELSE Nombre END,
//             Descripcion = CASE WHEN '${descripcion}' <> '' THEN '${descripcion}' ELSE Descripcion END,
//             Codigo_Grupo_Labor = CASE WHEN '${codigoGrupoLabor}' <> '' THEN '${codigoGrupoLabor}' ELSE Codigo_Grupo_Labor END,
//             Color = CASE WHEN '${color}' <> '' THEN '${color}' ELSE Color END
//             WHERE
//             Codigo = '${idUser}'`
        

//         const resultado = await pool.request().query(query)
// // 
        
//         res.status(201).send({message: 'Cambio de estado hecho exitosamente'})

//     } catch (error) {
//         console.error('Error interno en la base de datos', error)
//         res.status(500).json({error: 'Error interno del servidor'})
//     }

// }


// const estadoLabor = async (req, res) => {
//     try {
//         const {estado, idUser} = req.body
        
        
     
//         const pool = await getConnection();
    
//         const query = `UPDATE Labor SET Incompleto = ${estado} WHERE Codigo = ${idUser}`
    
//         const resultado = await pool.request().query(query)
    
//         res.status(201).send({message: 'Estado cambiado exitosamente'}) 
//     } catch (error) {
//         console.error('Error interno en la base de datos', error)
//         res.status(500).json({error: 'Error interno del servidor'})
//     }

// }

const estadoLabor = async (req, res) => {
    try {
        const {estado, idUser} = req.body
        
        
     
        const pool = await getConnection();
    
        const query = `UPDATE Labores SET Incompleto = ${estado} WHERE Codigo = ${idUser}`
    
        const resultado = await pool.request().query(query)
    
        res.status(201).send({message: 'Estado cambiado exitosamente'}) 
    } catch (error) {
        console.error('Error interno en la base de datos', error)
        res.status(500).json({error: 'Error interno del servidor'})
    }

}





module.exports = {
    getLabores,
    agregarLabor,
    editarLabor,
    estadoLabor,
    getLaboresIncompletas,
    getLaboresEditar,
    validarCodigo,
}
