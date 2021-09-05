### 节流

<details>
  <summary>详细代码</summary>

  ```javascript
  function debounce(fn, delay = 500) {
    let timer = null;
    return (...args) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }

  export default {
    bind(el, { arg, value, modifiers }, vnode) {
      const delay =
        modifiers && Object.keys(modifiers).length !== 0
          ? Object.keys(modifiers)[0]
          : 500;
      const d_fn = debounce(value.bind(vnode), delay);
      el.addEventListener(arg, ev => {
        d_fn(ev);
      });
    }
  }
  ```

  ```javascript
  import debounces from './debounces'

  const install = function(Vue) {
    Vue.directive('debounces', debounces)
  }

  if (window.Vue) {
    window.debounces = debounces
    Vue.use(install); // eslint-disable-line
  }

  debounces.install = install
  export default debounces
  ```

</details>

### 使用

```html
<template>
  <el-button v-debounces:click.500="方法名">查询</el-button>
</template>
```