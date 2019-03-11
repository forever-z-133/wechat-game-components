import './js/libs/weapp-adapter'
import './js/libs/symbol'

import Main from './js/main'

// --- 测试专用方法
// 由于 draw 会触发很多次，因此加上 length 来只取几次结果查看
window.test = function (length, ...args) {
  if (!this.xxx || this.xxx < length) {
    console.log(...args);
    this.xxx = ++this.xxx || 1;
  }
}
// 获取组件名称，如 Block，至于父子关系，暂不知道如何弄
window.getName = function(that) {
  return that.constructor.toString().split(/[ \()]/)[1];
}

new Main()
