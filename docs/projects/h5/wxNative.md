## 微信App内支付

简介：如果用户在微信客户端中访问第三方网页，公众号可以通过微信网页授权机制，来获取用户基本信息，进而实现业务逻辑。

简明扼要，要实现在微信App内扫码h5付款，第一步就是要授权获取用户信息，拿到微信的`authCode`，通常在微信中我们是采用`静默授权`方式

先来说说`静默授权`

微信支付目前是没有沙箱环境的（测试环境），为了让全流程走通，得让服务端配合把环境切换到生产环境调试，你没看错，确实是要把环境切换到生产环境，这是第一步。然后你要把前端资源部署到外网能访问，不能局限于局域网，并且配置好对应的https证书，。第三部你还得配合修改微信开发者平台后台配置，把对应的前端域名和服务端的地址都配置好，这样就不会产生域名资源不解析的问题了。

这里要注意一点，以上所说的内容是针对支付主流程全部走通的情况，如果单单是拿到`微信授权`返回`code`来说，还是有开发环境这一说法的

微信的授权主要分两点，一种是主动授权，即打开页面后唤起授权弹窗，让用户主动选择是否授权操作；一种是静默授权，即用户无感授权，有些不好的体验性在于进入页面后会重新刷新一次拿到微信的`回调授权code`

## 主要目录：

### 第一步：用户同意授权，获取code

在确保微信公众账号拥有授权作用域（scope参数）的权限的前提下（服务号获得高级接口后，默认拥有scope参数中的snsapi_base和snsapi_userinfo），引导关注者打开如下页面：

```
https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
```

注意：由于授权操作安全等级较高，所以在发起授权请求时，微信会对授权链接做正则强匹配校验，如果链接的参数顺序不对，授权页面将无法正常访问。即我们要在页面的初始化生命周期调用这个地址，`appid`和`redirect_uri`都是我们需要自定义的内容，其它点的位置保持不变

![微信参数解析](/zxz/images/projects/h5/wxpay_01.jpg)

前面提到过的静默授权和主动授权即图表中`scope`的属性值，`snsapi_base`即静默授权，`snsapi_userinfo`主动授权，本文中用的是静默授权

`redirect_uri`就是我们当前页面的域名地址，静默授权后会进入到`redirect_uri`地址中，后面会拼接一个由于微信添加的`code`参数，就是我们要拿到的`授权code`

代码如下

```javascript
mounted() {
  if (支付环境是微信内...) {
    // 这里还要对redirect_uri单独做一个转码处理，否则可能会造成回调路劲失效，跳转不回来
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appId}&redirect_uri=${encodeURIComponent(window.location.href)}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
  }
}
```

`授权code`就是`window.location.href?code=${......}`以这样的形式返回给我们的

### 第二步：通过code换取网页授权access_token

这里通过code换取的是一个特殊的网页授权`access_token`,与基础支持中的`access_token`（该`access_token`用于调用其他接口）不同。公众号可通过下述接口来获取网页授权`access_token`。如果网页授权的作用域为`snsapi_base`，则本步骤中获取到网页授权`access_token`的同时，也获取到了`openid`，`snsapi_base`式的网页授权流程即到此为止。

拿到这个`auth_code`，我们可以去服务端请求，获取对应的`openId`，即后面支付要用到的前端的`access_token`，这里真正和微信交互获取`access_token`的操作有服务端完成，前端拿到对应的`openId`即可

### 第三步：获取外部订单号

要拉起微信，还需要这个外部订单号，这个也是不需要和微信交互，直接拿到商户号去换取对应的外部订单号即可

### 第四步：发起支付订单

```
bankCode: this.bankCode, // 支付方式，这里是wx
bizMchNo: this.bizMchNo, // 商户号
orderAmount: this.orderAmount, // 订单金额
outOrderNo: this.outOrderNo, // 外部订单号
remark: this.remarks // 备注，可选
```

### 第五步 `WeixinJSBridge`唤起支付

支付本文用的场景是[JSAPI支付](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=7_1)

```javascript
WeixinJSBridge.invoke(
  'getBrandWCPayRequest', {
    appId: this.appId,
    timeStamp: obj.spTimestamp,
    nonceStr: obj.spNonceStr, // 随机串
    package: obj.spPackages,
    signType: obj.spSignType, // 微信签名方式
    paySign: obj.spPaySign // 微信签名
  }, function(res) {
    if (res.err_msg === 'get_brand_wcpay_request:ok' ) {
      // 使用以上方式判断前端返回,微信团队郑重提示：
      // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
      that.$toast('成功')
    } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
      
    }
  }
);
```

在微信浏览器里面打开H5网页中执行JS调起支付。接口输入输出数据格式为JSON。

注意：WeixinJSBridge内置对象在其他浏览器中无效。

getBrandWCPayRequest参数以及返回值定义：

1、网页端接口请求参数列表（参数需要重新进行签名计算，参与签名的参数为：appId、timeStamp、nonceStr、package、signType，参数区分大小写。）

![微信支付参数](/zxz/images/projects/h5/wxpay_02.jpg)

一下为微信支付回调。需要注意的一点，这里有个`get_brand_wcpay_request:cancel`取消的状态，这种状态不同于成功失败，是不需要做任何处理的！！！

![微信支付回调](/zxz/images/projects/h5/wxpay_03.jpg)