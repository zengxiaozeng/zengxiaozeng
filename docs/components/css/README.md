## SCSS

前端开发，预处理语言多种多样，最主流的无非就是`Sass`，`Less`，`Stylus`，日常项目开发中不限种类，但有一点必须要注意的是有且只能选择一种作为主处理语言。

本篇文章主要主要记录`Scss`在日常开发中的一些心得

### 格式化

新开一个项目时，必须要全局格式化一遍，目前有个主流格式化库`normalize.css`几乎能涵盖各种情况

```javascript
npm install normalize.css --save
yarn add normalize.css

// 在主入口main.js引入
import 'normalize.css/normalize.css'
```

### 全局变量

说到全局变量就要谈到代码的和规划问题，就简单的拿一个后台管理系统来说，要做好一个项目开发前的准备，我们势必要定义好全局的`css`变量，一方面可以避免面条式的代码，一方面作为全局管理变量，修改起来十分的方便和高效

```
// vue.config.js
css: {
  loaderOptions: {
    sass: {
      data: '@import "src/styles/mixin.scss"; @import "src/styles/variables.scss";' // 全局引入
    }
  }
}
```

如以上代码，variables.scss即为全局变量的文件，在这里你可以自定义全局皮肤操作，字体颜色，大小，按钮的固定宽高等等等等。即
```
// Base color
$blue:#1890ff;
$light-blue:#3A71A8;
$red:#C03639;
$pink: #E65D6E;
$green: #30B08F;
$tiffany: #4AB7BD;
$yellow:#FEC171;
$panGreen: #30B08F;
$inputBoldColor: rgba(0,0,0,0.85);
$inputNormalColor: rgba(0,0,0,0.65);

// sidebar
$menuText:#bfcbd9;
$menuActiveText:#409EFF;
$subMenuActiveText:#f4f4f5; //https://github.com/ElemeFE/element/issues/12951

$menuBg:rgba(44, 54, 68, 1);
$menuHover:rgba(44, 54, 68, 1);

$subMenuBg:rgba(44, 54, 68, 1);
$subMenuHover:rgba(44, 54, 68, 1);

$sideBarWidth: 200px;

:export {
  menuText: $menuText;
  menuActiveText: $menuActiveText;
  subMenuActiveText: $subMenuActiveText;
  menuBg: $menuBg;
  menuHover: $menuHover;
  subMenuBg: $subMenuBg;
  subMenuHover: $subMenuHover;
  sideBarWidth: $sideBarWidth;
}

```


### 宏定义@mixin

- 本质上就是函数实现样式复用

有了全局样式变量往往还不够，预处理的样式往往是多元化的，全局变量是死的，`mixins`可以让样式更加的灵活起来，一个项目中，重复的样式和风格数不胜数，如果不找一个很好的方法处理它，就会造成到处的面条式代码，这样页面冗杂不说，维护也不利于维护，对后期接手的人员来说，也是一种痛苦。以下罗列一下比较通用的一些场景的`mixins`代码片段

### 清除浮动
<details>
  <summary>查看代码</summary>

  ```javascript
  @mixin clearfix {
    &:after {
      content: "";
      display: table;
      clear: both;
    }
  }
  ```
</details>


### 弹框公共样式
<details>
  <summary>查看代码</summary>

  ```javascript
  /*弹框公共样式*/
  @mixin commonDialog {
    /deep/ .el-dialog__wrapper {
      background: rgba(0,0,0,0.3);
      .el-dialog {
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 28px 0px rgba(0,0,0,0.3);
        border-radius:8px;
        .el-dialog__header {
          padding: 0 20px;
          background:rgba(249,249,249,1);
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          .el-dialog__title {
            font-weight:500;
            color:$inputBoldColor;
            font-size: 16px;
            line-height: 54px;
          }
          .el-dialog__close {
            color: #FF7733;
            &:hover {
              transition: transform .4s;
              transform: rotate(90deg);
            }
          }
        }
        .el-dialog__body {
          padding: 40px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .el-dialog__footer {
          padding: 0 20px 59px 20px;
          text-align: center;
        }
      }
    }
  }
  ```
</details>


### 公共字体样式设置
<details>
  <summary>查看代码</summary>

  ```javascript
  /*字体公共样式设置*/
  @mixin commonFontSet($sizes, $weight, $colors, $lineHeight) {
    font-size: $sizes;
    font-weight: $weight;
    color: $colors;
    line-height: $lineHeight;
  }
  ```
</details>


### 超过省略号
<details>
  <summary>查看代码</summary>

  ```javascript
  /*超过省略号*/
  @mixin commonTextOverflow($lines) {
    display: -webkit-box;/** 对象作为伸缩盒子模型显示 **/
    word-break: break-all;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;/** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: $lines;/** 显示的行数 **/
    overflow: hidden;
  }
  ```
</details>


### 公共hover动效①
<details>
  <summary>查看代码</summary>

  ```javascript
  /*公共hover动效*/
  @mixin commonHoverLine($colors) {
    display: inline-block;
    position: relative;
    padding-bottom: 1px;
    cursor: pointer;
    line-height: 22px;

    &:before {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      bottom: 0;
      height: 1px;
      width: 100%;
      transition: width 0s ease;
    }

    &:after {
      content: '';
      display: block;
      position: absolute;
      right: 0;
      bottom: 0;
      height: 1px;
      width: 100%;
      background: $colors;
      transition: width 0.5s ease;
    }

    &:hover:before {
      width: 0%;
      background: $colors;
      transition: width 0.5s ease;
    }

    &:hover:after {
      width: 0%;
      background: transparent;
      transition: all 0s ease;
    }
  }
  ```
</details>


### 公共hover动效②
<details>
  <summary>查看代码</summary>

  ```javascript
  @mixin sliding-middle-out($colors, $heights, $paddingBottom) {
    display: inline-block;
    position: relative;
    padding-bottom: $paddingBottom;
    
    &:after {
      content: '';
      display: block;
      margin: auto;
      height: $heights;
      width: 0px;
      background: transparent;
      transition: width .5s ease, background-color .5s ease;
    }
    
    &:hover:after {
      width: 100%;
      background: $colors;
    }
    
    &:after {
      content: '';
      display: block;
      margin: auto;
      height: $heights;
      width: 0px;
      background: transparent;
      transition: width .5s ease, background-color .5s ease;
    }
    
    &:hover:after {
      width: 100%;
      background: $colors;
    }
  }
  ```
</details>


### 卡券风格
<details>
  <summary>查看代码</summary>

  ```javascript
  // 卡券风格
  @mixin commonCoupon {
    width: 200px;
    height: 80px;
    background: radial-gradient(circle at right bottom, transparent 10px, #ffffff 0) top right / 50% 40px no-repeat,
      radial-gradient(circle at left bottom, transparent 10px, #ffffff 0) top left / 50% 40px no-repeat,
      radial-gradient(circle at right top, transparent 10px, #ffffff 0) bottom right / 50% 40px no-repeat,
      radial-gradient(circle at left top, transparent 10px, #ffffff 0) bottom left / 50% 40px no-repeat;
    filter: drop-shadow(3px 3px 3px #c5c5c5);
  }
  ```
</details>


### 卡券风格
<details>
  <summary>查看代码</summary>

  ```javascript
  @mixin commonTriangle {
    width: 0;
    height: 0;
    border-style: solid;
    box-sizing: border-box;
    border-width: 0 10px 10px;
    border-color: transparent transparent #c5c5c5 transparent;
  }
  ```
</details>


### 隐藏滚动条或更改滚动条样式
<details>
  <summary>查看代码</summary>

  ```javascript
  @mixin commonScrollBar {
    /*css主要部分的样式*//*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
    ::-webkit-scrollbar {
        width: 10px; /*对垂直流动条有效*/
        height: 10px; /*对水平流动条有效*/
    }

    /*定义滚动条的轨道颜色、内阴影及圆角*/
    ::-webkit-scrollbar-track{
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: rosybrown;
        border-radius: 3px;
    }

    /*定义滑块颜色、内阴影及圆角*/
    ::-webkit-scrollbar-thumb{ 
        border-radius: 7px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: #E8E8E8;
    }

    /*定义两端按钮的样式*/
    ::-webkit-scrollbar-button {
        background-color:cyan;
    }

    /*定义右下角汇合处的样式*/
    ::-webkit-scrollbar-corner {
        background:khaki;
    }
  }
  ```
</details>

`......未完待续。`

有了上面这些`mixins`，可以在开发的过程中为我们省下大量的`css`布局时间，怎么引用呢
同样在`vue.config.css`中`webpack`配置好后，在页面中直接引用即可

```javascript
// Eg:
<style lang="scss" scoped>
// 没有传变量的函数直接调用即可
.home {
  @mixin commonTriangle()
}

// 有变量的按顺序传好对应的变量值，变量值不需要加单引号
.home-font {
  @include commonFontSet(14px, 500, rgba(0,0,0,0.4), 32px);
}
</style>
```


### 设置input的placeholder的字体样式
<details>
  <summary>查看代码</summary>

  ```javascript
  @mixin commonInputPlaceholder {
    input::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        color: red;
    }
    input::-moz-placeholder { /* Firefox 19+ */  
        color: red;
    }
    input:-ms-input-placeholder { /* IE 10+ */
        color: red;
    }
    input:-moz-placeholder { /* Firefox 18- */
        color: red;
    }
  }
  ```
</details>


### 自动换行
<details>
  <summary>查看代码</summary>

  ```javascript
  @mixin commonAutoLines {
    word-wrap: break-word;
    word-break：break-all;
  }
  ```
</details>


### @for
除了常用的`属性嵌套`、`运算`、`@extend扩展`、`@mixin混入`等之外，还有个很好用的`@for`

例：
```javascript
.wes { /* 多出部分用省略号表示 , 用于一行 */
  overflow:hidden;
  word-wrap:normal;
  white-space:nowrap;
  text-overflow:ellipsis;
}
.wes-2 { /* 适用于webkit内核和移动端 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
} 
.wes-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.wes-4 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
}
```

现在只需要

```javascript
@for $i from 1 through 4{
	.wes-#{$i} {
		overflow: hidden;
		@if($i==1){
			word-wrap:normal;
			white-space:nowrap;
			text-overflow:ellipsis;
		}
		@else{
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: $i;
		}
	}
}
```

有了`@for`，当遇到ul>li下多个图片背景或者很相近的样式下，就不用挨个寻找根节点去赋值各个背景图片，非常的实用

### 对象操作

- `(key:value)`

```javascript
// bad
h1 { font-size: 14px; }
h2 { font-size: 16px; }
h3 { font-size: 20px; }

// good
@each $header, $size in (h1: 14px, h2: 16px, h3: 20px) {  
  #{$header} {font-size: $size;}
}
```


### iOS手机容器滚动条滑动不流畅
<details>
  <summary>查看代码</summary>

```css
overflow: auto;
-webkit-overflow-scrolling: touch;
```
</details>


### 文字模糊效果
<details>
  <summary>查看代码</summary>

```css
color: transparent;
text-shadow: #111 0 0 5px;
```
</details>


### 毛玻璃效果
<details>
  <summary>查看代码</summary>

```css
.blur {
  display: block;
  width: 300px;
  height: 300px;
  margin: 100px auto;
  filter: blur(10px);
}

<img src="./img/test.png" class="blur" alt="">
```
</details>
