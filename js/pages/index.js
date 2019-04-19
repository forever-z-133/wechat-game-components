import Block from '../base/block';
import Img from '../base/img';

import Index from './Index/index';
import UserPage from './User/index';
import AchievePage from './Achieve/index';
import LevelUpPage from './LevelUp/index';
import PartnerPage from './Partner/index';
import ShopPage from './Shop/index';
import SharePage from './Share/index';

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
    _index.pageId = 'index';
    this.addChild(_index);
    // 商店页
    this.addChild(new ShopPage());
    // 角色页
    this.addChild(new UserPage());
    // 分享页
    this.addChild(new SharePage());
    // 解锁页
    this.addChild(new AchievePage());
    // 升级页
    this.addChild(new LevelUpPage());
    // 经纪人页
    this.addChild(new PartnerPage());

    this.initChildChange();

    // window.eventbus.emit('showAchievePage');

    // 监听路由变化，各界面间为独立互不侵犯的事件
    window.eventbus.on('routerChange', (pageId) => {
      window.eventbus.emit('beforeRouterChange');
      this.child.forEach((item) => {
        item.disabled = !(item.pageId === pageId);
      });
    });
  }
}