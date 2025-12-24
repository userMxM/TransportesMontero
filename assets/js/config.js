// =====================================================
// CONFIGURACIÓN GENERAL
// =====================================================

const CONFIG = {
  // EmailJS
  emailJS: {
    publicKey: "xeRPxJGFjFEyrII8Y",
    serviceId: "service_z7yhkv5",
    templateId: "template_bbp5rzs"
  },

  // MAPA GRATIS (Leaflet)
  maps: {
    empresaPosition: { lat: 10.0019, lng: -84.1162 },
    defaultZoom: 13,
    focusZoom: 15
  },

  // Mensajes
  messages: {
    ubicacionInicial: '<i class="bi bi-info-circle"></i> Haz clic en "Mi Ubicación" para detectar tu posición y calcular la ruta.',
    ubicacionDetectando: "📍 Obteniendo tu ubicación...",
    ubicacionError: "❌ Error al obtener ubicación",
    navegadorNoSoporta: "❌ Tu navegador no soporta geolocalización",
    alertaUbicacion: "⚠️ Primero obtén tu ubicación"
  }
};
