export class Circle {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  radius:number;
  color = "red";
  vy = 1;
  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, radius:number) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.stroke();
  }
}
