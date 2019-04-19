import Modal from '../modal';
import Block from '../../base/block';
import Group from '../../base/group';
import Img from '../../base/img';

import UserClothes from './clothes.js';
import UserThings from './things.js';
import UserHistory from './history.js';

import Tabs from '../tabs.js';

import { winW, winH, px, anim } from '../../libs/utils.js';

const imgSrc = {
  bg: 'images/pages-background/1.png',
  title: 'images/pages-title/1.png',
  back: 'images/others/3.png'
}
const tabConfig = [
  { img0: 'images/icon2/6.png', img1: 'images/icon2/1.png' },
  { img0: 'images/icon2/5.png', img1: 'images/icon2/2.png' },
  { img0: 'images/icon2/4.png', img1: 'images/icon2/3.png' }
];
const pageId = 'userPage';

export default class UserPage extends Modal {
  constructor() {
    const x = 0, y = 0, width = winW, height = winH - y;
    super(pageId, imgSrc);
    this.pageId = pageId;

    // 三个 tab 对应的界面
    const _userClothes = new UserClothes(px(30), px(480), winW - px(60), winH - px(480));
    const _userThings = new UserThings(px(30), px(480), winW - px(60), winH - px(480));
    const _userHistory = new UserHistory(px(30), px(480), winW - px(60), winH - px(480));
    this.addChild(_userClothes);
    this.addChild(_userThings);
    this.addChild(_userHistory);

    // 顶部三个选择
    const tabArr = [];
    const _tabBlock = new Group();
    tabConfig.forEach((item, index) => {
      const obj = { item: undefined, activeItem: undefined, target: undefined };
      const _width = px(180);
      const _len = tabConfig.length;
      const _x = (winW - _width * _len - px(50) * (_len - 1)) / 2;
      new Array(2).fill().forEach((x, i) => {
        const __x = _x + (_width + px(50)) * index;
        const __y = index === 1 ? px(260) : px(300);
        const _tab = new Img(item['img' + i], __x, __y, _width, _width);
        _tab.size = 'contain';
        _tabBlock.addChild(_tab);
        obj[i === 0 ? 'activeItem' : 'item'] = _tab;
      });
      obj['target'] = [_userClothes, _userThings, _userHistory][index];
      tabArr.push(obj);
    });
    _tabBlock.initChildChange();
    this.addChild(_tabBlock);

    this.addChild(new Tabs(tabArr))

    this.initChildChange();
  }
}