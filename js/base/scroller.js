import Block from '../base/block'

import { distence, anim, watchValueChange, isTransparent } from '../libs/utils.js';

export default class Scroller extends Block {
  constructor(x, y, width, height) {
    super(x, y, width, height);

    this.bindScrollEvent();
  }

  // 绑定滑动相关事件
  bindScrollEvent() {
    this._childStartPosition = null;
    this._childLastPosition = null;
    canvas.addEventListener('touchstart', this._triggerScroller1);
    canvas.addEventListener('touchmove', this._triggerScroller2);
    canvas.addEventListener('touchend', this._triggerScroller3);
  }
  _triggerScroller1 = (e) => {
    if (this.disabled) return;
    e = e.touches ? e.touches[0] : e;
    const { pageX: left, pageY: top } = e;
    var inner = this.checkIsOnThisSprite(left, top);
    if (!inner) return;
    this._childStartPosition = { left, top, time: +new Date(), e };
    this._childLastPosition = { left, top, time: +new Date(), e };
  }
  _triggerScroller2 = (e) => {
    if (!this._childLastPosition) return;
    e = e.touches ? e.touches[0] : e;
    const { left, top } = this._childLastPosition;
    const dist = distence(left, top, e.pageX, e.pageY);
    if (dist < 5) return;  // 移动小于 5px 不算滑动
    let { y } = this.childSize;
    y += e.pageY - top;
    this.scrollTop(y, 0);
    this._childLastPosition = { left: e.pageX, top: e.pageY, time: +new Date(), e };
  }
  _triggerScroller3 = () => {
    if (!this._childLastPosition) return;
    const { e, time } = this._childLastPosition || {};
    this._childStartPosition = null;
    this._childLastPosition = null;
    this.onScroll && this.onScroll(e);

    const { y: min, height } = this;
    const { y, height: childHeight } = this.childSize;
    const max = min + height - childHeight;

    if (y > min) {
      this.scrollTop(min, 300);
    } else if (y < max) {
      this.scrollTop(max, 300);
    } else {
      // 弹性滑动还没开始搞
    }
  }

  // ---------- 滑动至哪
  scrollTop(top, duration, easing) {
    const { y = 0 } = this.childSize;
    anim(y, top, duration, (now) => {
      const offset = now - this.childSize.y;
      // 子级整块远动
      this.childSize.y += offset;
      // 子级中的每块都运动
      this.child.forEach(item => {
        item.y += offset;
      });
    });
  }
}