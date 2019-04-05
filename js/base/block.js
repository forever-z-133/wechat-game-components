import Group from '../base/group'

import { canvasClip } from '../libs/utils.js';


export default class Block extends Group {
  constructor(x, y, width, height) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  // 屏蔽原 child 变化后本身宽高也变化的操作
  afterChildReSize() { }

  customDrawToCanvas(ctx) {
    const { x, y, width, height } = this;
    const { x: childX, y: childY, width: childWidth, height: childHeight } = this.childSize;

    // 要绘制的子级若超出了容器，则采用裁剪
    if (x > childX || y > childY || width < childWidth || height < childHeight) {
      return canvasClip(ctx, x, y, width, height, (_tempCtx) => {
        this.child.forEach(item => { item && item.drawToCanvas(_tempCtx) });
      });
    }

    this.child.forEach(item => { item && item.drawToCanvas(ctx) });
  }
}