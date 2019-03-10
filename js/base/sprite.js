/**
 * 游戏基础的精灵类
 */

import { boxGrowUp } from '../libs/utils.js';

export default class Sprite {
  constructor(x = 0, y = 0, width = 0, height = 0) {

    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;

    this.bgColor = 'rgba(255, 255, 255, 0)';
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
    const { padding = [], bgColor } = this;
    const { x, y, width, height } = boxGrowUp(this, ...padding);
    ctx.fillStyle = bgColor;
    ctx.fillRect(x, y, width, height);
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