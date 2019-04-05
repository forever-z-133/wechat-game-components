import Block from '../../base/block';
import Img from '../../base/img';

import Header from './header.js';

import { winW, winH, px } from '../../libs/utils.js';

const imgSrc = {
  bg: 'images/background/bg.png',
};

export default class Index extends Block {
  constructor() {
    super(0, 0, winW, winH);

    // 背景图
    const _mainBg = new Img(imgSrc.bg, 0, 0, winW, winH);
    this.addChild('_mainBg', _mainBg);

    // 头部
    this.addChild('_head', new Header());

    this.initChildChange();
  }
}