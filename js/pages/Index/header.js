import Block from '../../base/block';
import Group from '../../base/group';
import Img from '../../base/img';
import Text from '../../base/text';

import { px, money } from '../../libs/utils.js';

const imgSrc = {
  head: 'images/index-header/1.png',
  gold: 'images/index-header/2.png',
  cash: 'images/index-header/3.png',
};
const countConfig = [
  { key: '10', imgSrc: 'images/index-header/4.png' },
  { key: '100', imgSrc: 'images/index-header/5.png' },
  { key: 'max', imgSrc: 'images/index-header/6.png' }
];

export default class IndexHeader extends Block {
  constructor() {
    super(0, 0, px(750), px(200));
    this.bgColor = 'rgba(0, 0, 0, .7)';

    // 头像
    const _headImage = new Img(imgSrc.head, px(40), px(25), px(150), px(150));
    this.addChild('_headImage', _headImage);
    _headImage.bindClickEvent(() => console.log('xxx'));

    // 总计
    const _unit = new Text('$', px(210), px(40));
    _unit.fontSize = px(46);
    _unit.color = '#fff';
    this.addChild('_unit', _unit);
    const _total = new Text(money(1e10), px(240), px(40));
    _total.fontSize = px(46);
    _total.color = '#fff';
    _total.maxWidth = px(280);
    this.addChild('_total', _total);

    // 买入数量
    let activeCount = 0;
    const _countGroup = new Group();
    countConfig.forEach((item, index) => {
      const _count = new Img(item.imgSrc, px(750 - 40 - 100), px(90), px(100), px(100));
      _count.size = 'contain';
      _count.position = 'center';
      _count.visible = false;
      _countGroup.addChild('_count' + index, _count);
    });
    _countGroup.initChildChange();
    this.addChild('_countGroup', _countGroup);
    _countGroup.child[activeCount].visible = true;
    _countGroup.bindClickEvent(() => {
      const newIndex = ++activeCount % countConfig.length;
      _countGroup.child.forEach((item, index) => {
        if (index === newIndex) item.visible = true;
        else item.visible = false;
      });
      activeCount = newIndex;
    });

    // 金币
    const _goldIcon = new Img(imgSrc.gold, px(210), px(200 - 25 - 50), px(50), px(50));
    _goldIcon.size = 'contain';
    _goldIcon.position = 'center';
    this.addChild('_goldIcon', _goldIcon);
    const _goldValue = new Text('000000', px(270), px(200 - 25 - 50 + 5));
    _goldValue.fontSize = px(26);
    _goldValue.color = '#fff';
    _goldValue.maxWidth = px(90);
    this.addChild('_goldValue', _goldValue);
    _goldValue.bindClickEvent(() => console.log('xxx'));

    // 鈔票
    const _cashIcon = new Img(imgSrc.cash, px(390), px(200 - 25 - 50), px(50), px(50));
    _cashIcon.size = 'contain';
    _cashIcon.position = 'center';
    this.addChild('_cashIcon', _cashIcon);
    const _cashValue = new Text('00000', px(450), px(200 - 25 - 50 + 5));
    _cashValue.fontSize = px(26);
    _cashValue.color = '#fff';
    _cashValue.maxWidth = px(90);
    this.addChild('_cashValue', _cashValue);
    _cashValue.bindClickEvent(() => { console.log('xxxx') });

    // 其他
    this.initChildChange();
  }
}