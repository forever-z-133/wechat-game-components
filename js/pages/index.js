import Block from '../base/block';
import Group from '../base/group';
import Sprite from '../base/sprite';

import { winW, winH, px } from '../libs/utils.js';

// 包裹所有内容，相当于主路由入口
export default class Index extends Group {
  constructor() {
    super(0, 0, winW, winH);

    var block = new Block(10, 10, 50, 50);
    block.bgColor = 'white';
    block.border = '1px solid white';
    var x = new Sprite(20, 20, 50, 50);
    x.bgColor = 'red';
    x.border = '1px solid red';
    block.addChild('x', x);
    block.initChildChange();

    var group = new Group();
    // group.bgColor = 'yellow';
    group.border = '1px solid yellow';
    var y = new Sprite(150, 150, 50, 50);
    y.bgColor = 'blue';
    y.border = '1px solid blue';
    group.addChild('y', y);
    group.initChildChange();

    var z = new Sprite(200, 50, 50, 50);
    z.bgColor = 'pink';
    z.border = '1px solid pink';

    this.addChild('block', block);
    this.addChild('group', group);
    this.addChild('z', z);
    this.initChildChange();

    this.bgColor = 'grey';

    x.bindClickEvent(); // 被裁剪掉的部分也能被点中，无头绪呀
    x.onClick = () => { console.log('x') }
    y.bindClickEvent(() => { console.log('xx') });
    z.bindClickEvent(() => { console.log('xxx') });
  }
}