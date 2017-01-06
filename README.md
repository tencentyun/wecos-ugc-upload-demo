# WeCOS-UGC-DEMO——微信小程序用户资源上传COS示例

WeCOS-UGC-DEMO展示了微信小程序中有用户上传资源的场景时，如何结合[COS（腾讯云对象存储服务）](https://www.qcloud.com/product/cos)API将资源直接上传至COS

## 准备工作

* 进入[腾讯云官网](https://www.qcloud.com)，注册帐号
* 登录[云对象存储服务（COS）控制台](https://console.qcloud.com/cos4)，开通COS服务，创建资源需要上传的Bucket
* COS鉴权服务器部署及URL地址（用于调用COSAPI时的鉴权），此处直接用我们鉴权服务端示例[COS-AUTH](https://github.com/tencentyun/cos-auth)，后文也会提到
<br/>

## 源码简介

```tree
README.md
app
├── app.js
├── app.json
├── app.wxss
├── pages
│   ├── index
│   │   ├── index.js
│   │   ├── index.json
│   │   ├── index.wxss
│   │   └── index.wxml
└── utils
    ├── config.js
    └── util.js
```

app目录是小程序目录，如果你没有创建小程序项目，我们可以直接下载本项目的demo，或者通过小程序开发工具创建，具体如何注册和创建请查看[小程序入门指引](https://mp.weixin.qq.com/debug/wxadoc/introduction/index.html?t=1483674932)

    `app.js` 是小程序入口文件
    `app.json` 是小程序的微信配置，其中指定了本示例的用户资源上传页面`index`
    `pages目录` 内包含各个页面的入口和配置，业务逻辑，如index目录则为`index`页面

其中比较重要的文件如下：

`config.js` 配置文件

`index.js` 本示例中主要实现用户资源上传的方法
    

## 使用

1、在`utils`目录下创建`config.js`，在里面填好COS的配置项
2、引用`config.js`
3、调用`wx.request`方法请求配置里指定的COS鉴权域名，获取COS上传所需签名
4、调用`wx.chooseImage`方法获取用户上传的图片
5、调用`wx.upload`方法发起一个COS的上传请求，在header里带上前面获取的签名
6、上传成功

    其中2、3、4、5步可以直接看`app/pages/index/index.js`中的示例

## 配置相关
```json
{
    "cosSignatureUrl": "sign_url",
    "region": "tj",
    "appid": "123456789",
    "bucketname": "xxx",
    "dir_name": "y"
}
```

| 参数 | 格式 | 说明 |
|:--|:--|:--|
|cosSignatureUrl|**[String]**|鉴权服务器的域名|
|region|**[String]**|资源上传到的地区|
|appid|**[String]**|账户的appid|
|bucketname|**[String]**|资源上传到的bucket|
|dir_name|**[String]**|资源上传到的目录|


其中cosSignatureUrl是你自己提供的鉴权Server域名
这些配置项信息可以在[COS控制台](https://console.qcloud.com/cos4)拿到


## COS鉴权相关

调用COSAPI需要鉴权，用于获取签名，如果需要了解具体的鉴权算法，可查看[此处](https://www.qcloud.com/document/product/436/6054)

鉴权生成签名的算法需要用到SecretId、SecretKey，可在[COS控制台](https://console.qcloud.com/cos4/secret)查看

鉴权有两种方式：

1.前端鉴权，前端生成算法会暴露私钥。（**不推荐**）

2.服务端鉴权，安全性高，本示例采用该种方式。（**推荐**）

    鉴权Server需要你自己部署且提供URL地址，基于这种鉴权需求，我们提供了鉴权服务端示例[COS-AUTH](https://github.com/tencentyun/cos-auth)

