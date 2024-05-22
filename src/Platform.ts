import { PlatformType } from "./PlatformTypes";

export class Platform {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  type: PlatformType;
  vx = 1;
  height = 5;
  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    type: PlatformType
  ) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.type = type;
  }

  draw() {
    this.ctx.fillStyle = this.type === PlatformType.AIM ? "red" : "blue";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
