//index.js

/**
 * 需要配置COS相关的config信息
 * 详情可看API文档 https://www.qcloud.com/document/product/436/6066
 */
var config = {
  cosSignatureUrl: 'https://www.xxxx.com', //填写自己的鉴权服务器地址
  region: 'tj',
  appid: '1253189073',
  bucketname: 'weixintest',
  dir_name: ''
};

// 最终上传到cos的URL
var cosUrl = `https://${config.region}.file.myqcloud.com/files/v2/${config.appid}/${config.bucketname}${config.dirname}`

//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '上传文件到COS',
    userInfo: {}
  },
  //事件处理函数
  uploadToCos: function() {

    console.log(this)
    wx.chooseImage({
      success: function(res) {
        var tempFilePaths = res.tempFilePaths[0];
        var fileName = tempFilePaths.match(/(wxfile:\/\/)(.+)/)
        fileName = fileName[2]

        wx.request({
          url: config.cosSignatureUrl,
          success: function(cosRes) {

            var signature = cosRes.data

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
      }
    })
  }
})
