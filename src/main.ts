import { Circle } from "./Circle";
import "./style.css";

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const circles: Circle[] = [];
let ctx: CanvasRenderingContext2D;

let elasticity = 0.5;
let gravity = 0.5;
let mouseCircle: Circle;
const circleRadius = 25;

window.onload = () => {
  const c = canvas.getContext("2d");

  if (!c) {
    console.error("Canvas context is not available");
    return;
  }

  ctx = c;
  mouseCircle = new Circle(ctx, 0, 0, circleRadius, 0);
};
// I guess this was suposed to tick nuy I don't understand what I am
// supposed to do with deltaTime
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!canNotDrawCricle(mouseCircle.x, mouseCircle.y, circleRadius)) {
    mouseCircle.drawBlack();
  }
  for (let circle of circles) {
    circle.draw();
    if (gravity === 0) {
      continue;
    }
    if (circle.y + circle.radius > canvas.height) {
      circle.vy = -circle.vy * circle.elasticity;
      circle.y = canvas.height - circle.radius;
    } else {
      circle.vy += gravity;
      circle.y += circle.vy;
    }
  }

  window.requestAnimationFrame(draw);
}

document.getElementById("start")?.addEventListener("click", function () {
  this.style.visibility = "hidden";
  start();
});

let elasticitySlider = <HTMLInputElement>document.getElementById("elasticity");
elasticitySlider?.addEventListener("input", function () {
  elasticity = +this.value / 100;
});

let gravitySlider = <HTMLInputElement>document.getElementById("gravity");
gravitySlider?.addEventListener("input", function () {
  gravity = +this.value / 100;
});

function start() {
  canvas.addEventListener("mousedown", function (e) {
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;

    if (canNotDrawCricle(x, y, circleRadius)) {
      return;
    }
    circles.push(new Circle(ctx, x, y, circleRadius, elasticity));
  });
  canvas.addEventListener("mousemove", function (e) {
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;
    mouseCircle.x = x;
    mouseCircle.y = y;
  });
  window.requestAnimationFrame(draw);
}

function canNotDrawCricle(x: number, y: number, radius: number): boolean {
  return (
    x - radius < 0 ||
    x + radius > canvas.width ||
    y - radius < 0 ||
    y + radius > canvas.height
  );
}
