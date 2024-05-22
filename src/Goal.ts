import { GoalType } from "./GoalTypes";

export class Goal {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  type: GoalType;
  vx = 1;
  height = 5;
  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    type: GoalType
  ) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.type = type;
  }

  draw() {
    this.ctx.fillStyle = this.type === GoalType.AIM ? "red" : "blue";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
