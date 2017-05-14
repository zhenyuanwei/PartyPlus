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
        userarray: [],
        showTel: true
    },

    onLoad: function (options) {
        //console.log('onLoad')
        var that = this
        var eventId = options.id;
        //console.log(eventId);
        that.setData({eventId: eventId});
        //var url = 'https://www.yxtechs.cn/getpartyinfo?party_id=' + eventId;
        var url = 'https://www.yxtechs.cn/getpartyinfo'
        wx.request({
            url: url,
            data: {'party_id' : eventId},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                var eventSet = res.data;
                var userarray = res.data.attendeeList;

                that.setData({eventSet: eventSet});
                that.setData({userarray: userarray});
                //this.setData({ array: array });
                if (userarray.length == 0) {
                    that.setData({showAttendList: false})
                };
                var create_openid = eventSet.create_openid
                //console.log(create_openid);
                var openId = wx.getStorageSync('openId')
                //console.log(openId);
                if (create_openid != openId){
                    that.setData({showTel: false})
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
    },

    bidComplateSubmit: function (e) {
        var party_id = e.detail.value.party_id;

        wx.showModal({
            title: '提示',
            content: '活动顺利举行完了，确认完成活动？',
            success: function (res) {
                if (res.confirm) {
                    //console.log(party_id);
                    var url = 'https://www.yxtechs.cn/completeparty';
                    wx.request({
                        url: url,
                        data: {'party_id': party_id},
                        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                        // header: {}, // 设置请求的 header
                        success: function (res) {
                            //console.log(result);
                            var attendees = res.data;
                            console.log(attendees);
                            var template_id = 'IpkXVvEVlh7sNfOSnQPXUSEN4UnZNzO3CWS_trQp3-M';
                            var completeMessage = "活动成功结束，感谢您的参与。";
                            attendees.forEach(function(attendee, index, array){
                                var formId = attendee.formId
                                var message = {
                                    "touser": attendee.attendee_openid,
                                    "template_id": template_id,
                                    "form_id": formId,
                                    "data": {
                                        "keyword1": {
                                            "value": attendee.party_name,
                                        },
                                        "keyword2": {
                                            "value": attendee.party_time,
                                        },
                                        "keyword3": {
                                            "value": completeMessage,

                                        }
                                    }
                                }
                                //console.log(message);
                                if (formId != '') {
                                    utils.sendMessage(message)
                                }

                            })

                            wx.switchTab({
                                url: "../index/index"
                            })

                            //wx.setStorageSync('openId', openId);//存储openid
                        }
                    })
                } else if (res.cancel) {
                    //console.log('用户点击取消')
                }
            }
        })

    },

    bidCancelSubmit: function (e) {
        var party_id = e.detail.value.party_id;

        wx.showModal({
            title: '提示',
            content: '是否与参与者沟通过，确认取消活动？',
            success: function (res) {
                if (res.confirm) {
                    //console.log(party_id);
                    var url = 'https://www.yxtechs.cn/cancelparty';
                    wx.request({
                        url: url,
                        data: {'party_id': party_id},
                        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                        // header: {}, // 设置请求的 header
                        success: function (res) {
                            var attendees = res.data;
                            //console.log(attendees);
                            var template_id = 'a9ZJACpqVB3FDktUhAbqo7S4gtpX6R81SM0rPUOTWk4';
                            var cancelMessage = "活动发起人取消了活动，如有疑问请与发起人联系。";
                            var now = utils.getToday() + " " + utils.getNowTime();
                            attendees.forEach(function(attendee, index, array){
                                var formId = attendee.formId
                                var message = {
                                    "touser": attendee.attendee_openid,
                                    "template_id": template_id,
                                    "form_id": formId,
                                    "data": {
                                        "keyword1": {
                                            "value": attendee.party_name,
                                        },
                                        "keyword2": {
                                            "value": cancelMessage,
                                        },
                                        "keyword3": {
                                            "value": now,

                                        }
                                    }
                                }
                                //console.log(message);
                                if (formId != '') {
                                    utils.sendMessage(message)
                                }

                            })

                            wx.switchTab({
                                url: "../index/index"
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