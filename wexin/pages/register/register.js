var app = getApp()
var utils = require('../../utils/util.js')
Page({
  data: {
    motto: 'Hello World',
    appname : '聚会Plus', 
    userInfo: {},
    eventSet: {},
    eventId: '',
    showButton: true
  },
  //增加到分享按钮
  onShareAppMessage: function () {
    var path = 'pages/register/register?id=' 
    path = path + this.data.eventId
    return {
      title: '邀请朋友参加活动',
      path: path
    }
  },

  onLoad: function (options) {
    //console.log('onLoad')
    var eventId = options.id
    this.setData({eventId: eventId})
    //获取当前user选定的活动 tobe update使用数据库
    var array = utils.getMockData()
    this.setData({eventSet: array[0]})
    //获取当前user选定的活动 tobe update使用数据库
    
    if (array[0].totalNum == array[0].attendNum) {
      this.setData({showButton: false})
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