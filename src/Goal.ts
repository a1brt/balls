export class Goal {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  vx = 1;
  height = 5;
  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number
  ) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
  }

  draw() {
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.x, this.y + this.height, this.width, this.height);
  }
}
