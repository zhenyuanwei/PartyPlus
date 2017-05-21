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
        //console.log(license_num)
    },

    /**
     * 按钮点击提交Form
     */
    bindButtonSubmit: function (e) {
        var params = e.detail.value;
        var url = "https://www.yxtechs.cn/flow/addengineer"
        wx.request({
            url: url,
            data: params,
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                var engineer_id = res.data;
                var url2 = "../empconfirm/empconfirm?engineer_id=" + engineer_id;
                //console.log(engineer_id);
                wx.navigateTo({
                    url: url2
                })
            }
        })
    }
})