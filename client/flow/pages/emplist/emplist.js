// emplist.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        license_num: '',
        engineerList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var license_num = options.license_num;
        var that = this;
        that.setData({license_num: license_num})

        var url = "https://www.yxtechs.cn/flow/getengineerlist"
        wx.request({
            url: url,
            data: {'license_num': license_num},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                var engineerList = res.data;
                console.log(engineerList)
                that.setData({engineerList: engineerList})
            }
        })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        wx.stopPullDownRefresh();
        //wx.showNavigationBarLoading()   //在标题栏中显示加载
        //console.log('showNavigationBarLoading');
        var that = this;
        that.onLoad();
        //wx.hideNavigationBarLoading();    //完成停止加载
        //console.log('hideNavigationBarLoading');
        //停止下拉刷新
    }
})