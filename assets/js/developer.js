fetch("data/developer.json")
  .then(response => response.json())
  .then(data => {
    const photoContainer = document.getElementById("photo-container");

    photoContainer.innerHTML = `
      <img src="${data.imagen}" alt="${data.descripcion}" 
           class="img-fluid rounded shadow" style="max-height: 220px; object-fit: cover;">
    `;
  })
  .catch(error => {
    console.error("Error al cargar el JSON del desarrollador:", error);
    document.getElementById("photo-container").innerHTML = "<p>Error al cargar la imagen.</p>";
  });
