var utils = require('../../utils/util.js')
var app = getApp()
Page({
    data: {
        license_num: ''
    },
    //事件处理函数
    onLoad: function (options) {
        console.log('onLoad');
        var that = this;
        var license_num = options.license_num
        //调用应用实例的方法获取全局数据
        that.setData(
            {license_num: license_num}
        )
    }
})
