// =====================================================
// API - CARGA DE DATOS DESDE JSON
// =====================================================

// Variable global para guardar los servicios
let serviciosData = [];

/**
 * Carga los servicios desde el archivo JSON
 * @returns {Promise<Array>} - Array de servicios
 */
async function cargarServicios() {
  const container = document.getElementById('servicios-container');

  try {
    console.log('🔄 Cargando servicios desde', SERVICES_CONFIG.paths.serviciosJSON);

    const response = await fetch(SERVICES_CONFIG.paths.serviciosJSON);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    serviciosData = await response.json();
    console.log('✅ Servicios cargados exitosamente:', serviciosData);

    // Limpiar el spinner de loading
    container.innerHTML = '';

    // Renderizar cada servicio
    serviciosData.forEach((servicio, index) => {
      const delay = (index + 1) * SERVICES_CONFIG.animations.serviceDelay;

      const cardHTML = `
        <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="${delay}">
          <div class="card service-card h-100 text-center shadow-sm">
            <img src="${servicio.imagen}" 
                 class="card-img-top" 
                 alt="${servicio.titulo}"
                 style="height: 250px; object-fit: cover;">
            <div class="card-body d-flex flex-column">
              <h4 class="mb-3">${servicio.titulo}</h4>
              <p class="text-muted flex-grow-1">${servicio.descripcion}</p>
              <div class="mt-auto">
                <span class="badge bg-primary mb-3">₡${servicio.precio_base}/km</span>
                <button class="btn btn-outline-primary w-100 btnAgregar" 
                        data-servicio="${servicio.titulo}"
                        data-tipo="${servicio.tipo}">
                  <i class="bi bi-cart-plus"></i> Agregar a cotización
                </button>
              </div>
            </div>
          </div>
        </div>
      `;

      container.innerHTML += cardHTML;
    });

    // Llenar el select de cotización
    llenarSelectServicios();

    // Agregar eventos a los botones
    agregarEventosBotones();

    // Refrescar animaciones AOS
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }

    console.log(`✅ Se renderizaron ${serviciosData.length} servicios correctamente`);

    return serviciosData;

  } catch (error) {
    console.error('❌ Error al cargar servicios:', error);
    container.innerHTML = `
      <div class="col-12">
        <div class="alert alert-danger" role="alert">
          <h5 class="alert-heading">
            <i class="bi bi-exclamation-triangle-fill"></i> ${SERVICES_CONFIG.messages.errorServicios}
          </h5>
          <p class="mb-2">No se pudieron cargar los servicios. Por favor verifica:</p>
          <ul class="mb-2">
            <li>Que el archivo <code>${SERVICES_CONFIG.paths.serviciosJSON}</code> exista</li>
            <li>Que las rutas de las imágenes sean correctas</li>
            <li>Que estés usando un servidor local (no file://)</li>
          </ul>
          <hr>
          <p class="mb-0"><strong>Error técnico:</strong> ${error.message}</p>
        </div>
      </div>
    `;
    throw error;
  }
}

/**
 * Carga la galería de fotos desde el archivo JSON
 * @returns {Promise<Array>} - Array de fotos
 */
async function cargarGaleriaFotos() {
  const container = document.getElementById('galeria-container');
  if (!container) return; // Si no existe el contenedor, salir

  try {
    console.log('🔄 Cargando galería desde', SERVICES_CONFIG.paths.fotosJSON);

    const response = await fetch(SERVICES_CONFIG.paths.fotosJSON);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const fotos = await response.json();
    console.log('✅ Fotos cargadas exitosamente:', fotos);

    // Limpiar spinner
    container.innerHTML = '';

    if (!fotos || fotos.length === 0) {
      container.innerHTML = `
        <div class="col-12">
          <div class="alert alert-info text-center">
            <i class="bi bi-info-circle"></i> ${SERVICES_CONFIG.messages.noFotos}
          </div>
        </div>
      `;
      return fotos;
    }

    // Renderizar cada foto
    fotos.forEach((foto, index) => {
      const delay = (index + 1) * SERVICES_CONFIG.animations.galleryDelay;

      const cardHTML = `
        <div class="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay="${delay}">
          <div class="card gallery-card h-100 shadow-sm border-0">
            <a href="${foto.imagen}" class="glightbox" data-gallery="gallery-fotos">
              <img src="${foto.imagen}" 
                   class="card-img-top" 
                   alt="${foto.titulo}"
                   style="height: 350px; object-fit: cover; cursor: pointer;">
            </a>
            
            <div class="card-body">
              <h5 class="card-title fw-bold text-primary">${foto.titulo}</h5>
              <p class="card-text text-muted">${foto.descripcion}</p>
              
              <div class="d-flex justify-content-between align-items-center mt-3">
                <small class="text-muted">
                  <i class="bi bi-geo-alt-fill text-primary"></i> ${foto.ubicacion}
                </small>
                <small class="text-muted">
                  <i class="bi bi-calendar-event text-primary"></i> ${foto.fecha}
                </small>
              </div>
            </div>
          </div>
        </div>
      `;

      container.innerHTML += cardHTML;
    });

    // Inicializar GLightbox
    if (typeof GLightbox !== 'undefined') {
      const lightbox = GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
        autoplayVideos: true
      });
      console.log('✅ GLightbox inicializado para la galería');
    }

    // Refrescar animaciones AOS
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }

    console.log(`✅ Se renderizaron ${fotos.length} fotos en la galería`);

    return fotos;

  } catch (error) {
    console.error('❌ Error al cargar galería:', error);
    container.innerHTML = `
      <div class="col-12">
        <div class="alert alert-danger" role="alert">
          <h5 class="alert-heading">
            <i class="bi bi-exclamation-triangle-fill"></i> ${SERVICES_CONFIG.messages.errorGaleria}
          </h5>
          <p class="mb-2">No se pudieron cargar las fotos. Por favor verifica:</p>
          <ul class="mb-2">
            <li>Que el archivo <code>${SERVICES_CONFIG.paths.fotosJSON}</code> exista</li>
            <li>Que las imágenes estén en <code>assets/img/mis-fotos/</code></li>
            <li>Que las rutas en el JSON sean correctas</li>
          </ul>
          <hr>
          <p class="mb-0"><strong>Error técnico:</strong> ${error.message}</p>
        </div>
      </div>
    `;
    throw error;
  }
}