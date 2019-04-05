import Sprite from './sprite.js';

import { watchValueChange, canvasClip } from '../libs/utils.js';

export default class Img extends Sprite {
  constructor(imgSrc = '', x, y, width, height, imgWidth = 0, imgHeight = 0) {
    super(x, y, width, height);

    this.imgSrc = imgSrc;
    this.imgWidth = imgWidth;
    this.imgHeight = imgHeight;
    this.childSize = { x, y, width: imgWidth, height: imgHeight };
    this.size = 'full';  // 切记 size 的赋值需在 position 之前
    this.position = 'top left';
    this.repeat = 'no-repeat';
    this.resize();

    // 绑定数值联动
    watchValueChange(this, 'imgSrc', val => {
      const img = new Image();
      img.src = imgSrc;
      img.onload = () => {
        this.imgWidth = img.width;
        this.imgHeight = img.height;
        this.img = img;
        this.resize();
      }
      img.onerror = (err) => {
        console.log(err);
        this.resize();
      }
      this.img = img;
    });
    ['width', 'height', 'size', 'position'].forEach(key => {
      watchValueChange(this, key, (val) => {
        this.resize();
      });
    });
    ['x', 'y'].forEach(key => {
      watchValueChange(this, key, (val) => {
        this.resize();
      }, 0);
    });

    this.imgSrc = imgSrc;
  }

  customDrawToCanvas(ctx) {
    const { img, x, y, width, height } = this;
    const { x: newImgX, y: newImgY, width: newImgWidth, height: newImgHeight } = this.childSize;
    if (!img) return;

    // 要绘制的图片若超出了容器，则采用裁剪
    if (x > newImgX || y > newImgY || width < newImgWidth || height < newImgHeight) {
      return canvasClip(ctx, x, y, width, height, (_tempCtx) => {
        _tempCtx.drawImage(img, newImgX, newImgY, newImgWidth, newImgHeight);
      });
    }

    ctx.drawImage(img, newImgX, newImgY, newImgWidth, newImgHeight);
  }

  resize() {
    const { width, height } = this.getImgRealSize();
    this.childSize = { ...this.childSize, width, height };
    const { newImgX: x, newImgY: y } = this.getImgPosition();
    this.childSize = { ...this.childSize, x, y };
  }

  /**
   * 计算图片实际宽高，比如 full cover contian 或者 50 50px 10%
   */
  getImgRealSize() {
    const { width, height, imgWidth, imgHeight, size } = this;
    let newImgWidth = 0, newImgHeight = 0;

    const ratio = height !== 0 ? width / height : 1;
    const imgRatio = imgHeight !== 0 ? imgWidth / imgHeight : 1;
    if (size === 'full') {
      newImgWidth = width;
      newImgHeight = height;
    } else if (size === 'contain') { // 让图片短边与容器贴合，长边超出
      if (ratio > imgRatio) {
        newImgHeight = height;
        newImgWidth = newImgHeight * imgRatio;
      } else {
        newImgWidth = width;
        newImgHeight = newImgWidth / imgRatio;
      }
    } else if (size === 'cover') { // 让图片长边与容器贴合，短边留白
      if (ratio < imgRatio) {
        newImgHeight = height;
        newImgWidth = newImgHeight * imgRatio;
      } else {
        newImgWidth = width;
        newImgHeight = newImgWidth / imgRatio;
      }
    } else {  // 让图片保存定值或百分比
      const temp = size.split(' ');
      if (temp.length === 1) temp.concat(temp);
      if (temp.length === 0) temp.splice(0, 1, 0, 0);

      temp.forEach((item, index) => {
        let value = 0;
        if (/\d+%/.test(item)) { value = width * parseFloat(item) / 100; }
        else { value = parseFloat(item); }  // 包括 px 哟
        index === 0 ? (newImgWidth = value) : (newImgHeight = value);
      });
    }

    return { width: newImgWidth, height: newImgHeight };
  }

  /**
   * 计算图片实际位置，比如 left center top right 或者 50 10% 等
   */
  getImgPosition() {
    const { x, y, width, height, position } = this;
    const { width: newImgWidth, height: newImgHeight } = this.childSize;
    let newImgX = 0, newImgY = 0;
    
    const temp = position.split(' ');
    if (temp.length === 0) return { newImgX: 0, newImgY: 0 };
    if (temp.length === 1) temp.push('center');  // 只传入一个时，另一个默认为 center
    if ((temp[0] === 'top' || temp[0] === 'bottom')) temp.reverse();  // 把 top bottom 放到后面去
    if ((temp[1] === 'left' || temp[1] === 'right')) temp.reverse();  // 如果 left right 在后面则调到前面
    
    temp.forEach((item, index) => {
      var value = 0;
      if (item === 'top') value = y;
      else if (item === 'bottom') value = y + height - newImgHeight;
      else if (item === 'left') value = x;
      else if (item === 'right') value = x + width - newImgWidth;
      else if (item === 'center' && index === 0) value = x + width / 2 - newImgWidth / 2;
      else if (item === 'center' && index === 1) value = y + height / 2 - newImgHeight / 2;
      else if (/\d+%/.test(item)) { value = (index === 0 ? x : y) + width * parseFloat(item) / 100; }
      else { value = (index === 0 ? x : y) + parseFloat(item); }  // 包括 px 哟
      index === 0 ? (newImgX = value) : (newImgY = value);
    });

    return { newImgX, newImgY };
  }

  /**
   * 绘制更多重复图片
   */
  // drawMoreRepeat(ctx) {
  //   const { img, x, y, width, height, repeat } = this;
  //   const { newImgX, newImgY, newImgWidth, newImgHeight } = this;

  //   if (!newImgWidth || !newImgHeight) return;

  //   const repeatX = repeat === 'reepeat-x' || repeat == 'repeat';
  //   const repeatY = repeat === 'reepeat-y' || repeat == 'repeat';

  //   if (newImgWidth < width && repeatX) {
  //     const leftCount = (newImgX - x) / newImgWidth >> 0;
  //     if (leftCount > 0) {
  //       for (let i=0; i<=leftCount+1; i++) {
  //         ctx.drawImage(img, (newImgX-(newImgWidth*i)), newImgY, newImgWidth, newImgHeight)
  //       }
  //     }
  //   }

  //   if (newImgHeight < height && repeatY) {

  //   }
  // }
}
