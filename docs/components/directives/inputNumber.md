### 整数

<details>
  <summary>详细代码</summary>

  ```javascript
  /**
   * input输入框只能输入数字的检验指令
   */
  export default {
    bind: function(el, binding) {
      el.onkeypress = function(e) {
        const ev = e || event
        // ev.which兼容firefox， String.fromCharCode（将 Unicode 编码转为一个字符）
        return (/[\d]/.test(String.fromCharCode(ev.keyCode || ev.which))) || ev.which === 8
      }
    }
  }
  ```

  ```javascript
  import inputNumber from './inputNumber'

  const install = function(Vue) {
    Vue.directive('inputNumber', inputNumber)
  }

  if (window.Vue) {
    window.inputNumber = inputNumber
    Vue.use(install); // eslint-disable-line
  }

  inputNumber.install = install
  export default inputNumber
  ```

</details>

### 使用
```html
<template>
  <el-input v-input-number />
</template>
```
<font>注意：</font>最好配合着`Element`的`el-input-number`一起用，这样就可以避免在中文输入法下直接按输入法切换而造成的异常问题
