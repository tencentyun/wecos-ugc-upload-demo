# 腾讯云COS微信小程序UGC上传示例


## 功能介绍

本示例实现了从微信小程序将用户的UGC资源直接上传至[COS（腾讯云对象存储服务）](https://www.qcloud.com/product/cos)

## 准备工作

* 进入[腾讯云官网](https://www.qcloud.com)，注册帐号
* 登录[云对象存储服务（COS）控制台](https://console.qcloud.com/cos4)，开通COS服务，创建Bucket
* 使用微信官方提供的[小程序开发工具](https://servicewechat.com/wxa-dev-logic/download_redirect?type=x64&from=mpwiki)，创建一个新项目
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

创建完项目之后，会得到一个脚手架，其中比较重要的文件如下

app.js 是小程序入口文件

app.json 是小程序的微信配置，其中指定了本示例的上传页面index

pages/ 内包含各个页面的入口和配置，业务逻辑

## 开始

* 在`utils`目录下创建`config.js`，在里面填好COS的配置项
* 调用`wx.request`方法请求配置里指定的鉴权域名，获取COS上传所需签名
* 调用`wx.chooseImage`方法获取用户上传的图片
* 调用`wx.upload`方法发起一个COS的上传请求，在header里带上前面获取的签名
* 上传成功

## 配置
```json
{
"cosSignatureUrl": "sign_url",
    "region": "tj",
    "appid": "123456789",
    "bucketname": "xxx",
    "dir_name": "y"
}
```
这些配置项在完成准备工作之后，可以在[COS控制台](https://console.qcloud.com/cos4)拿到

其中cosSignatureUrl是用户自己提供的鉴权Server域名

## 鉴权
cosAPI调用需要鉴权，鉴权有两种方式：

1.前端鉴权，不推荐，会暴露私钥。

2.服务端鉴权，推荐，安全性高，本示例采用该种方式，鉴权url可在`utils/config.js`里配置。

ps: 鉴权Server需要自己提供，这里有一个[实现示例](https://github.com/tencentyun/cos-auth)，你也可以参考其中的方法自己实现。 









