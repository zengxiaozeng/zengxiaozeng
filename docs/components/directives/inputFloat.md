### 两位小数

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

### 使用
```html
<template>
  <el-input v-input-float />
</template>
```