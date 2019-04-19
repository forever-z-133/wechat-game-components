import Modal from '../modal';
import Group from '../../base/group';
import Img from '../../base/img';

import Tabs from '../tabs.js';

import AchieveLock from './lock.js';
import AchieveMent from './ment.js';

import { winW, winH, px, anim } from '../../libs/utils.js';

const imgSrc = {
  bg: 'images/pages-background/3.png',
  title: 'images/pages-title/2.png',
  back: 'images/others/3.png'
}
const tabConfig = [
  { img0: 'images/achieve/1.png', img1: 'images/achieve/2.png' },
  { img0: 'images/achieve/3.png', img1: 'images/achieve/4.png' },
];
const pageId = 'achievePage';

export default class AchievePage extends Modal {
  constructor() {
    const x = 0, y = 0, width = winW, height = winH - y;
    super(pageId, imgSrc);
    this.pageId = pageId;

    // 解锁面板
    const _achieveLock = new AchieveLock(px(30), px(480), winW - px(60), winH - px(480));
    this.addChild(_achieveLock);
    // 成就面板
    const _achievement = new AchieveMent(px(30), px(480), winW - px(60), winH - px(480));
    this.addChild(_achievement);

    // tabs
    const tabArr = [];
    const _tabBlock = new Group();
    tabConfig.forEach((item, index) => {
      const obj = { item: undefined, activeItem: undefined, target: undefined };
      const _width = px(180);
      const _len = tabConfig.length;
      const _x = (winW - _width * _len - px(50) * (_len - 1)) / 2;
      new Array(2).fill().forEach((x, i) => {
        const __x = _x + (_width + px(50)) * index;
        const _tab = new Img(item['img' + i], __x, px(270), _width, _width);
        _tab.size = 'contain';
        _tabBlock.addChild(_tab);
        obj[i === 0 ? 'activeItem' : 'item'] = _tab;
      });
      obj['target'] = [_achieveLock, _achieveLock][index];
      tabArr.push(obj);
    });
    _tabBlock.initChildChange();
    this.addChild(_tabBlock);

    this.addChild(new Tabs(tabArr));

    this.initChildChange();
  }
}