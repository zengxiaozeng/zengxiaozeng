### 整数

<details>
  <summary>详细代码</summary>

  ```javascript
  function thorttle(fn, gap = 500) {
    let last_run = null;
    return (...arg) => {
      const now = new Date();
      if (!last_run || now - last_run > gap * 1) {
        fn(...arg);
        last_run = new Date();
      }
    };
  }

  export default {
    bind(el, { arg, value, modifiers }, vnode) {
      const gap =
        modifiers && Object.keys(modifiers).length !== 0
          ? Object.keys(modifiers)[0]
          : 500;
      const t_fn = thorttle(value.bind(vnode), gap);
      el.addEventListener(arg, ev => {
        t_fn(ev);
      });
    }
  }

  ```

  ```javascript
  import throttles from './throttles'

  const install = function(Vue) {
    Vue.directive('throttles', throttles)
  }

  if (window.Vue) {
    window.throttles = throttles
    Vue.use(install); // eslint-disable-line
  }

  throttles.install = install
  export default throttles

  ```

</details>

### 使用

```html
<template>
  <el-button v-throttles:click.5000="方法名">确定</el-button>
</template>
```

<font>注意：</font>防抖在日常开发过程中使用是非常方便的，这个指令有一个小缺陷，方法名目前暂时只支持不携带参数的方法名，如果带了参数的话会容易出错。
