// shareflow.js
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
    //增加到分享按钮
    onShareAppMessage: function () {
        var that = this;
        var url = "../shareflow/shareflow?flow_id="
        /*wx.navigateTo({
         url: url
         })*/
        return {
            title: '请您参加活动',
            path: url
        }
    }

})