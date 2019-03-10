import Sprite from '../base/sprite'

import { watchValueChange, isTransparent } from '../libs/utils.js';

let KeyMap = {};

export default class Group extends Sprite {
  constructor() {
    super();

    this.child = [];
    // 用来存内部元素的宽高，比如 block scroller 和 img
    this.childSize = { x: 0, y: 0, width: 0, height: 0};
  }

  //------------ 增删子元素
  addChild(key, el) {
    if (key in KeyMap) {
      this.removeChild(key);
    }
    this.child.push(el);
    KeyMap[key] = el;
    this.childReSize();
  }
  removeChild(key) {
    this.child = this.child.filter((item) => {
      return KeyMap[key] !== item;
    });
    delete KeyMap[key];
    this.childReSize();
  }
  emptyChild() {
    this.child = [];
    KeyMap = {};
    this.childReSize();
  }

  // 重新计算内部元素位置宽高
  childReSize() {
    if (this.child.length < 1) return;

    const first = this.child[0] || {};
    const { x, y, width, height } = first;
    let minx = x, miny = y, maxr = minx + width, maxb = miny + height;
    this.child.slice(1).forEach((item) => {
      if (item.x < minx) minx = item.x;
      if (item.y < miny) miny = item.y;
      if (item.x + item.width > maxr) maxr = item.x + item.width;
      if (item.y + item.height > maxb) maxb = item.y + item.height;
    });
    this.childSize = { x: minx, y: miny, width: maxr - minx, height: maxb - miny };
    this.afterChildReSize();
  }
  afterChildReSize() {
    this.x = this.childSize.x;
    this.y = this.childSize.y;
    this.width = this.childSize.width;
    this.height = this.childSize.height;
  }

  // 如果监听是放在开头，会造成 addChild 时就进行赋值，
  // 则触发了监听又多位移了一段，因此只能放在 addChild 之后了
  initChildChange() {
    ['x', 'y'].forEach(key => {
      watchValueChange(this, key, (val, old) => {
        const offset = val - old;
        this.child.forEach(item => item[key] += offset);
      }, 0);
    });
    ['disabled', 'visible'].forEach(key => {
      watchValueChange(this, key, (val) => {
        this.child.forEach(item => item[key] = val);
      });
    });
  }

  // 至于 Block 是否应该 overflow:hidden 有待商榷
  // 不采用 ctx.clip() 是因为该方法极其卡顿
  customDrawToCanvas(ctx) {
    const { x, y, width, height, bgColor } = this;
    ctx.globalCompositeOperation = 'source-atop';
    this.child.forEach(item => item.drawToCanvas(ctx));
    ctx.globalCompositeOperation = 'source-over';
  }
}