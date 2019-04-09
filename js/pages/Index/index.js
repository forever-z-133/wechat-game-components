import Block from '../../base/block';

import Header from './header.js';
import MainBody from './body.js';
import Footer from './footer.js';
import Aside from './aside.js';

import { winW, winH, px } from '../../libs/utils.js';

export default class Index extends Block {
  constructor() {
    super(0, 0, winW, winH);

    // 头部
    this.addChild(new Header());
    // 主要列表
    this.addChild(new MainBody());
    // 侧栏
    this.addChild(new Aside());
    // 底部
    this.addChild(new Footer());

    this.initChildChange();
  }
}