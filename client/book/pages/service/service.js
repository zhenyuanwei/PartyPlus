var utils = require('../../utils/util.js')
var app = getApp()
Page({
    data: {
        license_num: ''
    },
    //事件处理函数
    onLoad: function (options) {
        //console.log('onLoad')
        var license_num = options.license_num;
        var that = this;
        //调用应用实例的方法获取全局数据
        that.setData({license_num: license_num});

    },
    bindButtonSubmit: function (e) {
        var license_num = e.detail.value.license_num;
        //console.log(license_num);
        var url = "../servicelist/servicelist?license_num=" + license_num;
        wx.navigateTo({
            url: url
        })
    }
})
