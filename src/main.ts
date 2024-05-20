import { Circle } from "./Circle";
import "./style.css";

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const circles: Circle[] = [];
let ctx: CanvasRenderingContext2D;

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

    if (Math.abs(circle.vy) > 0.01 || circle.y + circle.radius < canvas.height) {
      circle.y += circle.vy;
      circle.vy *= 0.99; // Damping factor for velocity
      circle.vy += 0.25; // Gravity
    }

    if (circle.y + circle.radius >= canvas.height) {
      circle.y = canvas.height - circle.radius;
      circle.vy = -circle.vy * 0.75; 

      if (Math.abs(circle.vy) < 1.19) {
        circle.vy = 0;
      }      
    }
  }

  window.requestAnimationFrame(draw);
}

document.getElementById("start")?.addEventListener("click", function () {
  this.style.display = "none";
  start()
});

function start() {
  canvas.addEventListener("mousedown", function (e) {
    circles.push(new Circle(ctx, e.clientX- canvas.offsetLeft, e.clientY- canvas.offsetTop));
  });

  window.requestAnimationFrame(draw);
}
