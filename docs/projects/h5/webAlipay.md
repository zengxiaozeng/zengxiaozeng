## 阿里web支付

准入条件

- 1、申请前必须拥有经过实名认证的支付宝账户；

- 2、企业或个体工商户可申请；

- 3、需提供真实有效的营业执照，且支付宝账户名称需与营业执照主体一致；

- 4、网站能正常访问且页面显示完整，网站需要明确经营内容且有完整的商品信息；

- 5、网站必须通过ICP备案。如为个体工商户，网站备案主体需要与支付宝账户主体名称一致；

- 6、如为个体工商户，则团购不开放，且古玩、珠宝等奢侈品、投资类行业无法申请本产品

AliPay web支付实现过程通常是跳转一个第三方网址，然后在当前第三方页面直接拉起支付宝支付，或者通过第三方页面里面的web账号登录支付

支付需要的参数一般如下

```javascript
params = {
  bankCode // 支付方式，这里为ali
  token // web的token由服务端接口返回
  returnUrl // 支付回调页路劲，ali支付不需要做转码处理
}
```

- 7、支付
```javascript
pay(params)
  .then(res => {
    // 以下几位拉起第三方页面阿里支付的代码
    const oDiv = document.createElement('div');
    oDiv.innerHTML = res.data.data.form;
    document.body.appendChild(oDiv);
    document.forms[0].submit();
    oDiv.remove()
  })
```

- 8、处理状态页

支付成功失败与否，都会通过我们设置的`returnUrl`回调回来当前的页面，由于支付结果是异步返回的，所以这里需要我们手动去查询支付的结果状态。同样也有成功、失败、取消、处理中四种状态，取消是不做任何处理的，处理中的话需要做一个轮询查询当前订单状态。