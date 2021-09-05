### 水印

给整个页面添加背景水印

<details>
  <summary>详细代码</summary>

  ```javascript
  function addWaterMarker(str, parentNode, font, textColor) {
    // 水印文字，父元素，字体，文字颜色
    var can = document.createElement('canvas')
    parentNode.appendChild(can)
    can.width = 200
    can.height = 150
    can.style.display = 'none'
    var cans = can.getContext('2d')
    cans.rotate((-20 * Math.PI) / 180)
    cans.font = font || '16px Microsoft JhengHei'
    cans.fillStyle = textColor || 'rgba(180, 180, 180, 0.3)'
    cans.textAlign = 'left'
    cans.textBaseline = 'Middle'
    cans.fillText(str, can.width / 10, can.height / 2)
    parentNode.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')'
  }

  const waterMarker = {
    bind: function (el, binding) {
      addWaterMarker(binding.value.text, el, binding.value.font, binding.value.textColor)
    }
  }

  export default waterMarker

  ```

  ```javascript
  import waterMarker from './waterMarker'

  const install = function(Vue) {
    Vue.directive('waterMarker', waterMarker)
  }

  if (window.Vue) {
    window.waterMarker = waterMarker
    Vue.use(install); // eslint-disable-line
  }

  waterMarker.install = install
  export default waterMarker
  ```

</details>

### 使用
`<div v-waterMarker="{text:'lzg版权所有',textColor:'rgba(180, 180, 180, 0.4)'}"></div>`