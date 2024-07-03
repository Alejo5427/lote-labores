



google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawChart);
let url = 'http://localhost:8000';
let TipoFecha = false;
let datos = null;
let arrayTransformado = [];

axios.get(url + '/labor-realizada/obtenerFiltro').then(response => {

  datos = response.data

  arrayTransformado = datos.map(dato => [dato.Labor, dato.Veces_Presente])
  
}).catch(error => console.error(error))
  
//Hacer la peticion post Aqui y mandar los datos a renderizar

  
function drawChart() {

  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Element');
  data.addColumn('number', 'Percentage');
  data.addRows(arrayTransformado);

  var piechart_options = {title:'Labores realizadas en rango de fechas',
    width:400,
    height:240};


  var chart = new google.visualization.PieChart(document.getElementById('myPieChart'));
  chart.draw(data, piechart_options);
}



new Vue({
    el: '#app',
    created () {

      let url = 'http://localhost:8000';
      axios.get(url+'/labor-realizada/obtener').then(response => {

        this.datosLaboresRealizados = response.data[0]
        console.log(response.data[0]);
        

        let datos = response.data[0]
        
      }).catch(error => console.error(error));

    },
    data() {
        return {
            message: 'Omairo',
            tipoFecha: '',
            datosLaboresRealizados: [],
        }
    },
    methods: {

        hacerFiltro() {

            if (!this.tipoFecha) {
                let url = 'http://localhost:8000'
                let valorMes = document.getElementById('mes')
                const mes = valorMes.value

                let tipoFecha = this.tipoFecha

                const datos = {
                    mes,
                    tipoFecha,
                }


                axios.post(url+'/labor-realizada/filtrar', datos ).then(function(response) {



                }).catch(function (error) {
                    console.error(error)
                  })
                
            }

            if (this.tipoFecha) {

                 let url = 'http://localhost:8000'

                let valorInicio = document.getElementById('fechaInicio')
                let valorFinal = document.getElementById('fechaFinal')
    
                const valorFechaInicio = valorInicio.value
                const valorFechaFinal = valorFinal.value
                
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
    

                
    
                
                const tipoFecha = this.tipoFecha
    
                const datos = {
                    fechaInicioToIso,
                    fechaFinalToIso,
                    tipoFecha,
                }
    
    
                axios.post(url+'/labor-realizada/filtrar', datos ).then(function(response) {

          
                }).catch(function (error) {
                    console.error(error);
                      
                    return  Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: 'Error interno en la base de datos',
                  });
                  })
            }

        }
    },
    mounted() {
        }

    })