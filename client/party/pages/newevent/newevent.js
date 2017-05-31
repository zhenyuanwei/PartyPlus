var utils = require('../../utils/util.js');
var app = getApp();
Page({
    data: {
        party_name: '',
        party_time: '',
        party_location: '',
        party_total_num: 0,
        openId: '',
        today: ''
    },

    bindButtonTap: function (e) {
        var that = this
        var openId = wx.getStorageSync('openId');
        that.setData({openId: openId});
        var formId = e.detail.formId;
        var params = e.detail.value;
        params['openId'] = openId;
        //console.log(e.detail.value);
        if (e.detail.value.party_name.length == 0 || e.detail.value.party_time.length == 0 ||
            e.detail.value.party_location.length == 0 || e.detail.value.party_total_num.length == 0) {
            this.setData({
                tip: '提示：全部输入项目不能为空！',
            })
        } else {
            var url = app.globalData.baseURL + '/createparty'
            wx.request({
                url: url,
                data: params,
                method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                // header: {}, // 设置请求的 header
                success: function (res) {
                    var party_id = res.data;
                    //console.log(party_id);
                    wx.navigateTo({
                        url: '../register/register?id=' + party_id,
                    })
                }
            });
            //发送信息
            var template_id = 'O6VslR5nzAYm9EyBf4GlLlV84oHHvSmgBfk4H8R1kac';
            //console.log(access_token)
            var message = {
                "touser": openId,
                "template_id": template_id,
                "form_id": formId,
                "data": {
                    "keyword1": {
                        "value": params.party_name,
                    },
                    "keyword2": {
                        "value": params.party_location,
                    },
                    "keyword3": {
                        "value": params.party_time,
                    },
                    "keyword4": {
                        "value": "无",
                    }
                }
            }
            //console.log(message)
            utils.sendMessage(message)
        }


    },

    onLoad: function (options) {
        //console.log('onLoad');
        var today = utils.getToday()
        var that = this
        that.setData({today : today})
    }

})