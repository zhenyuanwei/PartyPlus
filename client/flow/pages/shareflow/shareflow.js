// shareflow.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showbutton: true,
        issue_id: '',
        issue: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var issue_id = options.issue_id;
        var showbutton = options.showbutton;
        var that = this;
        //console.log(showbutton)
        if (showbutton == 'false') {
            that.setData(
                {showbutton: false}
            )
        }
        that.setData(
            {issue_id: issue_id}
        )
        var url = "https://www.yxtechs.cn/flow/getissueinfo";
        wx.request({
            url: url,
            data: {'issue_id': issue_id},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                var issue = res.data;
                that.setData(
                    {issue: issue}
                )
            }
        })
        //console.log(that.lincese)

    },
    //增加到分享按钮
    onShareAppMessage: function () {
        var that = this;
        var url = "../shareflow/shareflow?issue_id=" + that.issue_id
        /*wx.navigateTo({
         url: url
         })*/
        return {
            title: '请您参加活动',
            path: url
        }
    },

    bindButtonSubmit: function (e) {
        var that = this;
        var params = e.detail.value;
        var openId = wx.getStorageSync('openId');
        var nickname = wx.getStorageSync('userInfo').nickName;
        var license_num = wx.getStorageSync('license_num')
        params['openId'] = openId;
        params['nickname'] = nickname;
        params['license_num'] = license_num;
        //console.log(params);
        var url = 'https://www.yxtechs.cn/flow/dosavelogs';
        wx.request({
            url: url,
            data: params,
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                var message = res.data;
                console.log(message);
                //发送消息到调度员
                //发送消息到调度员

                var page = "../ownedflow/ownedflow";
                wx.switchTab({
                    url: page
                })
            }
        })

    }

})