const EXCHANGE_API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';
const HOLIDAYS_API_URL = 'https://date.nager.at/api/v3/PublicHolidays/2025/CR';

// ============================================================
// 1. API DE TIPO DE CAMBIO
// ============================================================
async function obtenerTipoCambio() {
    try {
        const response = await fetch(EXCHANGE_API_URL);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        return {
            usd_crc: data.rates.CRC,
            fecha: data.date
        };
        
    } catch (error) {
        console.error('Error obteniendo tipo de cambio:', error);
        return null;
    }
}

// ============================================================
// 2. API DE DÍAS FERIADOS
// ============================================================
async function obtenerDiasFeriados() {
    try {
        const response = await fetch(HOLIDAYS_API_URL);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Filtrar solo feriados futuros o del día actual
        const hoy = new Date();
        const feriadosFuturos = data.filter(feriado => {
            const fechaFeriado = new Date(feriado.date);
            return fechaFeriado >= hoy;
        }).slice(0, 3); // Solo los próximos 3
        
        return feriadosFuturos;
        
    } catch (error) {
        console.error('Error obteniendo días feriados:', error);
        return null;
    }
}

// ============================================================
// 3. FUNCIÓN PARA FORMATEAR FECHA
// ============================================================
function formatearFecha(fechaStr) {
    const fecha = new Date(fechaStr + 'T00:00:00');
    return fecha.toLocaleDateString('es-CR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// ============================================================
// 4. FUNCIÓN PARA CALCULAR DÍAS RESTANTES
// ============================================================
function calcularDiasRestantes(fechaStr) {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    const fechaFeriado = new Date(fechaStr + 'T00:00:00');
    fechaFeriado.setHours(0, 0, 0, 0);
    
    const diferencia = fechaFeriado - hoy;
    const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
    
    if (dias === 0) return 'Hoy';
    if (dias === 1) return 'Mañana';
    return `En ${dias} días`;
}

// ============================================================
// 5. FUNCIÓN PARA FORMATEAR NÚMEROS
// ============================================================
function formatearNumero(numero) {
    return new Intl.NumberFormat('es-CR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(numero);
}

// ============================================================
// 6. FUNCIÓN PRINCIPAL - CARGAR TODA LA INFORMACIÓN
// ============================================================
async function cargarInformacionImportante() {
    const contenedor = document.getElementById('info-importante-container');
    
    if (!contenedor) {
        console.error('Contenedor #info-importante-container no encontrado');
        return;
    }
    
    // Mostrar mensaje de carga
    contenedor.innerHTML = `
        <div class="text-center py-5">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Cargando información...</span>
            </div>
            <p class="mt-3 text-muted">Consultando datos importantes...</p>
        </div>
    `;
    
    try {
        // Obtener ambas APIs en paralelo
        const [tipoCambio, feriados] = await Promise.all([
            obtenerTipoCambio(),
            obtenerDiasFeriados()
        ]);
        
        // Generar HTML
        let html = `<div class="row g-4">`;
        
        // ========== COLUMNA 1: TIPO DE CAMBIO ==========
        if (tipoCambio) {
            html += `
                <div class="col-lg-6">
                    <div class="info-card exchange-card h-100">
                        <div class="info-card-header">
                            <i class="bi bi-currency-exchange"></i>
                            <h4>Tipo de Cambio Actual</h4>
                        </div>
                        <div class="info-card-body">
                            <div class="exchange-display">
                                <div class="currency-conversion">
                                    <div class="from-currency">
                                        <span class="flag">🇺🇸</span>
                                        <span class="amount">$1.00 USD</span>
                                    </div>
                                    <div class="conversion-arrow">
                                        <i class="bi bi-arrow-down-circle-fill"></i>
                                    </div>
                                    <div class="to-currency">
                                        <span class="flag">🇨🇷</span>
                                        <span class="amount text-primary">₡${formatearNumero(tipoCambio.usd_crc)} CRC</span>
                                    </div>
                                </div>
                                
                                <div class="exchange-info mt-4">
                                    <div class="info-alert">
                                        <i class="bi bi-info-circle text-primary"></i>
                                        <p class="mb-0">
                                            <strong>¿Por qué es importante?</strong><br>
                                            Nuestros clientes pueden realizar pagos en dólares. 
                                            Conocer el tipo de cambio actual te permite planificar mejor tu presupuesto.
                                        </p>
                                    </div>
                                    
                                    <div class="quick-conversions mt-3">
                                        <h6 class="text-muted mb-2">Conversiones rápidas:</h6>
                                        <div class="conversion-row">
                                            <span>$50 USD</span>
                                            <span>=</span>
                                            <span class="text-primary fw-bold">₡${formatearNumero(50 * tipoCambio.usd_crc)}</span>
                                        </div>
                                        <div class="conversion-row">
                                            <span>$100 USD</span>
                                            <span>=</span>
                                            <span class="text-primary fw-bold">₡${formatearNumero(100 * tipoCambio.usd_crc)}</span>
                                        </div>
                                        <div class="conversion-row">
                                            <span>$500 USD</span>
                                            <span>=</span>
                                            <span class="text-primary fw-bold">₡${formatearNumero(500 * tipoCambio.usd_crc)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="info-card-footer">
                            <small>
                                <i class="bi bi-clock"></i> Actualizado hoy | 
                                <i class="bi bi-shield-check"></i> Datos en tiempo real
                            </small>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // ========== COLUMNA 2: DÍAS FERIADOS ==========
        if (feriados && feriados.length > 0) {
            html += `
                <div class="col-lg-6">
                    <div class="info-card holidays-card h-100">
                        <div class="info-card-header">
                            <i class="bi bi-calendar-event"></i>
                            <h4>Próximos Días Feriados</h4>
                        </div>
                        <div class="info-card-body">
                            <div class="holidays-list">
            `;
            
            feriados.forEach((feriado, index) => {
                const diasRestantes = calcularDiasRestantes(feriado.date);
                const fechaFormateada = formatearFecha(feriado.date);
                
                html += `
                    <div class="holiday-item" style="animation-delay: ${index * 0.1}s;">
                        <div class="holiday-icon">
                            🎉
                        </div>
                        <div class="holiday-info">
                            <h5>${feriado.localName}</h5>
                            <p class="holiday-date">
                                <i class="bi bi-calendar3"></i> ${fechaFormateada}
                            </p>
                            ${feriado.counties ? `
                                <p class="holiday-scope">
                                    <i class="bi bi-geo-alt"></i> 
                                    ${feriado.counties.length > 0 ? 'Regional' : 'Nacional'}
                                </p>
                            ` : ''}
                        </div>
                        <div class="holiday-countdown">
                            <span class="badge bg-warning text-dark">${diasRestantes}</span>
                        </div>
                    </div>
                `;
            });
            
            html += `
                            </div>
                            
                            <div class="info-alert mt-4">
                                <i class="bi bi-exclamation-triangle text-warning"></i>
                                <p class="mb-0">
                                    <strong>Importante para tus envíos:</strong><br>
                                    Los días feriados pueden afectar los tiempos de entrega. 
                                    Planifica tus transportes con anticipación considerando estas fechas.
                                </p>
                            </div>
                            
                            <div class="service-note mt-3">
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-truck text-primary fs-4 me-3"></i>
                                    <div>
                                        <strong>Servicio especial</strong>
                                        <p class="mb-0 small text-muted">
                                            Ofrecemos servicio de emergencia en días feriados con cargos adicionales
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="info-card-footer">
                            <small>
                                <i class="bi bi-globe"></i> Datos oficiales de Costa Rica | 
                                <i class="bi bi-calendar-check"></i> Actualizado automáticamente
                            </small>
                        </div>
                    </div>
                </div>
            `;
        }
        
        html += `</div>`;
        
        // ========== TIPS ADICIONALES ==========
        html += `
            <div class="row mt-4">
                <div class="col-12">
                    <div class="tips-banner">
                        <div class="tips-content">
                            <i class="bi bi-lightbulb-fill"></i>
                            <div>
                                <h5 class="mb-2">💡 Tip de Transportes Montero</h5>
                                <p class="mb-0">
                                    Para envíos internacionales o cotizaciones en dólares, utiliza el tipo de cambio 
                                    actualizado. Para planificar mudanzas o transportes de maquinaria, evita los días 
                                    feriados para asegurar disponibilidad total de nuestro equipo.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        contenedor.innerHTML = html;
        
        // Aplicar animaciones
        aplicarAnimaciones();
        
    } catch (error) {
        console.error('Error cargando información importante:', error);
        contenedor.innerHTML = `
            <div class="alert alert-warning" role="alert">
                <i class="bi bi-exclamation-triangle fs-3"></i>
                <p class="mt-2 mb-0">
                    No se pudo cargar la información en este momento. 
                    Por favor, intente más tarde.
                </p>
            </div>
        `;
    }
}

// ============================================================
// 7. APLICAR ANIMACIONES A LOS ELEMENTOS
// ============================================================
function aplicarAnimaciones() {
    const cards = document.querySelectorAll('.info-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    const holidayItems = document.querySelectorAll('.holiday-item');
    holidayItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 500 + (index * 150));
    });
}

// ============================================================
// 8. FUNCIÓN PARA ACTUALIZAR MANUALMENTE
// ============================================================
function actualizarInformacion() {
    cargarInformacionImportante();
}

// ============================================================
// 9. INICIALIZAR AL CARGAR LA PÁGINA
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    cargarInformacionImportante();
    
    // Actualizar cada 30 minutos
    setInterval(cargarInformacionImportante, 1800000);
});