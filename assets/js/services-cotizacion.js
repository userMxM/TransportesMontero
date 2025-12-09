// =====================================================
// CALCULADORA DE COTIZACIÓN
// =====================================================

/**
 * Calcula el costo total de la cotización
 * @param {Object} datos - Datos del formulario
 * @returns {Object} - Resultado del cálculo con desglose
 */
function calcularCotizacion(datos) {
  const { precioBase, distancia, tipoCarga, ayudantes, espera } = datos;

  // Calcular costo base
  const costoBase = distancia * precioBase;
  let costoTotal = costoBase;

  // Desglose de cálculos
  const desglose = {
    base: costoBase,
    ajusteCarga: 0,
    ayudantes: 0,
    espera: 0
  };

  // Ajustes por tipo de carga
  if (tipoCarga === 'pesada') {
    desglose.ajusteCarga = costoBase * SERVICES_CONFIG.cotizacion.ajustes.pesada;
    costoTotal *= SERVICES_CONFIG.cotizacion.multiplicadores.pesada;
  } else if (tipoCarga === 'peligrosa') {
    desglose.ajusteCarga = costoBase * SERVICES_CONFIG.cotizacion.ajustes.peligrosa;
    costoTotal *= SERVICES_CONFIG.cotizacion.multiplicadores.peligrosa;
  }

  // Agregar costo de ayudantes
  if (ayudantes === 1) {
    desglose.ayudantes = SERVICES_CONFIG.cotizacion.costoAyudantes;
    costoTotal += SERVICES_CONFIG.cotizacion.costoAyudantes;
  }

  // Costo por hora de espera
  if (espera > 0) {
    desglose.espera = espera * SERVICES_CONFIG.cotizacion.costoPorHoraEspera;
    costoTotal += desglose.espera;
  }

  return {
    costoTotal,
    desglose
  };
}

/**
 * Genera el HTML del resultado de la cotización
 * @param {Object} datos - Datos del formulario
 * @param {Object} resultado - Resultado del cálculo
 * @returns {string} - HTML del resultado
 */
function generarHTMLResultado(datos, resultado) {
  const { servicioNombre, distancia, tipoCarga, ayudantes, espera } = datos;
  const { costoTotal, desglose } = resultado;

  return `
    <div class="text-center mb-3">
      <i class="bi bi-check-circle-fill" style="font-size: 2rem; color: #198754;"></i>
      <h5 class="mt-2 mb-0">💰 Cotización Calculada</h5>
    </div>
    
    <div class="text-start" style="background: white; padding: 20px; border-radius: 8px; color: #333;">
      <h6 class="border-bottom pb-2 mb-3"><strong>📋 Detalles del Servicio</strong></h6>
      <p class="mb-2"><strong>Servicio:</strong> ${servicioNombre}</p>
      <p class="mb-2"><strong>Distancia:</strong> ${distancia} km</p>
      <p class="mb-2"><strong>Tipo de carga:</strong> ${tipoCarga.charAt(0).toUpperCase() + tipoCarga.slice(1)}</p>
      ${ayudantes === 1 ? '<p class="mb-2"><strong>Ayudantes:</strong> Incluidos</p>' : ''}
      ${espera > 0 ? `<p class="mb-2"><strong>Horas de espera:</strong> ${espera}h</p>` : ''}
      
      <h6 class="border-bottom pb-2 mb-3 mt-4"><strong>💵 Desglose de Costos</strong></h6>
      <p class="mb-2">Costo base: <strong>₡${desglose.base.toLocaleString('es-CR')}</strong></p>
      ${desglose.ajusteCarga > 0 ? `<p class="mb-2">Ajuste por carga ${tipoCarga}: <strong>+₡${desglose.ajusteCarga.toLocaleString('es-CR')}</strong></p>` : ''}
      ${desglose.ayudantes > 0 ? `<p class="mb-2">Ayudantes: <strong>+₡${desglose.ayudantes.toLocaleString('es-CR')}</strong></p>` : ''}
      ${desglose.espera > 0 ? `<p class="mb-2">Tiempo de espera: <strong>+₡${desglose.espera.toLocaleString('es-CR')}</strong></p>` : ''}
      
      <hr style="border-top: 2px solid #198754;">
      <h3 class="text-center mb-2" style="color: #198754;">
        Total: ₡${costoTotal.toLocaleString('es-CR')}
      </h3>
      <small class="d-block text-center text-muted">*Precio aproximado sujeto a verificación final</small>
    </div>
  `;
}

/**
 * Maneja el cálculo de la cotización
 */
function manejarCalculoCotizacion() {
  console.log('💰 Iniciando cálculo de cotización...');

  const servicioSelect = document.getElementById('servicio');
  const distanciaInput = document.getElementById('distancia');
  const tipoCargaSelect = document.getElementById('tipoCarga');
  const ayudantesSelect = document.getElementById('ayudantes');
  const esperaInput = document.getElementById('espera');
  const resultado = document.getElementById('resultado');

  // Limpiar validaciones previas
  limpiarValidaciones();
  if (resultado) resultado.style.display = 'none';

  // Validar formulario
  if (!validarFormularioCotizacion()) {
    if (resultado) {
      resultado.style.display = 'block';
      resultado.className = 'alert alert-danger mt-4 text-center';
      resultado.innerHTML = `
        <i class="bi bi-exclamation-triangle-fill"></i>
        <strong>Error en el formulario</strong><br>
        Por favor corrija los campos marcados en rojo antes de calcular.
      `;

      // Hacer scroll al primer error
      const primerError = document.querySelector('.is-invalid');
      if (primerError) {
        primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        primerError.focus();
      }
    }

    console.log('❌ Cálculo detenido por errores de validación');
    return;
  }

  console.log('✅ Todas las validaciones pasaron, calculando cotización...');

  // Obtener datos del formulario
  const selectedOption = servicioSelect.options[servicioSelect.selectedIndex];
  const precioBase = parseInt(selectedOption.getAttribute('data-precio'));
  const distancia = parseFloat(distanciaInput.value);
  const tipoCarga = tipoCargaSelect.value;
  const ayudantes = parseInt(ayudantesSelect.value);
  const espera = esperaInput.value !== '' ? parseFloat(esperaInput.value) : 0;

  // Calcular cotización
  const resultadoCalculo = calcularCotizacion({
    precioBase,
    distancia,
    tipoCarga,
    ayudantes,
    espera
  });

  // Generar HTML del resultado
  const htmlResultado = generarHTMLResultado({
    servicioNombre: selectedOption.textContent,
    distancia,
    tipoCarga,
    ayudantes,
    espera
  }, resultadoCalculo);

  // Mostrar resultado
  if (resultado) {
    resultado.style.display = 'block';
    resultado.className = 'alert alert-success mt-4';
    resultado.innerHTML = htmlResultado;

    // Hacer scroll al resultado
    resultado.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // Log del resultado
  console.log('✅ Cotización calculada exitosamente:', {
    servicio: selectedOption.textContent,
    distancia,
    precioBase,
    tipoCarga,
    ayudantes: ayudantes === 1,
    espera,
    ...resultadoCalculo
  });
}

/**
 * Inicializa el manejador del botón de calcular
 */
function inicializarCalculadora() {
  const btnCalcular = document.getElementById('btnCalcular');
  
  if (btnCalcular) {
    btnCalcular.addEventListener('click', manejarCalculoCotizacion);
    console.log('✅ Calculadora de cotización inicializada');
  }
}