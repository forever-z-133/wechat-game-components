import Block from '../base/block';

import Index from './Index/index';

import { winW, winH, px } from '../libs/utils.js';

// 包裹所有内容，相当于主路由入口
export default class Pages extends Block {
  constructor() {
    super(0, 0, winW, winH);

    this.addChild('index', new Index());

    this.initChildChange();

    this.bgColor = '#fff';
  }
}