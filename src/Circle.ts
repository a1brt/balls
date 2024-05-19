export class Circle {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  radius = 25;
  color = "red";
  vx = 5;
  vy = 2;
  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }
}
