import Scroller from '../../base/scroller';
import Block from '../../base/block';
import Img from '../../base/img';
import Text from '../../base/text';

import { winH, px, money, watchValueChange } from '../../libs/utils.js';

const itemConfig = [
  { name: 'banana', cnName: '香蕉', icon: 'images/icon/1.png' },
  { name: 'newspaper', cnName: '报纸', icon: 'images/icon/2.png' },
];

class ListItem extends Block {
  constructor(data, x, y, width, height) {
    super(x, y, width, height);
    this.bgColor = '#fff';

    // 左侧图片
    const _imgWidth = height - px(20);
    const _imgY = y + (height - _imgWidth) / 2;
    const _img = new Img(data.icon, x, _imgY, _imgWidth, _imgWidth);
    this.addChild('_img', _img);

    // 右上进度条与当前单价
    
    this.initChildChange();
  }
}

export default class IndexBody extends Scroller {
  constructor() {
    const x = px(40), y = px(250), width = px(560), height = winH - px(250 + 160);
    super(x, y, width, height);
    this.bgColor = 'rgba(255, 0, 0, .7)';

    this.addChild('item1', new ListItem(itemConfig[0], x, y, width, px(150)));
    this.addChild('item2', new ListItem(itemConfig[1], x, y + px(190), width, px(150)));

    this.initChildChange();
  }
}