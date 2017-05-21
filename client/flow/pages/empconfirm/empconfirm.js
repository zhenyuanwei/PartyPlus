// empconfirm.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        engineer: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var engineer_id = options.engineer_id
        var that = this

        var url = "https://www.yxtechs.cn/flow/getengineerinfo"
        wx.request({
            url: url,
            data: {'engineer_id': engineer_id},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                var engineer = res.data;
                that.setData({engineer: engineer})
            }
        })

    },

    /**
     * 表单提交
     */
    bindButtonSubmit: function (e) {
        var engineer_id = e.detail.value.engineer_id
        console.log(engineer_id)
    }

})