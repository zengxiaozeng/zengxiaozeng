### 自定义权限指令

背景：在一些后台管理系统，我们可能需要根据用户角色进行一些操作权限的判断，很多时候我们都是粗暴地给一个元素添加 v-if / v-show 来进行显示隐藏，但如果判断条件繁琐且多个地方需要判断，这种方式的代码不仅不优雅而且冗余。针对这种情况，我们可以通过全局自定义指令来处理。
需求：自定义一个权限指令，对需要权限判断的 Dom 进行显示隐藏。

<details>
  <summary>详细代码</summary>

  ```javascript
  function checkArray(key) {
    let arr = ['1', '2', '3', '4']
    let index = arr.indexOf(key)
    if (index > -1) {
      return true // 有权限
    } else {
      return false // 无权限
    }
  }

  const permission = {
    inserted: function (el, binding) {
      let permission = binding.value // 获取到 v-permission的值
      if (permission) {
        let hasPermission = checkArray(permission)
        if (!hasPermission) {
          // 没有权限 移除Dom元素
          el.parentNode && el.parentNode.removeChild(el)
        }
      }
    },
  }

  export default permission
  ```

  ```javascript
  import permission from './permission'

  const install = function(Vue) {
    Vue.directive('permission', permission)
  }

  if (window.Vue) {
    window.permission = permission
    Vue.use(install); // eslint-disable-line
  }

  permission.install = install
  export default permission
  ```

</details>

### 使用
```html
<template>
  <div class="btns">
    <!-- 显示 -->
    <button v-permission="'1'">权限按钮1</button>
    <!-- 不显示 -->
    <button v-permission="'10'">权限按钮2</button>
  </div>
</template>
```