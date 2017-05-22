// showqrcode.js
var utils = require('../../utils/util.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var license_num = options.license_num;
        var page = 'pages/employee/employee?license_num=' + license_num
        console.log(page)
        utils.qrcode('qrcode', page, 420, 420);
    }
})