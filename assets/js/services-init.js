// =====================================================
// INICIALIZACIÓN DE SERVICIOS
// =====================================================

/**
 * Agrega el botón de limpiar al formulario
 */
function agregarBotonLimpiar() {
  const btnCalcular = document.getElementById('btnCalcular');
  
  if (btnCalcular && !document.getElementById('btnLimpiar')) {
    const btnLimpiar = document.createElement('button');
    btnLimpiar.id = 'btnLimpiar';
    btnLimpiar.type = 'button';
    btnLimpiar.className = 'btn btn-secondary px-4 ms-2';
    btnLimpiar.innerHTML = '<i class="bi bi-x-circle"></i> Limpiar';
    btnLimpiar.onclick = limpiarFormularioCotizacion;

    btnCalcular.parentElement.appendChild(btnLimpiar);
    console.log('✅ Botón de limpiar agregado');
  }
}

/**
 * Inicializa todos los componentes de la página de servicios
 */
async function inicializarServicios() {
  console.log('🚀 Inicializando página de servicios...');

  try {
    // 1. Cargar servicios desde JSON
    await cargarServicios();

    // 2. Cargar galería de fotos (si existe el contenedor)
    if (document.getElementById('galeria-container')) {
      await cargarGaleriaFotos();
    }

    // 3. Inicializar validaciones en tiempo real
    inicializarValidacionesTiempoReal();

    // 4. Inicializar calculadora
    inicializarCalculadora();

    // 5. Agregar botón de limpiar
    agregarBotonLimpiar();

    console.log('✅ Página de servicios inicializada correctamente');

  } catch (error) {
    console.error('❌ Error al inicializar servicios:', error);
  }
}

/**
 * Evento principal de carga del DOM
 */
document.addEventListener('DOMContentLoaded', function () {
  console.log('📄 Página services.html cargada completamente');
  inicializarServicios();
});