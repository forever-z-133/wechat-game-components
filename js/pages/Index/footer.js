import Block from '../../base/block';
import Img from '../../base/img';
import { Rect } from '../../base/shape';

import { winW, winH, px } from '../../libs/utils.js';

const imgSrc = {
  menu: 'images/index-other/4.png',
  tv: 'images/index-other/5.png',
};

export default class IndexBody extends Block {
  constructor() {
    const x = 0, y = winH - px(180), width = px(750), height = px(180);
    super(x, y, width, height);

    // 背景
    const _bg = new Rect(x, y + px(40), width, height - px(40));
    _bg.bgColor = '#4C3229';
    this.addChild('_bg', _bg);

    // 商店按鈕
    const _btnMenu = new Img(imgSrc.menu, px(20), y + px(70), px(220), px(80));
    _btnMenu.size = 'contain';
    _btnMenu.position = 'center';
    this.addChild('_btnMenu', _btnMenu);
    _btnMenu.bindClickEvent(() => console.log('xxx'));

    // 电视
    const _btnActivity = new Img(imgSrc.tv, winW - px(250 + 30), y, px(250), px(160));
    this.addChild('_btnActivity', _btnActivity);
    _btnActivity.bindClickEvent(() => console.log('xxx'));

    this.initChildChange();
  }
}