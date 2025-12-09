document.addEventListener('DOMContentLoaded', function() {
  const audioToggle = document.getElementById('audio-toggle');
  const audio = document.getElementById('background-audio');
  
  // Estado inicial
  let isPlaying = false;
  
  // Control de reproducción
  audioToggle.addEventListener('click', function() {
    if (isPlaying) {
      audio.pause();
      audioToggle.classList.remove('playing');
      audioToggle.innerHTML = '<i class="bi bi-music-note-beamed"></i>';
      audioToggle.title = 'Reproducir música de fondo';
    } else {
      audio.play().then(() => {
        audioToggle.classList.add('playing');
        audioToggle.innerHTML = '<i class="bi bi-pause-circle"></i>';
        audioToggle.title = 'Pausar música de fondo';
      }).catch(error => {
        console.log('Error al reproducir:', error);
      });
    }
    isPlaying = !isPlaying;
  });
  
  // Controlar volumen (opcional, ajusta según prefieras)
  audio.volume = 0.3; // 30% del volumen
  
  // Eventos del audio
  audio.addEventListener('ended', function() {
    // Por si acaso, aunque tiene loop
    audio.currentTime = 0;
    audio.play();
  });
});