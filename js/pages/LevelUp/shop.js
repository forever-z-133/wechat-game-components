import Block from '../../base/block';
import Group from '../../base/group';
import Text from '../../base/text';
import { Rect } from '../../base/shape';

import { winW, winH, px, money } from '../../libs/utils.js';

export default class LevelUpShop extends Block {
  constructor(x, y, width, height) {
    super(x, y, width, height);

    // 分割线
    const _line = new Rect(x, y, width, px(5), px(5));
    _line.bgColor = '#5C2C19';
    this.addChild(_line);

    this.initChildChange();
  }
}