## 过滤器
过滤器的作用有多优秀这里就不做过多阐述了，格式化服务端数据，日期、状态枚举值，返回结果是否为空...有了过滤器，可以帮我们干很多脏活累活。

在日常的项目开发中，一个大项目或多或少都会有很多数据需要处理，到处去引用页面内的过滤器让项目臃肿不少，所以这里介绍全局的过滤使用。

## 作用
`filters`不会修改数据，只是改变用户看到的输出（效果）
（计算属性 `computed` ，方法 `methods` 都是通过修改数据来处理数据格式的输出显示）

## Eg
<details>
  <summary>是否为空</summary>

  ```javascript
  export function formatNull(val) {
    if (val) {
      return val
    } else {
      return '-'
    }
  }
  ```
</details>

<details>
  <summary>格式化状态</summary>

  ```javascript
  export function formatStatus(val) {
    switch (val) {
      case '0':
        return '失败'
      case '1':
        return '成功'
      default:
        return '待处理'
    }
  }
  ```
</details>

<details>
  <summary>时间戳格式化</summary>

  ```javascript
  export function formatStamp(timeStamp) {
    const Y = new Date(timeStamp).getFullYear()
    const M = ('0' + String(new Date(timeStamp).getMonth() + 1)).slice(-2)
    const D = ('0' + String(new Date(timeStamp).getDate())).slice(-2)
    const h = ('0' + String(new Date(timeStamp).getHours())).slice(-2)
    const m = ('0' + String(new Date(timeStamp).getMinutes())).slice(-2)
    const s = ('0' + String(new Date(timeStamp).getSeconds())).slice(-2)
    return `${Y}-${M}-${D} ${h}:${m}:${s}`
  }
  ```
</details>

<details>
  <summary>金额格式显示</summary>

  ```javascript
  export function toThousandFilter(num) {
    return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
  }
  ```
</details>


## 使用

```javascript
import * as filters from './filters' // global filters

// 全局引用
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

<span>{{ value | formatName }}</span> // 无需再写本地过滤器或inport其它文件
<div :value="变量名 | filterValue"></div>
```