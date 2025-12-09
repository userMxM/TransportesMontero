// =====================================================
// INICIALIZACIÓN PRINCIPAL
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Inicializando aplicación...');
  
  // Inicializar validaciones del formulario
  inicializarValidacionesFormulario();
  console.log('✅ Validaciones del formulario inicializadas');
  
  // Inicializar envío del formulario
  inicializarEnvioFormulario();
  console.log('✅ Envío del formulario inicializado');

  // ✅ Inicializar MAPA GRATIS (Leaflet)
  if (typeof initMap === "function") {
    initMap();
    console.log('🗺️ Mapa Leaflet inicializado correctamente');
  } else {
    console.error("❌ Error: initMap no está definido");
  }

  console.log('✅ Aplicación inicializada correctamente');
});
