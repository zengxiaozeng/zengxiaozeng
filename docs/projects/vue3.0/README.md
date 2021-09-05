## 前言
1、`vue 2.x`学的好好的，为什么要学习跨度那么大的`vue 3.0`

在前端的世界里，更新的步伐永远让人望尘莫及，一旦你偷懒停下脚步，日月累计，你只会被人甩得越来越远。所以，升级`vue 3.0`，那是大势所趋。

2、`vue 3.0`的优点

常常说`js`是动态类型语言，什么意思呢，即在运行的时候才检查语法的正确性，这在开发中各种类型的嵌套引用，往往会使得我们已上线的项目频出各种奇怪的问题。因此为了避免这一现象的发生，`vue`用`typescript`升级到了`3.0`的版本。为什么引用`ts`呢，因为`ts`是 `js` 的一个超集，它带来了可选的`静态类型检查`以及最新的`ECMAScript特性`。何为静态类型检查，即在编译中就校验语法规则，把错误扼杀在编译中，运行时结构不可变的语言就是静态语言。

- 按需编译，体积比vue2.x更小更快
- 组合API（类似React Hook）
- 更好的TS支持
- 暴露了自定义渲染API

### 环境要求
在开始动手Vue 3.0前，首先要先检查一遍我们的vue版本以及`Node`环境

- `Node.js`: - 版本最好大于 `12.0.0`
- 熟悉`ts`
- 为了安装包的稳定性，推荐首选`Yarn`

```
vue --version

@vue/cli 最好大于4.5.3
```

### 创建项目

1、`vue create 项目名`

2、选`Manually select features`自己去选择需要的功能，提供更多的特性选择。

`vue-cli` 内置支持了8个功能特性，可以多选：使用`方向键`在特性选项之间切换，使用`空格键`选中当前特性，使用 `a` 键切换选择所有，使用 `i` 键翻转选项。
![](/zxz/images/projects/vue3/1.jpg)

3、下一步

- `babel`: es6 转 es5。

- `TypeScript`: 支持使用 TypeScript 书写源码。

- `CSS Pre-processors`: 支持 CSS 预处理器。

- `Linter / Formatter`: 支持代码风格检查和格式化。

项目刚开始我们先不引用`vue-router`和`vuex`，等哪里需要用上了再添加。
![](/zxz/images/projects/vue3/2.jpg)

4、版本号选择
这里选`3.x`版本
![](/zxz/images/projects/vue3/3.jpg)


5、所有配置
![](/zxz/images/projects/vue3/4.jpg)

自此，一个`vue-li`的脚手架项目就搭建好了。它的目录和`vue 2.0`还是很相似的，区别就在于入口文件`main`的后缀名由`.js`改成了`.ts`。由`2.0`的 

```
import Vue from 'vue'

new Vue({
  el: '#app',
  render: h => h(App)
})

```

变成

```
import { createApp } from 'vue'

createApp(App).mount('#app')
```

在与`main.ts`同级的目录中，还有一个`.d.ts`结尾的文件，说白了就是定义了一些接口，使得你用`typescript`编程的时候调用此模块，`IDE`有提示。。。

当然还会定义很多`export`的数据类型，和`inferface`供外部模块调用。很显然就是数据规范。

### 写个`todoList`开胃菜

1、先看看`script`结构

```javascript
<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  toRefs,
  computed,
  watchEffect,
  onMounted,
  onUnmounted,
} from 'vue'

export default defineComponent({
  name: 'to do list',
  components: {},
  props: {},
  setup(props: any) {
  	const state = reactive({
  		...响应式对象
  	})
  
	watchEffect(() => {})

    onMounted(() => {})

    onUnmounted(() => {})
    
    onRenderTriggered((event) => {
	    console.log(event)
	})

    return {
      ...toRefs(state)
    }
  },
  directives: {}
})
</script>
```

最直观的改变就是`<script>`标签加了个`lang="ts"`属性，这样即支持`ts`的语法，其次就是`export`的对象要用`defineComponent`函数包裹，这样`vue 3`的语法就可以开始使用了。

看看生命周期

- beforeCreate -> 不需要
- created -> 不需要
- beforeMount -> onBeforeMount
- mounted -> onMounted
- beforeUpdate -> onBeforeUpdate
- updated -> onUpdated
- beforeUnmount -> onBeforeUnmount
- unmounted -> onUnmounted
- errorCaptured -> onErrorCaptured
- renderTracked -> onRenderTracked // 检查哪个 reactive 对象属性或一个 ref 作为依赖被追踪。当render函数被调用时，会检查哪个响应式数据被收集依赖。

- renderTriggered -> onRenderTriggered // 当执行update操作时，会检查哪个响应式数据导致组件重新渲染。

即

![](/zxz/images/projects/vue3/5.jpg)

具体的生命周期信息介绍可以查看[vue 3.0 API](https://v3.vuejs.org/guide/reactivity-computed-watchers.html#watch)

生命周期代码

App.vue

```
<template>
  <div id="app">
    <button @click="show=!show">Toggle Demo</button>
    <Demo v-if="show" />
  </div>
</template>

<script>
import Demo from "./components/07Lifecycle.vue";
export default {
  name: "App",
  data() {
    return { show: false };
  },
  components: {
    // HelloWorld,
    Demo,
  },
  errorCaptured(err, vm, info) {
    console.error(err, vm.data, info);
    return true;
  },
};
</script>
```

Lifecycle.vue

```
<template>
  <div>
    <h1>lifecycle - 生命周期</h1>
    <p>{{data.name}}</p>
    <button @click="updateData">Update data</button>
  </div>
</template>

<script>
import {
  reactive,
  // mount
  onBeforeMount,
  onMounted,
  // update
  onBeforeUpdate,
  onUpdated,
  // unmount
  onBeforeUnmount,
  onUnmounted,
  // 新增的钩子函数
  onRenderTracked,
  onRenderTriggered,
} from "vue";


setup() {
    onBeforeMount(() => {
      debugger; // eslint-disable-line
    });
    onMounted(() => {
      debugger; // eslint-disable-line
    });
    onBeforeUpdate(() => {
      debugger; // eslint-disable-line
    });
    onUpdated(() => {
      debugger; // eslint-disable-line
    });
    onBeforeUnmount(() => {
      debugger; // eslint-disable-line
    });
    onUnmounted(() => {
      debugger; // eslint-disable-line
    });
    onRenderTracked((e) => { // eslint-disable-line
      debugger; // eslint-disable-line
    });
    onRenderTriggered((e) => { // eslint-disable-line
      debugger; // eslint-disable-line
    });

    const data = reactive({ name: "haihong" });
    const updateData = () => {
      data.name = "chen haiong" + new Date().toLocaleTimeString();
    };
    return { data, updateData };
}
```


这里建单的介绍一下如何构建响应式对象

原先在`vue 2.x`版本中我们响应式对象是定义成一个`data`函数，`vue 3.0`版本是没有这个`data`函数结构的，那怎么去定义一个响应式结构呢

- [ref](https://vue-composition-api-rfc.netlify.app/zh/api.html#ref) 函数 单值数据响应式

接受一个参数值并返回一个响应式且可改变的 ref 对象。

```
<template>
  <h1>{{count}}</h1>
  <h1>{{double}}</h1>
  <button @click="increase">+1</button>
</template>

import { ref } from "vue"

setup() {
  // ref 是一个函数，它接受一个参数，返回的就是一个神奇的 响应式对象 。
  // ref函数可以初始化一个简单数据结构的响应式对象，要修改它的值需要修改result.value的值而不是直接修改result的值。但是在模板中直接取值即可，即{{ result }}
  const count = ref(0)
  const double = computed(() => {
    return count.value * 2
  })
  const result = ref(null)
  const loading = ref(true)
  const error = ref(null)
  const increase = () => {
    count.value++
  }
  return {
    count,
    increase,
    double,
    result,
    loading,
    error
  }
}
```

- Reactive 函数

```
import { ref, computed, reactive, toRefs } from 'vue'

setup() {
  const state = reactive({
    count: 0,
    increase: () => { data.count++},
    double: computed(() => data.count * 2)
  })
  
  return {
    ...toRefs(state)
  }
}
```

这两个函数都可以把数据转化成响应式对象，那日常开发中怎么选择呢。

简单来说，ref一般用于监听简单数据，reactive可以监听所有数据

1、ref修改数据需要使用这样count.value=xxx的形式，而reactive只需要state.count=xxx值这样来使用

2、第二点体现在template中引用时候为count，不需要state，相当于通过...toRefs(state)后，所有的属性都相当与ES6的结构语法直接使用，toRefs即转换成响应式对象的作用

有时候我们要检测数据的变化，原先有`watch`函数，那在`vue 3.0`中该怎么处理呢

- `watchEffect`、`watch` - 侦听器

1、watch

对比watchEffect，watch允许我们：

-- 懒执行副作用，也就是说仅在侦听的源变更时才执行回调；

-- 更明确哪些状态的改变会触发侦听器重新运行副作用；

-- 访问侦听状态变化前后的值。


```
<template>
  <div>
    <h1>watch - 侦听器</h1>
    <p>count1: {{data.count1}}</p>
    <p>count2: {{data.count2}}</p>
    <button @click="stopAll">Stop All</button>
  </div>
</template>

<script>
import { reactive, watch } from "vue";
export default {
  name: "Watch",
  setup() {
    const data = reactive({ count1: 0, count2: 0 });
    // 侦听单个数据源
    const stop1 = watch(data, () =>
      console.log("watch1", data.count1, data.count2)
    );
    // 侦听多个数据源
    const stop2 = watch([data], () => {
      console.log("watch2", data.count1, data.count2);
    });
    setInterval(() => {
      data.count1++;
    }, 1000);
    return {
      data,
      stopAll: () => {
        stop1();
        stop2();
      },
    };
  },
};
</script>
```

2、watchEffect

立即执行传入的一个函数，并响应式追踪其依赖，并在其依赖变更时重新运行该函数。

```
<template>
  <div>
    <h1>watchEffect - 侦听器</h1>
    <p>{{data.count}}</p>
    <button @click="stop">手动关闭侦听器</button>
  </div>
</template>

<script>
import { reactive, watchEffect } from "vue";
export default {
  name: "WatchEffect",
  setup() {
    const data = reactive({ count: 1 });
    const stop = watchEffect(() => console.log(`侦听器：${data.count}`));
    setInterval(() => {
      data.count++;
    }, 1000);
    return { data, stop };
  },
};
</script>
```

- [computed](https://vue-composition-api-rfc.netlify.app/zh/api.html#computed) - 计算属性

1 只传 `getter`

返回一个默认不可手动修改的 ref 对象。

```
<template>
  <div>
    <h1>computed - 计算属性</h1>
    <p>{{username}}</p>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
export default {
  name: "Computed",
  setup() {
    const user = reactive({ firstname: "chen", lastname: "haihong" });
    const username = computed(() => user.firstname + " " + user.lastname);
    username.value = "hello world"; // 报警告，computed value is readonly
    return { username };
  },
};
</script>
```

如果是这种使用方式，则会报错 ❌，而不是警告 ⚠️，

```
setup() {
    const user = reactive({ firstname: "chen", lastname: "haihong" });
    const username = computed({
      get: () => user.firstname + " " + user.lastname,
    });
    username.value = "hello world"; // ❌ computed value is readonly
    return { username };
}
```

![](/zxz/images/projects/vue3/6.jpg)

2 同时传 `getter`、`setter`

创建一个可手动修改的计算状态。

```
<template>
  <div>
    <h1>computed - 计算属性</h1>
    <p>firstname: <input v-model="user.firstname" /></p>
    <p>lastname: <input v-model="user.lastname" /></p>
    <p>username: <input v-model="username" /></p>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
export default {
  name: "Computed2",
  setup() {
    const user = reactive({ firstname: "Chen", lastname: "Haihong" });
    const username = computed({
      get: () => user.firstname + " " + user.lastname,
      set: (value) => {
        const [firstname, lastname] = value.trim().split(" ");
        user.firstname = firstname;
        user.lastname = lastname;
      },
    });
    return { user, username };
  },
};
</script>
```


- 全局 API 修改

`Vue2 的全局配置`

```
import Vue from 'vue'
import App from './App.vue'

Vue.config.ignoredElements = [/^app-/]
Vue.use(/* ... */)
Vue.mixin(/* ... */)
Vue.component(/* ... */)
Vue.directive(/* ... */)

Vue.prototype.customProperty = () => {}

new Vue({
  render: h => h(App)
}).$mount('#app')
```

Vue2 这样写在一定程度上修改了 `Vue` 对象的全局状态。

- 第一，在单元测试中，全局配置非常容易污染全局环境，用户需要在每次 case 之间，保存和恢复配置。有一些 `api （vue use vue mixin）`甚至没有方法恢复配置，这就让一些插件的测试非常的困难。
- 第二，在不同的项目中，如果想共享一份有不同配置的 `vue` 对象，也变得非常困难。

`Vue3` 的修改

```
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
// 这个时候 app 就是一个 App 的实例，现在再设置任何的配置是在不同的 app 实例上面的，不会像vue2 一样发生任何的冲突。

app.config.isCustomElement = tag => tag.startsWith('app-')
app.use(/* ... */)
app.mixin(/* ... */)
app.component(/* ... */)
app.directive(/* ... */)

app.config.globalProperties.customProperty = () => {}

// 当配置结束以后，我们再把 App 使用 mount 方法挂载到固定的 DOM 的节点上。
app.mount(App, '#app')
```

包括`UI`的引用，也是直接`app.use(UI)`。由于`Element ui`已经停止更新，不再升级支持`ts`，所以，`vue 3.0`应用的是`and-design-vue 2.x`最新版本。

好了，介绍了这么多，接下来可以开始一个`todolist`的增删改查小demo了

- `todolist demo`

定义一个页面中的响应式对象，我们统一用`reactive`函数包裹一个`state`对象，这样便于统一管理

```
const state: StateProps = reactive({
      todos: todoStorage.fetch(), // todo数组
      editedTodo: null,
      remaining: computed(() => { // todo未删除的总长度
        return filters.active(state.todos).length
      }),
      filteredTodos: computed(() => {
        return filters['all'](state.todos)
      }),
      allDone: computed({
        get: function () {
          return state.remaining === 0
        },
        set: function (value: boolean) {
          state.todos.forEach((todo: Todo) => {
            todo.completed = value
          })
        },
      }),
    })
    
function addTodo(value) {
  console.log('新增')
}
function removeTodo(todo: Todo) {
  console.log('删除')
}
function editTodo(todo: Todo) {
  console.log('修改')
}
function toggle(todo: Todo) {
  console.log('点击')
} 

return {
  state,
  addTodo,
  removeTodo,
  editTodo,
  toggle
}
```

所有的methods方法也都要`return`出去，这样才能响应式监听和修改对应的响应式对象。

这里还有一点，因为是`ts`结合一起开发，运用`ts`其实就是想用它的静态类型语言检查，所以定义的`state`对象需要做`ts`类型检查

即：`state: StateProps`

```
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
interface StateProps  {
	todos: Todo[];
	editedTodo: null | Todo;
	remaining: Number;
	filteredTodos: Todo[];
	allDone: any;
	[propName: string]: any;
}	
```

`父子组件传值`

父组件传值给子组件，子组件还是可以通过`props`接收，要注意的就是`props`接收的所有数据都要进行类型限制。

```
props: {
	allDone: Boolean,
	filteredTodos: Array,
	editedTodo: Object,
}
```

因为`vue 3.0`是没有`this`对象的概念的，所以要拿到`props`的值，可以在`setup`函数中取。它接收两个参数`setup(props, context)`，数据可以在这里获取`props.allDone`, `props.filteredTodos`

子组件更新后，怎么传回父组件进行对应的状态更新呢，`Vue 2.0`是直接`$emit`出去，在`vue 3.0`中只是语法改了而已。因为`setup(props, context)`接收两个参数，那这个`emit`就是`context`的属性，即

```
setup(props, { emit }) {
   
    const editTodo = (todo) => emit('editTodo', todo)
    const removeTodo = (todo) =>emit('removeTodo', todo)
    const doneEdit = ({ target }, todo) =>   emit('doneEdit', { ...todo, title: target.value })
    const toggle = (todo) => emit('toggle', todo)

    return {
      editTodo,
      removeTodo,
      doneEdit,
      toggle,
    }
}
```

对应的事件名和传参都和原来的一致。

`todolist`的源码即目录中的`Todos`

有了大概的`todo`介绍后，接下来直接上手一个后台上手项目。

----------------------

### vue 3.0星集商户管理系统

在正式开始项目之前先介绍一个新的打包工具，`Vite`。对，新项目会引用`Vite`替代传统`Webpack`的项目打包工具，毕竟得牢牢跟着潮流走啊


那`Vite`究竟是啥呢

### 一、Vite 是什么

`Vite`，一个基于浏览器原生 `ES imports` 的开发服务器。利用浏览器去解析 `imports`，在服务器端按需编译返回，完全跳过了打包这个概念，服务器随起随用。同时不仅有 `Vue` 文件支持，还搞定了热更新，而且热更新的速度不会随着模块增多而变慢。针对生产环境则可以把同一份代码用 `rollup` 打包。虽然现在还比较粗糙，但这个方向是有潜力的，做得好可以彻底解决改一行代码等半天热更新的问题。<font color=red size=4>天生的懒加载!</font>

- 快速冷启动服务器
- 即时热模块更换（HMR）
- 真正的按需编译

想要了解更多的`Vite`只是，可以点击这里[Vite介绍](https://juejin.cn/post/6844904202364420109#heading-12)以及[Vite官方文档](https://github.com/vitejs/vite)


### 二、Vite创建项目

1、安装`Vite`

```
npm install -g create-vite-app
```

2、新建`Vite`项目

```
create-vite-app projectName
```

3、安装依赖运行项目

```
cd projectName  // 进入工程项目文件夹
yarn install    // 安装项目依赖
yarn run dev    // 运行项目
```

4、配置文件

同`vue-cli 3.0+`一样，想要动态化的衍生配置需求，`Vite`也有类似的`vite.config.ts`配置文件，同`vue`的`vue.config.js`配置语法很相似

```
import type { UserConfig } from 'vite';

import { resolve } from 'path';

import { modifyVars } from './build/config/lessModifyVars';
import { createProxy } from './build/vite/proxy';
import globbyTransform from './build/vite/plugin/context/transform';
import dynamicImportTransform from './build/vite/plugin/dynamicImport/index';

import { isDevFn, loadEnv } from './build/utils';

import { createRollupPlugin, createVitePlugins } from './build/vite/plugin';

const pkg = require('./package.json');

const viteEnv = loadEnv();

const {
  VITE_PORT,
  VITE_PUBLIC_PATH,
  VITE_PROXY,
  VITE_DROP_CONSOLE,
  // VITE_USE_CDN,
} = viteEnv;

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir);
}

const viteConfig: UserConfig = {
  entry: './public/index.html',
  port: VITE_PORT,
  hostname: 'localhost',
  outDir: 'dist',
  assetsDir: '_assets',
  assetsInlineLimit: 4096,
  esbuildTarget: 'es2020',
  alias: {
    '/@/': pathResolve('src'),
  }
  proxy: {
  },
  plugins: createVitePlugins(viteEnv),
  rollupInputOptions: {
  },
  // 配置Dep优化行为
  optimizeDeps: {
    include: ["lodash"]
  }
};

export default {
  ...viteConfig,
  transforms: [globbyTransform(viteConfig), dynamicImportTransform(viteEnv)],
} as UserConfig;

```

所有的配置规则可以参考[vite.config.ts](https://github.com/vitejs/vite/blob/master/src/node/config.ts)

5、修改项目为`ts`

- 把`main.js`改为`main.ts`
- 修改`index.html`的`script`资源引入

### 三、安装Ant Design Vue

```
yarn add ant-design-vue@next
```

全局安装

```
// main.ts
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

app.use(Antd)
```
全局安装有点笨重，在项目中最好能引用按需打包，具体参考[ant design vue官网按需加载](https://2x.antdv.com/docs/vue/introduce-cn/)

### 四、安装`Vuex`, `vue-router`

这里要注意，安装的`Vuex`, `vue-router`需要是最新版的，否则可能不兼容`vue 3.0`的`ts`版本

```
yarn add vuex@next vue-router@next
```

layout: 为该路由模块的主页面统一布局,一般是 `PAGE_LAYOUT_COMPONENT`

最新的路由版本[Vue-Router-Next](https://next.router.vuejs.org)

本项目中的路由配置是按需加载。

```
import modules from 'globby!/@/router/routes/modules/**/*.@(ts)';

const routeModuleList: AppRouteModule[] = [];

Object.keys(modules).forEach((key) => {
  routeModuleList.push(modules[key]);
});
```

要想新添加路由的话，直接按模块新增对应的路由配置即可
如要新增test/pageA、 test/pageB页面的话

在`src/router/routes/modules`新建一个`test.ts`

```
import type { AppRouteModule } from '/@/router/types';

import { PAGE_LAYOUT_COMPONENT } from '/@/router/constant';

export default {
  layout: {
    path: '/test',
    name: 'Test',
    component: PAGE_LAYOUT_COMPONENT,
    redirect: '/test/test-a',
    meta: {
      title: 'test模块'
    }
  },

  routes: [
    {
      path: '/test-a',
      name: 'TestA',
      component: () => import('/@/views/test/test-a.vue'),
      meta: {
        title: 'test-a页面'
      }
    },
    {
      path: '/test-b',
      name: 'TestB',
      component: () => import('/@/views/test/test-b.vue'),
      meta: {
        title: 'test-b页面'
      }
    }
  ]
} as AppRouteModule;

```

- 路由跳转

同样有两种方式，路由跳转的方式跟`2.0`版本无异

```
import { useRouter } from 'vue-router';

setup() {
	const router = useRouter()
	
	// 第一种
	router.push({
	    name: 'Test',
	    params: {
	      ...
	    }
	})
	
	// 或者第二种
	router.push({
	    path: 'Test',
	    query: {
	      ...
	    }
	})
}
```

- 获取路由传参

```
import { useRoute, useRouter } from 'vue-router';、

setup() {
	// 当前路由
	const currentRoute = useRoute()
	
	// 第一种路由传参获取值
	console.log(currentRoute.params.属性)
	
	// 第二种路由传参获取值
	console.log(currentRoute.query.属性)
}
```

- 动态路由

类似详情跳页面传参之类的需求，用`vuex`存储参数再跳页面获取变量值从服务端获取数据有点啰嗦，而且有点重。用第二种用把属性值暴露在地址栏上有点丑陋，用第一种可以达到要求，但是页面刷新后参数值又丢失了。

结合种种情况，动态路由就非常的符合需求了

例如：
A页面传参`id`跳转B页面

B页面的路由结构这么定义

```
{
  path: '/test-a/:id',
  name: 'TestA',
  component: () => import('/@/views/test/test-a.vue'),
  hidden: true,
  meta: {
    title: 'test-a详情'
  }
}
```

跳转时用仍然用第一种跳转方式，把`id`属性值放入`params`中。在B页面也用`routes.params.id`取值。区别在于刷新后`id`值不会丢失，而是一直存在于路由地址中

最后，路由的配置与`vue 2.x`版本无异，可以引用之前的路由结构，区别在于本项目中的路由配置结构十分的灵活，而且也做了很多`ts`的类型检测


### 五、全局css变量(换肤)


```javascript
// build/config/lessModifyVars

/**
 * less global variable
 */
const primaryColor = '#018ffb';
//{
const modifyVars = {
  'primary-color': primaryColor, //  Global dominant color
  'info-color': primaryColor, //  Default color
  'success-color': '#55D187', //  Success color
  'error-color': '#ED6F6F', //  False color
  'warning-color': '#EFBD47', //   Warning color
  'link-color': primaryColor, //   Link color
  'disabled-color': '#C2C2CC', //  Failure color
  'heading-color': '#2C3A61', //  Title color
  'text-color': '#2C3A61', //  Main text color
  'text-color-secondary ': '#606266', // Subtext color
  'background-color-base': '#F0F2F5', // background color
  'font-size-base': '14px', //  Main font size
  'box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)', //  Floating shadow
  'border-color-base': '#F0F0F0', //  Border color,
  'border-color-split': '#F0F0F0', //  Border color,
  'border-radius-base': '2px', //  Component/float fillet
};
//}

export { modifyVars, primaryColor };

```

在`vite.config.ts`

```javascript
import { modifyVars } from './build/config/lessModifyVars';

const viteConfig = {
	...
	cssPreprocessOptions: {
	    less: {
	      modifyVars: modifyVars,
	      javascriptEnabled: true
	    }
	}
}
```


### 样式

项目中使用的通用样式,都存放于`src/design`下面

```
.
├── ant # ant design 一些样式覆盖
├── color.less # 颜色
├── global.less # 全局class
├── helper # 辅助工具
├── index.less # 入口
├── mixins.less # mixin函数
├── public.less # 公共类
├── reset.less  # 重置样式
├── transition # 动画相关
└── var # 变量
```

- 深度选择器

原先在项目中我们习惯引用`/deep/`, 曾经是 `CSS` 的实际建议添加（甚至是 Chrome 本身提供的），但后来删除了。这引起了一些用户的困惑，因为他们担心`/deep/`在 `Vue SFC` 中使用它们会导致在删除该功能的浏览器中不支持其代码。但是，就像一样`>>>`，`/deep/`仅被 `Vue` 的 `SFC` 编译器用作编译时提示以重写选择器，并在最终 `CSS` 中被删除。所以，推荐使用`::v-deep`

```
<style scoped lang="less">
  .a ::v-deep(.b) {}
</style>
```

- reference

可以解决页面内重复引用导致实际生成的 style 样式表重复的问题

```
<style lang="less" scoped>
  @import (reference) '../../design/index.less';
<style>
```


### 安装axios

```
yarn add axios@next
```
axios 请求封装存放于`src/utils/http/axios`文件内

本项目中的axios可以根据项目自行修改配置

```
├── Axios.ts // axios实例
├── axiosCancel.ts // axiosCancel实例，取消重复请求
├── axiosTransform.ts // 数据转换类
├── checkStatus.ts // 返回状态值校验
├── index.ts // 接口返回统一处理
```

为了更好的引用`ts`的类型检测，所有的api请求参数及返回数据结构都可以遵循对应的数据结构来定义属性，不合格的数据类型返回直接会报错

由于业务需求，我们所有的项目开发都是通过`Nginx`反向代理，所以不需要配置那么多的环境变量，开发中也只需要在`vite.config.ts`中做一层开发环境的服务端`api proxy`代理即可

`axiosCancel.ts`是取消重复请求，即当超时时，同一个页面有多个请求时，有且仅会被拦截一次错误提示。

### Lint

使用 lint 的好处

具备基本工程素养的同学都会注重编码规范，而代码风格检查（Code Linting，简称 Lint）是保障代码规范一致性的重要手段。

遵循相应的代码规范有以下好处

- 较少 bug 错误率
- 高效的开发效率
- 更高的可读性

后期项目我们会集成以下几种代码校验方式

1、eslint 用于校验代码格式规范
2、stylelint 用于校验 css/less 规范
3、prettier 代码格式化

### 登录页面

前提都准备好了，接下来就正式开工了

先来一个登录页

登录其实就是一个简单的表单校验

```
<a-form :model="formData" :rules="formRules" ref="formRef">
	<a-form-item name="mail">
	  <a-input size="large" v-model:value="formData.mail" placeholder="输入登录邮箱" />
	</a-form-item>
	<a-form-item name="password">
	  <a-input-password
	    size="large"
	    visibilityToggle
	    v-model:value="formData.password"
	    placeholder="输入登录密码"
	  />
	</a-form-item>
	    
	<a-row>
	  <a-col>
	    <a-form-item>
	      <a-button type="link" size="small">忘记密码</a-button>
	    </a-form-item>
	  </a-col>
	</a-row>
	<a-form-item>
	  <a-button
	    type="primary"
	    size="large"
	    class="rounded-sm"
	    :block="true"
	    @click="login"
	    :loading="formState.loading"
	    >登录</a-button
	  >
	</a-form-item>
</a-form>
```

对比一下`Element-ui`的表单提交，其实还是非常的相似的，同样会给表单绑定`ref`和`rules`规则，这里仅说一下表单提交需要注意的地方

```
<script lang="ts">
import {
  defineComponent,
  unref
} from 'vue';

export default defineComponent({
	setup() {
	    const formRef = ref<any>(null);
	    
	    function handleLogin() {
	      const form = unref(formRef);
	      if (!form) return;
	      try {
	        // 表单校验通过下一步
	      } catch (error) {
	        // 表单校验不通过提示
	      } finally {
	        // 处理loading操作
	      }
	    }
	    
	    return {
	      formRef,
	      login: handleLogin
	    };
	}
})
```

这里有个语法糖`unref函数`

[unref](https://vue-composition-api-rfc.netlify.app/zh/api.html#unref) - 拆出原始值的语法糖

如果参数是一个 ref 则返回它的 value，否则返回参数本身。它是  `val = isRef(val) ? val.value : val`  的语法糖。

```
function useFoo(x: number | Ref<number>) {
  const unwrapped = unref(x) // unwrapped 一定是 number 类型
}
```

这里即拆`表单form``ref`下面的值，粗发表单校验。其它的大体都与`element ui`相似

这里还要再介绍一个日常基础版本的表单校验控件，日常的`admin`管理系统肯定会有很多的表单校验，那每个页面都写一堆的`form`模板还有一堆的`rule检验`等肯定非常的面条式代码，要避免这一问题，学会合理的偷懒，就可以应用本项目中封装的`form`组件，那怎么应用呢

```
<template>
    <div class="m-5 form-wrap">
    	// register 用于注册 useForm，如果需要使用useForm提供的 api，必须将 register 传入组件的
      <BasicForm @register="register" />
    </div>
</template>
<script lang="ts">
  import { BasicForm, useForm } from '/@/components/Form';
  import { defineComponent } from 'vue';
  import { schemas } from './add-schema';
  import { useMessage } from '/@/hooks/web/useMessage';
  export default defineComponent({
    components: { BasicForm },
    setup() {
      const { createMessage } = useMessage();
      const [register, { validate, setProps }] = useForm({
        labelCol: {
          span: 7,
        },
        wrapperCol: {
          span: 10,
        },
        schemas: schemas,
        actionColOptions: {
          offset: 8,
        },
        submitButtonOptions: {
          text: '提交',
        },
        submitFunc: customSubmitFunc,
      });

      async function customSubmitFunc() {
        try {
          await validate();
          setProps({
            submitButtonOptions: {
              loading: true,
            },
          });
          setTimeout(() => {
            setProps({
              submitButtonOptions: {
                loading: false,
              },
            });
            createMessage.success('提交成功！');
          }, 2000);
        } catch (error) {}
      }

      return { register };
    },
  });
</script>
```


```
// add-schema.ts
import { FormSchema } from '/@/components/Form';

export const schemas: FormSchema[] = [
  {
    field: 'taskType',
    component: 'Select',
    label: '任务类型',
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
          key: '1',
        },
        {
          label: '选项2',
          value: '2',
          key: '2',
        },
      ],
    },
    rules: [
      {
        required: true,
        message: '请输入aa',
      },
    ],
  },
  {
    field: 'title',
    component: 'Input',
    label: '任务标题',
    componentProps: {
      placeholder: '请输入任务标题',
    },
    required: true,
  },
  {
    field: 'des',
    component: 'Input',
    label: '任务描述',
    componentProps: {
      placeholder: '任务描述',
    },
    required: true,
  },
  {
    field: 'time',
    component: 'DatePicker',
    label: '截止时间',
    required: true,
    componentProps: {
      showTime: true
    }
  }
];

```

可以看出，所有的表单类型和`rules`都通过属性值来配置，有了这个`form`表单的组件，再也不用到处拷贝赋值，自由动态配置表单的场景即可。目前因为不太完善，所以建议暂时只应用于一些比较常见的表单组件应用

具体引用可以参考`src/views/task/create-new-task`


表单校验成功之后就会调用Api与服务端交互登录，所有的Api请求都放同一个目录下，按模块分类存放。这里与以往唯一的不同点就是多了一层`model`层，这层即对所有`api`请求的参数和返回的数据结构的接口定义。

`Api`接口请求成功之后，会封存`token`作为标识请求项目的所有信息，又涉及到了`vuex`数据状态管理

与以往不同的是，数据状态引用的是`import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators'``vuex-module-decorators`里面的`Api`，用法其实都是相似的，就是语法有点点改变

### 布局

登录成功后会有一个左上右的布局左右全局的基本`layout`结构，我们`PAGE_LAYOUT_COMPONENT`将它包裹，作为主骨架结构

左边的菜单栏作为单独的数组结构，也放在路由配置的文件夹中，具体配置可以参考项目中的`src/router/menus`文件目录

### 表格的增删改查

`admin 管理系统`最常见的常见无非就是表格的增删改查。

对比`element-ui`一堆的表格头，`antd`版本的`table`组件库灵活了很多，我们可以单独定义一个`table`组件，所有的`columns`自己定义一个对象来操作，这样灵活了很多。如

```

<a-table
    :columns="columns"
    :data-source="data"
    :rowKey='record => record.taskId'
    :pagination="pagination"
    @change="handleTableChange">
    <template #action="{ text, record }">
      <span>
        <a @click="handleViewDetails(record.taskId)">查看详情</a>
      </span>
    </template>
</a-table>


const columns = [
  {
    title: '任务批次编号',
    dataIndex: 'taskNo',
    key: 'taskNo',
    slots: { customRender: 'taskNo' },
  },
  {
    title: '任务编号',
    dataIndex: 'taskId',
    key: 'taskId',
    slots: { customRender: 'taskId' },
  },
  {
    title: '任务类型',
    dataIndex: 'taskType',
    key: 'taskType',
  },
  {
    title: '发布时间',
    key: 'publishTime',
    dataIndex: 'publishTime',
  },
  {
    title: 'Action',
    key: 'action',
    slots: { customRender: 'action' },
  },
];
```

也可以根据`slots`的属性特性，对某一列表格进行格式化或者重新定义的操作，总体来说，解决了原先一堆的`table-column`的重复操作，代码清爽简洁


本项目中写了一个基础版本的表格的增删改查的基础功能，具体可以查看`src/views/task/task-list`

由于时间有限，后续比较更完善更丰富的内容会等项目空闲慢慢的添加上来。

### 未完待续

...

### 总结

`Vue 3.0`对比以前的版本，总体来说，`Api`做了很多的升级，难度对比也上升了几个档次，有种渐渐向`React api`语法靠近的趋势，尤其是此次以`ts`升级的新版本，会让`Vue`对`ts`支持越来越友好，`ts`以后肯定会成为前端开发的主流，所以，学习`ts`刻不容缓，顺便再合着学一波`Vue 3.0`...

话虽如此，但是目前还不太建议立马用`Vue 3.0`进行项目开发，目前的主流框架`Element-ui`已经不会再升级`ts`支持的版本了，所以我们要转阵`Ant-design-vue`，虽然`UI`框架大同小异，但是确实是一下子又多了一样要学的东西（脑子不够用了）。而且`Vue 3.0`现在社区还不太活跃，所以可以再缓一缓。但是学习新版本的`Vue`肯定要提上日程，虽然我们不能做第一个吃螃蟹的人，但是我们得紧跟他们的脚步，要是拉得太远，就脱离潮流了。

