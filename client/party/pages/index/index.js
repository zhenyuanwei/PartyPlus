//index.js
//获取应用实例
var app = getApp()
var utils = require('../../utils/util.js')
Page({
    data: {
        motto: 'Hello World',
        appname: '聚会Plus',
        userInfo: {},
        array: [],
        hasData: true,
        openId: '',
        weatherData: ''
    },

    //事件处理函数
    onLoad: function (options) {
        //console.log('onLoad')

        var that = this;
        var weatherData = wx.getStorageSync('weatherData');
        that.setData({
            weatherData: weatherData
        })

        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        });
        var openId = wx.getStorageSync('openId');
        this.setData({openId: openId});

        //获取当前user的活动列表 tobe update使用数据库
        //var url = 'https://www.yxtechs.cn/getownedpartylist?open_id=' + openId;
        var url = 'https://www.yxtechs.cn/getownedpartylist';
        //console.log(url);
        wx.request({
            url: url,
            data: {'openId': openId},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                var array = res.data;
                //console.log(array);
                that.setData({array: array});
                //this.setData({ array: array });
                if (array.length == 0) {
                    that.setData({hasData: false})
                }
                ;
                //wx.setStorageSync('openId', openId);//存储openid
            }
        });
    },

    onPullDownRefresh: function () {
        wx.stopPullDownRefresh();
        //wx.showNavigationBarLoading()   //在标题栏中显示加载
        //console.log('showNavigationBarLoading');
        var that = this;
        that.onLoad();
        //wx.hideNavigationBarLoading();    //完成停止加载
        //console.log('hideNavigationBarLoading');
        //停止下拉刷新
    }
})

