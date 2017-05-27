var utils = require('../../utils/util.js');
var app = getApp()
Page({
    data: {
        license_num: '',
        timearray: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
        timeindex: 0,
        dayarray: ['2017/06/01', '2017/06/02'],
        dayindex: 0
    },
    //事件处理函数
    onLoad: function (options) {
        //console.log('onLoad')
        var license_num = options.license_num;
        var that = this
        //调用应用实例的方法获取全局数据
        that.setData({license_num: license_num})

    },
    bindTimePickerChange: function (e) {
        var that = this
        console.log('picker发送选择改变，携带值为', e.detail.value)
        that.setData({
            timeindex: e.detail.value
        })
    },
    bindDayPickerChange: function (e) {
        var that = this
        console.log('picker发送选择改变，携带值为', e.detail.value)
        that.setData({
            dayindex: e.detail.value
        })
    }
    ,
    bindButtonSubmit: function (e) {
        //console.log('picker发送选择改变，携带值为', e.detail.value)
        var url = "../index/index";
        //console.log(url);
        wx.switchTab({
            url: url
        })
    }
})
