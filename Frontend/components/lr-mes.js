google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawChart);

  
  
function  drawChart(arrayTransformado) {


  // Define the chart to be drawn.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Nombre');
  data.addColumn('number', 'Veces en el mes');
  data.addRows(arrayTransformado);

  // Instantiate and draw the chart.
  var chart = new google.visualization.PieChart(document.getElementById('myPieChart'));
  chart.draw(data, null);
}


new Vue({
    el: '#app',
    data() {
        return {
            message: 'Omairo',
            tipoFecha: '',
            datos: null,
            datosLaboresMes: [],
            mostrarTabla: false,
            mostrarGrafica: false,
        }
    },
    methods: {
       
        hacerFiltro() {

                let url = 'http://localhost:8000'
                let valorMes = document.getElementById('mes')
                const mes = valorMes.value

                const parsearFecha = new Date(mes)
                
                let obtenerMes = parsearFecha.getUTCMonth()

                const mesArreglado = obtenerMes + 1


                if (!mes) {
                    return  Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: "Ingrese porfavor una fecha",
                      });
                }

                const datos = {
                    mesArreglado
                }
                
                axios.post(url+'/labor-realizada/graficoMes', datos).then( response => {

                    
                        let datos = response.data
                        
                        if (datos.length <= 0) {
                            this.mostrarTabla = false;
                            this.mostrarGrafica = false;
                            return  Swal.fire({
                                icon: "error",
                                title: "Error!",
                                text: "No hay datos correspondientes a estas fechas",
                            });
                        }
                        
                        this.mostrarGrafica = true;

                        let arrayTransformado = datos.map(dato => [dato.Labor, dato.Veces_Presente])
                        
                        drawChart(arrayTransformado)
                        
                    }).catch(error => console.error(error))


                    axios.post(url+'/labor-realizada/filtrarMes',  datos).then(response => {
                        

                        
                        let datos = response.data
                        
                        if (datos.length <= 0) {
                            this.mostrarTabla = false;
                            this.mostrarGrafica = false;
                            return  Swal.fire({
                                icon: "error",
                                title: "Error!",
                                text: "No hay datos correspondientes a estas fechas",
                            });
                        }
                        this.datosLaboresMes = response.data

                        this.mostrarTabla = true;
                        this.mostrarGrafica = true;

                        return this.datosLaboresMes

                    }).catch(function (error) {
                        console.error(error)
                    })
                    
        }
    },
    mounted() {

    }

    
})