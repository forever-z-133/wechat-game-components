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
  afterChildReSize() {}
}