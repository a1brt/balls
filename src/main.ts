import { Circle } from "./Circle";
import "./style.css";

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
let ball: Circle;
let ctx: CanvasRenderingContext2D;

window.onload = () => {
  const c = canvas.getContext("2d");

  if (!c) {
    console.error("Canvas context is not available");
    return;
  }
  ctx = c;
  ball = new Circle(ctx,100,100);
};

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
 
  ball.draw();
  ball.x += ball.vx;
  ball.y += ball.vy;
  ball.vy *= 0.99;
  ball.vy += 0.25;

  if (
    ball.y + ball.vy > canvas.height - ball.radius ||
    ball.y + ball.vy < ball.radius
  ) {
    ball.vy = -ball.vy;
  }
  if (
    ball.x + ball.vx > canvas.width - ball.radius ||
    ball.x + ball.vx < ball.radius
  ) {
    ball.vx = -ball.vx;
  }

  
  window.requestAnimationFrame(draw);
}

canvas.addEventListener("mouseover", (e) => {
   window.requestAnimationFrame(draw);
});
