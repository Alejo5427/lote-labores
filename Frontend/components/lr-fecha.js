google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawChart);


// function  drawChart(arrayTransformado) {

//     
    
//   // Define the chart to be drawn.
//   var data = new google.visualization.DataTable();
//   data.addColumn('string', 'Nombre');
//   data.addColumn('number', 'Veces en el mes');
//   data.addRows(arrayTransformado);

//   var options = {'title':'Labores Realizadas por fecha',
//     'width':400,
//     'height':300};

//   // Instantiate and draw the chart.
//   var chart = new google.visualization.PieChart(document.getElementById('myPieChart'));
//   chart.draw(data, options); 


// }

function drawChart(arrayTransformado) {

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows(arrayTransformado);

    var piechart_options = {title:'Labores realizadas en rango de fechas',
                   width:400,
                   height:300};
    var piechart = new google.visualization.PieChart(document.getElementById('piechart_div'));
    piechart.draw(data, piechart_options);

    var barchart_options = {title:'Labores realizadas en rango de fechas',
                   width:400,
                   height:300,
                   legend: 'none'};
    var barchart = new google.visualization.ColumnChart(document.getElementById('barchart_div'));
    barchart.draw(data, barchart_options);
  }


new Vue({
    el: '#app',
    data() {
        return {
            message: 'Omairo',
            tipoFecha: '',
            datosLaboresFecha: [],
            mostrarTabla: false,
        }
    },
    methods: {

        hacerFiltro() {


                 let url = 'http://localhost:8000'

                let valorInicio = document.getElementById('fechaInicio')
                let valorFinal = document.getElementById('fechaFinal')
    
                
                const valorFechaInicio = valorInicio.value
                const valorFechaFinal = valorFinal.value
                
                if(!valorFechaInicio && !valorFechaFinal) {
                    return  Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: "Ingrese porfavor las 2 fechas",
                      });
                }

                if(!valorFechaInicio || !valorFechaFinal) {
                    return  Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: "Ingrese porfavor las 2 fechas correspondientes",
                      });
                }

                
                const fechaInicio = new Date(valorFechaInicio)
                const fechaFinal = new Date(valorFechaFinal)
    
  
                function validarRangoFechasCorrecto(fechaInicial, fechaDelFinal) {
                    
                    const fechaInicio = fechaInicial.getTime()
                    const fechaFinal = fechaDelFinal.getTime()
    
                    if (fechaInicio > fechaFinal) {
                          return false;
                    } 
                    return true;
    
                }
    
                const resultado = validarRangoFechasCorrecto(fechaInicio, fechaFinal)
    
                if (!resultado) {
                    return  Swal.fire({
                        icon: "error",
                        title: "Rango de fechas incorrecto",
                        text: "El rango de fecha inicial es mayor al rango de fecha final",
                      });
                }
                
                
                const fechaInicioToIso = fechaInicio.toISOString()
                const fechaFinalToIso = fechaFinal.toISOString()
    

                
    
                
      
                const datos = {
                    fechaInicioToIso,
                    fechaFinalToIso,
                }

                axios.post(url+'/labor-realizada/graficoFecha', datos).then( response => {

                    
                    let datos = response.data
                    
                    if (datos.length <= 0) {
                        this.mostrarTabla = false;
                        return  Swal.fire({
                            icon: "error",
                            title: "Error!",
                            text: "No hay datos correspondientes a estas fechas",
                          });
                    }
                    

                    
                    let arrayTransformado = datos.map(dato => [dato.Nombre, dato.Veces_Presente])
                    
                    drawChart(arrayTransformado)
                    
                }).catch(error => console.error(error))
    
    
                axios.post(url+'/labor-realizada/filtrarFecha', datos ).then(response => {

                    this.datosLaboresFecha = response.data[0]

                    console.log(response.data[0]);
                    

                    if (datos.length <= 0) {
                        this.mostrarTabla = false;
                        return  Swal.fire({
                            icon: "error",
                            title: "Error!",
                            text: "No hay datos correspondientes a estas fechas",
                          });
                    }

                    this.mostrarTabla = true;

                    return this.datosLaboresFecha
                    
                }).catch(function (error) {
                    console.error(error)
                  })

            

        }
    },
    mounted() {

    }

    
})