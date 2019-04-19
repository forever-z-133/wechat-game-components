import Block from '../base/block';
import Group from '../base/group';
import Img from '../base/img';

import { winW, winH, px } from '../libs/utils.js';

export default class Tabs extends Group {
  constructor(config) {
    super();
    this.config = config;

    this.currentIndex = -1;
    this.currentTab = undefined;

    this.activeItem(0);

    config.forEach((tab, index) => {
      tab.item.bindClickEvent(() => {
        this.activeItem(index);
      });
      tab.activeItem.bindClickEvent(() => {
        this.activeItem(index);
      });
    });
  }
  activeItem(currentIndex) {
    if (currentIndex === this.currentIndex) return;

    this.currentIndex = currentIndex;
    this.currentTab = this.config[currentIndex];

    this.config.forEach((tab = {}, index) => {
      const { item = {}, activeItem = {}, target = {} } = tab;
      if (currentIndex === index) {
        item.visible = true;
        activeItem.visible = false;
        target.visible = true;
      } else {
        item.visible = false;
        activeItem.visible = true;
        target.visible = false;
      }
    });
  }
}