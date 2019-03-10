import EventBus from './libs/eventbus'

import { setGlobalCtx } from './libs/utils.js';

let ctx   = canvas.getContext('2d')
let eventbus = new EventBus()

setGlobalCtx(ctx);

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    this.Timer = 0;
    this.restart()
  }

  restart() {
    // 清除上一局的动画
    window.cancelAnimationFrame(this.Timer);
    this.Timer = window.requestAnimationFrame(this.loop.bind(this), canvas)
  }

  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  // 游戏逻辑更新主函数
  update() {
  }

  // 实现游戏帧循环
  loop() {
    this.update();
    this.render();
    this.Timer = window.requestAnimationFrame(this.loop.bind(this), canvas);
  }
}
