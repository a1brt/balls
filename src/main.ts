import { Circle } from "./Circle";
import "./style.css";

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const circles: Circle[] = [];
let ctx: CanvasRenderingContext2D;

let rigidity = 0.7;
let mass = 0.5;
window.onload = () => {
  const c = canvas.getContext("2d");

  if (!c) {
    console.error("Canvas context is not available");
    return;
  }
  ctx = c;
};

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let circle of circles) {
    circle.draw();

    if (circle.y + circle.radius > canvas.height) {
      circle.vy = -circle.vy * rigidity;
      circle.y = canvas.height - circle.radius;
    } else {
      circle.vy += mass;
      circle.y += circle.vy;
    }
  }

  window.requestAnimationFrame(draw);
}

document.getElementById("start")?.addEventListener("click", function () {
  this.style.display = "none";
  start();
});

function start() {
  canvas.addEventListener("mousedown", function (e) {
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;
    const radius = 25;
    if (
      x - radius < 0 ||
      x + radius > canvas.width ||
      y - radius < 0 ||
      y + radius > canvas.height
    ) {
      return;
    }
    circles.push(new Circle(ctx, x, y, radius));
  });

  window.requestAnimationFrame(draw);
}
