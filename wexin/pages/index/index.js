//index.js
//获取应用实例
var app = getApp()
var utils = require('../../utils/util.js')
Page({
  data: {
    motto: 'Hello World',
    appname : '聚会Plus', 
    userInfo: {},
    array: [],
    hasData : true,
    openId : ''
  },
  //事件处理函数
  onLoad: function (options) {
    console.log('onLoad')
    //获取当前user的活动列表 tobe update使用数据库
    var array = utils.getMockData()
    //获取当前user的活动列表 tobe update使用数据库
    
    this.setData({array: array})
    if (array.length == 0) {
      this.setData({hasData: false})
    }
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

