//index.js

// upload的核心代码
var uploadFn = require('../../utils/upload.js')


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

    // 选择上传的图片
    wx.chooseImage({
      success: function(res) {

        // 获取文件路径
        var filePath = res.tempFilePaths[0];

        // 获取文件名
        var fileName = filePath.match(/(wxfile:\/\/)(.+)/)
        fileName = fileName[2]

        // 文件上传cos
        uploadFn(filePath, fileName)
      }
    })
  }
})
