// =====================================================
// MAPA GRATIS - LEAFLET + OPENSTREETMAP + OSRM
// =====================================================

let map, marcadorEmpresa, marcadorUsuario, rutaControl, userPosition = null;

function initMap() {
  const empresaPos = CONFIG.maps.empresaPosition;

  map = L.map("map").setView(
    [empresaPos.lat, empresaPos.lng],
    CONFIG.maps.defaultZoom
  );

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  // Marcador empresa
  marcadorEmpresa = L.marker([empresaPos.lat, empresaPos.lng])
    .addTo(map)
    .bindPopup(`
      <h5>Transportes Montero S.A.</h5>
      <p>📍 Santa Lucía, Heredia</p>
      <p>📞 6207-5681</p>
    `)
    .openPopup();
}

function obtenerMiUbicacion() {
  const ubicacionText = document.getElementById("ubicacionText");
  const alertBox = ubicacionText.parentElement;
  const btnUbicacion = document.getElementById("btnUbicacion");
  const btnRuta = document.getElementById("btnRuta");

  if (!navigator.geolocation) {
    alertBox.className = "alert alert-danger";
    ubicacionText.innerHTML = CONFIG.messages.navegadorNoSoporta;
    return;
  }

  btnUbicacion.disabled = true;
  ubicacionText.innerHTML = CONFIG.messages.ubicacionDetectando;

  navigator.geolocation.getCurrentPosition(
    (position) => {
      userPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      if (marcadorUsuario) map.removeLayer(marcadorUsuario);

      marcadorUsuario = L.marker([userPosition.lat, userPosition.lng])
        .addTo(map)
        .bindPopup("Tu ubicación")
        .openPopup();

      const bounds = L.latLngBounds([
        [CONFIG.maps.empresaPosition.lat, CONFIG.maps.empresaPosition.lng],
        [userPosition.lat, userPosition.lng]
      ]);
      map.fitBounds(bounds);

      const distancia = calcularDistancia(
        userPosition,
        CONFIG.maps.empresaPosition
      );

      alertBox.className = "alert alert-success";
      ubicacionText.innerHTML = `✅ Distancia: ${distancia.toFixed(2)} km`;

      btnRuta.disabled = false;
      btnUbicacion.disabled = false;
    },
    () => {
      alertBox.className = "alert alert-danger";
      ubicacionText.innerHTML = CONFIG.messages.ubicacionError;
      btnUbicacion.disabled = false;
    }
  );
}

function trazarRuta() {
  if (!userPosition) {
    alert(CONFIG.messages.alertaUbicacion);
    return;
  }

  if (rutaControl) map.removeControl(rutaControl);

  rutaControl = L.Routing.control({
    waypoints: [
      L.latLng(userPosition.lat, userPosition.lng),
      L.latLng(CONFIG.maps.empresaPosition.lat, CONFIG.maps.empresaPosition.lng)
    ],
    routeWhileDragging: false
  }).addTo(map);
}

function centrarEmpresa() {
  map.setView(
    [CONFIG.maps.empresaPosition.lat, CONFIG.maps.empresaPosition.lng],
    CONFIG.maps.focusZoom
  );
}

function limpiarMapa() {
  if (marcadorUsuario) {
    map.removeLayer(marcadorUsuario);
    marcadorUsuario = null;
  }

  if (rutaControl) {
    map.removeControl(rutaControl);
    rutaControl = null;
  }

  userPosition = null;
  document.getElementById("btnRuta").disabled = true;

  const ubicacionText = document.getElementById("ubicacionText");
  const alertBox = ubicacionText.parentElement;
  alertBox.className = "alert alert-info";
  ubicacionText.innerHTML = CONFIG.messages.ubicacionInicial;

  centrarEmpresa();
}

// ✅ TU FUNCIÓN DE DISTANCIA ORIGINAL FUNCIONA IGUAL
function calcularDistancia(p1, p2) {
  const R = 6371;
  const dLat = (p2.lat - p1.lat) * Math.PI / 180;
  const dLon = (p2.lng - p1.lng) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(p1.lat * Math.PI / 180) *
      Math.cos(p2.lat * Math.PI / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
