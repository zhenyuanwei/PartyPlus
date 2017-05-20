// shareflow.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        license: true,
        showbutton: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var flow_id = options.flow_id;
        var showbutton = options.showbutton;
        var that = this;
        //console.log(showbutton)
        if (flow_id == '') {
            that.setData(
                {license: false}
            )
        }
        if (showbutton == 'false') {
            that.setData(
                {showbutton: false}
            )
        }
        //console.log(that.lincese)

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