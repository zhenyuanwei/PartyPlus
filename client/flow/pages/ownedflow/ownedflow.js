// ownedflow.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        openId: '',
        issueList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //console.log('onLoad')
        var that = this
        var openId = wx.getStorageSync('openId');
        this.setData({openId: openId});

        //获取当前user的活动列表 tobe update使用数据库
        var url = 'https://www.yxtechs.cn/flow/gocompanyissuelist';
        //console.log(url);
        wx.request({
            url: url,
            data: {'openId': openId},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                var issueList = res.data;
                //console.log(issueList);
                that.setData({issueList: issueList});
                //this.setData({ array: array });
                if (issueList.length == 0) {
                    that.setData({hasData: false})
                }
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