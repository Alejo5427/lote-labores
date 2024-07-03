
 

new Vue({
    el: '#app',

    created() {
      let url = 'http://localhost:8000';

      axios.get(url+'/lote/obtenerSolo').then(response => {


        this.datosLotes = response.data[0]
        
        
      }).catch(error => console.error(error));

    },
    data() {
      return {
        message: 'Hola omar',
        datosLabor: [],
        datosLaborIncompleto: [],
        datosLotes: [],
        datosGrupoLabor: [],
        datosGrupoLaborIncompleto: [],
        datosLabor: {
          codigo: null,
          nombre: '',
          descripcion: '',
          grupoLabor: '',
          color: '#rrggbb',
        },
        datosCrearGrupoLabor: {
          nombre: ''
        },
        datosDesactivarGrupoLabor: {
          nombre: ''
        },
        datosEditar: {
          nombre: '',
          descripcion: '',
          grupoLabor: '',
          color: '',
        },
        datosLaborRealizado: {
          codigoLote: null,
          descripcionFinal: null,
          latitud: null,
          longitud: null,
        },
        validacion: {
          codigo: null,
          errorCodigo: false,
          nombre: null,
          errorNombre: false,
          descripcion: null,
          errorDescripcion: false,
          color: null,
          errorColor: false,
          errorGrupoLabor: false,
          grupoLabor: null,
          errorCrearGrupoLabor: false,
        },
        validacionLaborRealizada: {
          fecha: null,
          errorFecha: false,
          lote: null,
          errorLote: false,
          latitud: null,
          errorLatitud: false,
          longitud: null,
          errorLongitud: false,
          descripcion: null,
          errorDescripcion: false,
        },
        mostrarTabla: false,
        activo: null,
        idUsuario: null,
        mostrarTablaIncompleta: false,
        laborReferenciada: '',
      };
    },
    methods: {

      validarErrores(campo, valor) {
        let valorSinEspacios = ''
        let url = 'http://localhost:8000';

        this.activarBoton();

        if (valor) {
          valorSinEspacios = valor.replace(/ /g, "")
        }

        let valorParseado = parseInt(valor)
        let valorParseadoFloat = parseFloat(valor)

        if (campo === 'nombre') {
          
          if (valor.length <= 0) {
            console.log('Omar');
            this.validacion.errorNombre = true;
            this.validacion.nombre = 'Campo Obligatorio'
          }
          if (valorSinEspacios.length > 0) {
            this.validacion.errorNombre = false;
          }

          if (!Number.isNaN(valorParseado)) {
            this.validacion.errorNombre = true;
            this.validacion.nombre = 'No admite solo campos numericos'
          }
        }

        if (campo === 'descripcion') {
          
          if (valorSinEspacios.length <= 0) {
            this.validacion.errorDescripcion = true;
            this.validacion.descripcion = 'Campo Obligatorio'
          }
          if (valorSinEspacios.length > 0) {
            this.validacion.errorDescripcion = false;
          }
        }

        
        if (campo === 'color') {
          if (valorSinEspacios.length <= 0) {
            this.validacion.errorColor = true;
            this.validacion.color = 'Campo Obligatorio'
          }

          if (valorSinEspacios.length > 0) {
            this.validacion.errorColor = false;

          }

          if (!Number.isNaN(valorParseado)) {
            console.log('Omar');
            
            this.validacion.errorColor = true;
            this.validacion.color = 'No admite solo campos numericos'
          }
        }

        if (campo === 'crearGrupoLabor') {

          if (valorSinEspacios.length <= 0) {
            this.validacion.errorCrearGrupoLabor = true;
            this.validacion.grupoLabor = 'El campo es obligatorio'
          }

          if (valorSinEspacios.length > 0) {
            this.validacion.errorCrearGrupoLabor = false;
          }
          
          if (!Number.isNaN(valorParseado)) {
            this.validacion.errorCrearGrupoLabor = true;
            this.validacion.grupoLabor = 'No admite solo campos numericos'
          }
        }

        if (campo === 'latitudlr') {

          if (valorSinEspacios.length <= 0) {
            this.validacionLaborRealizada.errorLatitud = true;
            this.validacionLaborRealizada.latitud = 'Campo obligatorio'
          }

          if (valorSinEspacios) {
            this.validacionLaborRealizada.errorLatitud = false;
          }

          if (Number.isInteger(valorParseadoFloat)) {
            this.validacionLaborRealizada.errorLatitud = true;
            this.validacionLaborRealizada.latitud = 'El campo debe ser solo con numeros decimales'
          }
        }

        if (campo === 'longitudlr') {

          if (valorSinEspacios.length <= 0) {
            this.validacionLaborRealizada.errorLongitud = true;
            this.validacionLaborRealizada.longitud = 'Campo obligatorio'
          }

          if (valorSinEspacios.length > 0) {
            this.validacionLaborRealizada.errorLongitud = false;
          }

          if (Number.isInteger(valorParseadoFloat)) {
            this.validacionLaborRealizada.errorLongitud = true;
            this.validacionLaborRealizada.longitud = 'El campo debe ser solo con numeros decimales'
          }
        }

        if (campo === 'descripcionlr') {

          if (valorSinEspacios.length <= 0) {
            this.validacionLaborRealizada.errorDescripcion = true;
            this.validacionLaborRealizada.descripcion = 'Campo Obligatorio'
          }
          if (valorSinEspacios.length > 0) {
            this.validacionLaborRealizada.errorDescripcion = false;
          }
        }

        if (campo === 'codigo') {
          if (valorSinEspacios.length <= 0) {
            this.validacion.errorCodigo = true;
            this.validacion.codigo = 'Campo obligatorio'
          }

          if (valor.length > 0) {

            const datos = {
              valor
            }
            
            axios.post(url+'/labores/validarCodigo', datos)
            .then(response => {
              const datos = response.data

              if (datos.length > 0) {
                this.validacion.errorCodigo = true;
                this.validacion.codigo = `El codigo N-${valor} ya esta en uso`
              }

            }).catch(error => console.error(error))

          }

          if (valorSinEspacios) {
            this.validacion.errorCodigo = false;
          }
        }

      },

      conseguirId(userId, labor) {
        this.idUsuario = userId
        this.laborReferenciada = labor

      },

      borrarDatos(valor) {

        if (valor === 1) {
          this.datosLabor.nombre = null;
          this.validacion.errorNombre = false;

          this.datosLabor.descripcion = null;
          this.validacion.errorDescripcion = false;

          this.datosLabor.grupoLabor = null;
          this.validacion.grupoLabor = false;

          this.datosLabor.color = null;
          this.validacion.errorColor = false;

          this.datosLabor.codigo = null;
          this.validacion.errorCodigo = false;

          let btnEnviar = document.getElementById('botonEnviar');
          btnEnviar.disabled = true;

        }

        if (valor === 2) {
          this.datosLaborRealizado.codigoLote = null
          this.validacionLaborRealizada.errorLote = false;

          this.datosLaborRealizado.latitud = null
          this.validacionLaborRealizada.errorLatitud = false;


          this.datosLaborRealizado.longitud = null
          this.validacionLaborRealizada.errorLongitud = false;


          this.datosLaborRealizado.descripcionFinal = null
          this.validacionLaborRealizada.errorDescripcion = false;


          let valorFecha = document.getElementById('fecha');
          valorFecha.value = '';
          this.validacionLaborRealizada.errorFecha = false;
        }
        
        if (valor === 3) {
          this.datosCrearGrupoLabor.nombre = ''
          this.validacion.errorCrearGrupoLabor = false;
        }

        if (valor === 4) {
            this.validacion.errorGrupoLabor = false;
            this.validacion.grupoLabor = 'El campo es obligatorio'
        }

      },

      enviarLabor: function() {
        let url = 'http://localhost:8000';
    
       
              //Codigo
          const nombre = this.datosLabor.nombre //B
          const descripcion = this.datosLabor.descripcion //b
          const grupoLabor = this.datosLabor.grupoLabor //B
          const color = this.datosLabor.color //b
          const codigo = this.datosLabor.codigo 
      

          const nombreParseado = parseInt(nombre)
          const grupoLaborParseado = parseInt(grupoLabor)
          const colorParseado = parseInt(color)

          if (!nombre || !descripcion || !grupoLabor || !color || !codigo) {

            if (!nombre) {
              this.validacion.errorNombre = true;
              this.validacion.nombre = 'Campo Obligatorio'
            }

            if (!descripcion) {
              this.validacion.errorDescripcion = true;
              this.validacion.descripcion = 'Campo Obligatorio'
            }
            
            if (!color) {
              this.validacion.errorColor = true;
              this.validacion.color = 'Campo Obligatorio'
            }

            if (!grupoLabor) {
              this.validacion.errorGrupoLabor = true;
            }
            
            if (!codigo) {
              this.validacion.errorCodigo = true;
              this.validacion.codigo = 'Campo obligatorio'
            }

            return;
            
          }
          
          if (!Number.isNaN(nombreParseado) ||  !Number.isNaN(grupoLaborParseado) || !Number.isNaN(colorParseado) ) {
              this.datosErrores.mostrarError = true;
             this.datosErrores.campoVacio = 'Campos no pueden ser solo numericos'
            }

            const datos = {
              nombre,
              descripcion,
              grupoLabor,
              color,
              codigo
            }

            Swal.fire({
              title: "Estas seguro?",
              text: "Deseas agregar la labor?, revisa bien los datos porfavor",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Si, deseo agregar la labor"
            }).then((result) => {
              if (result.isConfirmed) {

                axios.post(url+'/labores/agregar', datos ).then(response => {

                  Swal.fire({
                    icon: "success",
                    title: "Labor ingresada correctamente",
                    showConfirmButton: true,
                    timer: 1500
                  });
                  console.log('Se envio exitosamente');

                  setTimeout(() => {
                    $('#modalAgregarLabor').modal('hide')
                  }, 1500);
                  
        
                  this.listarLabores();
      
                }).catch(function (error) {
                  console.error(error)
      
                  return  Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: error.response.data,
                  });
                }) 
              }
            });
      },

      crearGrupoLabor() {
        let url = 'http://localhost:8000';
        const nombre = this.datosCrearGrupoLabor.nombre

        if (!nombre) {
            this.validacion.errorCrearGrupoLabor = true;
            return  this.validacion.grupoLabor = 'El campo es obligatorio'
        }
    

        const datos = {
          nombre
        };

        axios.post(url+'/grupo-labores/agregar', datos)
        .then(response => {

          Swal.fire({
            icon: "success",
            title: "Grupo labor creado exitosamente",
            showConfirmButton: true,
            timer: 1500,
          });
          setTimeout(() => {
            $('#modalAgregarGrupoLabor').modal('hide')
          }, 1500);

          this.obtenerGrupoLabores()

        
        })
        .catch(error => console.error(error))
      },

      desactivarGrupoLabor(campo) {
        let url = 'http://localhost:8000';

        const grupoLabor = this.datosDesactivarGrupoLabor.nombre

        console.log(grupoLabor);
        
        if (!grupoLabor) {
           return  this.validacion.errorGrupoLabor = true;
        };

        let valor =  campo
        
        const datos = {
          grupoLabor,
          valor
        }

        axios.post(url+'/grupo-labores/desactivar', datos)
        .then(response => {
          Swal.fire({
            icon: "success",
            title: "Grupo de labor desactivado exitosamente",
            showConfirmButton: true,
            timer: 1500,
          });

          setTimeout(() => {
            $('#modalDesactivarGrupo').modal('hide')
          }, 1500);

          setTimeout(() => {
            $('#modalActivarGrupo').modal('hide')
          }, 1500);
      

          this.obtenerGrupoLabores();
          this.obtenerGrupoLaboresDesactivado();


        }).catch(error => {
          console.error(error)


          return   Swal.fire({
            icon: "error",
            title: "Error!",
            text: error.response.data.error,
            timer: 3000,
          });
        })
      },


      traerLaborEditable(userId) {

        let url = 'http://localhost:8000';

        this.idUsuario = userId
        let idUser = this.idUsuario

        console.log(idUser);
        
        let datosEnviar = {
          idUser
        }

        axios.post(url+'/labores/obtenerEditar', datosEnviar).then(response => {

          let datos = response.data[0]
          let nombreAsignar = datos.Nombre
          let descripcionAsignar = datos.Descripcion
          let grupoLaborAsignar = datos.NombreLabor
          let colorAsginar = datos.Color
          
          this.datosEditar.nombre = nombreAsignar
          this.datosEditar.descripcion = descripcionAsignar
          this.datosEditar.grupoLabor = grupoLaborAsignar
          this.datosEditar.color = colorAsginar


        })
        .catch(error => console.error(error))
      },
      
      editarLabor() {

        let url = 'http://localhost:8000';
        let nombre = this.datosEditar.nombre
        let descripcion = this.datosEditar.descripcion
        let grupoLabor = this.datosEditar.grupoLabor
        let color = this.datosEditar.color
        
        let codigo = this.idUsuario
        


        
        
        datos = {
          nombre,
          descripcion,
          grupoLabor,
          color,
          codigo
        }


        axios.post(url+'/labores/editar', datos)
        .then(response => {

          Swal.fire({
            icon: "success",
            title: "Realizado!",
            showConfirmButton: true,
            text: response.data.message,
            timer: 1500,
          });

          setTimeout(() => {
            $('#modalEditarLabor').modal('hide')
          }, 1500);

          this.listarLabores()
          this.obtenerLaboresIncompletas()

        }).catch(error => {
          return   Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Error interno del servidor",
          });
        })
      },


      cambiarEstadoLabor(estadoUsuario) {


        let url = 'http://localhost:8000';
        let estado = estadoUsuario
        const idUser = this.idUsuario

        datos = {
          estado,
          idUser
        }



        axios.post(url+'/labores/estado', datos)
        .then(response => {
          Swal.fire({
            icon: "success",
            title: "Realizado!",
            showConfirmButton: true,
            text: response.data.message,
            timer: 1500,
          });

          setTimeout(() => {
            $('#modalCambiarEstadoIncompleto').modal('hide')
          }, 1500);

          setTimeout(() => {
            $('#modalCambiarEstado').modal('hide')
          }, 1500);


          this.obtenerLaboresIncompletas()
          this.listarLabores()

        }).catch(error => {
          console.error(error)
          return  Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Error interno del servidor",
          });
        })
      },

      laborRealizada() {

          let url = 'http://localhost:8000';

          let valorFecha = document.getElementById('fecha')
          const fecha = valorFecha.value //B
          const descripcionFinal = this.datosLaborRealizado.descripcionFinal //B
          const codigo = this.idUsuario 
          const codigoLote = this.datosLaborRealizado.codigoLote //b
          const latitudParsear = this.datosLaborRealizado.latitud //b
          const longitudParsear = this.datosLaborRealizado.longitud //B
          
          const latitud = parseFloat(latitudParsear)
          const longitud = parseFloat(longitudParsear)



          if (!fecha || !codigoLote || !descripcionFinal || !latitud || !longitud) {
            console.log('Llegue aqui?');
            
            if (!fecha) {
              this.validacionLaborRealizada.errorFecha = true;
            }

            if (!codigoLote) {
              this.validacionLaborRealizada.errorLote = true;
            }

            if (!descripcionFinal)  {
              this.validacionLaborRealizada.errorDescripcion = true;
              this.validacionLaborRealizada.descripcion = 'Campo Obligatorio'
            }

            if (!latitud) {
              this.validacionLaborRealizada.errorLatitud = true;
              this.validacionLaborRealizada.latitud = 'Campo obligatorio'
            }
            
            if(!longitud) {
              this.validacionLaborRealizada.errorLongitud = true;
              this.validacionLaborRealizada.longitud = 'Campo obligatorio'
            }

            return;
          } 


          
  
          const fechaEstandar = new Date(fecha)
          const fechaToIso = fechaEstandar.toISOString()


          
          datos = {
            fechaToIso,
            codigo,
            descripcionFinal,
            codigoLote,
            latitud,
            longitud,
          }


          axios.post(url+'/labor-realizada/agregar', datos).then(response => {

            Swal.fire({
              icon: "success",
              title: "Realizado!",
              showConfirmButton: true,
              text: response.data.message,
              timer: 1500,
            });
  
            setTimeout(() => {
              $('#modalLaborRealizada').modal('hide')
            }, 1500);

            
            this.borrarDatos(2)
            this.listarLabores()


          }).catch(error => {
            console.error(error)
            (error.response.data.error);
            
            return  Swal.fire({
              icon: "error",
              title: "Error!",
              text: 'Error interno en la base de datos',
            });
          })
      },
      
      listarLabores() {
        let url = 'http://localhost:8000'

        axios.get(url + '/labores/obtener').then(response => {
          this.datosLabor = response.data
          let datos = response.data
  
          if (datos.length <= 0) this.mostrarTabla = false;
          if (datos.length > 0) this.mostrarTabla = true;
          
          
          
        }).catch(error => console.error(error))

      },
      obtenerLaboresIncompletas() {
        let url = 'http://localhost:8000'

        axios.get(url + '/labores/obtenerIncompleto').then(response => {


          let datos = response.data
          if (datos.length <= 0) this.mostrarTablaIncompleta = false;
          if (datos.length > 0) this.mostrarTablaIncompleta = true;
          
          
          this.datosLaborIncompleto = response.data
          
          
        }).catch(error => console.error(error))
      },

      obtenerGrupoLabores() {

        let url = 'http://localhost:8000'
        axios.get(url + '/grupo-labores/obtener').then(response => {
          

          this.datosGrupoLabor = response.data[0]
        }).catch(error => console.error(error))
      },


      obtenerGrupoLaboresDesactivado() {
        let url = 'http://localhost:8000'

        axios.get(url +'/grupo-labores/obtenerDesactivado')
        .then(response => {
          console.log(response.data[0]);
          

          this.datosGrupoLaborIncompleto = response.data[0]
          
        }).catch(error => console.error(error))



      },

      obtenerLaboresIncompletas() {
         let url = 'http://localhost:8000'
        axios.get(url + '/labores/obtenerIncompleto').then(response => {


          let datos = response.data
          if (datos.length <= 0) this.mostrarTablaIncompleta = false;
          if (datos.length > 0) this.mostrarTablaIncompleta = true;
          
          
          this.datosLaborIncompleto = response.data
          
          
        }).catch(error => console.error(error))
      },
      activarBoton() {
        const nombre =this.datosLabor.nombre
        const codigo = this.datosLabor.codigo
        const descripcion = this.datosLabor.descripcion
        const grupoLabor = this.datosLabor.grupoLabor
        const color  = this.datosLabor.color
        this.validacion.errorGrupoLabor = false;
        console.log(codigo, nombre, descripcion, grupoLabor, color);



        if (codigo && nombre && descripcion && grupoLabor && color ) {
          let btnEnviar = document.getElementById('botonEnviar');
          btnEnviar.disabled = false;
        }

        
        if (!codigo || !nombre || !descripcion || !grupoLabor || !color) {
          let btnEnviar = document.getElementById('botonEnviar');
          btnEnviar.disabled = true;
        }
      }


    },
    mounted() {
      this.listarLabores();
      this.obtenerLaboresIncompletas();
      this.obtenerGrupoLabores();
      this.obtenerGrupoLaboresDesactivado();
      this.obtenerLaboresIncompletas();
    },
  });




