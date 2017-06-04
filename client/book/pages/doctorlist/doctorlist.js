var utils = require('../../utils/util.js')
var app = getApp()
Page({
    data: {
        license_num: '',
        doctor_list: []
    },
    //事件处理函数
    onLoad: function (options) {
        //console.log('onLoad');
        var that = this;
        var license_num = options.license_num
        //调用应用实例的方法获取全局数据
        that.setData(
            {license_num: license_num}
        )
        var url = app.globalData.baseURL + "/book/getdoctorlist";
        wx.request({
            url: url,
            data: {'license_num': license_num},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                console.log(res.data)
                var doctor_list = res.data;
                that.setData(
                    {doctor_list: doctor_list}
                )
            }
        })
    },
    bindDeleteSubmit: function (e) {
        console.log('delete service');
    }
})
