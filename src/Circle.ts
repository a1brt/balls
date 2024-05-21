// Probably should rename this to ball at this point

export class Circle {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  radius: number;
  elasticity: number;
  color = "red";
  vy = 1; //inital velocity of a circle
  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    elasticity: number
  ) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.elasticity = elasticity;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.stroke();
  }

  drawTransparent() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.fillStyle = "rgba(0,0,0,0.5)";
    this.ctx.fill();
    this.ctx.stroke();
  }
}
