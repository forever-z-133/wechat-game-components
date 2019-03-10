import Group from '../base/group'

import { watchValueChange, px } from '../libs/utils.js';


export default class Block extends Group {
  constructor(x, y, width, height) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  // 屏蔽原 child 变化后本身宽高也变化的操作
  afterChildReSize() { }

  // 至于 Block 是否应该 overflow:hidden 有待商榷
  // 不采用 ctx.clip() 是因为该方法极其卡顿
  customDrawToCanvas(ctx) {
    const { x, y, width, height, bgColor } = this;
    const _canvas = wx.createCanvas();
    _canvas.width = width;
    _canvas.height = height;
    const _tempCtx = _canvas.getContext('2d');
    _tempCtx.translate(-x, -y);
    this.child.forEach(item => { item.drawToCanvas(_tempCtx) });
    ctx.drawImage(_canvas, x, y, width, height);
  }
}