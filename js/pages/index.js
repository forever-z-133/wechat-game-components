import Block from '../base/block';
import Group from '../base/group';
import Sprite from '../base/sprite';

import { winW, winH, px } from '../libs/utils.js';

// 包裹所有内容，相当于主路由入口
export default class Index extends Block {
  constructor() {
    super(10, 10, 40, 30);

    var x = new Sprite(30, 30, 50, 50); x.bgColor = 'red' 
    this.addChild('x', x);

    this.initChildChange();

    this.border = '1px solid green';
  }
}