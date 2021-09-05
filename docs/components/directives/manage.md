### 指令统一管理

这么多的指令，总不可能一个一个在主入口文件去导入吧，那样太麻烦了，及时是作为工具函数也要在每个文件中单独去导入，综上，这些都是不合理的方式。
对于指令来说，大都是在开发过程中引用频率比较高的，所以可以把它做成全局的，全局安装，只引用一次即可，这样在页面中哪里用到只要使用对应的指令即可。

```javascript
import waves from './waves'
import debounces from './debounces'
import throttles from './throttles'
...

export {
  waves,
  debounces,
  throttles,
  ...
}

```

然后主入口文件引用

```javascript
// main.js
import * as directives from './directive'

// 全局注册
Object.keys(directives).forEach(k => Vue.directive(k, directives[k]))
```

### 更多指令
等待补充......