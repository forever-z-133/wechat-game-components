import Sprite from '../base/sprite'

import { watchValueChange, guid } from '../libs/utils.js';

export default class Group extends Sprite {
  constructor() {
    super();

    this.id = guid();
    window.hashMap[this.id] = this;
    
    this.child = [];
    // 用来存内部元素的宽高，比如 block scroller 和 img
    this.childSize = { x: 0, y: 0, width: 0, height: 0 };
  }

  //------------ 增删子元素
  addChild(el, description) {
    const _id = guid();
    el.id = _id;
    el.parentId = this.id;
    el.description = description;
    window.hashMap[_id] = el;
    this.child.push(el);
    this.childReSize();
  }
  removeChild(id) {
    this.child = this.child.filter((item) => {
      return id !== item.id;
    });
    delete window.hashMap[id];
    this.childReSize();
  }
  emptyChild() {
    this.child.forEach((item) => {
      delete window.hashMap[item.id];
    })
    this.child.length = 0;
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
    ['disabled'].forEach(key => {
      watchValueChange(this, key, (val) => {
        this.child.forEach(item => item[key] = val);
      });
    });
  }

  customDrawToCanvas(ctx) {
    this.child.forEach(item => item.drawToCanvas(ctx));
  }
}