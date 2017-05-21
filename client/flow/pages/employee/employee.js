// employee.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        license_num: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var license_num = options.license_num;
        var that = this;
        that.setData({license_num: license_num})
        console.log(license_num)
    },

    /**
     * 按钮点击提交Form
     */
    bindButtonSubmit: function (e) {
        var params = e.detail.value;
        console.log(params);
        var url = "../emplist/emplist?license_num=" + params.license_num;
        //console.log(url);
        wx.navigateTo({
            url: url
        })
    }
})