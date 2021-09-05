### 长按触发事件

<details>
  <summary>详细代码</summary>

  ```javascript
  const longpress = {
    bind: function (el, binding, vNode) {
      if (typeof binding.value !== 'function') {
        throw 'callback must be a function'
      }
      // 定义变量
      let pressTimer = null
      // 创建计时器（ 2秒后执行函数 ）
      let start = (e) => {
        if (e.type === 'click' && e.button !== 0) {
          return
        }
        if (pressTimer === null) {
          pressTimer = setTimeout(() => {
            handler()
          }, 2000)
        }
      }
      // 取消计时器
      let cancel = (e) => {
        if (pressTimer !== null) {
          clearTimeout(pressTimer)
          pressTimer = null
        }
      }
      // 运行函数
      const handler = (e) => {
        binding.value(e)
      }
      // 添加事件监听器
      el.addEventListener('mousedown', start)
      el.addEventListener('touchstart', start)
      // 取消计时器
      el.addEventListener('click', cancel)
      el.addEventListener('mouseout', cancel)
      el.addEventListener('touchend', cancel)
      el.addEventListener('touchcancel', cancel)
    },
    // 当传进来的值更新的时候触发
    componentUpdated(el, { value }) {
      el.$value = value
    },
    // 指令与元素解绑的时候，移除事件绑定
    unbind(el) {
      el.removeEventListener('click', el.handler)
    },
  }

  export default longpress

  ```

  ```javascript
  import longpress from './longpress'

  const install = function(Vue) {
    Vue.directive('longpress', longpress)
  }

  if (window.Vue) {
    window.longpress = longpress
    Vue.use(install); // eslint-disable-line
  }

  longpress.install = install
  export default longpress
  ```

</details>

### 使用
给 `Dom` 加上 `v-longpress` 及回调函数即可，默认长按两秒