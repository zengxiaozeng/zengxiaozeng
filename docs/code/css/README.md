---
prev: ../../code/html/
next: ../../code/javascript/
---

# css规范

## 制作目的
1、为提高团队协作效率，便于后台人员添加功能及前端后期优化维护，输出高质量的文档，也为了更好阅读、修改和提高对CSS的加载速度，CSS的编写应该遵循一定的编写规范。目前网上已经流行一些比较好的规范，大多由网友总结；大公司的CSS规范也值得我们去参考。但由于无法获取到大公司的内部资料，只能参考部分网上一些比较好的资料来制作一套自己的规范。

2、目前我司在编写CSS样式时存在编写混乱、多页面的样式写在同一CSS文件、不方便阅读等几乎毫无原则的现象，产生诸多弊端，罗列如下：

1）多个页面的样式写在同一个CSS文件中：
- 加载一个页面同时把其他页面的、不必要的样式、背景图片都加载进来，严重拖长了加载时间

- 样式过多，命名时容易冲突，甚至会导致被覆盖

- 可复用的样式几乎每次都会重新编写

- 样式过多，不便于阅读

- 不便于交接

2）复用性高的布局、组件样式没有单独集中在一个CSS文件中：
- 导致每次都需要重新编写，延长了项目制作时间

- 每次编写的并不统一，造成一种布局有多套做法，包括对其进行操作的js编写

- 不便于统一进行样式更改

- 不便于交接

3、CSS规范化之后，有诸多好处：

- 提高代码复用性：

- 有效压缩了文件大小

- 节省编写代码时间

- 便于统一修改

- 有效避免命名难的问题

- 便于阅读

<font color=red>*注</font>：规范化之后，更改文件的频率会大大降低，这时就可以对CSS代码进行文件压缩


## 基本规范

### 1、缩进

推荐2个空格。

```css
.element {
    position: absolute;
    top: 10px;
    left: 10px;

    border-radius: 10px;
    width: 50px;
    height: 50px;
}
```

### 2、分号

每个属性声明末尾都要加分号。

```css
.element {
    width: 20px;
    height: 20px;
    background-color: red;
}
```

### 3、空格

以下几种情况不需要空格：

> 属性名后

- 多个规则的分隔符`,`前
- !important `!`后
- 行末不要有多余的空格


以下几种情况需要空格：

> 属性值前

- 选择器`>`, `+`, `~`前后
- `{`前
- !important `!`前
- @else 前后
- 属性值中的`,`后
- 注释`/_`后和`_/`前

```css
/* not good */
.element {
    color :red! important;
    background-color: rgba(0,0,0,.5);
}

/* good */
.element {
    color: red !important;
    background-color: rgba(0, 0, 0, .5);
}

/* not good */
.element ,
.dialog{
    ...
}

/* good */
.element,
.dialog {

}

/* not good */
.element>.dialog{
    ...
}

/* good */
.element > .dialog{
    ...
}

/* not good */
.element{
    ...
}

/* good */
.element {
    ...
}

/* not good */
@if{
    ...
}@else{
    ...
}

/* good */
@if {
    ...
} @else {
    ...
}
```

### 4、空行

以下几种情况需要空行：

- 文件最后保留一个空行
- `}`后最好跟一个空行，包括`预处理语言`中嵌套的规则
- 属性之间需要适当的空行，具体见属性声明顺序

```css
/* not good */
.element {
    ...
}
.dialog {
    color: red;
    &:after {
        ...
    }
}

/* good */
.element {
    ...
}

.dialog {
    color: red;

    &:after {
        ...
    }
}
```

### 5、换行

以下几种情况需要换行：

- `{`后和`}`前

- 每个属性独占一行

- 多个规则的分隔符`,`后

```css
/* not good */
.element
{color: red; background-color: black;}

/* good */
.element {
    color: red;
    background-color: black;
}

/* not good */
.element, .dialog {
    ...
}

/* good */
.element,
.dialog {
    ...
}
```

### 6、注释

- 注释统一用`/__/`（scss中也不要用`//`），具体参照右边的写法；

- 缩进与下一行代码保持一致；

- 可位于一个代码行的末尾，与代码间隔一个空格。

```css
/* Modal header */
.modal-header {
    ...
}

/*
 * Modal header
 */
.modal-header {
    ...
}

.modal-header {
    /* 50px */
    width: 50px;

    color: red; /* color red */
}
```

### 7、引号

- 最外层统一使用双引号；

- url的内容要用引号；

- 属性选择器中的属性值需要引号。

```css
.element:after {
    content: "";
    background-image: url("logo.png");
}

li[data-type="single"] {
    ...
}
```

### 8、颜色

颜色16进制用小写字母；颜色16进制尽量用简写。

```css
/* not good */
.element {
    color: #ABCDEF;
    background-color: #001122;
}

/* good */
.element {
    color: #abcdef;
    background-color: #012;
}
```

### 9、属性简写

属性简写需要你非常清楚属性值的正确顺序，而且在大多数情况下并不需要设置属性简写中包含的所有值，所以建议尽量分开声明会更加清晰；

`margin` 和 `padding` 相反，需要使用简写；

常见的属性简写包括：

- font
- background
- transition
- animation

```css
/* not good */
.element {
    transition: opacity 1s linear 2s;
}

/* good */
.element {
    transition-delay: 2s;
    transition-timing-function: linear;
    transition-duration: 1s;
    transition-property: opacity;
}
```

### 10、媒体查询

尽量将媒体查询的规则靠近与他们相关的规则，不要将他们一起放到一个独立的样式文件中，或者丢在文档的最底部，这样做只会让大家以后更容易忘记他们。

```css
.element {
    ...
}

.element-avatar{
    ...
}

@media (min-width: 480px) {
    .element {
        ...
    }

    .element-avatar {
        ...
    }
}
```

### 11、层级(z-index)必须清晰明确
- 页面弹窗、气泡为最高级（最高级为999），不同弹窗气泡之间可在三位数之间调整；普通区块为10-90内10的倍数；区块展开、弹出为当前父层级上个位增加，禁止层级间盲目攀比。

### 12、单位一定要统一，除了极个别情况需要用到之外，其他时候不能混用

### 13、引入CSS文件应在html页面的顶部引入
- 能加快页面内容显示；并能避免页面产生白屏，和网速过慢时避免让用户看到没有经过样式修饰的html代码。

### 14、CSS布局不能用js
- 便于阅读和交接，不依赖于js，降低制作及修改该布局时所要求的技术基础，有效避免使用js对其进行操作时产生不必要的冲突。

### 15、常用控件所需要用到图片都应该成套设计
- 成套的控件的图片应同时设计好，不应该在使用的时候再临时设计，以免出现控件之间不搭配的情况。而成套的控件图片都应经过CSS Sprite处理过之后再使用，以减少图片的加载，也可以在上传图片的时候减少操作。另外，这些控件的CSS样式、js代码都应该写在单独的文件中，方便统一管理和进行统一更换样式，使用的时候直接调用这些文件即可。

## 其他杂项规范

- 不允许有空的规则；

- 元素选择器用小写字母；

- 去掉小数点前面的0；

- 去掉数字中不必要的小数点和末尾的0；

- 属性值`0`后面不要加单位；

- 同个属性不同前缀的写法需要在垂直方向保持对齐，具体参照右边的写法；

- 无前缀的标准属性应该写在有前缀的属性后面；

- 不要在同个规则里出现重复的属性，如果重复的属性是连续的则没关系；

- 不要在一个文件里出现两个相同的规则；

- 用 border: 0; 代替 border: none;；

- 选择器不要超过4层（在scss中如果超过4层应该考虑用嵌套的方式来写）；

- 发布的代码中不要有 @import；

- 尽量少用`*`选择器。

```css
/* not good */
.element {
}

/* not good */
LI {
    ...
}

/* good */
li {
    ...
}

/* not good */
.element {
    color: rgba(0, 0, 0, 0.5);
}

/* good */
.element {
    color: rgba(0, 0, 0, .5);
}

/* not good */
.element {
    width: 50.0px;
}

/* good */
.element {
    width: 50px;
}

/* not good */
.element {
    width: 0px;
}

/* good */
.element {
    width: 0;
}

/* not good */
.element {
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;

    background: linear-gradient(top, #fff 0, #eee 100%);
    background: -webkit-linear-gradient(top, #fff 0, #eee 100%);
    background: -moz-linear-gradient(top, #fff 0, #eee 100%);
}

/* good */
.element {
    -webkit-border-radius: 3px;
       -moz-border-radius: 3px;
            border-radius: 3px;

    background: -webkit-linear-gradient(top, #fff 0, #eee 100%);
    background:    -moz-linear-gradient(top, #fff 0, #eee 100%);
    background:         linear-gradient(bottom, #fff 0, #eee 100%);
}

/* not good */
.element {
    color: rgb(0, 0, 0);
    width: 50px;
    color: rgba(0, 0, 0, .5);
}

/* good */
.element {
    color: rgb(0, 0, 0);
    color: rgba(0, 0, 0, .5);
}
```
