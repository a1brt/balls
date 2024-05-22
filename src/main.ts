import { Circle } from "./Circle";
import { GameState } from "./GameState";
import { Goal } from "./Goal";
import { GoalType } from "./GoalTypes";
import "./style.css";

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
let ctx: CanvasRenderingContext2D;
let gameState: GameState;

let mouseCircle: Circle;
const circles: Circle[] = [];
const goals = new Map<number, Goal>();

let lastTime = 0;
let elasticity = 0.5;
let gravity = 0.5;
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

function tick(currentTime: number) {
  if (gameState !== GameState.STARTED) {
    handleGameOver();
    return;
  }

  const deltaTime = currentTime - lastTime; // don't really know what to do with this

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!canNotDrawCricle(mouseCircle.x, mouseCircle.y, circleRadius)) {
    mouseCircle.drawOrigin();
  }
  for (let circle of circles) {
    if (gravity === 0) {
      circle.draw();
      continue;
    }
    if (circle.y + circle.radius > canvas.height) {
      circle.vy = -circle.vy * circle.elasticity;
      circle.y = canvas.height - circle.radius;
    } else {
      circle.vy += gravity;
      circle.y += circle.vy;
    }
    circle.draw();
  }

  for (let [key, goal] of goals) {
    if (goal.x + goal.width > canvas.width || goal.x <= 0) {
      goal.vx = -goal.vx;
    }
    goal.x += goal.vx;

    for (let circle of circles) {
      if (!checkCollision(goal, circle)) {
        continue;
      }
      if (goal.type === GoalType.AIM) {
        gameState = GameState.WIN;
      } else {
        gameState = GameState.LOSS;
      }
      goals.delete(key);
    }
    goal.draw();
  }
  lastTime = currentTime;

  window.requestAnimationFrame(tick);
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
  gameState = GameState.STARTED;
  initGoals3();

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
  requestAnimationFrame(tick);
}

function initGoals3() {
  goals.set(1, new Goal(ctx, 200, 200, circleRadius * 2.5, GoalType.AIM));
  goals.set(2, new Goal(ctx, 200, 180, circleRadius * 2.5, GoalType.AVOID));
}

function canNotDrawCricle(x: number, y: number, radius: number): boolean {
  return (
    x - radius < 0 ||
    x + radius > canvas.width ||
    y - radius < 0 ||
    y + radius > canvas.height
  );
}

// definitely not gpt
function checkCollision(goal: Goal, circle: Circle): boolean {
  // Calculate the closest point on the goal's rectangle to the circle's center
  const closestX = Math.max(goal.x, Math.min(circle.x, goal.x + goal.width));
  const closestY = Math.max(goal.y, Math.min(circle.y, goal.y + goal.height));

  // Calculate the distance between the circle's center and this closest point
  const distanceX = circle.x - closestX;
  const distanceY = circle.y - closestY;

  // Calculate the squared distance
  const distanceSquared = distanceX * distanceX + distanceY * distanceY;

  // Check if the squared distance is less than the squared radius
  return distanceSquared < circle.radius * circle.radius;
}

function handleGameOver() {
  if (gameState === GameState.WIN) {
    console.log("WIN");
  } else {
    console.log("LOSS");
  }
}
