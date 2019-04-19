import Block from '../../base/block';
import Group from '../../base/group';
import Text from '../../base/text';
import { Rect } from '../../base/shape';

import { winW, winH, px, money } from '../../libs/utils.js';

const itemConfig = [
  { name: '现金储备', value: 999 },
  { name: '历史收益', value: 999 },
  { name: '天使历史收益', value: 999 },
  { name: '历史解锁', value: 999 },
];

export default class UserHistory extends Block {
  constructor(x, y, width, height) {
    super(x, y, width, height);

    // 分割线
    const _line = new Rect(x, y + px(40), width, px(5), px(5));
    _line.bgColor = '#5C2C19'
    this.addChild(_line);

    // 四个框框
    itemConfig.forEach(({ name, value }, index) => {
      const _box = new Group();
      const __y = y + px(85) + px(170) * index;
      const _rect = new Rect(x + 2, __y + 2, width - 4, px(150) - 4, px(10));
      _rect.bgColor = '#ECF2E1';
      _rect.border = '2px solid #7D6A4B';
      _box.addChild(_rect);
      const _name = new Text(name, x + px(20), __y + px(25));
      _name.maxWidth = width - px(40);
      _name.textAlign = 'center';
      _name.fontSize = px(40);
      _name.color = '#718749';
      _box.addChild(_name);
      const _value = new Text(money(value), x + px(20), __y + px(80));
      _value.maxWidth = width - px(40);
      _value.textAlign = 'center';
      _value.fontSize = px(34);
      _box.addChild(_value);
      this.addChild(_box);
    });

    this.initChildChange();
  }
}