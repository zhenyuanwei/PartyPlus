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
        showList: false,
        attendee_name: '',
        tel_no: '',
        userarray: []
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
        if (e.detail.value.attendee_name.length == 0 || e.detail.value.tel_no.length == 0) {
            this.setData({
                tip: '提示：全部输入项目不能为空！',
            })
        } else {
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
        }


    },

    onLoad: function (options) {
        //console.log('onLoad')
        var that = this
        var eventId = options.id
        that.setData({eventId: eventId})
        var openId = wx.getStorageSync('openId');

        //var url = 'https://www.yxtechs.cn/getpartyinfo?party_id=' + eventId;
        var url = 'https://www.yxtechs.cn/getpartyinfo';
        wx.request({
            url: url,
            data: {'party_id': eventId, 'openId': openId},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                var eventSet = res.data;
                var userarray = res.data.attendeeList;
                //console.log(eventSet);
                that.setData({eventSet: eventSet});
                that.setData({userarray: userarray});
                if (eventSet.party_total_num == eventSet.party_attend_num) {
                    that.setData({showButton: false})
                }
                if (userarray.length != 0) {
                    that.setData({showList: true})
                    that.setData({showButton: false})
                }

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