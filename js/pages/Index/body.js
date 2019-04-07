import Scroller from '../../base/scroller';
import Block from '../../base/block';
import Img from '../../base/img';
import Text from '../../base/text';
import { Shape } from '../../base/shape';

import { winH, px, money, watchValueChange, AnimTool, second2str } from '../../libs/utils.js';

const imgSrc = {
  tips: 'images/others/2.png',
  count: 'images/icon/11.png',
  time: 'images/icon/12.png',
  grayBg: 'images/background/1.png',
};
const itemConfig = [
  { icon: 'images/icon/1.png', duration: 1000, active: true, name: '香蕉', activePrice: 5 },
  { icon: 'images/icon/2.png', duration: 2000, active: true, name: '报刊', activePrice: 60 },
  { icon: 'images/icon/3.png', duration: 3000, active: false, name: '洗车', activePrice: 720 },
  { icon: 'images/icon/4.png', duration: 4000, active: false, name: '外卖', activePrice: 8600 },
  { icon: 'images/icon/5.png', duration: 5000, active: false, name: '便利店', activePrice: 1e5 },
  { icon: 'images/icon/6.png', duration: 6000, active: false, name: '水产店', activePrice: 1e6 },
  { icon: 'images/icon/7.png', duration: 7000, active: false, name: '足球俱乐部', activePrice: 1.2e7 },
  { icon: 'images/icon/8.png', duration: 8000, active: false, name: '电影制作', activePrice: 1.5e8 },
  { icon: 'images/icon/9.png', duration: 9000, active: false, name: '银行', activePrice: 2e9 },
  { icon: 'images/icon/10.png', duration: 10000, active: false, name: '商业大亨', activePrice: 2.5e10 },
];

class ListItem extends Block {
  constructor(data, x, y, width, height) {
    super(x, y, width, height);

    const _item = new Block(x, y, width, height);

    // 左侧图片
    const _imgWidth = height - px(20);
    const _imgY = y + (height - _imgWidth) / 2;
    const _img = new Img(data.icon, x, _imgY, _imgWidth, _imgWidth);
    _item.addChild('_img', _img);

    // 右上进度条与当前单价
    const _boxX = x + _imgWidth + px(20);
    const _boxW = width - _imgWidth - px(20);
    // 绘制进度条的形状
    const _progressRender = function (ctx, value) {
      if (value < 0) return;
      if (value > 100) value = 100;
      ctx.moveTo(this.x, this.y);
      const _px = _boxW * value / 100;
      if (_px < px(40)) {  // 低于 40 像素左下角有个切角
        ctx.lineTo(this.x + _px, this.y);
        const __y = this.y + this.height - (px(40) - _px);
        ctx.lineTo(this.x + _px, __y);
      } else if (_px > _boxW - px(20)) { // 大于 width - 20 像素右上角有个切角
        ctx.lineTo(this.x + this.width - px(20), this.y);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.lineTo(this.x + px(40), this.y + this.height);
      } else {  // 其他时刻是直角
        ctx.lineTo(this.x + _px, this.y);
        ctx.lineTo(this.x + _px, this.y + this.height);
        ctx.lineTo(this.x + px(40), this.y + this.height);
      }
      ctx.lineTo(this.x, this.y + this.height - px(40));
      ctx.closePath();
    }
    // 进度条灰色背景
    const _progress = new Shape(_boxX, y, _boxW, px(70));
    _progress.bgColor = '#949994';
    _progress.border = '1px solid #5C2C19';
    _progress.customDrawShape = function(ctx) {
      _progressRender.call(this, ctx, 100);
    }
    _item.addChild('_progress', _progress);
    // 进度条绿色进度
    const _progressValue = new Shape(_boxX + 1, y + 1, _boxW - 2, px(70) - 2);
    _progressValue.bgColor = '#4DFF58';
    _progressValue.value = 0;
    _progressValue.customDrawShape = function (ctx) {
      _progressRender.call(this, ctx, this.value);
    }
    _item.addChild('_progressValue', _progressValue);
    // 进度条翻起的角
    const _progressTip = new Img(imgSrc.tips, _boxX, y + _progress.height - px(40), px(40), px(40));
    _item.addChild('_progressTip', _progressTip);
    // 进度条上的单价
    const _price = new Text(money(0), _boxX + px(50), y + px(15));
    _price.fontSize = px(30);
    _price.maxWidth = px(300);
    _price.textAlign = 'center';
    _item.addChild('_price', _price);

    // 买入数量
    const _box2Y = _progress.height + px(5);
    const _buyCount = new Img(imgSrc.count, _boxX, y + _box2Y, _boxW - px(130), height - _box2Y);
    _item.addChild('_buyCount', _buyCount);
    const _buyCountValue = new Text('10', _boxX + px(35), y + height - px(32));
    _buyCountValue.fontSize = px(20);
    _buyCountValue.color = '#fff';
    _item.addChild('_buyCountValue', _buyCountValue);
    _buyCount.bindClickEvent(() => {
    });
    window.eventbus.on('buyCountChange', ({ key }) => {
      _buyCountValue.text = key;
    });

    // 时间
    const _wasteTime = new Img(imgSrc.time, _boxX + _buyCount.width + px(5), y + _box2Y, px(125), height - _box2Y);
    _item.addChild('_wasteTime', _wasteTime);
    const _timeValue = new Text(second2str(data.duration), _wasteTime.x, _wasteTime.y + px(15));
    _timeValue.fontSize = px(24);
    _timeValue.color = '#fff';
    _timeValue.maxWidth = _wasteTime.width;
    _timeValue.textAlign = 'center';
    _item.addChild('_timeValue', _timeValue);

    this.addChild('_item', _item);
    _item.initChildChange();
    // ------- end 主 Item 的构成完成

    // ------- 未启用 Item 的构成
    const _disableItem = new Block(x, y, width, height);

    // 灰色背景
    const _grayBg = new Img(imgSrc.grayBg, x, y, width, height);
    _disableItem.addChild('_grayBg', _grayBg);
    // 名称
    const _grayLabel = new Text(data.name, x + px(80), y + px(15));
    _grayLabel.fontSize = px(42);
    _grayLabel.maxWidth = width - px(140);
    _grayLabel.textAlign = 'center';
    _disableItem.addChild('_grayLabel', _grayLabel);
    // 开启价格
    const _grayValue = new Text(money(data.activePrice), x + px(80), y + px(75));
    _grayValue.fontSize = px(30);
    _grayValue.color = '#fff';
    _grayValue.maxWidth = width - px(140);
    _grayValue.textAlign = 'center';
    _disableItem.addChild('_grayValue', _grayValue);

    this.addChild('_disableItem', _disableItem);
    _disableItem.initChildChange();
    _disableItem.bindClickEvent(() => {
      this.changeItemState(_item, _disableItem);
    });
    // ------- end 未启用 Item 的构成

    // ---- 动画相关
    const animTool = new AnimTool();
    watchValueChange(_item, 'visible', () => {
      this.startTheProgress(animTool, _progressValue, data.duration);
    });

    // 最终显示与否
    _item.visible = data.active;
    _item.disabled = !data.active;
    _disableItem.visible = !data.active;
    _disableItem.disabled = data.active;
    
    this.initChildChange();
  }
  startTheProgress(animTool, _progressValue, duration) {
    (function progressLoop() {
      animTool.start(0, 100, duration, (now, per) => {
        _progressValue.value = now;
        if (per === 1) {
          progressLoop.call(this);
          this.progressEnded();
        }
      });
    }.bind(this))();
  }
  progressEnded() {
    // console.log('x')
  }
  changeItemState(_item, _disableItem) {
    _item.visible = !_item.visible;
    _item.disabled = !_item.disabled;
    _disableItem.visible = !_disableItem.visible;
    _disableItem.disabled = !_disableItem.disabled;
  }
}

export default class IndexBody extends Scroller {
  constructor() {
    const x = px(40), y = px(250), width = px(560), height = winH - px(250 + 160);
    super(x, y, width, height);

    itemConfig.forEach((item, index) => {
      const __y = y + index * px(190);
      this.addChild('item' + index, new ListItem(item, x, __y, width, px(140)));
    });

    this.initChildChange();
  }
}