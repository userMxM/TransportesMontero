document.addEventListener("DOMContentLoaded", () => {
  const btnCalcular = document.getElementById("btnCalcular");
  const resultado = document.getElementById("resultado");

  btnCalcular.addEventListener("click", () => {
    const servicio = document.getElementById("servicio").value;
    const distancia = parseFloat(document.getElementById("distancia").value) || 0;
    const tipoCarga = document.getElementById("tipoCarga").value;
    const ayudantes = parseInt(document.getElementById("ayudantes").value);
    const espera = parseFloat(document.getElementById("espera").value) || 0;

    // Tarifas base según servicio
    const tarifasBase = {
      maquinaria: 45000,
      materiales: 35000,
      mudanzas: 40000
    };

    const tarifaBase = tarifasBase[servicio] || 25000;
    const costoPorKm = 900;
    const costoAyudante = 10000;
    const costoEspera = 5000; // por hora

    // Cálculo del costo
    let total = tarifaBase + (distancia * costoPorKm);
    if (tipoCarga === "pesada") total += total * 0.15;
    if (tipoCarga === "peligrosa") total += total * 0.25;
    if (ayudantes === 1) total += costoAyudante;
    if (espera > 0) total += espera * costoEspera;

    // Mostrar resultado
    resultado.style.display = "block";
    resultado.innerHTML = `
      <h5>Resultado de cotización</h5>
      <p><strong>Servicio:</strong> ${servicio.charAt(0).toUpperCase() + servicio.slice(1)}</p>
      <p><strong>Distancia:</strong> ${distancia} km</p>
      <p><strong>Costo estimado:</strong> ₡${total.toLocaleString("es-CR")}</p>
      <p class="mt-3 small text-muted">* Este es un estimado. El costo final se confirmará según la distancia real y condiciones de carga.</p>
    `;
  });
});
