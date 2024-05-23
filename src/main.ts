import { Ball } from "./Ball";
import { GameState } from "./GameState";
import { Platform } from "./Platform";
import { PlatformType } from "./PlatformTypes";
import "./style.css";

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
let ctx: CanvasRenderingContext2D;
let gameState: GameState;

let mouseball: Ball;
let balls: Ball[];
const platforms = new Map<number, Platform>();

let lastTime = 0;
let elasticity = 0.5;
let gravity = 0.5;
const ballRadius = 25;

let currentRequest: number | null = null;

window.onload = () => {
  const c = canvas.getContext("2d");

  if (!c) {
    console.error("Canvas context is not available");
    return;
  }

  ctx = c;
  mouseball = new Ball(ctx, 0, 0, ballRadius, 0);

  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mousemove", onMouseMove);
  initBasic();
};

let elasticitySlider = <HTMLInputElement>document.getElementById("elasticity");
elasticitySlider?.addEventListener("input", function () {
  elasticity = +this.value / 100;
});

let gravitySlider = <HTMLInputElement>document.getElementById("gravity");
gravitySlider?.addEventListener("input", function () {
  gravity = +this.value / 100;
});

let levels = <HTMLInputElement>document.getElementById("levels");
levels?.addEventListener("change", function () {
  switch (this.value) {
    case "basic":
      initBasic();
      break;
    case "l1":
      initLevel1();
      break;
    case "l2":
      initLevel2();
      break;
    case "l3":
      initLevel3();
      break;
    case "l4":
      initLevel4();
      break;
    default:
      console.error(
        "Not scientifically possible error: level option not defined"
      );
      platforms.clear();
      break;
  }
});

function tick(currentTime: number) {
  if (gameState !== GameState.STARTED) {
    handleGameOver();
    return;
  }

  // don't really know what to do with this
  const deltaTime = currentTime - lastTime;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!canNotDrawCricle(mouseball.x, mouseball.y, ballRadius)) {
    mouseball.drawOrigin();
  }
  for (let ball of balls) {
    if (gravity === 0) {
      ball.draw();
      continue;
    }
    if (ball.y + ball.radius > canvas.height) {
      ball.vy = -ball.vy * ball.elasticity;
      ball.y = canvas.height - ball.radius;
    } else {
      ball.vy += gravity;
      ball.y += ball.vy;
    }
    ball.draw();
  }

  for (let [key, platform] of platforms) {
    if (platform.x + platform.width > canvas.width || platform.x <= 0) {
      platform.vx = -platform.vx;
    }
    platform.x += platform.vx;
    platform.draw();

    // check if any ball collides with the current platform
    for (let ball of balls) {
      if (!checkCollision(platform, ball)) {
        continue;
      }
      if (platform.type === PlatformType.AIM) {
        gameState = GameState.WIN;
      } else {
        gameState = GameState.LOSS;
      }
      platforms.delete(key);
    }
  }
  lastTime = currentTime;

  currentRequest = requestAnimationFrame(tick);
}

function onMouseDown(e: MouseEvent) {
  const x = e.clientX - canvas.offsetLeft;
  const y = e.clientY - canvas.offsetTop;

  if (canNotDrawCricle(x, y, ballRadius)) {
    return;
  }
  balls.push(new Ball(ctx, x, y, ballRadius, elasticity));
}

function onMouseMove(e: MouseEvent) {
  const x = e.clientX - canvas.offsetLeft;
  const y = e.clientY - canvas.offsetTop;
  mouseball.x = x;
  mouseball.y = y;
}

function canNotDrawCricle(x: number, y: number, radius: number): boolean {
  return (
    x - radius < 0 ||
    x + radius > canvas.width ||
    y - radius < 0 ||
    y + radius > canvas.height
  );
}

function checkCollision(platform: Platform, ball: Ball): boolean {
  const closestX = Math.max(
    platform.x,
    Math.min(ball.x, platform.x + platform.width)
  );
  const closestY = Math.max(
    platform.y,
    Math.min(ball.y, platform.y + platform.height)
  );

  const distanceX = ball.x - closestX;
  const distanceY = ball.y - closestY;

  const distanceSquared = distanceX * distanceX + distanceY * distanceY;

  return distanceSquared < ball.radius * ball.radius;
}

function handleGameOver() {
  const gameEndScreen = document.getElementById("game-end")!;
  console.log(gameEndScreen);

  if (gameState === GameState.WIN) {
    gameEndScreen.innerHTML = "Level Cleared";
    gameEndScreen.style.color = "green";
  } else {
    gameEndScreen.innerHTML = "Level Failed";
    gameEndScreen.style.color = "red";
  }
}

function initBasic() {
  if (currentRequest) {
    cancelAnimationFrame(currentRequest);
  }
  document.getElementById("game-end")!.innerHTML = "";
  platforms.clear();
  balls = [];
  gameState = GameState.STARTED;
  currentRequest = requestAnimationFrame(tick);
}

function initLevel1() {
  initBasic();
  platforms.set(
    1,
    new Platform(ctx, 200, 300, ballRadius * 2.5, PlatformType.AIM)
  );
}

function initLevel2() {
  initBasic();
  platforms.set(
    2,
    new Platform(ctx, 250, 220, ballRadius * 2.5, PlatformType.AVOID)
  );
  platforms.set(
    1,
    new Platform(ctx, 100, 300, ballRadius * 2.5, PlatformType.AIM)
  );
}

function initLevel3() {
  initBasic();
  platforms.set(
    1,
    new Platform(ctx, 200, 200, ballRadius * 2.5, PlatformType.AIM)
  );
  platforms.set(
    2,
    new Platform(ctx, 200, 180, ballRadius * 2.5, PlatformType.AVOID)
  );
}

function initLevel4() {
  initBasic();
  platforms.set(
    1,
    new Platform(ctx, 200, 400, ballRadius * 2.5, PlatformType.AIM)
  );
  platforms.set(
    2,
    new Platform(ctx, 200, 380, ballRadius * 2.5, PlatformType.AVOID)
  );
  platforms.set(
    3,
    new Platform(ctx, 250, 300, ballRadius * 2.5, PlatformType.AVOID)
  );
  platforms.set(
    4,
    new Platform(ctx, 50, 180, ballRadius * 2.5, PlatformType.AVOID)
  );
}
