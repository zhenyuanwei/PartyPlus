var utils = require('../../utils/util.js');
var app = getApp()
Page({
    data: {
        license_num: '',
        admin_type: '',
    },
    //事件处理函数
    onLoad: function (options) {
        //console.log('onLoad')
        var license_num = options.license_num
        var admin_type = options.admin_type
        var that = this
        //调用应用实例的方法获取全局数据
        that.setData(
            {
                license_num: license_num,
                admin_type: admin_type
            }
        )

    },
    //增加到分享按钮
    onShareAppMessage: function () {
        var that = this;
        var path = 'pages/adminuser/adminuser?license_num=' + that.license_num;
        return {
            title: '请设定您的权限',
            path: path
        }
    }
})
