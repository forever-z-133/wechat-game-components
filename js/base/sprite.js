/**
 * 游戏基础的精灵类
 */

import { watchValueChange, border2json } from '../libs/utils.js';

export default class Sprite {
  constructor(x = 0, y = 0, width = 0, height = 0) {

    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;

    watchValueChange(this, 'border', (val) => {
      const { width, style, color } = border2json(val);
      this.borderWidth = width;
      this.borderStyle = style;
      this.borderColor = color;
    });

    this.bgColor = 'rgba(255, 255, 255, 0)';
    this.borderWidth = 0;
    this.borderStyle = 'solid';
    this.borderColor = 'rgba(255, 255, 255, 0)';
    this.visible = true;
    this.disabled = false;
  }

  /**
   * 将精灵图绘制在canvas上
   */
  customDrawToCanvas(ctx) { }
  customDrawToCanvas2(ctx) { }
  beforeDraw(ctx) { }
  afterDraw(ctx) { }
  drawToCanvas(ctx) {
    if (!this.visible) return;

    // 绘制背景色
    ctx.save();
    this.drawBgColor(ctx);
    this.drawBorder(ctx);
    ctx.restore();

    // 非公共组件的前置回调
    ctx.save();
    this.beforeDraw(ctx);
    ctx.restore();

    // 公共组件的回调
    this.customDrawToCanvas(ctx);
    ctx.save();
    this.draw && this.draw(ctx);
    ctx.restore();
    this.customDrawToCanvas2(ctx);

    // 非公共组件的后置回调
    ctx.save();
    this.afterDraw(ctx);
    ctx.restore();
  }
  // 绘制背景色，可被屏蔽掉
  drawBgColor(ctx) {
    const { x, y, width, height, bgColor } = this;
    ctx.fillStyle = bgColor;
    ctx.fillRect(x, y, width, height);
  }
  // 绘制边框，是 box-sizing 为 content-box 模式下的效果
  // 以后如果使用频繁，可能会加入 padding-box 模式吧
  drawBorder(ctx) {
    const { borderWidth, borderStyle, borderColor } = this;
    let { x, y, width, height } = this;
    ctx.lineWidth = borderWidth;
    ctx.strokeStyle = borderColor;
    borderStyle !== 'solid' && ctx.setLineDash([borderWidth, borderWidth]); // 如果不是 solid 那就是虚线框了
    x -= borderWidth / 2;
    y -= borderWidth / 2;
    width += borderWidth;
    height += borderWidth;
    ctx.strokeRect(x, y, width, height);
  }

  /**
   * 判断手指是否点在组件上
   * @param {Number} x: 手指的X轴坐标
   * @param {Number} y: 手指的Y轴坐标
   * @param {Number} deviation: 点击范围扩充
   * @return {Boolean}: 是否点中
   */
  checkIsOnThisSprite(x, y, deviation = 0) {
    return !!(x >= this.x - deviation
      && y >= this.y - deviation
      && x <= this.x + this.width + deviation
      && y <= this.y + this.height + deviation)
  }

  /**
   * 简单的碰撞检测定义：
   * 另一个精灵的中心点处于本精灵所在的矩形内即为碰撞
   * @param{Sprite} sp: Sptite的实例
   */
  isCollideWith(sp, deviation = 0) {
    if (!this.visible || !sp.visible) return false

    let spX = sp.x + sp.width / 2;
    let spY = sp.y + sp.height / 2;

    return this.checkIsOnThisSprite(spX, spY, deviation);
  }
}