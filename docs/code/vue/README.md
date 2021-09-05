# [Vue代码规范](https://cn.vuejs.org/v2/style-guide/)


## 项目命名

采用小写+破折号`-`方式

Eg: `my-project-name`

## 目录及文件命名（视图页面）

采用小写+破折号`-`方式

```js
// 正例
└── pages
    ├── home
    ├──────index.vue
    ├── error-page
    ├──────401.vue
    ├──────404.vue
```

## 组件及文件命名（components）

组件的文件夹名称采用首字母大写的驼峰命名规则，文件夹下面的目录也一样，如下

```js
// 正例
└── components
    ├── PageHeader
    ├──────index.vue
    ├── PageArticle
    ├──────CommonArticle.vue
    └── PageHeader
```
对于通用的按钮、下拉框或表格这样的基础组件应该始终以一个特定的前缀开头，区别与其他业务组件。

```js
// 反例
└── components
    ├── PageHeader
    ├── PageArticle
    ├── CommonButton
    ├── CommonSelect
    └── CommonTable

// 正例
└── components
|   ├── PageHeader
|   ├── PageArticle
└────── Common
└────────── CommonButton
└────────── CommonSelect
└────────── CommonTable
└────── ModuleA
└────── ModuleB
```
## Prop、State

始终以`驼峰格式（camelCase）`命名

`Prop`的定义应该尽量详细的指定其类型、默认值和验证。

```js
// 反例
props: ['propA', 'propB']

// 正例
props: {
    propA: {
        type: String,
        required: true
    },
    propB: {
        type: Object,
        // 数组|对象的默认值应该由一个工厂函数返回
        default: function () {
            return {
                msg: 'hello world!!!'
            }
        }
    }
    ...
}
```
## v-for

应该带上`key`值使更新`DOM`时渲染效率更高

```js
// 反例
<ul>
    <li v-for="item in list">
        {{ item.title }}
    </li>
</ul>

// 正例
<ul>
    <li v-for="item in list" :key="item.id">
        {{ item.title }}
    </li>
</ul>
```

`v-for` 应该避免与 `v-if` 在同一个元素（例如：`<li>`）上使用，因为 `v-for` 的优先级比 `v-if` 更高，为了避免无效计算和渲染，应该尽量将 `v-if` 放到容器的父元素之上。

```js
// 反例
<ul>
    <li v-for="item in list" :key="item.id" v-if="showList">
        {{ item.title }}
    </li>
</ul>

// 正例
<ul v-if="showList">
    <li v-for="item in list" :key="item.id">
        {{ item.title }}
    </li>
</ul>
```
v-if / v-else-if / v-else

若同一组 `v-if` 逻辑控制中的元素逻辑相同，`Vue` 为了更高效的元素切换，会复用相同的部分，例如：`value`。为了避免复用带来的不合理效果，应该在同种元素上加上 `key` 做标识

```js
// 反例
<div v-if="dataArray">
    ...
</div>
<div v-else>
    <p>暂无记录</p>
</div>

// 正例
<div v-if="dataArray" key="dataArray-id">
    ...
</div>
<div v-else key="no-data">
    <p>无数据</p>
</div>
```


## 注释规范

曾经加入过一个项目组，项目负责人崇尚极客风格，就是在严格遵守开发、命名规范的同时，不写任何注释。爽是爽，但是一旦你撤了后期接手的人就懵逼了，大大的提高了维护的成本。所以，代码注释，不得不做，但不能滥做。

代码注释在一个项目的后期维护中显的尤为重要，所以我们要为每一个被复用的组件编写组件使用说明，为组件中每一个方法编写方法说明

- 公共组件使用说明

- 各组件中重要函数或者类说明

- 复杂的业务逻辑处理说明

- 复杂的`state`和`prop`变量命名注释

- 特殊情况的代码处理说明,对于代码中特殊用途的变量、存在临界值、函数中使用的 `hack`、使用了某种算法或思路等需要进行注释描述

- 多重 `if` 判断语句

- 注释块`/**（至少两个星号）开头 **/`(注释前后各留一个空格)
- 单行注释使用`//`

单独一行，不要在代码后的同一行内加注释

```js
// 反例
var userName = '张三' // 姓名    

// 正例
// 姓名
var userName = '张三'
```

- 文件头署名及信息


```js
<!--
 * @Description: 组件描述
 * @Author: you name
 * @Date: 2019-11-1 01:01:01
 * @LastEditors:  you name
 * @LastEditTime: 2019-11-11 11:11:11
 -->
```
- 公共组件维护者需要在文件头部加上注释说明，最好价格demo引用

```js
/**
*文件用途说明
*作者姓名、联系方式（旺旺）
*制作日期
**/
```

- 大的模块注释方法

```js
//================
// 代码用途
//================
```


## `method`命名规范

- 驼峰式命名，统一使用动词或者动词+名词形式(语义化)
- 获取服务端接口数据，以 `data` 结尾


函数方法常用的动词

```js
get 获取/set 设置,
add 增加/remove 删除
create 创建/destory 移除
start 启动/stop 停止
open 打开/close 关闭,
read 读取/write 写入
load 载入/save 保存,
create 创建/destroy 销毁
begin 开始/end 结束,
backup 备份/restore 恢复
import 导入/export 导出,
split 分割/merge 合并
inject 注入/extract 提取,
attach 附着/detach 脱离
bind 绑定/separate 分离,
view 查看/browse 浏览
edit 编辑/modify 修改,
select 选取/mark 标记
copy 复制/paste 粘贴,
undo 撤销/redo 重做
insert 插入/delete 移除,
add 加入/append 添加
clean 清理/clear 清除,
index 索引/sort 排序
find 查找/search 搜索,
increase 增加/decrease 减少
play 播放/pause 暂停,
launch 启动/run 运行
compile 编译/execute 执行,
debug 调试/trace 跟踪
observe 观察/listen 监听,
build 构建/publish 发布
input 输入/output 输出,
encode 编码/decode 解码
encrypt 加密/decrypt 解密,
compress 压缩/decompress 解压缩
pack 打包/unpack 解包,
parse 解析/emit 生成
connect 连接/disconnect 断开,
send 发送/receive 接收
download 下载/upload 上传,
refresh 刷新/synchronize 同步
update 更新/revert 复原,
lock 锁定/unlock 解锁
check out 签出/check in 签入,
submit 提交/commit 交付
push 推/pull 拉,
expand 展开/collapse 折叠
begin 起始/end 结束,
start 开始/finish 完成
enter 进入/exit 退出,
abort 放弃/quit 离开
obsolete 废弃/depreciate 废旧,
collect 收集/aggregate 聚集
```

## Vue属性书写顺序

Vue组件的书写顺序，模板多用语义化标签

```js
<template>
	<div class="home-container">
		<header></header>
		<main></main>
		<footer></footer>
		<article></article>
	</div>
</template>
<script>
export default {
  name,
  mixins,
  filters,
  components,
  props,
  data,
  computed,
  watch,
  created,
  mounted,
  destroyed,
  methods
}
</script>
<style lang="less" scoped>
//加scoped防止命名污染
//样式覆盖第三方框架，可以用/deep/覆盖
.home-container {
	> header {
		/deep/ button {
			...
		}
	}
	> main {}
	> footer {}
}
</style>
```

## 组件有多个特性的书写规范
多行撰写，严禁全部挤在一行，父组件传输的变量名称子组件prop驼峰命名接收，父组件传递得换成对应的'-'破折号链接

```js
// 正例
<swiper
	:indicator-dots="indicatorDots"
	:interval="interval"
	:indicator-color="indicatorColor"
	:indicator-active-color="indicatorActiveColor">
</swiper>
```
元素特性的顺序

```js
  - class
  - id,ref
  - name
  - data-*
  - src, for, type, href,value,max-length,max,min,pattern
  - title, alt，placeholder
  - aria-*, role
  - required,readonly,disabled
  - is
  - v-for
  - key
  - v-if
  - v-else-if
  - v-else
  - v-show
  - v-cloak
  - v-pre
  - v-once
  - v-model
  - v-bind,:
  - v-on,@
  - v-html
  - v-text
```

## 编码风格

- 定义变量使用 `let` ，定义常量使用 `const`
- 静态字符串一律使用单引号或反引号，动态字符串使用反引号``
- 解构赋值

函数的参数如果是对象的成员，优先使用解构赋值

```js
// 对象解构赋值
// 反例
function getFullName(user) {
	const firstName = user.firstName
	const lastName = user.lastName
}

// 正例
function getFullName(obj) {
	const { firstName, lastName } = obj
}

// 正例
function getFullName({ firstName, lastName }) {}
```

- 扩展运算符`...`
- 模块
如果模块只有一个输出值，就使用 `export default`，如果模块有多个输出值，就使用`解构`

```js
// 反例
import * as myObject from './importModule'

// 正例
import myObject from './importModule'

```
如果模块默认输出一个函数，函数名的首字母应该小写

```js
function clickFunction() {
}

export default clickFunction
```

如果模块默认输出一个对象，对象名的首字母应该大写

```js
const Obj = {
	...
}

export default Obj

```

## 其它

- 公共样式尽量都放在`static`文件目录下

```js
└── static
	├── style
        ├── normal.css
        ├── iconFont.css
    ├── imgs
    	  ├── home
    	  	   ├── logo.png
    	  	   ├── ...
	  	  ├── login
    	  	   ├── login_bg.png
    	  	   ├── ...
    
```
- 图片资源先压缩[Tinypng](https://tinypng.com/)一遍再放到项目中来，并同时应用大三房图片懒加载
- 使用[iconFont](https://www.iconfont.cn)字体，解决纯色小图标
- 非纯色图标尽量用雪碧图
- 路由引用使用懒加载引入，并注明`webpackChunkName`

```
const Home = () => import ( /* webpackChunkName: "home" */ '@/pages/home/index')

let routes = [{
  path: '/',
  name: 'home',
  component: Home
}]
```
- 不要滥用webFont字体，视情况最多引一个字体类型就好
- 状态存储尽量按大模块分类定义，禁忌把所有vuex全部归类到一个文件中
- 统一格式化插件
- 编辑器里敲 `Tab` 应该设置等于 `2个空格`
- 添加Eslint配置

eslint配置项

```js
module.exports = {
	root: true, //此项是用来告诉eslint找当前配置文件不能往父级查找
	parser: 'babel-eslint', //解析器，这里我们使用babel-eslint
	parserOptions: {
		sourceType: 'module' //类型为module，因为代码使用了使用了ECMAScript模块
	},
	env: {
		browser: true, //预定义的全局变量，这里是浏览器环境
	},
	// required to lint *.vue files
	plugins: [
		'html' //插件，此插件用于识别文件中的js代码，没有MIME类型标识没有script标签也可以识别到，因此拿来识别.vue文件中的js代码
	],
	// add your custom rules here
	'rules': {
		//这里写自定义规则
		"comma-dangle": ["error", "never"], //是否允许对象中出现结尾逗号
		"no-cond-assign": 2, //条件语句的条件中不允许出现赋值运算符
		// "no-console": 2, //不允许出现console语句
		"no-constant-condition": 2, //条件语句的条件中不允许出现恒定不变的量
		"no-control-regex": 2, //正则表达式中不允许出现控制字符
		"no-debugger": 2, //不允许出现debugger语句
		"no-dupe-args": 2, //函数定义的时候不允许出现重复的参数
		"no-dupe-keys": 2, //对象中不允许出现重复的键
		"no-duplicate-case": 2, //switch语句中不允许出现重复的case标签
		"no-empty": 2, //不允许出现空的代码块
		"no-empty-character-class": 2, //正则表达式中不允许出现空的字符组
		"no-ex-assign": 2, //在try catch语句中不允许重新分配异常变量
		"no-extra-boolean-cast": 2, //不允许出现不必要的布尔值转换
		"no-extra-parens": 0, //不允许出现不必要的圆括号
		"no-extra-semi": 2, //不允许出现不必要的分号
		"no-func-assign": 2, //不允许重新分配函数声明
		"no-inner-declarations": ["error", "functions"], //不允许在嵌套代码块里声明函数
		"no-invalid-regexp": 2, //不允许在RegExp构造函数里出现无效的正则表达式
		"no-irregular-whitespace": 2, //不允许出现不规则的空格
		"no-negated-in-lhs": 2, //不允许在in表达式语句中对最左边的运算数使用取反操作
		"no-obj-calls": 2, //不允许把全局对象属性当做函数来调用
		"no-regex-spaces": 2, //正则表达式中不允许出现多个连续空格
		// "quote-props": 2, //对象中的属性名是否需要用引号引起来
		"no-sparse-arrays": 2, //数组中不允许出现空位置
		// "no-unreachable": 2, //在return，throw，continue，break语句后不允许出现不可能到达的语句
		"use-isnan": 2, //要求检查NaN的时候使用isNaN()
		"valid-jsdoc": ["error", {
			"requireReturn": false,
			"requireParamDescription": false,
			"requireReturnDescription": true
		}], //强制JSDoc注释
		"valid-typeof": ["error", {
			"requireStringLiterals": true
		}], //在使用typeof表达式比较的时候强制使用有效的字符串
		"block-scoped-var": 2, //将变量声明放在合适的代码块里
		"complexity": 0, //限制条件语句的复杂度
		// "consistent-return": 2, //无论有没有返回值都强制要求return语句返回一个值
		"curly": ["error", "all"], //强制使用花括号的风格
		"default-case": 0, //在switch语句中需要有default语句
		"dot-notation": ["error", {
			"allowKeywords": false,
			"allowPattern": ""
		}], //获取对象属性的时候使用点号
		// "eqeqeq": ["error", "smart"], //比较的时候使用严格等于
		"no-alert": 1, //不允许使用alert，confirm，prompt语句
		"no-caller": 2, //不允许使用arguments.callee和arguments.caller属性
		"guard-for-in": 0, //监视for in循环，防止出现不可预料的情况
		"no-div-regex": 2, //不能使用看起来像除法的正则表达式
		"no-else-return": 0, //如果if语句有return，else里的return不用放在else里
		"no-labels": ["error", {
			"allowLoop": false,
			"allowSwitch": false
		}], //不允许标签语句
		"no-eq-null": 2, //不允许对null用==或者!=
		"no-eval": 2, //不允许使用eval()
		"no-extend-native": 2, //不允许扩展原生对象
		"no-extra-bind": 2, //不允许不必要的函数绑定
		"no-fallthrough": 2, //不允许switch按顺序全部执行所有case
		"no-floating-decimal": 2, //不允许浮点数缺失数字
		"no-implied-eval": 2, //不允许使用隐式eval()
		"no-iterator": 2, //不允许使用__iterator__属性
		"no-lone-blocks": 2, //不允许不必要的嵌套代码块
		"no-loop-func": 2, //不允许在循环语句中进行函数声明
		"no-multi-spaces": 2, //不允许出现多余的空格
		"no-multi-str": 2, //不允许用\来让字符串换行
		"no-global-assign": 2, //不允许重新分配原生对象
		"no-new": 2, //不允许new一个实例后不赋值或者不比较
		"no-new-func": 2, //不允许使用new Function
		"no-new-wrappers": 2, //不允许使用new String，Number和Boolean对象
		"no-octal": 2, //不允许使用八进制字面值
		"no-octal-escape": 2, //不允许使用八进制转义序列
		"no-param-reassign": 0, //不允许重新分配函数参数"no-proto": 2, //不允许使用__proto__属性
		"no-redeclare": 2, //不允许变量重复声明
		// "no-return-assign": 2, //不允许在return语句中使用分配语句
		"no-script-url": 2, //不允许使用javascript:void(0)
		"no-self-compare": 2, //不允许自己和自己比较
		"no-sequences": 2, //不允许使用逗号表达式
		"no-throw-literal": 2, //不允许抛出字面量错误 throw "error"
		"no-unused-expressions": 2, //不允许无用的表达式
		"no-void": 2, //不允许void操作符
		"no-warning-comments": [1, {
			"terms": ["todo", "fixme", "any other term"]
		}], //不允许警告备注
		"no-with": 2, //不允许使用with语句
		"radix": 1, //使用parseInt时强制使用基数来指定是十进制还是其他进制
		"vars-on-top": 0, //var必须放在作用域顶部
		"wrap-iife": [2, "any"], //立即执行表达式的括号风格
		"yoda": [2, "never", {
			"exceptRange": true
		}], //不允许在if条件中使用yoda条件
		"strict": [2, "function"], //使用严格模式
		"no-catch-shadow": 2, //不允许try catch语句接受的err变量与外部变量重名"no-delete-var": 2, //不允许使用delete操作符
		"no-label-var": 2, //不允许标签和变量同名
		"no-shadow": 2, //外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
		"no-shadow-restricted-names": 2, //js关键字和保留字不能作为函数名或者变量名
		// "no-undef": 2, //不允许未声明的变量
		"no-undef-init": 2, //不允许初始化变量时给变量赋值undefined
		"no-undefined": 2, //不允许把undefined当做标识符使用
		// "no-unused-vars": [2, {
		//   "vars": "all",
		//   "args": "after-used"
		// }], //不允许有声明后未使用的变量或者参数
		"no-use-before-define": [2, "nofunc"], //不允许在未定义之前就使用变量"indent": 2, //强制一致的缩进风格
		"brace-style": [2, "1tbs", {
			"allowSingleLine": false
		}], //大括号风格
		"camelcase": [2, {
			"properties": "never"
		}], //强制驼峰命名规则
		"comma-style": [2, "last"], //逗号风格
		"consistent-this": [0, "self"], //当获取当前环境的this是用一样的风格
		"eol-last": 2, //文件以换行符结束
		"func-names": 0, //函数表达式必须有名字
		"func-style": 0, //函数风格，规定只能使用函数声明或者函数表达式
		"key-spacing": [2, {
			"beforeColon": false,
			"afterColon": true
		}], //对象字面量中冒号的前后空格
		"max-nested-callbacks": 0, //回调嵌套深度
		"new-cap": [2, {
			"newIsCap": true,
			"capIsNew": false
		}], //构造函数名字首字母要大写
		"new-parens": 2, //new时构造函数必须有小括号
		"newline-after-var": 0, //变量声明后必须空一行
		"no-array-constructor": 2, //不允许使用数组构造器
		"no-inline-comments": 0, //不允许行内注释
		"no-lonely-if": 0, //不允许else语句内只有if语句
		"no-mixed-spaces-and-tabs": [2, "smart-tabs"], //不允许混用tab和空格
		"no-multiple-empty-lines": [2, {
			"max": 2
		}], //空行最多不能超过两行
		"no-nested-ternary": 2, //不允许使用嵌套的三目运算符
		"no-new-object": 2, //禁止使用new Object()
		// "fun-call-spacing": 2, //函数调用时，函数名与()之间不能有空格
		"no-ternary": 0, //不允许使用三目运算符
		"no-trailing-spaces": 2, //一行最后不允许有空格
		// "no-underscore-dangle": 2, //不允许标识符以下划线开头
		"no-extra-parens": 0, //不允许出现多余的括号
		"one-var": 0, //强制变量声明放在一起
		"operator-assignment": 0, //赋值运算符的风格
		"padded-blocks": [2, "never"], //块内行首行尾是否空行
		"quote-props": 0, //对象字面量中属性名加引号
		"quotes": [1, "single", "avoid-escape"], //引号风格
		"semi": [2, "always"], //强制语句分号结尾
		"semi-spacing": [2, {
			"before": false,
			"after": true
		}], //分后前后空格
		"sort-vars": 0, //变量声明时排序
		"space-before-blocks": [2, "always"], //块前的空格
		"space-before-function-paren": [2, {
			"anonymous": "always",
			"named": "never"
		}], //函数定义时括号前的空格
		"space-infix-ops": [2, {
			"int32Hint": true
		}], //操作符周围的空格
		"keyword-spacing": 2, //关键字前后的空格
		"space-unary-ops": [2, {
			"words": true,
			"nonwords": false
		}], //一元运算符前后不要加空格
		"wrap-regex": 2, //正则表达式字面量用括号括起来
		"no-var": 0, //使用let和const代替var
		"generator-star-spacing": [2, "both"], //生成器函数前后空格
		"max-depth": 0, //嵌套块深度
		"max-len": 0, //一行最大长度，单位为字符
		"max-params": 0, //函数最多能有多少个参数
		"max-statements": 0, //函数内最多有几个声明
		"no-bitwise": 0, //不允许使用位运算符
		"no-plusplus": 0 //不允许使用++ --运算符
	}
}

```

- 除了三目运算，if,else等禁止简写
- 减少重排与重绘
- PC端管理后台必须加上路由守卫
- 熟练运用Sass/Less预处理语言，避免出现大量重复性CSS，熟练运用全局Sass/Less变量
- 状态管理Vuex按模块划分
- vue视图页面代码行数不得超过`800`行，超过的话必须模块化分离出来
- [Vue.js 规范 (级别 essential)](https://eslint.vuejs.org/rules/)

----------------------------------------------------

----------------------------------------------------

----------------------------------------------------

## 样式

`BEM` 是 `Block（块） Element（元素） Modifier（修饰器）`的简称

使用`BEM规范`来命名CSS，组织HTML中选择器的结构，利于CSS代码的维护，使得代码结构更清晰（弊端主要是名字会稍长）

- 为了避免样式冲突，可以采用 `scoped` 特性和 `BEM规范`, 结合语义化标签书写模板内容

- class的命名用`-`连接，避免驼峰命名

```js
<template>
	<section class="pages-container">
		<header></header>
		<main></main>
		<footer></footer>
	</section>
</template>

<style lang="less" scoped>
	.pages-container {
		>header {
			...
		}
		>main {
			...
		}
		>footer {
			...
		}
	}
</style>

``` 

## Mixins

为了让代码遵循 DRY 原则（Don't Repeat Yourself）、增强清晰性或抽象化复杂性，应该使用 mixin，这与那些命名良好的函数的作用是异曲同工的。虽然 mixin 可以不接收参数，但要注意，假如你不压缩负载（比如通过 gzip），这样会导致最终的样式包含不必要的代码重复。

## 扩展指令

应避免使用 `@extend` 指令，因为它并不直观，而且具有潜在风险，特别是用在嵌套选择器的时候。即便是在顶层占位符选择器使用扩展，如果选择器的顺序最终会改变，也可能会导致问题。（比如，如果它们存在于其他文件，而加载顺序发生了变化）。其实，使用 @extend 所获得的大部分优化效果，gzip 压缩已经帮助你做到了，因此你只需要通过 mixin 让样式表更符合 DRY 原则就足够了。

#### 永远不要嵌套 ID 选择器！

如果你始终坚持要使用 ID 选择器（劝你三思），那也不应该嵌套它们。如果你正打算这么做，你需要先重新检查你的标签，或者指明原因。如果你想要写出风格良好的 HTML 和 CSS，你是不应该这样做的。

## 变换与动画

使用 transition 定义属性时应遵循以下顺序：

1.`[ transition-property ]`：检索或设置对象中的参与过渡的属性；

2.`[ transition-duration ]`：检索或设置对象过渡的持续时间；

3.`[ transition-timing-function ]`：检索或设置对象中过渡的动画类型；

4.`[ transition-delay ]`：检索或设置对象延迟过渡的时间；

`transition：[ transition-property ] || [ transition-duration ] || [ transition-timing-function ] || [ transition-delay ]`

```js
// 反例
.selector {
    transition: color .2s 0 ease-in;
}

// 正例
.selector {
    transition: color .2s ease-in 0;
}

```

`【建议】` 尽可能在浏览器能高效实现的属性上添加过渡和动画：

在可能的情况下应选择这样四种变换：

- `transform: translate(npx, npx);`

- `transform: scale(n);`

- `transform: rotate(ndeg);`

- `opacity: 0..1;`


## 媒体查询

`Media Query` 不得单独编排，必须与相关的规则一起定义

不要将他们一起放到一个独立的样式文件中，或者丢在文档的最底部，这样做只会让大家以后更容易忘记他们。

```js
// 反例
@media (...) {
    /* header styles */
    /* main styles */
    /* footer styles */
}

// 正例
/* header styles */
@media (...) {
    /* header styles */
}

/* main styles */
@media (...) {
    /* main styles */
}

/* footer styles */
@media (...) {
    /* footer styles */
}

```

## 2D位置

必须同时给出水平和垂直方向的位置

2D 位置初始值为 0% 0%，但在只有一个方向的值时，另一个方向的值会被解析为 center。为避免理解上的困扰，应同时给出两个方向的值。

```js
// 反例
.selector {
    background-position: top; /* 50% 0% */
}

// 正例
.selector {
    background-position: center top; /* 50% 0% */
}
```

## 颜色

RGB颜色值必须使用十六进制记号形式 #rrggbb，不允许使用 rgb()，带有alpha的颜色信息可以使用 rgba()；颜色值不允许使用命名色值

颜色值中的英文字符采用小写，至少要保证同一项目内一致；

```js
// 反例
.selector {
    box-shadow: 0 0 2px rgba(0,128,0,.3);
    border-color: rgb(0, 128, 0);
    color: gray;
}

// 正例
.selector {
    box-shadow: 0 0 2px rgba(0, 128, 0, .3);
    border-color: #008000;
    color: #999;
}
```

## url()

 url() 函数中的路径不加引号；
 
 ```js
// 反例
.selector {
    background: url("bg.png");
}

// 正例
.selector {
    background: url(bg.png);
}
```





