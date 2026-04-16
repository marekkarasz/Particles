//setup
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//let hue = Math.random() * 255 - 0;
// const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
// gradient.addColorStop(0, "rgb(50, 50, 50)");
// gradient.addColorStop(0.5, "rgb(100, 100, 100)");
// gradient.addColorStop(1, "rgb(255, 255, 255)");

class Particle {
  constructor(effect) {
    this.effect = effect;
    this.radius = Math.random() * 40 + 1;
    this.x =
      this.radius + Math.random() * (this.effect.width - this.radius * 2);
    this.y =
      this.radius + Math.random() * (this.effect.height - this.radius * 2);
    this.velocityX = Math.random() * 4 - 2;
    this.velocityY = Math.random() * 4 - 2;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
  }
  draw(context) {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();
  }
  update() {
    this.x += this.velocityX;
    this.y += this.velocityY;
    if (this.x > this.effect.width - this.radius || this.x < this.radius)
      this.velocityX *= -1;
    if (this.y > this.effect.height - this.radius || this.y < this.radius)
      this.velocityY *= -1;
  }
}

class Effect {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.particles = [];
    this.numberOfParticles = 20;
    this.createParticles();
  }
  createParticles() {
    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push(new Particle(this));
    }
  }
  handleParticles(context) {
    this.particles.forEach((particles) => {
      particles.update();
      particles.draw(context);
    });
  }
}
const effect = new Effect(canvas);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  effect.handleParticles(ctx);
  requestAnimationFrame(animate);
}
animate();
