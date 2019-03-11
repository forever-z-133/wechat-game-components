import Sprite from '../base/sprite'

import { border2json, deg2rad } from '../libs/utils.js';

// 把 fill 和 stroke 的部分拆出来，我也不知道这样好不好
class Shape extends Sprite {
  constructor(...args) {
    super(...args);
  }
  customDrawToCanvas(ctx) {
    const { x, y, width, height, color, bgColor, border } = this;
    const { width: borderWidth, style: borderStyle, color: borderColor } = border2json(border);
    ctx.beginPath();
    this.customDrawShape(ctx);
    ctx.fillStyle = color || bgColor;
    ctx.fill();
    ctx.lineWidth = borderWidth;
    ctx.strokeStyle = borderColor;
    borderStyle !== 'solid' && ctx.setLineDash([borderWidth, borderWidth]); // 如果不是 solid 那就是虚线框了
    // emmm... border 的 box-sizing 关系先不管了
    ctx.stroke();
  }
  customDrawShape(ctx) {}
  drawBgColor() { } // 屏蔽原背景绘制
  drawBorder() { }
}

// 圆角方形
export class Rect extends Shape {
  constructor(x, y, width, height, radius = 0) {
    super(x, y, width, height);
    this.radius = radius;
  }
  customDrawShape(ctx) {
    let { x, y, width, height, radius } = this;
    radius = width < height ? Math.min(radius, width / 2) : Math.min (radius, height / 2);
    ctx.beginPath();
    ctx.arc(x + radius, y + radius, radius, deg2rad(-180), deg2rad(-90), false);
    ctx.arc(x + width - radius, y + radius, radius, deg2rad(-90), deg2rad(0), false);
    ctx.arc(x + width - radius, y + height - radius, radius, deg2rad(0), deg2rad(90), false);
    ctx.arc(x + radius, y + height - radius, radius, deg2rad(90), deg2rad(180), false);
    ctx.closePath();
  }
}

// 椭圆
export class Ellipse extends Rect {
  constructor(x, y, width, height) {
    super(x, y, width, height, 9999);
  }
}

// 圆形
export class Circle extends Shape {
  // 注： xy 为左上角而非圆心坐标
  constructor(x, y, radius) {
    super(x, y, radius * 2, radius * 2);
    this.radius = radius;
  }
  customDrawShape(ctx) {
    let { x, y, radius } = this;
    x += radius;
    y += radius;
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
  }
}

// 正多边形
export class Isogon extends Shape {
  // sides=边数  size=中心到顶点的距离  groove=中心到内侧顶点的距离（比如五角星）
  constructor(x, y, sides, size, groove) {
    super(x, y, size, 0);
    // 比如正六边形宽高不一致，还需另算
    this.sides = sides;
    this.size = size;
    this.groove = groove;
  }
}