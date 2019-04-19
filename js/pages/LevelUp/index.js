import Modal from '../modal';
import Group from '../../base/group';
import Img from '../../base/img';

import Tabs from '../tabs.js';

import LevelUpAngel from './angel.js';
import LevelUpCash from './cash.js';
import LevelUpShop from './shop.js';

import { winW, winH, px, anim } from '../../libs/utils.js';

const imgSrc = {
  bg: 'images/pages-background/2.png',
  title: 'images/pages-title/3.png',
  back: 'images/others/3.png'
}
const tabConfig = [
  { img0: 'images/levelup/1.png', img1: 'images/levelup/2.png' },
  { img0: 'images/levelup/3.png', img1: 'images/levelup/4.png' },
  { img0: 'images/levelup/5.png', img1: 'images/levelup/6.png' },
];
const pageId = 'levelUpPage';

function flexRowDivide(maxWidth, itemWidth, itemNumber, gapWidth) {
  const _x = (maxWidth - itemWidth * itemNumber - gapWidth * (itemNumber - 1)) / 2;
  return new Array(itemNumber).fill().map((x, i) => _x + (itemWidth + gapWidth) * i);
}

export default class LevelUpPage extends Modal {
  constructor() {
    super(pageId, imgSrc);
    this.pageId = pageId;

    // 现金面板
    const _levelUpCash = new LevelUpCash(px(30), px(480), winW - px(60), winH - px(480));
    this.addChild(_levelUpCash);
    // 天使商店面板
    const _levelUpAngel = new LevelUpAngel(px(30), px(480), winW - px(60), winH - px(480));
    this.addChild(_levelUpAngel);
    // 商店面板
    const _levelUpShop = new LevelUpShop(px(30), px(480), winW - px(60), winH - px(480));
    this.addChild(_levelUpShop);

    // tabs
    const tabArr = [];
    const _tabBlock = new Group();
    const __x = flexRowDivide(winW, px(180), tabConfig.length, px(30));
    tabConfig.forEach((item, index) => {
      const obj = { item: undefined, activeItem: undefined, target: undefined };
      new Array(2).fill().forEach((x, i) => {
        const _tab = new Img(item['img' + i], __x[index], px(270), px(180), px(180));
        _tab.size = 'contain';
        _tabBlock.addChild(_tab);
        obj[i === 0 ? 'activeItem' : 'item'] = _tab;
      });
      obj.target = [_levelUpCash, _levelUpAngel, _levelUpShop][index];
      tabArr.push(obj);
    });
    _tabBlock.initChildChange();
    this.addChild(_tabBlock);

    this.addChild(new Tabs(tabArr));

    // 其他
    this.initChildChange();
  }
}