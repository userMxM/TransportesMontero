// Variable global para almacenar los servicios
let datosServicios;

/**
 * Carga los servicios desde el archivo JSON
 * @param {string} tipo - Tipo de filtro (ALL, MAQUINARIA, MATERIALES, MUDANZAS)
 */
async function CallServiceServicios(tipo) {
    const uriServer = "assets/data/services.json";
    
    console.log(`🔄 Cargando servicios desde: ${uriServer}`);
    console.log(`🎯 Filtro aplicado: ${tipo}`);

    try {
        const response = await fetch(uriServer);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("✅ Datos cargados exitosamente:", data);
        
        OnSuccessServicios(data, tipo);

    } catch (error) {
        console.error("❌ Error al cargar servicios:", error);
        mostrarErrorCarga(error.message);
    }
}

/**
 * Callback exitoso al cargar datos
 */
function OnSuccessServicios(data, tipo) {
    datosServicios = data;
    cargarServicios(tipo);
}

/**
 * Renderiza los servicios en el DOM según el filtro
 */
function cargarServicios(tipo) {
    try {
        const servicesContainer = document.getElementById("services-container-id");
        
        if (!servicesContainer) {
            console.error("❌ ERROR CRÍTICO: No se encontró el elemento 'services-container-id'");
            return;
        }

        // Limpiar contenedor
        servicesContainer.innerHTML = "";
        
        if (!datosServicios || !datosServicios.servicios) {
            console.error("❌ No hay datos de servicios para mostrar");
            servicesContainer.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-warning text-center">
                        <i class="bi bi-exclamation-triangle"></i> No hay servicios disponibles
                    </div>
                </div>
            `;
            return;
        }

        console.log(`🎯 Filtrando servicios por: ${tipo.toUpperCase()}`);
        let contador = 0;

        // Filtrar y renderizar servicios
        datosServicios.servicios.forEach(servicio => {
            const precio = parseFloat(servicio.precio_base);
            const precioFormateado = precio.toLocaleString('es-CR', { 
                style: 'decimal', 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
            });

            // Aplicar filtro
            let mostrar = false;
            if (tipo.toUpperCase() === "ALL") {
                mostrar = true;
            } else if (servicio.clasificacion.toUpperCase() === tipo.toUpperCase()) {
                mostrar = true;
            }

            if (mostrar) {
                servicesContainer.innerHTML += generarHTMLServicio(servicio, precioFormateado);
                contador++;
            }
        });

        console.log(`✅ Se renderizaron ${contador} servicio(s)`);

        // Mensaje si no hay resultados
        if (contador === 0) {
            servicesContainer.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-info text-center">
                        <i class="bi bi-info-circle"></i> No hay servicios en esta categoría
                    </div>
                </div>
            `;
        }

    } catch (error) {
        console.error("❌ Error al renderizar servicios:", error);
        mostrarErrorCarga("Error al procesar servicios");
    }
}

/**
 * Genera el HTML de una tarjeta de servicio
 */
function generarHTMLServicio(servicio, precioFormateado) {
    return `
        <div class="col-lg-4 service-item filter-${servicio.clasificacion}" data-aos="fade-up">
            <div class="card h-100 shadow-sm">
                <img src="${servicio.imagen}" 
                     class="service-img card-img-top" 
                     alt="${servicio.titulo}"
                     onerror="this.src='assets/img/placeholder.jpg'">
                <div class="card-body service-content d-flex flex-column">
                    <h3 class="card-title">${servicio.titulo}</h3>
                    <p class="service-description flex-grow-1">${servicio.descripcion}</p>
                    <div class="service-price">
                        <span class="price-label">Desde:</span>
                        <span class="price-amount">₡${precioFormateado}/km</span>
                    </div>
                    <button class="btn btn-primary btn-solicitar mt-2" onclick="solicitarServicio(${servicio.id})">
                        <i class="bi bi-cart-plus"></i> Solicitar Servicio
                    </button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Inicializa el sistema de servicios
 */
function inicializarServicios() {
    console.log("🚀 Inicializando módulo de servicios...");
    
    // Pequeño delay para asegurar que el DOM esté listo
    setTimeout(() => {
        const container = document.getElementById("services-container-id");
        
        if (!container) {
            console.error("❌ CRÍTICO: El contenedor 'services-container-id' no existe en el DOM");
            console.log("📋 Verifica que la sección de servicios esté en el HTML");
            return;
        }

        console.log("✅ Contenedor encontrado, cargando servicios...");
        
        // Cargar todos los servicios inicialmente
        CallServiceServicios('ALL');

        // Configurar eventos de los filtros
        const filtros = document.querySelectorAll('.filservicio');
        
        if (filtros.length === 0) {
            console.warn("⚠️ No se encontraron elementos con clase 'filservicio'");
        } else {
            console.log(`✅ Se encontraron ${filtros.length} filtros`);
        }

        filtros.forEach(filtro => {
            filtro.addEventListener('click', function() {
                const tipoSeleccionado = this.id;
                console.log(`🔄 Usuario seleccionó filtro: ${tipoSeleccionado}`);
                
                // Actualizar clase activa
                filtros.forEach(f => f.classList.remove('filter-active'));
                this.classList.add('filter-active');
                
                // Cargar servicios filtrados
                CallServiceServicios(tipoSeleccionado);
            });
        });

        console.log("✅ Sistema de servicios inicializado correctamente");
    }, 100);
}

/**
 * Maneja la solicitud de un servicio
 */
function solicitarServicio(idServicio) {
    if (!datosServicios) {
        alert("Error: Los datos no están cargados");
        return;
    }
    
    const servicio = datosServicios.servicios.find(s => s.id === idServicio);
    
    if (servicio) {
        console.log("📋 Servicio solicitado:", servicio);
        
        // Puedes personalizar esta acción
        const mensaje = `Has seleccionado: ${servicio.titulo}\n\nPrecio base: ₡${servicio.precio_base.toLocaleString('es-CR')}/km\n\n¿Deseas ir al formulario de cotización?`;
        
        if (confirm(mensaje)) {
            // Scroll al formulario
            document.getElementById('cotizar')?.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
            
            // Seleccionar el servicio en el formulario
            setTimeout(() => {
                const selectServicio = document.getElementById('servicio');
                if (selectServicio) {
                    selectServicio.value = servicio.clasificacion;
                }
            }, 500);
        }
    }
}

/**
 * Muestra mensaje de error en el contenedor
 */
function mostrarErrorCarga(mensaje) {
    const container = document.getElementById("services-container-id");
    if (container) {
        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger text-center" role="alert">
                    <i class="bi bi-exclamation-triangle-fill"></i>
                    <h5 class="mt-2">Error al cargar servicios</h5>
                    <p class="mb-0">${mensaje}</p>
                    <hr>
                    <p class="mb-0 small">Verifica que el archivo <code>assets/data/services.json</code> exista</p>
                </div>
            </div>
        `;
    }
}

// ========================================
// INICIALIZACIÓN AUTOMÁTICA
// ========================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarServicios);
} else {
    // Si el DOM ya está cargado, ejecutar inmediatamente
    inicializarServicios();
}