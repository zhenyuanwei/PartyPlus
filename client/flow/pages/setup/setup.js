// setup.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //utils.getWxCode('pages/employee/employee?license_num=1495367951');
    },

    /**
     * 按钮点击提交Form
     */
    bindButtonSubmit: function (e) {
        var that = this;
        var license_num = e.detail.value.license_num;
        if (license_num.length == 0) {
            that.setData({
                tip: '提示：输入项目不能为空！',
            })
        } else {
            var url = app.globalData.baseURL + "/checklicense"
            wx.request({
                url: url,
                data: {'license_num': license_num},
                method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                // header: {}, // 设置请求的 header
                success: function (res) {
                    var hasLicense = res.data;
                    if (hasLicense) {
                        var url2 = "../emplist/emplist?license_num=" + license_num;
                        //console.log(url);
                        wx.navigateTo({
                            url: url2
                        })
                    } else {
                        that.setData({
                            tip: '提示：授权无效或者过期！请联系语熙工作室确认。',
                        })
                    }
                }
            })
        }


    }
})