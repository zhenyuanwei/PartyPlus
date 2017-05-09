var app = getApp()
var utils = require('../../utils/util.js')
Page({
    data: {
        motto: 'Hello World',
        appname: '聚会Plus',
        userInfo: {},
        eventSet: {},
        eventId: '',
        showAttendList: true,
        userarray: []
    },

    onLoad: function (options) {
        //console.log('onLoad')
        var that = this
        var eventId = options.id;
        that.setData({eventId: eventId});
        var url = 'https://www.yxtechs.cn/getpartyinfo?party_id=' + eventId;
        wx.request({
            url: url,
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                var eventSet = res.data;
                var userarray = res.data.attendeeList;
                //console.log(eventSet);
                that.setData({eventSet: eventSet});
                that.setData({userarray: userarray});
                //this.setData({ array: array });
                if (userarray.length == 0) {
                    this.setData({hasData: false})
                }
                ;
                //wx.setStorageSync('openId', openId);//存储openid
            }
        });

        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })
    }
})