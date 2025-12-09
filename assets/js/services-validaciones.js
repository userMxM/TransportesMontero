// =====================================================
// VALIDACIONES DE COTIZACIÓN
// =====================================================

/**
 * Valida que la distancia esté en el rango permitido
 * @param {string|number} distancia - Distancia a validar
 * @returns {boolean}
 */
function validarDistancia(distancia) {
  const dist = parseFloat(distancia);
  return !isNaN(dist) && 
         dist >= SERVICES_CONFIG.cotizacion.distanciaMin && 
         dist <= SERVICES_CONFIG.cotizacion.distanciaMax;
}

/**
 * Valida las horas de espera (opcional)
 * @param {string|number} horas - Horas a validar
 * @returns {boolean}
 */
function validarHorasEspera(horas) {
  if (horas === '' || horas === null) return true; // Es opcional
  const h = parseFloat(horas);
  return !isNaN(h) && h >= 0 && h <= SERVICES_CONFIG.cotizacion.horasEsperaMax;
}

/**
 * Muestra mensaje de error en un campo
 * @param {string} campoId - ID del campo
 * @param {string} mensaje - Mensaje de error
 */
function mostrarErrorCampo(campoId, mensaje) {
  const campo = document.getElementById(campoId);
  if (!campo) return;

  campo.classList.add('is-invalid');
  campo.classList.remove('is-valid');

  // Crear o actualizar mensaje de error
  let errorDiv = campo.parentElement.querySelector('.invalid-feedback');
  if (!errorDiv) {
    errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    campo.parentElement.appendChild(errorDiv);
  }
  errorDiv.textContent = mensaje;
  errorDiv.style.display = 'block';
}

/**
 * Muestra que un campo es válido
 * @param {string} campoId - ID del campo
 */
function mostrarCampoValido(campoId) {
  const campo = document.getElementById(campoId);
  if (!campo) return;

  campo.classList.remove('is-invalid');
  campo.classList.add('is-valid');

  const errorDiv = campo.parentElement.querySelector('.invalid-feedback');
  if (errorDiv) {
    errorDiv.style.display = 'none';
  }
}

/**
 * Limpia todas las validaciones visuales
 */
function limpiarValidaciones() {
  document.querySelectorAll('.is-invalid, .is-valid').forEach(el => {
    el.classList.remove('is-invalid', 'is-valid');
  });
  document.querySelectorAll('.invalid-feedback').forEach(el => {
    el.style.display = 'none';
  });
}

/**
 * Valida todos los campos del formulario de cotización
 * @returns {boolean} - true si todos los campos son válidos
 */
function validarFormularioCotizacion() {
  const servicioSelect = document.getElementById('servicio');
  const distanciaInput = document.getElementById('distancia');
  const esperaInput = document.getElementById('espera');
  
  let esValido = true;

  // Validar servicio
  if (!servicioSelect.value || servicioSelect.value === '') {
    mostrarErrorCampo('servicio', '⚠️ Debe seleccionar un servicio');
    esValido = false;
  } else {
    mostrarCampoValido('servicio');
  }

  // Validar distancia
  const distancia = distanciaInput.value.trim();
  if (distancia === '') {
    mostrarErrorCampo('distancia', '⚠️ La distancia es obligatoria');
    esValido = false;
  } else if (!validarDistancia(distancia)) {
    mostrarErrorCampo('distancia', `⚠️ La distancia debe ser entre ${SERVICES_CONFIG.cotizacion.distanciaMin} y ${SERVICES_CONFIG.cotizacion.distanciaMax} km`);
    esValido = false;
  } else {
    mostrarCampoValido('distancia');
  }

  // Validar horas de espera
  const espera = esperaInput.value.trim();
  if (espera !== '' && !validarHorasEspera(espera)) {
    mostrarErrorCampo('espera', `⚠️ Las horas de espera deben ser entre 0 y ${SERVICES_CONFIG.cotizacion.horasEsperaMax}`);
    esValido = false;
  } else if (espera !== '') {
    mostrarCampoValido('espera');
  }

  return esValido;
}