import Block from '../base/block';
import Img from '../base/img';

import Index from './Index/index';
import UserPage from './User/index';

import { winW, winH, px } from '../libs/utils.js';

const imgSrc = {
  bg: 'images/pages-background/bg.png',
};

// 包裹所有内容，相当于主路由入口
export default class Pages extends Block {
  constructor() {
    super(0, 0, winW, winH);
    this.bgColor = '#fff';

    // 背景图
    const _mainBg = new Img(imgSrc.bg, 0, 0, winW, winH);
    this.addChild(_mainBg);

    // 首页
    this.addChild(new Index());
    // 角色页
    this.addChild(new UserPage());

    this.initChildChange();
  }
}