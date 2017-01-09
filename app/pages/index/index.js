//index.js

/**
 * 需要配置COS相关的config信息
 * 详情可看API文档 https://www.qcloud.com/document/product/436/6066
 */
var config = {
  cosSignatureUrl: 'https://www.xxx.com', //填写自己的鉴权服务器地址
  region: 'tj',
  appid: '1253189073',
  bucketname: 'weixintest',
  dirname: ''
};

// 最终上传到cos的URL
var cosUrl = `https://${config.region}.file.myqcloud.com/files/v2/${config.appid}/${config.bucketname}${config.dirname}`
console.log(cosUrl)
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '上传文件到COS',
    userInfo: {}
  },
  //事件处理函数
  uploadToCos: function() {

      // 本示例直接选择本地的一个jpg文件
      var tempFilePaths = "C:\\Users\\galenye\\Desktop\\nba.jpg";

      // 指定上传后的文件名
      var fileName = "nba.jpg"

      // cos鉴权请求，获取签名
      wx.request({
        url: config.cosSignatureUrl,
        success: function(cosRes) {

          // 签名
          var signature = cosRes.data

          //把文件上传到cos，头部带上签名
          wx.uploadFile({
            url: `${cosUrl}/${fileName}`,
            filePath: tempFilePaths,
            header: {
              'Authorization': signature
            },
            name: 'filecontent',
            formData: {
              op: 'upload'
            },
            success: function(uploadRes){
              var data = uploadRes.data
              console.log('uploadRes', uploadRes)
              //do something
            },
            fail: function(e) {
              console.log('e', e)
            }
          })
        }
      })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
