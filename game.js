import './js/libs/weapp-adapter'
import './js/libs/symbol'

import Main from './js/main'

window.test = function (length, ...args) {
  if (!this.xxx || this.xxx < length) {
    console.log(...args);
    this.xxx = ++this.xxx || 1;
  }
}

new Main()
