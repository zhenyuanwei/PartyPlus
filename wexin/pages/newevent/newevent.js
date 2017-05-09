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

    bindPartyNameBlur: function (e) {
        this.setData({
            party_name: e.detail.value
        })
    },

    bindPartyTimeBlur: function (e) {
        this.setData({
            party_time: e.detail.value
        })
    },

    bindPartyLocationBlur: function (e) {
        this.setData({
            party_location: e.detail.value
        })
    },

    bindPartyTotalNumBlur: function (e) {
        this.setData({
            party_total_num: e.detail.value
        })
    },

    bindButtonTap: function (e) {
        var that = this
        var openId = wx.getStorageSync('openId');
        that.setData({openId: openId});
        var url = 'https://www.yxtechs.cn/createparty?party_name=' + this.data.party_name;
        url = url + '&party_time=' + this.data.party_time + '&party_location=' + this.data.party_location
        url = url + '&party_total_num=' + this.data.party_total_num + '&openId=' + openId
        //console.log(url);
        wx.request({
            url: url,
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                var party_id = res.data;
                //console.log(party_id);
                wx.navigateTo({
                  url: '../register/register?id=' + party_id,
                })
                //wx.setStorageSync('openId', openId);//存储openid
            }
        });
    },

    onLoad: function (options) {
        //console.log('onLoad');
    }
})