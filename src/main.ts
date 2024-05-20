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
  for(let circle of circles){
    console.log(circle);
    

    circle.draw();
    circle.x += circle.vx;
    circle.y += circle.vy;
    circle.vy *= 0.99;
    circle.vy += 0.25;
  
    if (
      circle.y + circle.vy > canvas.height - circle.radius ||
      circle.y + circle.vy < circle.radius
    ) {
      circle.vy = -circle.vy;
    }
    if (
      circle.x + circle.vx > canvas.width - circle.radius ||
      circle.x + circle.vx < circle.radius
    ) {
      circle.vx = -circle.vx;
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
    circles.push(new Circle(ctx, e.clientX, e.clientY));
    console.log(circles);
  });

  window.requestAnimationFrame(draw);
}
