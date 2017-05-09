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
            title: '邀请朋友参加活动',
            path: path
        }
    },

    bindAttendeeNameBlur: function (e) {
        //console.log('bindAttendeeNameBlur')
        this.setData({
            attendee_name: e.detail.value
        })
    },

    bindAttendeeTelBlur: function (e) {
        //console.log('bindAttendeeTelBlur')
        this.setData({
            tel_no: e.detail.value
        })
    },

    bindButtonTap: function (e) {
        var that = this
        var wechat_name = wx.getStorageSync('userInfo').nickName
        var openId = wx.getStorageSync('openId');

        var url = 'https://www.yxtechs.cn/attendparty?party_id=' + that.data.eventId
        url = url + '&wechat_name=' + wechat_name + '&attendee_name=' + that.data.attendee_name
        url = url + '&tel_no=' + that.data.tel_no + '&openId=' + openId
        //console.log(url)

        wx.request({
            url: url,
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                var party_id = res.data;
                //console.log(party_id);
                wx.navigateTo({
                  url: '../regstatus/regstatus?id=' + party_id,
                })
                //wx.setStorageSync('openId', openId);//存储openid
            }
        });
    },

    onLoad: function (options) {
        //console.log('onLoad')
        var that = this
        var eventId = options.id
        this.setData({eventId: eventId})

        var url = 'https://www.yxtechs.cn/getpartyinfo?party_id=' + eventId;
        wx.request({
            url: url,
            data: {},
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