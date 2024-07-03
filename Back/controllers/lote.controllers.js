
const { getConnection } = require('../database/config')


const getLoteSolo = async(req, res) => {
    try {

        
        const pool = await getConnection();
        
        const query = `SELECT * FROM Lote`

        const resultado = await pool.request().query(query)

        res.status(202).send(resultado.recordsets)


    } catch (error) {  
        console.error('Error en la base de datos', error)
        res.status(500).send({error: 'Error en la base de daots'})
        
    }
} 

const getLote = async (req, res) => {

    try {

            const pool = await getConnection();
        
            const query = `
                                SELECT Labores.Codigo AS Codigo_Labor, 
                                Labores.Nombre AS Labor, 
                                Grupo_Labores.Nombre AS Grupo_Labor, 
                                Labor_Realizar.Fecha, 
                                Lote.ID AS ID_Lote, 
                                Lote.Nombre AS Lote,
                                Labor_Realizar.Longitud,
                                Labor_Realizar.Latitud,
                                Labores.Color AS Color,
                                Labores.Descripcion,
                                Labor_Realizar.Descripcion_Final
                                FROM Labor_Realizar
                                INNER JOIN Labores ON Labores.Codigo = Labor_Realizar.Codigo_Labor
                                INNER JOIN Lote ON Lote.ID = Labor_Realizar.Codigo_Lote
                                INNER JOIN Grupo_Labores ON Grupo_Labores.ID = Labores.Codigo
`   
            const resultado = await pool.request().query(query)
    
           return  res.status(202).send(resultado.recordsets)
    


    } catch (error) {  
        console.error('Error en la base de datos', error)
        res.status(500).send({error: 'Error en la base de daots'})
        
    }
}

const getLoteInicio = async (req, res) => {

    try {

        const {fechaToIso} = req.body

            const pool = await getConnection();
        
            const query = `
                                SELECT Labores.Codigo AS Codigo_Labor, 
                                Labores.Nombre AS Labor, 
                                Grupo_Labores.Nombre AS Grupo_Labor, 
                                Labor_Realizar.Fecha, 
                                Lote.ID AS ID_Lote, 
                                Lote.Nombre AS Lote,
                                Labor_Realizar.Longitud,
                                Labor_Realizar.Latitud,
                                Labores.Color AS Color,
                                Labores.Descripcion,
                                Labor_Realizar.Descripcion_Final
                                FROM Labor_Realizar
                                INNER JOIN Labores ON Labores.Codigo = Labor_Realizar.Codigo_Labor
                                INNER JOIN Lote ON Lote.ID = Labor_Realizar.Codigo_Lote
                                INNER JOIN Grupo_Labores ON Grupo_Labores.ID = Labores.Codigo
                                WHERE Labor_Realizar.Fecha = '${fechaToIso}'`   


        const resultado = await pool.request().query(query)

        return  res.status(202).send(resultado.recordsets)


    } catch (error) {  
        console.error('Error en la base de datos', error)
        res.status(500).send({error: 'Error en la base de daots'})
        
    }
}

const getLoteFechas = async (req, res) => {

    try {

        const {fechaInicioToIso, fechaFinalToIso} = req.body

            const pool = await getConnection();
        
            const query = `
                SELECT Labores.Codigo AS Codigo_Labor, 
                Labores.Nombre AS Labor, 
                Grupo_Labores.Nombre AS Grupo_Labor, 
                Labor_Realizar.Fecha, 
                Lote.ID AS ID_Lote, 
                Lote.Nombre AS Lote,
                Labor_Realizar.Longitud,
                Labor_Realizar.Latitud,
                Labores.Color AS Color,
                Labores.Descripcion,
                Labor_Realizar.Descripcion_Final
                FROM Labor_Realizar
                INNER JOIN Labores ON Labores.Codigo = Labor_Realizar.Codigo_Labor
                INNER JOIN Lote ON Lote.ID = Labor_Realizar.Codigo_Lote
                INNER JOIN Grupo_Labores ON Grupo_Labores.ID = Labores.Codigo
                WHERE Labor_Realizar.Fecha BETWEEN '${fechaInicioToIso}' AND '${fechaFinalToIso}'`


        const resultado = await pool.request().query(query)

        return  res.status(202).send(resultado.recordsets)


    } catch (error) {  
        console.error('Error en la base de datos', error)
        res.status(500).send({error: 'Error en la base de daots'})
    }
}

const getLoteMes = async (req, res) => {

    try {

        const {mesArreglado} = req.body


            const pool = await getConnection();
        
            const query = `
                SELECT Labores.Codigo AS Codigo_Labor, 
                Labores.Nombre AS Labor, 
                Grupo_Labores.Nombre AS Grupo_Labor, 
                Labor_Realizar.Fecha, 
                Lote.ID AS ID_Lote, 
                Lote.Nombre AS Lote,
                Labor_Realizar.Longitud,
                Labor_Realizar.Latitud,
                Labores.Color AS Color,
                Labores.Descripcion,
                Labor_Realizar.Descripcion_Final
                FROM Labor_Realizar
                INNER JOIN Labores ON Labores.Codigo = Labor_Realizar.Codigo_Labor
                INNER JOIN Lote ON Lote.ID = Labor_Realizar.Codigo_Lote
                INNER JOIN Grupo_Labores ON Grupo_Labores.ID = Labores.Codigo
                WHERE MONTH(Labor_Realizar.Fecha) = ${parseInt(mesArreglado)}`


        const resultado = await pool.request().query(query)

        return  res.status(202).send(resultado.recordsets)


    } catch (error) {  
        console.error('Error en la base de datos', error)
        res.status(500).send({error: 'Error en la base de daots'})
    }
}




const crearLote = async(req, res) => {

    try {

        const {nombre, latitud, longitud} = req.body;


        const pool = await getConnection();

        const query = `INSERT INTO Lote VALUES ('${nombre}', ${latitud}, ${longitud})`;

        const resultado = await pool.request().query(query);

        res.status(201).send({message: 'Lote creado correctamente'});
        
    } catch (error) {
        console.error('Error en el servidor', error);
        res.status(500).json({error: 'Error interno del servidor'});
    }
}







module.exports = {
    crearLote,
    getLote,
    getLoteSolo,
    getLoteInicio,
    getLoteFechas,
    getLoteMes,
}