
const { getConnection } = require('../database/config');


const getLaboresRealizadas = async(req, res) => {

    try {
        const pool = await getConnection()
        const query = `SELECT Labores.Codigo AS Codigo_Labor, 
                        Labores.Nombre AS Labor, Grupo_Labores.Nombre AS Grupo_Labor, 
                        Labor_Realizar.Fecha, Labor_Realizar.Descripcion_Final, Lote.ID AS ID_Lote, Lote.Nombre AS Lote
                        FROM Labor_Realizar
                        INNER JOIN Labores ON Labores.Codigo = Labor_Realizar.Codigo_Labor
                        INNER JOIN Lote ON Lote.ID = Labor_Realizar.Codigo_Lote
                        INNER JOIN Grupo_Labores ON Grupo_Labores.ID = Labores.Codigo`

        const resultado = await pool.request().query(query)
    
        res.status(202).send(resultado.recordsets)
    } catch (error) {
        console.error('Error interno en la base de datos', error)
        res.status(500).send({error: 'Error interno en la base de datos'})
    }

}

const getLaboresRealizadasGrafico = async (req, res) => {

    try {
        const pool = await getConnection()

        const query = `SELECT  SubConsulta.Labor, COUNT(*) AS Veces_Presente FROM (
                        SELECT Labores.Codigo AS Codigo_Labor, 
                        Labores.Nombre AS Labor, Grupo_Labores.Nombre AS Grupo_Labor, 
                        Labor_Realizar.Fecha, Labor_Realizar.Descripcion_Final, Lote.ID AS ID_Lote, Lote.Nombre AS Lote
                        FROM Labor_Realizar
                        INNER JOIN Labores ON Labores.Codigo = Labor_Realizar.Codigo_Labor
                        INNER JOIN Lote ON Lote.ID = Labor_Realizar.Codigo_Lote
                        INNER JOIN Grupo_Labores ON Grupo_Labores.ID = Labores.Codigo
                        ) AS subConsulta
                        GROUP BY SubConsulta.Labor`

        const resultado = await pool.request().query(query)

        res.status(202).send(resultado.recordset)


    } catch (error) {
        console.error('Error interno en la base de datos', error)
        res.status(500).send({error: 'Erro interno en la base de datos'})
    }
}



const laborRealizada = async(req, res) => {
    try {
        const {codigo, fechaToIso, descripcionFinal, codigoLote, latitud, longitud} = req.body


        console.log(codigo, fechaToIso, descripcionFinal, codigoLote, latitud, longitud,);
        

        const pool = await getConnection();
        const queryDatosLabor = `SELECT * FROM Labores WHERE Codigo = ${codigo}`
        const resultadoDatos = await pool.request().query(queryDatosLabor)
        const datos = resultadoDatos.recordset[0]
        console.log(datos);
        

        
        const queryObtenerCodigoLote = `SELECT ID FROM Lote WHERE Nombre = '${codigoLote}'`
        const resultadoCodigoLote =  await pool.request().query(queryObtenerCodigoLote)
        const lote = resultadoCodigoLote.recordset[0].ID


        


        
   

        const queryAgregarLabor = `
        INSERT INTO Labor_Realizar VALUES (
         ${parseInt(codigo)}, ${parseInt(lote)}, '${fechaToIso}', '${descripcionFinal}', ${parseFloat(latitud)}, ${parseFloat(longitud)})`


        const resultadoQueryAgregar = await pool.request().query(queryAgregarLabor)

        
        res.status(201).send(resultadoDatos.recordset)

    } catch (error) {
        console.error('Error en el servidor', error)
        res.status(500).json({error: error})
    }
}


const filtradoLaboresPorFecha = async(req, res) => {

    try {
        const {fechaInicioToIso, fechaFinalToIso} = req.body

        console.log(fechaInicioToIso, fechaInicioToIso);
        

        const pool = await getConnection()  
        const query =  `SELECT Labores.Codigo AS Codigo_Labor, 
                        Labores.Nombre AS Labor, Grupo_Labores.Nombre AS Grupo_Labor, 
                        Labor_Realizar.Fecha, Labor_Realizar.Descripcion_Final, Lote.ID AS ID_Lote, Lote.Nombre AS Lote
                        FROM Labor_Realizar
                        INNER JOIN Labores ON Labores.Codigo = Labor_Realizar.Codigo_Labor
                        INNER JOIN Lote ON Lote.ID = Labor_Realizar.Codigo_Lote
                        INNER JOIN Grupo_Labores ON Grupo_Labores.ID = Labores.Codigo
                        WHERE Labor_Realizar.Fecha BETWEEN '${fechaInicioToIso}' AND '${fechaFinalToIso}'`


        const resultado = await pool.request().query(query)
    
        res.status(202).send(resultado.recordsets)
        
    } catch (error) {
        console.error('Error en el servidor', error)
        res.status(500).json({error: 'Error interno del servidor'})
    }
}

const filtradoLaboresFechaGrafico = async (req, res) => {

    try {
        const {fechaInicioToIso, fechaFinalToIso} = req.body

        const pool = await getConnection()
        const query = `SELECT  SubConsulta.Labor, COUNT(*) AS Veces_Presente FROM (
                        SELECT Labores.Codigo AS Codigo_Labor, 
                        Labores.Nombre AS Labor, Grupo_Labores.Nombre AS Grupo_Labor, 
                        Labor_Realizar.Fecha, Labor_Realizar.Descripcion_Final, Lote.ID AS ID_Lote, Lote.Nombre AS Lote
                        FROM Labor_Realizar
                        INNER JOIN Labores ON Labores.Codigo = Labor_Realizar.Codigo_Labor
                        INNER JOIN Lote ON Lote.ID = Labor_Realizar.Codigo_Lote
                        INNER JOIN Grupo_Labores ON Grupo_Labores.ID = Labores.Codigo
                        ) AS subConsulta
                        WHERE subConsulta.Fecha BETWEEN '${fechaInicioToIso}' AND '${fechaFinalToIso}'
                        GROUP BY SubConsulta.Labor`

                        
        const resultado = await pool.request().query(query)

        res.status(202).send(resultado.recordset)


    } catch (error) {
        console.error('Error interno en la base de datos', error)
        res.status(500).send({error: 'Erro interno en la base de datos'})
    }
}



const filtradoLaboresPorMes = async (req, res) => {


    try {
        const {mesArreglado} = req.body

        const pool = await getConnection()   
        console.log(mesArreglado);
        
        const query = `SELECT Labores.Codigo AS Codigo_Labor, 
            Labores.Nombre AS Labor, Grupo_Labores.Nombre AS Grupo_Labor, 
            Labor_Realizar.Fecha, Labor_Realizar.Descripcion_Final, Lote.ID AS ID_Lote, Lote.Nombre AS Lote
            FROM Labor_Realizar
            INNER JOIN Labores ON Labores.Codigo = Labor_Realizar.Codigo_Labor
            INNER JOIN Lote ON Lote.ID = Labor_Realizar.Codigo_Lote
            INNER JOIN Grupo_Labores ON Grupo_Labores.ID = Labores.Codigo
            WHERE MONTH(Labor_Realizar.Fecha) = ${parseInt(mesArreglado)}`

        const resultado = await pool.request().query(query)

        res.status(202).send(resultado.recordset)

    } catch (error) {
        console.error('Error interno en la base de datos', error)
        res.status(500).send({error: 'Error interno en la base de datos'})
    }
   

}

const filtradoLaboresMesGrafico = async (req, res) => {

    try {
        const {mesArreglado} = req.body

        console.log(mesArreglado);
        

        const pool = await getConnection()
         const query = `SELECT  subConsulta.Labor, COUNT(*) AS Veces_Presente FROM (
                        SELECT Labores.Codigo AS Codigo_Labor, 
                        Labores.Nombre AS Labor, Grupo_Labores.Nombre AS Grupo_Labor, 
                        Labor_Realizar.Fecha, Labor_Realizar.Descripcion_Final, Lote.ID AS ID_Lote, Lote.Nombre AS Lote
                        FROM Labor_Realizar
                        INNER JOIN Labores ON Labores.Codigo = Labor_Realizar.Codigo_Labor
                        INNER JOIN Lote ON Lote.ID = Labor_Realizar.Codigo_Lote
                        INNER JOIN Grupo_Labores ON Grupo_Labores.ID = Labores.Codigo
                        ) AS subConsulta
                        WHERE MONTH(subConsulta.Fecha) = ${parseInt(mesArreglado)}
                        GROUP BY SubConsulta.Labor`

        const resultado = await pool.request().query(query)

        res.status(202).send(resultado.recordset)


    } catch (error) {
        console.error('Error interno en la base de datos', error)
        res.status(500).send({error: 'Erro interno en la base de datos'})
    }
}


module.exports = {
    getLaboresRealizadas,
    getLaboresRealizadasGrafico,
    laborRealizada,
    filtradoLaboresPorFecha,
    filtradoLaboresFechaGrafico,
    filtradoLaboresPorMes,
    filtradoLaboresMesGrafico,
}