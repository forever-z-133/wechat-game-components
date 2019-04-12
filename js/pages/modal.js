import Block from '../base/block';
import Group from '../base/group';
import Img from '../base/img';

import { winW, winH, px, anim } from '../libs/utils.js';

const imgSrc = {
  bg: 'images/pages-background/2.png',
  title: 'images/pages-title/1.png',
  back: 'images/others/3.png'
}

export default class AchievePage extends Block {
  constructor(pageId, imgSrc) {
    const pageName = pageId.slice(0, 1).toUpperCase() + pageId.slice(1);
    const x = 0, y = 0, width = winW, height = winH - y;
    super(x, y, width, height);
    this.bgColor = 'rgba(255, 255, 255, .5)';

    this.pageId = pageId;
    this.pageName = pageName;

    // 背景图
    const _wrapY = px(160);
    const _mainBg = new Img(imgSrc.bg, x, _wrapY, width, height - _wrapY);
    this.addChild(_mainBg);
    // 标题
    const _mainTitle = new Img(imgSrc.title, px(30), px(80), width - px(60), px(160));
    this.addChild(_mainTitle);
    // 返回按钮
    const _btnBack = new Img(imgSrc.back, px(95), px(140), px(60), px(60));
    this.addChild(_btnBack);
    _btnBack.bindClickEvent(() => this.close());

    // 其他
    this.initChildChange();

    this.visible = false;

    window.eventbus.on('show' + pageName, () => this.open());
  }
  open() {
    const { pageId, pageName } = this;
    this.visible = true;
    this.y = winH;
    window.eventbus.emit('routerChange', pageId);
    window.eventbus.emit(pageId + 'Open', this);
    anim(winH, 0, 200, (now, per) => {
      this.y = now;
      window.eventbus.emit(pageId + 'Opening', this, now);
      if (per === 1) {
        window.eventbus.emit(pageId + 'Opened', this);
      }
    });
  }
  close() {
    const { pageId, pageName } = this;
    this.y = 0;
    window.eventbus.emit(pageId + 'Close', this);
    anim(0, winH, 200, (now, per) => {
      this.y = now;
      window.eventbus.emit(pageId + 'Closing', this, now);
      if (per === 1) {
        this.visible = false;
        window.eventbus.emit(pageId + 'Closed', this);
        window.eventbus.emit('routerChange', 'index');
      }
    });
  }
}