# 开发组件

在日常的开发工作中，组件化是必不可少的一部分。尤其是前后端分离以来，组件化的概念更是深入到方方面面。

在项目开发过程中，组件化可以很好的解耦项目，显得更加直观，最主要的是可以避免一长串的面条式代码，可以为后期接手的同学减少一定的理解能力。

为了更好的开展业务工作，本篇文章分享不局限于组件分享，还会涉及到过滤器、指令，以及表单的设计，全局组件的管理。

## 组件

定义一个组件有非常多的方式，大多数都是单页面的组件化开发，为了达到整齐、美观以及解耦，所以一般都是`.vue`的组件。因为移动端`ui`组件比较局限化，所以本篇文章以移动端的开发来展开介绍组件这一概念

纯生态和社区活跃上来看，有赞的[vant ui](https://youzan.github.io/vant/#/zh-CN/)是非常值得推荐的。但是在实际开发过程中呢，`ui`框架肯定没法满足我们的日常开发需求，我们就必须得在它的基础上不断扩展符合场景的业务组件。

既然说到了`vant`，由于移动端的关系，肯定是能精简就尽量精简为主，所以`vant`的所有组件我们并不一定会全部用上，所以最好的方式当然是按需加载，所以先记录一个按需加载引入`vant`的知识点

怎么配置这里就暂不介绍了，这里介绍如何更好的管理按需加载的组件，如下

```javascript
import {
  List,
  Toast,
  Image as VanImage,
  Button,
  Tab,
  ...
} from 'vant'

const components = {
  List,
  Toast,
  Search,
  Button,
  VanImage,
  Tab,
  ...
}

const BaseComponents = {
  install(Vue) {
    Object.keys(components).forEach(key => Vue.use(components[key]))
  }
}

export default BaseComponents
```

然后直接再项目的主入口`main.js`页面里`import`即可

```
// main.js
import BaseComponents from '@/components/BaseComponents.js';

Vue.use(BaseComponents);
```

这样对于项目中通用的`ui`组件就实行了统一管理，页面中哪里用上的话就哪里直接用就行，不用到处导入一遍，非常的便捷高效


说完按需引入，接下来说下`ui`组件扩展吧

比如公用的地址组件、页脚、日期选择、Loading、状态结果页、上传...这些都是在项目中复用率十分高的通用组件

如果我们不抽离成组件的话，那每个页面中都做重复性的操作的话，那无疑是会十分的臃肿杂乱，而且四处拷贝黏贴实在是显得枯燥乏味，所以每每遇到场景一定要停下来给它抽成组件，前期花心思，后期路才会越来越顺心

这里既然用到了组件，那就还有一个知识点，该怎么去很好的管理这些组件呢，有些页面的组件只是针对当前的页面抽离出来的业务组件，而有些是全局通用型的，如上面提到过的地址组件、页脚、日期选择、Loading、状态结果页、上传...例如统一在`src/components/global/...`下统一放置

然后新建各个通用的组件，严格按照`vue`组件命名规范

```
---| global
-----------| CommonFooter.vue
-----------| CommonLoading.vue
-----------| CommonUpload.vue
-----------| CommonStatus.vue
-----------| CommonAddress.vue
-----------| ......
-----------| index.js
```

常规的通用组件就是这么引用，这里还有个`index.js`文件，这是做啥用的呢，这里做得是统一引入，就是达到前面我们所说的，偷这个合理的懒要用的文件。只要我们按照这种格式化建好对应的组件后，就可以配置好`index.js`文件，做好全局动态化引入通用组件

```javascript
import Vue from 'vue'

const requireComponent = require.context(
  '.', // 查看当前目录下的文件(查找需要文件的相对路径)
  false, // 不查看子文件
  /.vue$/ // 匹配方式正则表达式，只查看后缀为.vue的文件
)

// 循环获取到的文件，可在循环时处理文件名
requireComponent.keys().forEach((fileName) => {
  // 获取组件配置(组件模板)
  const componentConfig = requireComponent(fileName)
  // 将被注册的组件名字,对获取的组件文件名进行处理
  const componentName = fileName
    .replace(/^\.\/_/, '')
    .replace(/\.\w+$/, '')
    .split('./')
    .join('')

  // console.log(componentName, '测试组件获取测试')
  // 将组件在循环中注册到全局
  Vue.component(componentName, // 依据文件名处理好的，将要被注册到全局的组件名
    componentConfig.default || componentConfig)
})
```

从上面代码我们可以看到我们没有引入任何一个通用组件，只是定义了一个匹配方式正则表达式，对当前文件所有后缀名为.vue的文件去注册一遍


最后我们只要在主入口`main.js`中正常引入即可

```
// main.js

import './components/global'
```

到这里后你在项目的任何页面中想引用通用组件的话，就再也不用到处`import`了，而是直接在`template`模板上引用即可，如

```javascript
<template>
	<common-footer />
	<common-loading />
	<common-address />
	...
</template>
```

是不是便捷了很多...

前面分享的都是怎么去引用组件，那对于一些高并发的组件，该怎么去开发和使用呢，这里抽一个`toast`消息提示框为例来做示例吧，我们要把`toast`做成一个插件

插件的介绍用途官方是这么介绍的

- 添加全局方法或者属性
- 添加全局资源，如`directives`， `filters`，`transitions`
- 全局混入添加组件选项
- 添加 Vue 实例方法，`Vue.prototype.$xx=..`

```
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或 property
  Vue.myGlobalMethod = function () { }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) { }
  })

  // 3. 注入组件选项
  Vue.mixin({
    created: function () { }
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) { }
}

```

安装插件

- 引入`import xx from 'xx'`
- 再，`Vue.use(xx)`，有时候可能需要加一个options


### Toast插件

`Vue.use`其实是执行了插件的`install`方法，且给`install`传了两个参数，一个`Vue构造器`，另一个就是可选的参数

要写一个`Toast`插件，我们要先写好它的模板

```
// Toast.vue

<template>
  <div :class='typeClass' >
    <transition name='toast'>
      <div class="toast-content" v-if='toastShow'>
        <span>
          {{toastTxt}}
        </span>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      toastShow: false,
      toastTxt: '',
      type: 'middle'
    }
  },
  computed: {
    typeClass() {
      return `my-toast ${this.type}`
    }
  }
}
</script>
<style lang="scss" scoped>
  .my-toast {
    position: fixed;
    max-width: 90%;
    width: auto;
    // top 50%
    z-index: 1000;
    left: 50%;
    transform: translate(-50%,-50%);
    &.middle {
      top: 50%;
    }
    &.top {
      top: 180px;
    }
    &.bottom {
      bottom: 180px;
    }
    .toast-content {
      margin: 0 auto;
      background: rgba(0, 0, 0, 0.6);
      // width 600px
      padding: 10px 20px;
      min-width: 400px;
      text-align: center;
      span {
        color: rgba(255, 255, 255, 0.8);
        font-size: 26px;
        text-align: center;
        line-height: 48px;
      }
    }
  }
  .toast-enter-active, .toast-leave-active {
    transition: all linear 0.3s;
  }
  .toast-enter, .toast-leave-to {
    opacity: 0;
    // transform scale(0)
    background: rgba(0, 0, 0, 0);
  }
</style>
```

然后我们要写一个`js`文件去加载这个模板对应的模板文件

```javascript
// index.js
import ToastTemplate from './Toast.vue';

const Toast={};

Toast.lock=false;

Toast.install=(Vue)=>{

  if(Toast.lock){return ;}

  Toast.lock=true;
  

  const ToastConstructor=Vue.extend(ToastTemplate);

  const MyToast=new ToastConstructor();

  MyToast.$mount(document.createElement('div'));

  document.body.appendChild(MyToast.$el);

  Vue.prototype.$toast=({
    msg='加载中',
    time=3000,
    type='middle',
  })=>{
    MyToast.toastTxt=msg;
    MyToast.toastShow=true;
    MyToast.type=type;

    setTimeout(()=>{
      MyToast.toastShow=false;
      Toast.lock=false;
    
    },time)
  }
};

export default Toast;
```

这样一个简单的`Toast`插件就完成了

安装使用如下

```javascript
// main.js

import Toast from '@/components/Toast'

Vue.use(Toast)

Toast({msg: '此处加提示信息...'}) // 使用
```

总结

- 1、 Vue的插件是一个对象，就像Element
- 2、 插件对象必须有install字段
- 3、 插件对象必须有install字段
- 4、 初始化插件对象需要通过Vue.use()

好了，通用性质的`Toast`插件就这么收工了，哪里要用写哪里


组件的应用是多元化的，局部组件、全局组件、插件、mixin混入、模板自定义组件...最主要的还是要选择适应你的那一个，怎么舒服怎么来就好了，但是共同点就是，一定要组件化开发项目

## 指令

指令分局部指令和全局指令，前者是页面中的，后面是全局的指令，那应用场景呢就更不用多说了，指令能做很多很多的事情。`vue`本身内置了很多指令，都是以`v-*`格式的，如`v-modal`, `v-if`, `v-for`...

那一般我们自己在开发中会有那些便利的指令呢

比如输入框只允许输入数字，或者金额，同样可以用指令解决，或者是常见的点击防抖事件、按钮的点击波纹效果，这些都可以用指令来实现

本篇文章分享一个如何取自定义开发一个指令和指令的文件管理

### 两位小数浮点金额指令

<details>
  <summary>详细代码</summary>

  ```javascript
  /**
   * input输入框两位小数
   */
  export default {
    bind(el, binding, vnode) {
      console.log(vnode)
      let input = vnode.elm;
      input.addEventListener('compositionstart', () => {
        vnode.inputLocking = true
      })
      input.addEventListener('compositionend', () => {
        vnode.inputLocking = false
        input.dispatchEvent(new Event('input'))
      })
      input.addEventListener('input', () => {
        if(vnode.inputLocking) {
          return;
        }
        let oldValue = input.value;
        let newValue = input.value;
        newValue = newValue.replace(/[^\d.]/g, '');
        newValue = newValue.replace(/^\./g, '');
        newValue = newValue.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
        newValue = newValue.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
        if(newValue) {
          let arr = newValue.split('.')
          newValue = Number(arr[0]) + (arr[1] === undefined ? '' : '.' + arr[1]) // 去掉开头多余的0
        }
        // 判断是否需要更新，避免进入死循环
        if(newValue !== oldValue) {
          input.value = newValue
          input.dispatchEvent(new Event('input')) // 通知v-model更新
        }
      })
      // input 事件无法处理小数点后面全是零的情况 因为无法确定用户输入的0是否真的应该清除，如3.02。放在blur中去处理
      input.addEventListener('blur', () => {
        let oldValue = input.value;
        let newValue = input.value;
        if(newValue) {
          newValue = Number(newValue).toString()
        }
        // 判断是否需要更新，避免进入死循环
        if(newValue !== oldValue) {
          input.value = newValue
          input.dispatchEvent(new Event('input')) // 通知v-model更新
        }
      })
    }
  }
  ```

  ```javascript
  import inputFloat from './inputFloat'

  const install = function(Vue) {
    Vue.directive('inputFloat', inputFloat)
  }

  if (window.Vue) {
    window.inputFloat = inputFloat
    Vue.use(install); // eslint-disable-line
  }

  inputFloat.install = install
  export default inputFloat
  ```

- element扩展： let input = vnode.elm.children[0];

</details>

使用

```
<el-input v-input-float />
```

是不是非常非常的方便。

那如何的去全局管理我们自定义的各种指令呢，现在`src`下面建一个`directive`的文件夹，里面分文件存放我们的自定义的各种指令，最后在`directive`下新建一个引入的`js`文件做全局引入

```javascript
import waves from './waves'
import inputNumber from './inputNumber'
import inputDecimal from './inputDecimal'
import debounces from './debounces'
import throttles from './throttles'
import Clipboard from './clipboard'
import dialogDrag from './dialogDrag'
...

export {
  waves,
  inputNumber,
  inputDecimal,
  debounces,
  throttles,
  Clipboard,
  dialogDrag
  ...
}

```

同样的，在主入口文件这么引用

```javascript
import * as directives from './directive'

Object.keys(directives).forEach(k => Vue.directive(k, directives[k]))
```

好了，接下来你就可以随心所欲的引用各种你自定义的指令了。

## 过滤器

过滤器能做啥用呢，过滤模板日期格式，枚举值格式化，模板空值判断，可以过滤很多你想计算的属性值。

过滤器在项目开发中绝对是一大利器，它分局部的和全局的过滤器，局部的这里就不做过多阐述了，这里介绍一个管理全局指令的知识点

同样的在`src`下面新建一个`filters`的文件夹，里面建一个`index.js`这样的文件

```javascript
export { parseTime } from '@/utils'

export const articleStatusFilter = (status) => {
  switch (status) {
  		case '01'
  			return 'success'
  		case '02'
  			return 'false'
  		default:
  			return '处理中...'
  }
}

export const formatNull = (str) => {
  if (str) {
  	return str
  } else {
  	return '-'
  }
}

```

引用

```javascript
import * as filters from '@/filters'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
```

然后在页面中直接在`template`中用管道符号`|`去过滤就行了。

```javascript
<template>
	<span>{{ time | parseTime }}</span>
	...
</template>
```

## 表单校验

请先容许我找一个示例场景

![](/zxz/images/projects/form.png)

需求就是为该页面做一个表单校验

刚拿到页面的时候，如果我不构思就开始做，用`Element-ui`的`form`表单校验来一个一个的做，一个一个的家表单规则，有些选项还有特殊的校验规则，比如手机号、身份证之类的等等，这个时候如果我们按照正常开发思维开发这个页面的话，不用怀疑千行代码就这么随随便便就出来了吧，就这样的代码，用杂又乱，压根就不好维护和管理，接手的人更是头疼不已，最主要的是容易让人看了发疯

so...

该怎么去处理这样的页面逻辑呢？

拆分啊！！！

首先这个页面我们可以把它拆分成三大块

- 企业信息表单 -> form1.vue
- 受益人表单 -> form2.vue
- 法人信息表单 -> form3.vue

```javascript
// 合并
<template>
	<div>
		<form1 ref="form1Comp" />
		<form2 ref="form2Comp" />
		<form3 ref="form3Comp" />
	</div>
</template>
```

然后在各个form表单中做单独的表单验证
这里仅举一个例子来说中，其它的两个文件是一样的逻辑

例：`form1.vue`

```javascript

<template>
  <el-form
    ref="form1"
    :rules="form1Rules"
    :model="form1"
  >
    <el-form-item prop="name" label="企业名称：">
      <el-input v-model="form1.name" />
    </el-form-item>
    <el-form-item prop="shortName" label="企业简称：">
      <el-input v-model="form1.shortName" />
    </el-form-item>
    <el-form-item prop="code" label="社会信用码：">
      <el-input v-model="form1.code" />
    </el-form-item>
    ......
    <!-- 以下是同上所有的表单校验 -->
  </el-form>
</template>

<script>
export default {
  props: {
    formData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form1: {
        name: '',
        shortName: '',
        code: '',
        ...
      },
      form1Rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        shortName: [{ required: true, message: '请输入简称', trigger: 'blur' }],
        code: [{ required: true, trigger: 'blur', message: '请输入社会信用代码' }],
        ...
      }
    }
  }
}
</script>

```

写到这里我想大家已经可以看出区别了，跟平常的表单校验无任何差别啊？？？表示有点懵圈，那差别在哪里呢？讲真确实是没有差别，其实就是把页面拆分开三个表单组件，每个组件负责自己单独的表单验证，<font color=red size=6>划重点!!!</font>记住，是单独的，独立的，不和其它页面做任何交互，就是简单的表单校验，设定表单规则，获取表单对象的值

这里除了表单校验还会有表单的回显信息操作，所以会有一个`props`去接收`formData`这个大对象，这个大对象是有父节点组件传值下来的，如果监听不到回调数据的改变去渲染页面，这里可以把`formData`这个大对象加入`watch`监听，再渲染到对应的模板中即可

<font color=red size=6>总结</font>

企业信息表单 `form1.vue`，受益人表单 -> `form2.vue`，法人信息表单 -> `form3.vue`只做自己页面单独的表单校验和数据回显操作，所有的表单提交操作都放到父组件页面中来

### 表单提交

重点来了，每个页面都只做单独的表单校验，那我该怎么加入表单验证呢？即当我点击页面的提交按钮，我怎么同时触发三个页面的所有校验呢？

接到最初的父组件，我们这么改

```javascript
// 合并
<template>
	<div>
		<form1 ref="form1Comp" :form-data="parentObj" />
		<form2 ref="form2Comp" :form-data="parentObj" />
		<form3 ref="form3Comp" :form-data="parentObj" />
		<el-button type="primary" @click="onSubmit">提交</el-button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			parentObj: {} // 父组件大对象，用于接收数据回显
		}
	},
	methods: {
		getFormPromise(form) {
			return new Promise(resolve => {
				form.validate(res => {
					resolve(res);
				})
			})
		},
		onSubmit() {
		  // 获取到组件中的form
	      const form1 = this.$refs.form1Comp.$refs.form1;
	      const form2 = this.$refs.form2Comp.$refs.form2;
	      const form3 = this.$refs.form3Comp.$refs.form3;
	      
      	 // 使用Promise.all去校验结果
      	 Promise.all([form1, form2, form3].map(this.getFormPromise)).then(res => {
	        const validateResult = res.every(item => !!item);
	        if (validateResult) { // 只有所有表单都通过校验才会进入这里
	          console.log('表单都校验通过');
	          const params = {
	            parentRequiredInfo: {
	              // 企业信息表单的数据，通过form1.model获取各个表单数据
	              name: form1.model.mainstay,
	              shortName: form1.model.merName,
	              code: form1.model.code,
	              // 受益人表单的数据，通过form2.model获取各个表单数据
	              beneficalName: form2.model.beneficalName,
	              ...
	              // 法人表单的数据，通过form3.model获取各个表单数据
	              legalName: form3.model.legalName,
	              ...
	            }
	          }
	          console.log(params);
	          // 到此已经可以拿到所有表单数据进行api请求
	          ...
	        } else {
	        	alert('信息未填写完整，请核查后重新提交!!!')
	        }
	      })
		}
	}
}
</script>
```

好了，到此就完全结束了。一个大表单拆分成了三个独立的表单校验，每个独立的表单校验中互不影响，各自干好自己的分内之事，最后再由父组件去统一触发所有表单的校验工作，并且拿到对应的`model`数据做对应的`api`交互请求

这里涉及到的点是因为表单校验是一个异步操作，所以可以用`Promise.all`去统一操作并拦截错误返回数据。

好了，举一反三，在接下来的表单校验开发过程中，希望再也不要出现几千行的表单校验页面了...
