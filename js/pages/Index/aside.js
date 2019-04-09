import Block from '../../base/block';
import Img from '../../base/img';

import { winH, px } from '../../libs/utils.js';

const imgSrc = {
  share: 'images/index-other/6.png',
  cup: 'images/index-other/7.png',
  money: 'images/index-other/8.png',
  bag: 'images/index-other/9.png',
};

export default class IndexSide extends Block {
  constructor() {
    const x = px(620), y = px(260), width = px(100), height = winH - px(250 + 160 + 20);
    super(x, y, width, height);
    
    // 分享按钮
    const _btnShare = new Img(imgSrc.share, x, y, width, width);
    this.addChild(_btnShare);
    _btnShare.bindClickEvent(() => console.log('xxx'));

    // 解锁按钮
    const _btnOpenCup = new Img(imgSrc.cup, x, y + px(120), width, width);
    this.addChild(_btnOpenCup);
    _btnOpenCup.bindClickEvent(() => console.log('xxx'));

    // 升级按钮
    const _btnLevelUp = new Img(imgSrc.money, x, y + px(240), width, width);
    this.addChild(_btnLevelUp);
    _btnLevelUp.bindClickEvent(() => console.log('xxx'));

    // 经纪人按钮
    const _btnPatener = new Img(imgSrc.bag, x, y + px(360), width, width);
    this.addChild(_btnPatener);
    _btnPatener.bindClickEvent(() => console.log('xxx'));

    this.initChildChange();
  }
}