// setup.js
Page({

    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 按钮点击提交Form
     */
    bindButtonSubmit: function (e) {
        var params = e.detail.value;
        var url = "../employee/employee?license_num=" + params.license_num;
        //console.log(url);
        wx.navigateTo({
            url: url
        })
    }
})