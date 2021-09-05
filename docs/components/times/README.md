## 日期操作库

在日常的开发中，众所周知，[moment.js](https://github.com/moment/moment)以及[dayjs](https://github.com/iamkun/dayjs)是两个比较火热的`时间库`，前者是已经官方宣布停止继续更新了，虽说如此，在日常的项目开发过程中引进这两个库着实有点奢侈。
那日常开发中会有那些常见的日期操作中，本篇会罗列一些在业务开发过程中比较常见的场景

## 获取当前时间戳
<details>
  <summary>查看代码</summary>

  ```javascript
  var timestamp = Date.parse(new  Date()); //精确到秒
  var timestamp = (new Date()).valueOf();  //精确到毫秒
  var timestamp = new Date().getTime(); //精确到毫秒
  var timestamp = +new Date();
  var timestamp = Date.now();
  ```
</details>


## 获取指定时间戳
<details>
  <summary>查看代码</summary>

  ```javascript
  var timestamp = (new Date(" 2020/11/11 11:11:11")).getTime();
  var timestamp = (new Date(" 2020-11-11 11:11:11")).getTime();
  ```
</details>


## 日期转时间戳
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
   * @param {String} time - 日期字符串，如'2018-8-8','2018,8,8','2018/8/8'
   * @returns {Number} 返回值为时间毫秒值
   */
  function timeToTimestamp (time) {
      let date = new Date(time);
      let timestamp = date.getTime();
      return timestamp;
  }
  ```
</details>


## 按类型格式化日期
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
   * @param {*} date 具体日期变量
   * @param {string} dateType 需要返回类型
   * @return {string} dateText 返回为指定格式的日期字符串
   */
  function getFormatDate(date, dateType) {
      let dateObj = new Date(date);
      let month = dateObj.getMonth() + 1;
      let strDate = dateObj.getDate();
      let hours = dateObj.getHours();
      let minutes = dateObj.getMinutes();
      let seconds = dateObj.getSeconds();
      if (month >= 1 && month <= 9) {
          month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;

      }
      if (hours >= 0 && hours <= 9) {
          hours = "0" + hours
      }
      if (minutes >= 0 && minutes <= 9) {
          minutes = "0" + minutes
      }
      if (seconds >= 0 && seconds <= 9) {
          seconds = "0" + seconds
      }

      let dateText = dateObj.getFullYear() + '年' + (dateObj.getMonth() + 1) + '月' + dateObj.getDate() + '日';
      if (dateType == "yyyy-mm-dd") {
          dateText = dateObj.getFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getDate();
      }
      if (dateType == "yyyy.mm.dd") {
          dateText = dateObj.getFullYear() + '.' + (dateObj.getMonth() + 1) + '.' + dateObj.getDate();
      }
      if (dateType == "yyyy-mm-dd MM:mm:ss") {
          dateText = dateObj.getFullYear() + '-' + month + '-' + strDate + ' ' + hours + ":" + minutes + ":" + seconds;
      }
      if (dateType == "mm-dd MM:mm:ss") {
          dateText = month + '-' + strDate + ' ' + hours + ":" + minutes + ":" + seconds;
      }
      if (dateType == "yyyy年mm月dd日 MM:mm:ss") {
          dateText = dateObj.getFullYear() + '年' + month + '月' + strDate + '日' + ' ' + hours + ":" + minutes + ":" + seconds;
      }
      return dateText;
  }
  ```
</details>


## 判断时间格式是否有效
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
  * 短时间，如 (10:24:06)
  * @param  {string} str 需要验证的短时间
  * @return {boolean} 返回布尔值
  */
  function isTime(str) {
      var a = str.match(/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/);
      if (a == null) { return false; }
      if (a[1] >= 24 || a[3] >= 60 || a[4] >= 60) {
          return false
      }
      return true;
  }

  /**
  * 短日期，形如 (2019-10-24)
  * @param  {string} str 需要验证的短时间
  * @return {boolean} 返回布尔值
  */
  function strDateTime(str){
      var result = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
      if (result == null) return false;
      var d = new Date(result[1], result[3] - 1, result[4]);
      return (d.getFullYear() == result[1] && d.getMonth() + 1 == result[3] && d.getDate() == result[4]);
  }

  /**
  * 长日期时间，形如 (2019-10-24 10:24:06)
  * @param  {string} str 需要验证的短时间
  * @return {boolean} 返回布尔值
  */
  function strDateTime(str){
      var result = str.match(/^(\d{4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);
      if (result == null) return false;
      var d = new Date(result[1], result[3] - 1, result[4], result[5], result[6], result[7]);
      return (d.getFullYear() == result[1] && (d.getMonth() + 1) == result[3] && d.getDate() == result[4] && d.getHours() == result[5] && d.getMinutes() == result[6] && d.getSeconds() == result[7]);
  }
  ```
</details>


## 验证日期大小
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
  * 例："2019-10-24" 和 "2019-10-25"
  * @param  {string} d1需要验证的日期1
  * @param  {string} d2需要验证的日期2
  * @return {boolean} 返回布尔值
  */
  function compareDate(d1, d2) {
      return ((new Date(d1.replace(/-/g, "\/"))) < (new Date(d2.replace(/-/g, "\/"))));
  }
  ```
</details>


## 验证一个日期是不是今天
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
  * @param  {string} val 需要验证的日期
  * @return {boolean} 返回布尔值
  */
  function isToday(val){
      return new Date().toLocaleDateString() == new Date(val).toLocaleDateString();
  }
  ```
</details>


## 获取当前时间的前一天/后一天的时间戳
<details>
  <summary>查看代码</summary>

  ```javascript
  var timestamp = +new Date() - 24*60*60*1000;
  var timestamp = +new Date() + 24*60*60*1000;
  ```
</details>


## 今日零点时间戳
<details>
  <summary>查看代码</summary>

  ```javascript
  var timestamp = new Date(new Date().toLocaleDateString()).getTime();
  ```
</details>


## 今日最晚时间 23:59:59的时间戳
<details>
  <summary>查看代码</summary>

  ```javascript
  let timestamp = new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1;
  ```
</details>


## 获取当前时间的n天后的时间戳
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
   * @param {number} n 天数
   * @returns {Number} 返回值为时间毫秒值
   */
  function toNextTimes(n){
      let timestamp = +new Date() + n * 86400000;
      return timestamp;
  }
  ```
</details>


## 本周第一天
<details>
  <summary>查看代码</summary>

  ```javascript
  /***
   *  @return {*} WeekFirstDay 返回本周第一天的时间
   */
  function showWeekFirstDay(){
      let Nowdate=new Date();
      let WeekFirstDay=new Date(Nowdate-(Nowdate.getDay()-1)*86400000);
      return WeekFirstDay;
  }
  ```
</details>


## 本周最后一天
<details>
  <summary>查看代码</summary>

  ```javascript
  /***
   *  @return {*} WeekLastDay 返回本周最后一天的时间
   */
  function showWeekLastDay(){
      let Nowdate=new Date();
      let WeekFirstDay=new Date(Nowdate-(Nowdate.getDay()-1)*86400000);
      let WeekLastDay=new Date((WeekFirstDay/1000+6*86400)*1000);
      return WeekLastDay;
  }
  ```
</details>


## 本月第一天
<details>
  <summary>查看代码</summary>

  ```javascript
  /***
   *  @return {*} MonthFirstDay 返回本月第一天的时间
   */
  function showMonthFirstDay(){
      let Nowdate=new Date();
      let MonthFirstDay=new Date(Nowdate.getFullYear(),Nowdate.getMonth());
      return MonthFirstDay;
  }
  ```
</details>


## 本月最后一天
<details>
  <summary>查看代码</summary>

  ```javascript
  /***
   *  @return {*} MonthLastDay 返回本月最后一天的时间
   */
  function showMonthLastDay(){
      let Nowdate=new Date();
      let MonthNextFirstDay=new Date(Nowdate.getFullYear(),Nowdate.getMonth()+1);
      let MonthLastDay=new Date(MonthNextFirstDay-86400000);
      return MonthLastDay;
  }
  ```
</details>


## 返回指定时间戳之间的时间间隔
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
   *  @param {*} startTime 开始时间的时间戳
   *  @param {*} endTime 结束时间的时间戳
   *  @return {string} str 返回时间字符串
   */
  function getTimeInterval(startTime, endTime) {
      let runTime = parseInt((endTime - startTime) / 1000);
      let year = Math.floor(runTime / 86400 / 365);
      runTime = runTime % (86400 * 365);
      let month = Math.floor(runTime / 86400 / 30);
      runTime = runTime % (86400 * 30);
      let day = Math.floor(runTime / 86400);
      runTime = runTime % 86400;
      let hour = Math.floor(runTime / 3600);
      runTime = runTime % 3600;
      let minute = Math.floor(runTime / 60);
      runTime = runTime % 60;
      let second = runTime;
      let str = '';
      if (year > 0) {
          str = year + '年';
      }
      if (year <= 0 && month > 0) {
          str = month + '月';
      }
      if (year <= 0 && month <= 0 && day > 0) {
          str = day + '天';
      }
      if (year <= 0 && month <= 0 && day <= 0 && hour > 0) {
          str = hour + '小时';
      }
      if (year <= 0 && month <= 0 && day <= 0 && hour <= 0 && minute > 0) {
          str = minute + '分钟';
      }
      if (year <= 0 && month <= 0 && day <= 0 && hour <= 0 && minute <= 0 && second > 0) {
          str += second + '秒';
      }
      str += '前';
      return str;
  }
  ```
</details>


## 判断是否为闰年
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
  * @param  {number} year 要判断的年份
  * @return {boolean} 返回布尔值
  */
  function leapYear(year) {
      return !(year % (year % 100 ? 4 : 400));
  }
  ```
</details>


## 返回两个年份之间的闰年
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
  * @param  {number} start 开始年份
  * @param  {number} end 结束年份
  * @return {array}  arr 返回符合闰年的数组
  */
  function leapYears(start, end) {
      let arr = [];
      for (var i=start; i<end; i++) {
          if ( leapYear(i) ) {
              arr.push(i)
          }
      }
      return arr
  }
  ```
</details>


## 验证传入的日期是否是昨天
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
  * @param  {string} val 需要验证的日期
  * @return {boolean} 返回布尔值
  */
  function isYesterday(val) {
      var today = new Date();
      var yesterday = new Date(now - 1000 * 60 * 60 * 24);
      var test = new Date(val);
      if (yesterday.getYear() === test.getYear() && yesterday.getMonth() === test.getMonth() && yesterday.getDate() === test.getDate()) {
          return true;
      } else {
          return false;
      }
  }
  ```
</details>


## 设置几天后的日期
<details>
  <summary>查看代码</summary>

  ```javascript
  /**
  * @param  {string} date 起始日期
  * @param  {number} day 向后的天数
  * @return {string} 返回想要得到的日期
  */
  function convertDate (date, day) {
    let tempDate = new Date(date);
    tempDate.setDate(tempDate.getDate()+day);
    let Y = tempDate.getFullYear();
    let M = tempDate.getMonth()+1 < 10 ? '0'+(tempDate.getMonth()+1) : tempDate.getMonth()+1;
    let D = tempDate.getDate() < 10 ? '0'+(tempDate.getDate()) : tempDate.getDate();
    let result = Y + "-" + M + "-" + D
    return result;
  }
  ```
</details>