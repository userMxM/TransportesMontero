document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("satisfaccionChart").getContext("2d");

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Excelente", "Bueno", "Regular"],
      datasets: [{
        data: [70, 25, 5],
        backgroundColor: ["#007bff", "#6c757d", "#ced4da"],
        borderWidth: 2,
        borderColor: "#fff",
        hoverOffset: 10
      }]
    },
    options: {
      plugins: {
        legend: {
          position: "bottom",
          labels: { color: "#343a40", font: { size: 14 } }
        }
      },
      responsive: true,
      maintainAspectRatio: false
    }
  });
});
