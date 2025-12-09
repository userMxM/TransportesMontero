// =====================================================
// CONFIGURACIÓN DE SERVICIOS
// =====================================================

const SERVICES_CONFIG = {
  // Rutas de archivos JSON
  paths: {
    serviciosJSON: 'assets/data/services.json',
    fotosJSON: 'assets/data/mis-fotos.json'
  },

  // Configuración de animaciones
  animations: {
    serviceDelay: 100,
    galleryDelay: 150
  },

  // Configuración de cotización
  cotizacion: {
    distanciaMin: 1,
    distanciaMax: 1000,
    horasEsperaMax: 24,
    costoPorHoraEspera: 3000,
    costoAyudantes: 10000,
    
    // Multiplicadores por tipo de carga
    multiplicadores: {
      general: 1.0,
      pesada: 1.15,
      peligrosa: 1.25
    },
    
    // Porcentajes de ajuste
    ajustes: {
      pesada: 0.15,
      peligrosa: 0.25
    }
  },

  // Mensajes del sistema
  messages: {
    cargandoServicios: 'Cargando servicios...',
    errorServicios: 'Error al cargar servicios',
    errorGaleria: 'Error al cargar galería',
    servicioAgregado: 'Servicio agregado a cotización',
    noFotos: 'No hay fotos disponibles en este momento'
  }
};