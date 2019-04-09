import Block from '../../base/block';
import Group from '../../base/group';
import Scroller from '../../base/scroller';
import Text from '../../base/text';
import Img from '../../base/img';
import { Rect } from '../../base/shape';

import { winW, winH, px } from '../../libs/utils.js';

const imgSrc = {
  arrow: 'images/others/4.png'
}

export default class UserThings extends Block {
  constructor(x, y, width, height) {
    super(x, y, width, height);

    // 道具类型
    const _select_type = new Block(x, y + px(20), width / 2 - px(5), px(80));
    const _select_type_bg = new Rect(x + 2, _select_type.y + 2, _select_type.width - 4, _select_type.height - 4, px(5));
    _select_type_bg.bgColor = '#ECF2E1';
    _select_type_bg.border = '2px solid #7D6A4B';
    _select_type.addChild(_select_type_bg);
    const _type_label = new Text('查看: ', x + px(30), y + px(44));
    _type_label.fontSize = px(24);
    _type_label.color = '#A3A89D';
    _select_type.addChild(_type_label);
    const _type_chosen = new Text('全部', x + px(40) + _type_label.width, y + px(38));
    _type_chosen.maxWidth = px(150);
    _type_chosen.fontSize = px(32);
    _select_type.addChild(_type_chosen);
    const _type_arrow = new Img(imgSrc.arrow, x +  _select_type.width - px(65), y + px(45), px(40), px(30))
    _select_type.addChild(_type_arrow);
    this.addChild(_select_type);
    _select_type.bindClickEvent(() => console.log('xxx'));

    // 道具品阶
    const _select_level = new Block(x + width / 2 + px(5), y + px(20), width / 2 - px(5), px(80));
    const _select_level_bg = new Rect(_select_level.x + 2, _select_type.y + 2, _select_type.width - 4, _select_type.height - 4, px(5));
    _select_level_bg.bgColor = '#ECF2E1';
    _select_level_bg.border = '2px solid #7D6A4B';
    _select_level.addChild(_select_level_bg);
    const _level_label = new Text('分类: ', _select_level.x + px(30), y + px(44));
    _level_label.fontSize = px(24);
    _level_label.color = '#A3A89D';
    _select_level.addChild(_level_label);
    const _level_chosen = new Text('稀有度', _select_level.x + px(40) + _level_label.width, y + px(38));
    _level_chosen.maxWidth = px(150);
    _level_chosen.fontSize = px(32);
    _select_level.addChild(_level_chosen);
    const _level_arrow = new Img(imgSrc.arrow, _select_level.x + _select_level.width - px(65), y + px(45), px(40), px(30))
    _select_level.addChild(_level_arrow);
    this.addChild(_select_level);
    _select_level.bindClickEvent(() => console.log('xxx'));

    // 分割线
    const _line = new Rect(x, y + px(120), width, px(5), px(5));
    _line.bgColor = '#5C2C19'
    this.addChild(_line);

    // 道具列表
    const _thingsList = new Scroller(x, y + px(145), width, height - px(145));
    _thingsList.bgColor = 'red';
    this.addChild(_thingsList);

    this.initChildChange();
  }
}