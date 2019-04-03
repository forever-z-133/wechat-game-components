import Block from '../../base/block';
import Img from '../../base/img';

import { winW, winH, px } from '../../libs/utils.js';

const imgSrc = {
  bg: 'images/background/bg.png',
};

export default class Index extends Block {
  constructor() {
    super(0, 0, winW, winH);

    const _mainBg = new Img(imgSrc.bg, 0, 0, winW, winH, 522, 933);
    this.addChild('mainBg', _mainBg);

    this.initChildChange();
  }
}