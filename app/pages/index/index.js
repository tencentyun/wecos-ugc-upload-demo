//index.js
//获取应用实例
var config = require('../../utils/config.js')
var app = getApp()
Page({
  data: {
    motto: '上传文件到COS',
    userInfo: {}
  },
  //事件处理函数
  uploadToCos: function() {

    console.log(this)
    wx.request({
      url: config.cosSignatureUrl,
      success: function(res) {

        const signature = res.data
        wx.chooseImage({
          success: function(res) {
            var tempFilePaths = res.tempFilePaths[0];
            var fileName = tempFilePaths.match(/(wxfile:\/\/)(.+)/)
            fileName = fileName[2]

            wx.uploadFile({
              url: `${config.cosUrl}/${fileName}`,
              filePath: tempFilePaths,
              header: {
                'Authorization': signature
              },
              name: 'filecontent',
              formData: {
                op: 'upload'
              },
              success: function(res){
                var data = res.data
                console.log('res', res)
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
