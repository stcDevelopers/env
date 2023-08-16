$(document).ready(function () {
 //Evento Click Boton Consultar
  $('#tutelasForm').on('click', '#generar_Button', function () {

    let type_docum = $('#tipo_documento').val()
    let num_documento = $('#numero_documento').val()
    let fecha_inicial
    const isValidDate = (d) => {
return d instanceof Date && !isNaN(d);
}
let date_ini =  new Date($('#start_date').val());
let date_fin =  new Date($('#end_date').val());

if(!isValidDate(date_ini)){
  $(this).val('')
  empty = false
  toastr.error('Error', 'Diligencie Fecha Inicial.')
  return false
}
if( date_fin.getTime() <= date_ini.getTime()){
  $(this).val('')
  empty = false
  toastr.error('Fecha debe ser mayor que Fecha Inicial.', 'Error')
  return false
}
    get_state_client(num_tutela)
  })
  function get_state_client(num_tutela){
    $.ajax({
      headers: {'X-CSRFToken': $("meta[name='csrf-token']").attr('content')},
      type: 'POST',
      url: route + 'bonos/editar/',
      data: {
        num_bono: num_bono
      },
      success: function (resp) {
        if (resp.hasOwnProperty('error')) {
          alertify.alert('Error', resp.error, function() {
            alertify.message('OK')
          })
        } else {
          $('#bonos').addClass('d-none')
          $('#createbono').removeClass('d-none')
          $('#date_bonos, #txtbonos').attr('disabled', true)
          $('#txtbonos').val(num_bono)
          id_client = resp.encabezado[0].id_client
          $('#date_bonos').val(resp.encabezado[0].date_bono)
          $('#ddl_tipo_bono option[value='+resp.encabezado[0].type_bono+']').prop("selected", true )
          $('#txt_cliente').val(resp.encabezado[0].name_client)
          $('#spn_type_bonus').val(resp.encabezado[0].name_type_bono)
          if ($('#ddl_tipo_bono').val() == '1') {
            $('#txt_porcentaje_bono').val(resp.encabezado[0].porcen_bono)
          }
          if ($('#ddl_tipo_bono').val() == '2') {
            $('#txt_porcentaje_bono').val(resp.encabezado[0].valor_bono)
          }
          $('#createbonoButton').attr('disabled', false)


        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        ajaxErrors(jqXHR, textStatus, errorThrown)
      }
    })

  }
})
