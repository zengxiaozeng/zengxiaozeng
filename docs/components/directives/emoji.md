### 自定义权限指令

<details>
  <summary>详细代码</summary>

  ```javascript
  let findEle = (parent, type) => {
    return parent.tagName.toLowerCase() === type ? parent : parent.querySelector(type)
  }

  const trigger = (el, type) => {
    const e = document.createEvent('HTMLEvents')
    e.initEvent(type, true, true)
    el.dispatchEvent(e)
  }

  const emoji = {
    bind: function (el, binding, vnode) {
      // 正则规则可根据需求自定义
      var regRule = /[^\u4E00-\u9FA5|\d|\a-zA-Z|\r\n\s,.?!，。？！…—&$=()-+/*{}[\]]|\s/g
      let $inp = findEle(el, 'input')
      el.$inp = $inp
      $inp.handle = function () {
        let val = $inp.value
        $inp.value = val.replace(regRule, '')

        trigger($inp, 'input')
      }
      $inp.addEventListener('keyup', $inp.handle)
    },
    unbind: function (el) {
      el.$inp.removeEventListener('keyup', el.$inp.handle)
    },
  }

  export default emoji

  ```

  ```javascript
  import emoji from './emoji'

  const install = function(Vue) {
    Vue.directive('emoji', emoji)
  }

  if (window.Vue) {
    window.emoji = emoji
    Vue.use(install); // eslint-disable-line
  }

  emoji.install = install
  export default emoji
  ```

</details>