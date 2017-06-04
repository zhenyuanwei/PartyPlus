var utils = require('../../utils/util.js');
var app = getApp()
Page({
    data: {
        license_num: '',
        timearray: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
        timeindex: 0,
        dayarray: [],
        dayindex: 0,
        doctorname_list: [],
        doctorindex: 0,
        servicename_list: [],
        serviceindex: 0,
    },
    //事件处理函数
    onLoad: function (options) {
        //console.log('onLoad')
        var license_num = options.license_num;
        license_num = '1496577521';
        var that = this;
        //调用应用实例的方法获取全局数据
        that.setData({license_num: license_num});
        var url = app.globalData.baseURL + "/book/initbooking";
        wx.request({
            url: url,
            data: {license_num: license_num},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                //console.log(res.data);
                var dayarray = res.data.dayarray;
                var doctor_list = res.data.doctor_list;
                var service_list = doctor_list[0].doctor_services;
                //console.log(service_list)
                var doctorname_list = [];
                for (var i = 0; i < doctor_list.length; i++) {
                    doctorname_list.push(doctor_list[i].doctor_name)
                }
                var servicename_list = []
                for (var i = 0; i < service_list.length; i++) {
                    servicename_list.push(service_list[i].service_name)
                }
                that.setData({dayarray: dayarray, doctorname_list: doctorname_list, servicename_list: servicename_list});
                wx.setStorageSync('doctor_list', doctor_list);
            }
        })

    },
    bindDoctorPickerChange: function (e) {
        var that = this;
        var doctorindex = e.detail.value
        var doctor_list = wx.getStorageSync('doctor_list');
        var service_list = doctor_list[doctorindex].doctor_services;
        var servicename_list = []
        for (var i = 0; i < service_list.length; i++) {
            servicename_list.push(service_list[i].service_name)
        }
        //console.log('picker发送选择改变，携带值为', e.detail.value)
        that.setData({
            doctorindex: doctorindex,
            servicename_list: servicename_list
        })
    },
    bindServicePickerChange: function (e) {
        var that = this
        //console.log('picker发送选择改变，携带值为', e.detail.value)
        that.setData({
            serviceindex: e.detail.value
        })
    },
    bindTimePickerChange: function (e) {
        var that = this
        //console.log('picker发送选择改变，携带值为', e.detail.value)
        that.setData({
            timeindex: e.detail.value
        })
    },
    bindDayPickerChange: function (e) {
        var that = this
        //console.log('picker发送选择改变，携带值为', e.detail.value)
        that.setData({
            dayindex: e.detail.value
        })
    },
    bindButtonSubmit: function (e) {
        //console.log('picker发送选择改变，携带值为', e.detail.value)
        var url = "../index/index";
        //console.log(url);
        wx.switchTab({
            url: url
        })
    }
})
