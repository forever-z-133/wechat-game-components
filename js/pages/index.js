import Block from '../base/block';
import Img from '../base/img';

import Index from './Index/index';
import UserPage from './User/index';
import AchievePage from './Achieve/index';

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
    const _index = new Index();
    _index.id = 'index';
    this.addChild(_index);
    // 角色页
    const _userPage = new UserPage();
    _userPage.id = 'userPage';
    this.addChild(_userPage);
    // 解锁页
    const _achievePage = new AchievePage();
    _achievePage.id = 'achievePage';
    this.addChild(_achievePage);

    this.initChildChange();

    // 监听路由变化，各界面间为独立互不侵犯的事件
    window.eventbus.on('routerChange', (pageId) => {
      window.eventbus.emit('beforeRouterChange');
      this.child.forEach((item) => {
        item.disabled = !(item.id === pageId);
      });
    });
  }
}