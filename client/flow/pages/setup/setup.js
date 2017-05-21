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
        var license_num = e.detail.value.license_num;
        var url = "https://www.yxtechs.cn/checklicense"
        wx.request({
            url: url,
            data: {'license_num': license_num},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                var hasLicense = res.data;
                if (hasLicense) {
                    var url2 = "../employee/employee?license_num=" + license_num;
                    //console.log(url);
                    wx.navigateTo({
                        url: url2
                    })
                } else {
                    this.setData({
                        tip: '提示：授权无效或者过期！',
                    })
                }
            }
        })


    }
})