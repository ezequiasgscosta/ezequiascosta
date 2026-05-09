const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let particles = [];

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.depth = Math.random();

    this.size = this.depth * 3 + 0.5;
    this.speedY = this.depth * 2 + 0.2;
    this.speedX = (Math.random() - 0.5) * this.depth * 0.5;

    this.opacity = this.depth;
    this.hue = Math.random() * 60; // Azul para ciano
  }

  update() {
    this.y -= this.speedY;
    this.x += this.speedX;

    if (this.y < 0) {
      this.y = canvas.height;
      this.x = Math.random() * canvas.width;
    }
    
    if (this.x < 0 || this.x > canvas.width) {
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    // TRAIL (rastro vertical)
    ctx.beginPath();
    ctx.strokeStyle = `rgba(100,180,255,${this.opacity * 0.4})`;
    ctx.lineWidth = this.size * 0.3;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.size * 4);
    ctx.stroke();

    // PARTÍCULA PRINCIPAL (glow azul/amarelo)
    let gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.size * 6
    );

    gradient.addColorStop(0, `rgba(180,220,255,${this.opacity})`);
    gradient.addColorStop(0.3, `rgba(100,180,255,${this.opacity * 0.6})`);
    gradient.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();

    // NÚCLEO BRILHANTE
    ctx.fillStyle = `rgba(255,255,150,${this.opacity * 0.8})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  particles = [];
  for (let i = 0; i < 180; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  // NÉVOA / FUNDO ORGÂNICO
  let gradientBg = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    0,
    canvas.width / 2,
    canvas.height / 2,
    canvas.width
  );

  gradientBg.addColorStop(0, "rgba(20,60,120,0.15)");
  gradientBg.addColorStop(1, "rgba(0,0,0,0.4)");

  ctx.fillStyle = gradientBg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Fundo com rastro suave
  ctx.fillStyle = "rgba(2,6,17,0.3)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Desenha do fundo para frente (depth)
  particles.sort((a, b) => a.depth - b.depth);

  for (let particle of particles) {
    particle.update();
    particle.draw();
  }

  requestAnimationFrame(animate);
}

// Iniciar animação
init();
animate();

// Recriar partículas se a janela for redimensionada (opcional)
window.addEventListener('resize', () => {
  // Mantém as partículas existentes, só redimensiona o canvas
  init();
});

// Parar animação se a aba ficar invisível (economiza CPU)
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Aba invisível - parar animação
    cancelAnimationFrame(animate);
  } else {
    // Aba visível - reiniciar animação
    animate();
  }
});

  for (let p of particles) {
    p.update();
    p.draw();
  }

  requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener("resize", () => {
  resizeCanvas();
  init();
});