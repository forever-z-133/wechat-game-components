# 微信小游戏组件库
集成了 `Text` `Scroller` 等组件，高级称谓应该叫 2D 绘制引擎吧，准备向这个方向努力一下。  

# 组件介绍
### Sprite 组件
最基础的组件，其他组件都是集成于它，包含了基础属性，`draw` 和 `click` 的相关操作。  
入参：`x, y, width, height`   
包含属性：`visible` `disabled` `bgColor` `border`  
外放函数：`customDrawToCanvas` `customDrawToCanvas2` `drawBgColor` `checkIsOnThisSprite` `isCollideWith` `onClick`  

### Group 组件
在 `child` 属性中包含了其他组件的盒子组件，宽高类似 CSS 的 `inline-block` 的处理（包裹子级）。  
子级至只有位置/禁用/隐藏等会随父级位置一起变化，其他 `fontSize` `bgColor` 等并不会向下继承。  
入参：无    
外放函数：`addChild` `removeChild` `emptyChild` `initChildChange`  

### Block 组件
是继承了 `Group` 组件的盒子组件，但宽高类似 CSS 的 `block` 的处理（定宽定高）。    
入参：`x, y, width, height`（注意 x y 的设置时机与 Group 组件是不同的）  
方法与 `Group` 一致。另外 `Block` 带有 CSS 的 `overflow:hidden` 效果。  

### Scroller 组件
是继承了 `Block` 组件的盒子组件，可以滑动了。     
入参：`x, y, width, height`  
属性肯定还会再加，但暂时没打算更新  
外放函数再另加 `scrollTop`   

### Text 组件
专门用来放置文本，如果设了定宽则还会触发显示省略号或换行。  
入参：`text, x, y`  
另加属性：`color` `fontSize` `maxWidth` `textWrap`  

### Img 组件
图片专用咯，没用 `Image` 命名因为它被原生用了。   
入参：`imgSrc, x, y, width, height`   
另加属性：`size` `position` `repeat`  

### Shape 组件
绘制些普通的图形，圆角矩形 `Rect`，圆形 `Circle`, 正多边形 `Isogon`   
`Rect` 入参：`x, y, width, height, radius`   
`Circle` 入参：`x, y, radius`（注：此 x,y 为左上角位置而非圆心位置）   
`Isogon` 入参：`x, y, sides, size, groove`（没想好怎么做）  
其他形状可继承与 `Shape` 组件在 `customDrawShape` 绘制线条，之后会自动加上背景和边框的。  

# 工具函数介绍
| 函数名 | 简介 |
| - | - |
| distence(x1, y1, x2, y2) | 求两点距离 |
| anim(start, to, duration, callback) | 运动动画 |
| px(designWidth) | 传入 750 即为屏宽 |
| getTextWidth(text, fontSize) | 获取文字宽度 |
| watchValueChange(obj, key, callback, defaultValue) | 监听对象某属性变化做出反应 |
| money(val, unit, fixed) | 数字转为 1,234.00 格式的金钱字符串 |
