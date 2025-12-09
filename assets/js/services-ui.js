// =====================================================
// INTERFAZ DE USUARIO - INTERACCIONES
// =====================================================

/**
 * Llena el select de servicios con los datos cargados
 */
function llenarSelectServicios() {
  const select = document.getElementById('servicio');
  if (!select) return;

  // Limpiar opciones existentes (excepto la primera)
  select.innerHTML = '<option value="">Seleccione un servicio</option>';

  serviciosData.forEach(servicio => {
    const option = document.createElement('option');
    option.value = servicio.tipo;
    option.textContent = `${servicio.titulo} (₡${servicio.precio_base}/km)`;
    option.setAttribute('data-precio', servicio.precio_base);
    select.appendChild(option);
  });

  console.log('✅ Select de servicios llenado correctamente');
}

/**
 * Agrega eventos a los botones "Agregar a cotización"
 */
function agregarEventosBotones() {
  const botones = document.querySelectorAll('.btnAgregar');

  botones.forEach(btn => {
    btn.addEventListener('click', function () {
      const servicio = this.getAttribute('data-servicio');
      const tipo = this.getAttribute('data-tipo');

      // Cambiar apariencia del botón
      this.innerHTML = '<i class="bi bi-check-circle-fill"></i> Agregado';
      this.classList.remove('btn-outline-primary');
      this.classList.add('btn-success');
      this.disabled = true;

      // Scroll suave al formulario
      const cotizarSection = document.getElementById('cotizar');
      if (cotizarSection) {
        cotizarSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }

      // Seleccionar el servicio en el formulario
      setTimeout(() => {
        const selectServicio = document.getElementById('servicio');
        if (selectServicio) {
          selectServicio.value = tipo;
        }
      }, 500);

      console.log(`✅ ${SERVICES_CONFIG.messages.servicioAgregado}: ${servicio}`);
    });
  });
}

/**
 * Limpia el formulario de cotización
 */
function limpiarFormularioCotizacion() {
  const form = document.getElementById('formCotizacion');
  const resultado = document.getElementById('resultado');
  
  if (form) form.reset();
  if (resultado) resultado.style.display = 'none';
  
  limpiarValidaciones();
  
  console.log('🧹 Formulario de cotización limpiado');
}

/**
 * Inicializa las validaciones en tiempo real
 */
function inicializarValidacionesTiempoReal() {
  // Validar distancia al escribir
  const distanciaInput = document.getElementById('distancia');
  if (distanciaInput) {
    distanciaInput.addEventListener('input', function () {
      const valor = this.value;

      if (valor === '') {
        this.classList.remove('is-invalid', 'is-valid');
        return;
      }

      if (!validarDistancia(valor)) {
        mostrarErrorCampo('distancia', `⚠️ La distancia debe ser entre ${SERVICES_CONFIG.cotizacion.distanciaMin} y ${SERVICES_CONFIG.cotizacion.distanciaMax} km`);
      } else {
        mostrarCampoValido('distancia');
      }
    });
  }

  // Validar horas de espera al escribir
  const esperaInput = document.getElementById('espera');
  if (esperaInput) {
    esperaInput.addEventListener('input', function () {
      const valor = this.value;

      if (valor === '') {
        this.classList.remove('is-invalid', 'is-valid');
        return;
      }

      if (!validarHorasEspera(valor)) {
        mostrarErrorCampo('espera', `⚠️ Las horas de espera deben ser entre 0 y ${SERVICES_CONFIG.cotizacion.horasEsperaMax}`);
      } else {
        mostrarCampoValido('espera');
      }
    });
  }

  console.log('✅ Validaciones en tiempo real inicializadas');
}