/**
 * 游戏基础的精灵类
 */

import { watchValueChange, border2json, boxGrowUp, distence } from '../libs/utils.js';

export default class Sprite {
  constructor(x = 0, y = 0, width = 0, height = 0) {

    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;

    this.bgColor = 'rgba(255, 255, 255, 0)';
    this.boxSizing = 'content-box';
    this.borderWidth = 0;
    this.borderStyle = 'solid';
    this.borderColor = 'rgba(255, 255, 255, 0)';
    this.visible = true;
    this.disabled = false;

    ['border', 'boxSizing'].forEach(key => {
      watchValueChange(this, key, (val) => {
        const { width, style, color } = border2json(val);
        this.borderWidth = width;
        this.borderStyle = style;
        this.borderColor = color;
      });
    });
  }

  /**
   * 将精灵图绘制在canvas上
   */
  customDrawToCanvas(ctx) { }
  beforeDraw(ctx) { }
  afterDraw(ctx) { }
  drawToCanvas(ctx) {
    if (!this.visible) return;

    // 绘制背景色边框
    this.drawBgColor(ctx);
    this.drawBorder(ctx);

    // 非公共组件的前置回调
    this.beforeDraw(ctx);

    // 公共组件的回调
    this.customDrawToCanvas(ctx);

    // 非公共组件的后置回调
    this.afterDraw(ctx);
  }
  // 绘制背景色，可被屏蔽掉
  drawBgColor(ctx) {
    const { x, y, width, height, bgColor } = this;
    ctx.fillStyle = bgColor;
    ctx.fillRect(x, y, width, height);
  }
  // 绘制边框，boxSizing 与 CSS 的 box-sizing 类似，但不会挤压原宽高
  drawBorder(ctx) {
    const { borderWidth, borderStyle, borderColor, boxSizing } = this;
    ctx.lineWidth = borderWidth;
    ctx.strokeStyle = borderColor;
    borderStyle !== 'solid' && ctx.setLineDash([borderWidth, borderWidth]); // 如果不是 solid 那就是虚线框了
    const boxSizingConfig = { 'content-box': borderWidth/2, 'padding-box': -borderWidth/2 };
    let { x, y, width, height } = boxGrowUp(this, boxSizingConfig[boxSizing]);
    ctx.strokeRect(x, y, width, height);
  }

  // 元素的点击事件，由于没有原生 click 因此只能用 touch 事件模拟了
  // 最终没有选择所有组件都绑上 onClick，以后再商榷吧
  bindClickEvent(fn) {
    this.onClick = fn;
    this._lastTouchPosition = null;
    canvas.addEventListener('touchstart', this._triggerClick1);
    canvas.addEventListener('touchmove', this._triggerClick2);
    canvas.addEventListener('touchend', this._triggerClick3);
  }
  _triggerClick1 = (e) => {
    if (this.disabled) return;
    e = e.touches ? e.touches[0] : e;
    const { pageX: left, pageY: top } = e;
    var inner = this.checkIsOnThisSprite(left, top);
    if (!inner) return;
    this._lastTouchPosition = { left, top, time: +new Date(), e };
  }
  _triggerClick2 = (e) => {
    if (!this._lastTouchPosition) return;
    e = e.touches ? e.touches[0] : e;
    const { left, top, time } = this._lastTouchPosition;
    const dist = distence(left, top, e.pageX, e.pageY);
    if (dist > 5) this._lastTouchPosition = null;  // 移动位置超过 5px 也不算点击
  }
  _triggerClick3 = () => {
    if (!this._lastTouchPosition) return;
    const { e, time } = this._lastTouchPosition || {};
    this._lastTouchPosition = null;
    if ((+new Date()) - time > 300) return; // 超过 300s 也不算点击
    this.onClick && this.onClick(e);
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