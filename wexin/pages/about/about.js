// about.js
Page({
    data: {},
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
    },

    onPullDownRefresh: function () {
        wx.showNavigationBarLoading();   //在标题栏中显示加载
        var that = this;
        that.onLoad();
        wx.hideNavigationBarLoading()    //完成停止加载
        wx.stopPullDownRefresh()         //停止下拉刷新
    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    }
})