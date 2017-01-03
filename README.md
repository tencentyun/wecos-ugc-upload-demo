# 腾讯云COS微信小程序UGC上传示例

## 功能介绍

本示例实现了从小程序将用户的UGC资源直接上传至COS，在使用之前，请先登录[COS控制台](https://console.qcloud.com/cos)，创建bucket用于存储数据。

## 源码简介

```tree
README.md
app
├── app.js
├── app.json
├── app.wxss
├── pages
│   ├── index
│   │   ├── index.js
│   │   ├── index.json
│   │   ├── index.wxss
│   │   └── index.wxml
└── utils
    ├── config.js
    └── util.js
```

app.js 是小程序入口文件。

app.json 是小程序的微信配置，其中指定了本示例的上传页面index

utils/config.js 是我们自己的配置，里面指定了COS的配置信息（地域，appid，bucket，dirname等）


## 鉴权
cosAPI调用需要鉴权，鉴权有两种方式：

1.前端鉴权，不推荐，会暴露私钥。

2.服务端鉴权，推荐，安全性高，本示例采用该种方式，鉴权url可在`utils/config.js`里配置。

ps: 鉴权Server需要自己提供，这里有一个[实现示例](https://github.com/tencentyun/cos-auth)，你也可以参考其中的方法自己实现。 









