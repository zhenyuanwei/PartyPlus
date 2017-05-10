var utils = require('../../utils/util.js')
var app = getApp()
Page({
    data: {
        party_name: '',
        party_time: '',
        party_location: '',
        party_total_num: 0,
        openId: ''
    },

    bindButtonTap: function (e) {
        var that = this
        var openId = wx.getStorageSync('openId');
        that.setData({openId: openId});

        var params = e.detail.value
        params['openId'] = openId;
        //console.log(params);
        var url = 'https://www.yxtechs.cn/createparty'
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
    },

    onLoad: function (options) {
        //console.log('onLoad');
    }
})