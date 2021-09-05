### 阿里App内支付

### 第一步：[静默授权，获取code](https://opendocs.alipay.com/open/284/106000)

不同于微信支付环境的静默授权登录，这里的静默授权真的是无感的，不会在单前页面再刷新一遍。为了全流程跑通，同样建议做好支付宝开发者平台配置，把服务端环境切到生产环境调试，同样还有前端外网可访问的带https证书的域名

![阿里支付授权流程图](/zxz/images/projects/h5/alipay_01.png)

- 1、通过调用 `JSAPI` `ap.getAuthCode` 接口在当前页面唤起半屏授权浮层
- 2、用户确认授权后，接口返回 `auth_code`
- 3、开发者通过 `alipay.system.oauth.token` 接口，使用 `auth_code` 换取 `access_token` 及用户的 `user_id`。如果需要除 `user_id` 以外的其他信息，则使用 `access_token` 调用 `alipay.user.info.share`获得用户信息。

```
// 头部引入Alipay script
<script src="https://gw.alipayobjects.com/as/g/h5-lib/alipayjsapi/3.1.1/alipayjsapi.min.js"></script>

// 生命周期函数调用getAuthCode
ap.getAuthCode({
  appId: that.appId,
  scopes: ['auth_base']
}, function (res) {
  authCode = res.authCode // 拿到authCode
})
```

### 第二步：换取 `access_token` 和 `user_id`

得到 `auth_code` 后，开发者通过 alipay.system.oauth.token(由服务端调用) 接口，使用 auth_code 换取 access_token 及用户的 user_id。auth_code 作为换取 access_token 的凭证

在第二步中，我们同样只需要拿`auth_code`去换取服务端返回的`openId`即可，这里的`access_token`由服务端调用

### 第三步：获取外部订单号

要拉起`alipay`，还需要这个外部订单号，直接拿到商户号去换取对应的外部订单号即可

### 第四步：发起支付订单

```
bankCode: this.bankCode, // 支付方式，这里是wx
bizMchNo: this.bizMchNo, // 商户号
orderAmount: this.orderAmount, // 订单金额
outOrderNo: this.outOrderNo, // 外部订单号
remark: this.remarks // 备注，可选
```

### 第四步：[唤起alipay支付](http://myjsapi.alipay.com/alipayjsapi/util/pay/tradePay.html)

```javascript
ap.tradePay({
  tradeNO: payData.data.data.aliPrepayId // 这里的tradeNO为第四步返回的值
}, function(res) {
  switch (res.resultCode) {
    ...
  }
});
```
我们只要处理成功、失败、处理中、和取消这四种状态，而这里的取消状态不同于成功失败，是不需要做任何处理的！！！
![阿里支付](/zxz/images/projects/h5/alipay_02.png)