import Modal from '../modal';
import Block from '../../base/block';
import Group from '../../base/group';
import Img from '../../base/img';

import UserClothes from './clothes.js';
import UserThings from './things.js';
import UserHistory from './history.js';

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

    // 三个 tab 对应的界面
    const _userClothes = new UserClothes(px(30), px(480), winW - px(60), winH - px(480));
    const _userThings = new UserThings(px(30), px(480), winW - px(60), winH - px(480));
    const _userHistory = new UserHistory(px(30), px(480), winW - px(60), winH - px(480));
    this.addChild(_userClothes);
    this.addChild(_userThings);
    this.addChild(_userHistory);

    // 顶部三个选择
    const _tabBlock = new Group();
    const _tempArr = []
    this.tabList = [];
    tabConfig.forEach((item, index) => {
      const obj = { item: null, activeItem: null, target: null, active: false };
      obj['target'] = [_userClothes, _userThings, _userHistory][index];
      new Array(2).fill().forEach((x, i) => {
        const __width = px(180);
        const __x = px(50) + (winW - px(100) - __width) / 2 * index;
        const __y = index === 1 ? px(260) : px(300);
        const _tab = new Img(item['img' + i], __x, __y, __width, __width);
        _tab.size = 'contain';
        _tab.position = 'center';
        _tabBlock.addChild(_tab);
        obj[i === 0 ? 'activeItem' : 'item'] = _tab;
        _tab.bindClickEvent(() => { this.activeTab(index) });
      });
      this.tabList.push(obj);
    });
    _tabBlock.initChildChange();
    this.addChild(_tabBlock);

    // 其他
    this.initChildChange();

    window.eventbus.on(pageId + 'Open', () => {
      this.activeTab(0);
    });
  }
  activeTab(newIndex) {
    this.tabList.forEach((obj, index) => {
      if (index === newIndex) {
        obj.item.visible = true;
        obj.activeItem.visible = false;
        obj.target.visible = true;
        obj.item.disabled = false;
        obj.activeItem.disabled = true;
        obj.target.disabled = false;
      } else {
        obj.item.visible = false;
        obj.activeItem.visible = true;
        obj.target.visible = false;
        obj.item.disabled = true;
        obj.activeItem.disabled = false;
        obj.target.disabled = true;
      }
    });
  }
}