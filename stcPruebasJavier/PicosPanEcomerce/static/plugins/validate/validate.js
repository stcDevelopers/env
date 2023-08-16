// Validación de formularios 1.0.0

function validate(value, rules) {

  $return = [];

  rules.forEach(function (rule) {

    if (rule === 'lleno') {

      $return['lleno'] = value.trim() == "" ? false : true

    }

    if (rule === 'alfanumerico') {

      $return['alfanumerico'] = value.match(/^[A-Za-z\d]+$/) != null

    }

    if (rule === 'alfanumericoConEspacios') {

      $return['alfanumerico'] = value.match(/^[A-Za-z\d\s]+$/) != null

    }

    if (rule === 'fecha') {

      $return['fecha'] = value.match(/^\d{4}-\d{2}-\d{2}$/) != null

    }

    if (rule === 'numeroEntero') {

      $return['numeroEntero'] = /^([0-9])*$/.test(value)

    }

    if (rule === 'numero') {

      $return['numero'] = /^([0-9])*$/.test(value) || /^([0-9])*([,.])+([0-9])+$/.test(value)

    }

    if (rule === 'decimal') {

      $return['numero'] = /^([0-9])*([,.])+([0-9])+$/.test(value)

    }

    if (rule.indexOf('mayor') > -1) {

      $return['mayor'] = parseInt(value) > parseInt(rule.split('|')[1]) ? true : false

    }

    if (rule.indexOf('menor') > -1) {

      $return['menor'] = parseInt(value) < parseInt(rule.split('|')[1]) ? true : false

    }

    if (rule.indexOf('max') > -1) {

      $return['max'] = value.length <= parseInt(rule.split('|')[1]) ? true : false

    }

    if (rule.indexOf('min') > -1) {

      $return['min'] = value.length >= parseInt(rule.split('|')[1]) ? true : false

    }

    if (rule === 'email') {

      $return['email'] = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)

    }

    if (rule === 'link') {

      $return['link'] = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi.test(value)

    }

    if (rule === 'espacio') {

      $return['espacio'] = value.indexOf(" ") > -1 ? false : true

    }

    if (rule.indexOf('archivo') > -1) {

      if (!window.FileReader) {
        alert('El navegador no soporta la lectura de archivos')
      }

      if (value === undefined) {
        $return['archivo'] = false
      } else {
        let extensions = rule.split('|')[1]

        let hasExtension = false

        extensions = extensions.split(',')

        extensions.forEach(function (item, key) {

          if (!hasExtension) {
            hasExtension = value.name.indexOf(item) > -1 ? true : false
          }

        })

        $return['archivo'] = hasExtension
      }
    }

    /*
     * No encontre la forma de hacer una carga sincrona
    if (rule.indexOf('tamanoimagen') > -1) {

      if (!window.FileReader) {
        alert('El navegador no soporta la lectura de archivos')
      }

      if (value === undefined || !(/\.(jpg|jpeg|png|git)$/i).test(value.name)) {
        $return['tamanoimagen'] = false
      } else {

        let tamano = rule.split('|')[1]

        tamano = tamano.split(',')
        
        let img = new Image()

        img.onload = function () {
          $return['tamanoimagen'] = (this.width.toFixed(0) == tamano[0] && this.height.toFixed(0) == tamano[1]) ? true : false
        }
        
        img.src = URL.createObjectURL(value)
      }

    }*/

    if (rule.indexOf('pesoArchivo') > -1) {

      if (!window.FileReader) {
        alert('El navegador no soporta la lectura de archivos')
      }

      if (value === undefined) {
        $return['pesoArchivo'] = false
      } else {
        $return['pesoArchivo'] = value.size < parseInt(rule.split('|')[1]) ? true : false
      }

    }

  })

  return $return

}

function soloNumeros(event) {
  let tecla = (document.all) ? event.keyCode : event.which
  // Tecla de retroceso para borrar, siempre la permite
  if (tecla == 8) {
    return true
  }
  // Patron de entrada, en este caso solo acepta numeros
  let patron = /[0-9]/
  let tecla_final = String.fromCharCode(tecla)
  return patron.test(tecla_final)
}

function validateFields(form = false) {
  let ele = ''

  if (form) {
    ele = $('#' + form + ' *[data-validate]')
  } else {
    ele = $('*[data-validate]')
  }

  ele.removeClass('is-invalid')

  $.each(ele, function (index, input) {
    let validations = $(input).data('validate').split('|')

    $.each(validations, function (index, validateRule) {
      let rule = validateRule.split(':')

      if (rule[0].indexOf('requerido_si_mayor_o_igual') > -1) {
        let condition = rule[1].split('=')
        let checkbox = ''

        if ($('#' + condition[0]).attr('type') == 'checkbox') {
          checkbox = ':checked'
        }

        if (($('#' + condition[0] + checkbox).val() >= condition[1] || $(input).val() != '') && !$(input).prop('disabled')) {
          return
        } else {
          return false
        }
      }

      if (rule[0].indexOf('no_requerido_si') > -1) {
        let condition = rule[1].split('=')
        let checkbox = ''

        if ($('#' + condition[0]).attr('type') == 'checkbox') {
          checkbox = ':checked'
        }

        if (($('#' + condition[0] + checkbox).val() != condition[1] || $(input).val() != '') && !$(input).prop('disabled')) {
          return
        } else {
          return false
        }
      }

      if (rule[0].indexOf('no_requerido') > -1) {
        return true
      }


      if (rule[0].indexOf('requerido_si') > -1) {
        let condition = rule[1].split('=')
        let checkbox = ''
        if ($('#' + condition[0]).attr('type') == 'checkbox') {
          checkbox = ':checked'
        }



        if (($('#' + condition[0] + checkbox).val() == condition[1] || $(input).val() != '') && !$(input).prop('disabled')) {
          return
        } else {
          return false
        }
      }

      res = []

      if (rule[0].indexOf('archivo') > -1) {
        res = validate($(input)[0].files[0], [rule[0] + '|' + rule[1]])
      } else if (rule.length === 2) {
        res = validate($(input).val(), [rule[0]])
      } else {
        res = validate($(input).val(), [rule[0] + '|' + rule[1]])
      }

      if (!res[rule[0]]) {
        $(input).addClass('is-invalid')
        $(input).siblings('.invalid-feedback').text(rule[2] ? rule[2] : rule[1])
        return false
      }
    })
  })

  if (form) {
    return $('#' + form + ' *[data-validate].is-invalid').length === 0 ? true : false
  } else {
    return $('*[data-validate].is-invalid').length === 0 ? true : false
  }
}

function removeInputError(id) {
  $('#' + id).removeClass('is-invalid')
}

function errorInput(id, msn) {
  $('#' + id).addClass('is-invalid')
  $('#' + id).siblings('.invalid-feedback').text(msn)

}

/*
 * Función truncar decimales a n posiciones
 */
function truncateDecimals(number, digits=2) {
  let multiplier = Math.pow(10, digits)
  let adjustedNum = number * multiplier
  let truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);
  return truncatedNum / multiplier;
}
/*
 * Función para validar los errores Ajax
 */
function ajaxErrors(jqXHR, textStatus, errorThrown, edit = false) {
  edit = edit ? 'ToEdit' : ''
  if (jqXHR.status === 0) {
    toastr.error('No es posible establecer la conexión')
  } else if (jqXHR.status == 404) {
    toastr.error('Página solicitada no encontrada [404].')
  } else if (jqXHR.status == 500) {
    toastr.error('Error interno del servidor [500].')
  } else if (textStatus === 'parsererror') {
    toastr.error('El análisis JSON solicitado falló.')
  } else if (textStatus === 'timeout') {
    toastr.error('Error de tiempo de espera.')
  } else if (textStatus === 'abort') {
    toastr.error('Solicitud Ajax abortada.')
  } else {
    if (jqXHR.hasOwnProperty('responseJSON') && jqXHR.responseJSON.hasOwnProperty('errors')) {
      let errores = ''
      $.each(jqXHR.responseJSON.errors, function (key, value) {
        if (key == 'Error') {
          errores += key.replace('_', ' ') + ': ' + value[0]['message'] + '<br>'
        } else {
          let IdParts = key.replace(/ /g, '').split('_')
          let id
          let ele
          let lbl
          if (IdParts.length > 1) {
            $.each(IdParts, function (key, value) {
              if (key > 0) {
                IdParts[key] = convertFirstLetterToUppercase(value)
              }
            })
          }
          id = IdParts.join('') + edit
          ele = $('#' + id)
          lbl = $('label[for=' + id + ']')
          if (ele.length > 0) {
            errorInput(id, value[0]['message'])
          }
          if (lbl.length > 0) {
            errores += lbl.text() + ': ' + value[0]['message'] + '<br>'
          } else {
            errores += value[0]['message'] + '<br>'
          }
        }
      })
      toastr.error(errores)
    } else {
      toastr.error('Error inesperado al intentar enviar el mensaje.')
    }
  }
}

function convertFirstLetterToUppercase(oracion) {
  oracion = oracion.toLowerCase()
  return oracion.replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function ($1) {
    return $1.toUpperCase()
  })
}