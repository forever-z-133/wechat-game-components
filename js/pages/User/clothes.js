import Block from '../../base/block';
import { Rect } from '../../base/shape';

import { winW, winH, px } from '../../libs/utils.js';

// 包裹所有内容，相当于主路由入口
export default class UserHistory extends Block {
  constructor(x, y, width, height) {
    super(x, y, width, height);

    // 分割线
    const _line = new Rect(x, y, width, px(2));
    this.addChild('_line', _line);

    this.initChildChange();
  }
}