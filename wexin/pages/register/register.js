var app = getApp()
var utils = require('../../utils/util.js')
Page({
    data: {
        motto: 'Hello World',
        appname: '聚会Plus',
        userInfo: {},
        eventSet: {},
        eventId: '',
        showButton: true,
        attendee_name: '',
        tel_no: ''
    },
    //增加到分享按钮
    onShareAppMessage: function () {
        var path = 'pages/register/register?id='
        path = path + this.data.eventId
        return {
            title: '请您参加活动',
            path: path
        }
    },


    bindButtonTap: function (e) {
        var that = this
        var wechat_name = wx.getStorageSync('userInfo').nickName
        var openId = wx.getStorageSync('openId');

        var url = 'https://www.yxtechs.cn/attendparty';
        var params = e.detail.value
        params['openId'] = openId;
        params['wechat_name'] = wechat_name;
        params['party_id'] = that.data.eventId;
        //console.log(params);
        wx.request({
            url: url,
            data: params,
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                var party_id = res.data;
                //console.log(party_id);
                wx.navigateTo({
                    url: '../regstatus/regstatus?id=' + party_id,
                })
            }
        });
    },

    onLoad: function (options) {
        //console.log('onLoad')
        var that = this
        var eventId = options.id
        this.setData({eventId: eventId})

        //var url = 'https://www.yxtechs.cn/getpartyinfo?party_id=' + eventId;
        var url = 'https://www.yxtechs.cn/getpartyinfo';
        wx.request({
            url: url,
            data: {'party_id': eventId},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                var eventSet = res.data;
                //console.log(eventSet);
                that.setData({eventSet: eventSet});
                //this.setData({ array: array });
                if (eventSet.party_total_num == eventSet.party_attend_num) {
                    that.setData({showButton: false})
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