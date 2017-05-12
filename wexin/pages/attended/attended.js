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
    onLoad: function (options) {
        var that = this
        //获取当前user的参加活动列表 tobe update使用数据库
        var openId = wx.getStorageSync('openId');
        //console.log(openId);
        that.setData({openId: openId});

        //获取当前user的活动列表 tobe update使用数据库
        //var url = 'https://www.yxtechs.cn/getattendpartylist?openId=' + openId;
        var url = 'https://www.yxtechs.cn/getattendpartylist';
        //console.log(url);
        var parms = {'openId': openId}
        wx.request({
            url: url,
            //data: {},
            data: parms,
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
        //获取当前user的参加活动列表 tobe update使用数据库


        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })
    },

    onPullDownRefresh: function () {
        wx.showNavigationBarLoading();   //在标题栏中显示加载
        //console.log('showNavigationBarLoading')
        var that = this;
        that.onLoad();
        wx.hideNavigationBarLoading();    //完成停止加载
        //console.log('hideNavigationBarLoading')
        wx.stopPullDownRefresh();         //停止下拉刷新
    },

    //报名后取消功能
    bindHiddenButtonTap: function (e) {
        var attend_id = e.detail.value.attend_id;

        wx.showModal({
            title: '提示',
            content: '隐藏后不可恢复，确认隐藏报名信息？',
            success: function (res) {
                if (res.confirm) {
                    //console.log(attend_id);
                    var url = 'https://www.yxtechs.cn/hiddenattend';
                    wx.request({
                        url: url,
                        data: {'attend_id': attend_id},
                        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                        // header: {}, // 设置请求的 header
                        success: function (res) {
                            var result = res.data;
                            wx.switchTab({
                                url: "../attended/attended"
                            })

                            //wx.setStorageSync('openId', openId);//存储openid
                        }
                    })
                } else if (res.cancel) {
                    //console.log('用户点击取消')
                }
            }
        })
    }
})