var app = getApp()
var utils = require('../../utils/util.js')
Page({
  data: {
    motto: 'Hello World',
    appname : '聚会Plus', 
    userInfo: {},
    eventSet: {},
    eventId: '',
    showAttendList: true,
    userarray: []
  },

  onLoad: function (options) {
    //console.log('onLoad')
    var eventId = options.id
    this.setData({eventId: eventId})
    //获取当前user选定的活动 tobe update使用数据库
    //设置报名者array
    var userlist = utils.getMockUserData()
    this.setData({userarray: userlist})
    //设置活动详细
    var array = utils.getMockData()
    this.setData({eventSet: array[0]})
    //获取当前user选定的活动 tobe update使用数据库
    if (array[0].attendNum == 0) {
      this.setData({showAttendList: false})
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