import Block from '../base/block';
import Group from '../base/group';
import Sprite from '../base/sprite';
import Scroller from '../base/scroller';
import Text from '../base/text';
import Img from '../base/img';
import { Shape, Rect, Circle } from '../base/shape';

const imgSrc ='images/bg.png';

import { winW, winH, px } from '../libs/utils.js';

// 包裹所有内容，相当于主路由入口
export default class Index extends Block {
  constructor() {
    super(0, 0, winW, winH);

    var block = new Block(10, 10, 50, 50);
    block.bgColor = 'white';
    block.boxSizing = 'padding-box';
    block.border = '1px solid white';
    var x = new Sprite(20, 20, 50, 50);
    x.bgColor = 'red';
    x.border = '1px solid red';
    block.addChild('x', x);
    block.initChildChange();

    var group = new Group();
    group.bgColor = 'yellow';
    group.border = '1px solid yellow';
    var y = new Sprite(150, 150, 50, 50);
    y.bgColor = 'blue';
    y.border = '1px solid blue';
    var b = new Sprite(170, 170, 50, 50);
    b.bgColor = 'orange';
    b.border = '1px solid orange';
    group.addChild('y', y);
    group.addChild('b', b);
    group.initChildChange();
    group.y -= 20;

    var z = new Sprite(200, 50, 50, 50);
    z.bgColor = 'pink';
    z.border = '1px solid pink';

    var scroller = new Scroller(10, 220, 350, 500);
    scroller.bgColor = 'lightBlue';
    var a = new Sprite(50, 220, 50, 700);
    a.bgColor = 'green';
    a.boxSizing = 'padding-box';
    a.border = '5px solid black';
    var rect = new Rect(105, 250, 100, 50, 10);
    rect.bgColor = 'red';
    rect.border = '5px solid #fff';
    var circle = new Circle(105, 300, 50);
    circle.bgColor = '#000';
    scroller.addChild('a', a);
    scroller.addChild('rect', rect);
    scroller.addChild('circle', circle);
    scroller.initChildChange();

    var w1 = new Text('0.00', 100, 10);
    w1.color = 'gold';
    w1.border = '1px solid gold';

    var w2 = new Text('01234567890123456789', 100, w1.y + w1.height + 10);
    w2.maxWidth = 50;
    w2.color = 'lightblue';
    w2.border = '1px solid lightblue';

    var w3 = new Text('01234567890123456789', 100, w2.y + w2.height + 10);
    w3.maxWidth = 85;
    w3.textWrap = true;
    w3.color = 'lightblue';
    w3.border = '1px solid lightblue';

    var img = new Img(imgSrc, 270, 50, 100, 100);
    img.size = '50% 90%';
    img.position = 'center';
    img.border = '1px solid #fff';

    this.addChild('block', block);
    this.addChild('group', group);
    this.addChild('z', z);
    this.addChild('scroller', scroller);
    this.addChild('w1', w1);
    this.addChild('w2', w2);
    this.addChild('w3', w3);
    this.addChild('img', img);
    this.initChildChange();

    this.bgColor = 'grey';

    x.bindClickEvent(); // 被裁剪掉的部分也能被点中，无头绪呀
    x.onClick = () => { console.log('x') }
    y.bindClickEvent(() => { console.log('xx') });
    z.bindClickEvent(() => { console.log('xxx') });

    this.w1 = w1;
    this.rect = rect;
  }

  beforeDraw() {
    const { text } = this.w1;
    this.w1.text = Number(text) + 1;

    // const { radius } = this.rect;
    // this.rect.radius = (radius + 1) % 50;
  }
}