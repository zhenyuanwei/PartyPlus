var app = getApp()
var utils = require('../../utils/util.js')
Page({
    data: {
        motto: 'Hello World',
        appname: '聚会Plus',
        userInfo: {},
        array: [],
        hasData: true
    },
    //事件处理函数
    onLoad: function () {
        //console.log('onLoad')
        var that = this
        //获取当前user的参加活动列表 tobe update使用数据库
        var openId = wx.getStorageSync('openId');
        //console.log(openId);
        that.setData({openId: openId});

        //获取当前user的活动列表 tobe update使用数据库
        //var url = 'https://www.yxtechs.cn/getattendpartylist?openId=' + openId;
        var url = 'https://www.yxtechs.cn/getattendpartylist';
        //console.log(url);
        var parms = {'openId' : openId}
        wx.request({
            url: url,
            //data: {},
            data: parms,
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                var array = res.data;
                console.log(array);
                that.setData({array: array});
                //this.setData({ array: array });
                if (array.length == 0) {
                    that.setData({hasData: false})
                }
                ;
                //wx.setStorageSync('openId', openId);//存储openid
            }
        });
        //获取当前user的参加活动列表 tobe update使用数据库


        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })
    }
})