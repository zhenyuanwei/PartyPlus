var utils = require('../../utils/util.js')
var app = getApp()
Page({
    data: {
        license_num: ''
    },
    //事件处理函数
    onLoad: function (options) {
        console.log('onLoad')
        var that = this
        //调用应用实例的方法获取全局数据

    },
    bindButtonSubmit: function (e) {
        var license_num = e.detail.value.license_num;
        var url = "../servicelist/servicelist?license_num=" + license_num;
        //console.log(url);
        var islicense = utils.checklicense(license_num);
        if (islicense) {
            wx.navigateTo({
                url: url
            })
        } else {
            this.setData({
                tip: '提示：您没有授权，进行操作！',
            })
        }

    }
})
