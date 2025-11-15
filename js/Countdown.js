let tiempo = 600;

function actualizarContador() {
  const minutos = Math.floor(tiempo / 60);
  const segundos = tiempo % 60;
  document.getElementById("countdown").textContent = `${minutos}:${segundos
    .toString()
    .padStart(2, "0")}`;

  tiempo--;
  if (tiempo < 0) {
    tiempo = 600;
  }
}

setInterval(actualizarContador, 1000);
actualizarContador();
