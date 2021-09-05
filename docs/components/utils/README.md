## 工具库

### 验证身份证号, 支持1/2代(15位/18位数字)
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
   * @param { string } value
   */
  export const isIDCard = value => /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/g.test(value);

  ```
</details>


### 验证手机号中国(严谨), 根据工信部2019年最新公布的手机号段
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
   * @param { string } value
   */
  export const isMPStrict = value => /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/g.test(value);
  ```
</details>


### 验证手机号中国(宽松), 只要是13,14,15,16,17,18,19开头即可
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
   * @param { string } value
   */
  export const isMPRelaxed = value => /^(?:(?:\+|00)86)?1[3-9]\d{9}$/g.test(value);
  ```
</details>


### 验证座机电话(国内),如: 0341-86091234
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
   * @param { string } value
   */
  export const isLandlineTelephone = value => /\d{3}-\d{8}|\d{4}-\d{7}/g.test(value);
  ```
</details>


### 验证email(邮箱)
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
   * @param { string } value
   */
  export const isEmail = value => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g.test(value);
  ```
</details>


### 金钱格式化，三位加逗号
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
   *  @param { number } num
   */
  export const formatMoney = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  ```
</details>


### 判断手机是Andoird还是IOS
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
   *  0: ios
   *  1: android
   *  2: 其它
   */
  export function getOSType() {
    let u = navigator.userAgent, app = navigator.appVersion;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isIOS) {
      return 0;
    }
    if (isAndroid) {
      return 1;
    }
    return 2;
  }
  ```
</details>


### 生成指定范围随机数
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
   * @param { number } min 
   * @param { number } max 
   */
  export const RandomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  ```
</details>


### 生成随机字符串
<details>
  <summary>查看代码</summary>

  ```javascript
  export const generateRandomAlphaNum = len => {
    var rdmString = "";
    for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
    return rdmString.substr(0, len);
  }
  ```
</details>


### 数组乱序
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
   * @param {array} arr
   */
  export function arrScrambling(arr) {
    let array = arr;
    let index = array.length;
    while (index) {
      index -= 1;
      let randomIndex = Math.floor(Math.random() * index);
      let middleware = array[index];
      array[index] = array[randomIndex];
      array[randomIndex] = middleware
    }
    return array
  }
  ```
</details>


### 判断数据类型
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
   * @param {*} target 
   */
  export function type(target) {
    let ret = typeof(target);
    let template = {
      "[object Array]": "array",
      "[object Object]":"object",
      "[object Number]":"number - object",
      "[object Boolean]":"boolean - object",
      "[object String]":'string-object'
    };

    if(target === null) {
      return 'null';
    }else if(ret == "object"){
      let str = Object.prototype.toString.call(target);
      return template[str];
    }else{
      return ret;
    }
  }
  ```
</details>


### 下载
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
   * 下载文件xlsx、pdf、zip、rar
   * @param 二进制流 res
   * @param {string} name 
   */
  export function downloadFile(res, name) {
    var blob = new Blob([res.data], {
      type: 'application/xlsx'
    })
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, name)
    } else {
      var downloadElement = document.createElement('a')
      var href = window.URL.createObjectURL(blob) // 创建下载的链接
      downloadElement.href = href
      downloadElement.download = name; // 下载后文件名
      document.body.appendChild(downloadElement)
      downloadElement.click() // 点击下载
      document.body.removeChild(downloadElement) // 下载完成移除元素
      window.URL.revokeObjectURL(href) // 释放掉blob对象
    }
  }
  ```
</details>


### 验证中文和数字
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
   * @param { string } value
   */
  export const isCHNAndEN = value => /^((?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])|(\d))+$/g.test(value);
  ```
</details>


### 验证不能包含字母
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
   * @param { string } value
   */
  export const isNoWord = value => /^[^A-Za-z]*$/g.test(value);
  ```
</details>


### 验证必须带端口号的网址(或ip)
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
   * @param { string } value
   */
  export const isHttpAndPort = value => /^((ht|f)tps?:\/\/)?[\w-]+(\.[\w-]+)+:\d{1,5}\/?$/g.test(value);
  ```
</details>


### 验证统一社会信用代码
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
   *  @param { string } value
   */
  export const isCreditCode = value => /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/g.test(value);

  ```
</details>

### 验证银行卡号（10到30位, 覆盖对公/私账户, 参考微信支付）
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
   * @param { string } value
   */
  export const isAccountNumber = value => /^[1-9]\d{9,29}$/g.test(value);
  ```
</details>


### 验证中文姓名
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
   * @param { string } value
   */
  export const isChineseName = value => /^(?:[\u4e00-\u9fa5·]{2,16})$/g.test(value);
  ```
</details>


### 验证英文姓名
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
   * @param { string } value
   */
  export const isEnglishName = value => /(^[a-zA-Z]{1}[a-zA-Z\s]{0,20}[a-zA-Z]{1}$)/g.test(value);

  ```
</details>


### 验证车牌号(新能源)
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
   * @param { string } value
   */
  export const isLicensePlateNumberNER = value => /[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))$/g.test(value);
  ```
</details>

### 验证车牌号(非新能源)
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
   * @param { string } value
   */
  export const isLicensePlateNumberNNER = value => /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/g.test(value);
  ```
</details>


### 验证小数
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
   * @param { string } value
   */
  export const isDecimal = value => /^\d+\.\d+$/g.test(value);
  ```
</details>


### 验证数字
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
   * @param { string } value
   */
  export const isNumber = value => /^\d{1,}$/g.test(value);
  ```
</details>


### 获取url参数
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
   * @param {*} name
   * @param {*} origin
   */
  export function getUrlParams(name, origin = null) {
      let url = location.href;
      let temp1 = url.split('?');
      let pram = temp1[1];
      let keyValue = pram.split('&');
      let obj = {};
      for (let i = 0; i < keyValue.length; i++) {
          let item = keyValue[i].split('=');
          let key = item[0];
          let value = item[1];
          obj[key] = value;
      }
      return obj[name];
  }
  ```
</details>


### 获取窗口可视范围宽度
<details>
  <summary>查看代码</summary>

  ```javascript
  export function getPageViewWidth() {
    let d = document,
      a = d.compatMode == "BackCompat" ? d.body : d.documentElement;
    return a.clientWidth;
  }
  ```
</details>


### 获取滚动条距顶部高度
<details>
  <summary>查看代码</summary>

  ```javascript
  export function getPageScrollTop() {
    let a = document;
    return a.documentElement.scrollTop || a.body.scrollTop;
  }

  ```
</details>


### 开启全屏
<details>
  <summary>查看代码</summary>

  ```javascript
 /**
   * @param {*} element
   */
  export function launchFullscreen(element) {
      if (element.requestFullscreen) {
          element.requestFullscreen()
      } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
      } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen()
      } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullScreen()
      }
  }
  ```
</details>


### 关闭全屏
<details>
  <summary>查看代码</summary>

  ```javascript
  export function exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  }
  ```
</details>


### 平滑滚动到页面顶部
<details>
  <summary>查看代码</summary>

  ```javascript
  export const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - c / 8);
    }
  };

  ```
</details>


### localStorage 存储
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
   * 目前对象值如果是函数 、RegExp等特殊对象存储会被忽略
   * @param { String } key  属性
   * @param { string } value 值
   */
  export const localStorageSet = (key, value) => {
    if (typeof (value) === 'object') value = JSON.stringify(value);
    localStorage.setItem(key, value)
  };
  ```
</details>


### localStorage 获取
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
   * @param {String} key  属性
   */
  export const localStorageGet = (key) => {
    return localStorage.getItem(key)
  };
  ```
</details>


### localStorage 移除
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
   * @param {String} key  属性
   */
  export const localStorageRemove = (key) => {
    localStorage.removeItem(key)
  };
  ```
</details>


### localStorage 存储某一段时间失效
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
   * @param {String} key  属性
   * @param {*} value 存储值
   * @param { number } expire 过期时间,毫秒数
   */
  export const localStorageSetExpire = (key, value, expire) => {
    if (typeof (value) === 'object') value = JSON.stringify(value);
    localStorage.setItem(key, value);
    setTimeout(() => {
      localStorage.removeItem(key)
    }, expire)
  };

  ```
</details>


### 随机16进制颜色 hexColor
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
   * 方法一
   */
  export function hexColor() {

      let str = '#';
      let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
      for (let i = 0; i < 6; i++) {
          let index = Number.parseInt((Math.random() * 16).toString());
          str += arr[index]
      }
      return str;
  }
  ```
</details>


### 数字超过规定大小加上加号“+”，如数字超过99显示99+
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
   * @param { number } val 输入的数字
   * @param { number } maxNum 数字规定界限
   */
  export const outOfNum = (val, maxNum) =>{
    val = val ? val-0 :0;
    if (val > maxNum ) {
      return `${maxNum}+`
    }else{
      return val;
    }
  };

  ```
</details>


### 动态插入表单
<details>
  <summary>查看代码</summary>

  ```javascript
  postToPage(obj) {
    var f = document.createElement('form');
    f.style.display = 'none';
    f.action = obj.returnUrl;
    f.method = 'post';
    f.innerHTML = '<input type="hidden" name="name" value="'+obj.name+'"/>';
    document.body.appendChild(f);
    f.submit();
  }

  ```
</details>


### script标签保存任意信息
<details>
  <summary>查看代码</summary>

  ```javascript
  <script type="text" id="template">
    <h1>欢迎关注公众号：猴哥说前端</h1>
  </script>

  var text = document.getElementById('template').innerHTML
  ```
</details>


### 浏览器秒变编辑器(空白)
<details>
  <summary>查看代码</summary>

  ```javascript
  // 将以下代码复制粘贴到浏览器地址栏，运行后浏览器就变成了一个原始简单的编辑器
  data:text/html, <html contenteditable>
  ```
</details>


### 浏览器秒变编辑器(页面可编辑)
<details>
  <summary>查看代码</summary>

  ```javascript
  document.body.contentEditable='true';
  ```
</details>


### 添加样式类
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
   * @param {Element} el 元素
   * @param {String} className 样式名
   */
  export function addClass(el, className) {
    if (hasClass(el, className)) {
      return
    }
    const newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
  }
  ```
</details>


### 移除样式类
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
   * @param {Element} el 元素
   * @param {String} className 样式名
   */
  export function removeClass(el, className) {
    if (!hasClass(el, className)) {
      return
    }
    const newClassList = el.className.split(' ')
    newClassList.splice(newClassList.indexOf(className), 1)
    el.className = newClassList.join(' ')
  }
  ```
</details>


### 判断是否有样式类
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
   * @param {Element} el 元素
   * @param {String} className 样式名
   */
  export function hasClass(el, className) {
    const reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
  }
  ```
</details>


### 检查是否为空
<details>
  <summary>查看代码</summary>

  ```javascript
  export const isEmpty = x =>  {
    if(Array.isArray(x)
      || typeof x === 'string'
      || x instanceof String
    ) {
      return x.length === 0;
    }
    if(x instanceof Map || x instanceof Set) {
      return x.size === 0;
    }
    if(({}).toString.call(x) === '[object Object]') {
      return Object.keys(x).length === 0;
    }
    return false;
  }
  ```
</details>
