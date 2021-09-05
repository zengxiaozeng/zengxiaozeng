### H5支付

前端的支付分两种，h5支付和Native支付

所谓的h5支付，是指商户在微信客户端外的移动端网页展示商品或服务，用户在前述页面确认使用微信支付时，商户发起本服务呼起微信客户端进行支付。

[微信官方体验链接](https://wxpay.wxutil.com/mch/pay/h5.v2.php)

流程图

![流程图](/zxz/images/projects/h5/chapter.png)

1、用户在商户侧完成下单，使用微信支付进行支付

2、由商户后台向微信支付发起下单请求（调用统一下单接口）注：交易类型trade_type=MWEB

3、统一下单接口返回支付相关参数给商户后台，如支付跳转url（参数名"mweb_url"），商户通过mweb_url调起微信支付中间页

4、中间页进行H5权限的校验，安全性检查

5、如支付成功，商户后台会接收到微信侧的异步通知

6、用户在微信支付收银台完成支付或取消支付,返回商户页面（默认为返回支付发起页面）

7、商户在展示页面，引导用户主动发起支付结果的查询（弹窗或者轮询）

8、状态页面

```javascript
const { mwebUrl } = res.data.data // 我们只需要处理第三步服务端返回的mwebUrl拼接redirect_url回调url（需对redirect_url进行urlencode处理）
window.location.href = (`${mwebUrl}&redirect_url=${encodeURIComponent(redirect_url)}`)
```

9、可能出现的错误码
![错误图](/zxz/images/projects/h5/error.png)