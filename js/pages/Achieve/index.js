import Modal from '../modal';
import Group from '../../base/group';
import Img from '../../base/img';

import { winW, winH, px, anim } from '../../libs/utils.js';

const imgSrc = {
  bg: 'images/pages-background/2.png',
  title: 'images/pages-title/1.png',
  back: 'images/others/3.png'
}
const tabConfig = [
  { img0: 'images/icon2/6.png', img1: 'images/icon2/1.png' },
  { img0: 'images/icon2/5.png', img1: 'images/icon2/2.png' },
];
const pageId = 'achievePage';

export default class AchievePage extends Modal {
  constructor() {
    super(pageId, imgSrc);

    this.addChild(new Img(imgSrc.title, px(0), px(200), px(200), px(200)));

    // 其他
    this.initChildChange();
  }
}