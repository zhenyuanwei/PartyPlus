// updateevent.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        party_id: '',
        party: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var party_id = options.party_id;
        //console.log(party_id)
        var that = this;
        that.setData({party_id: party_id})
        var url = 'https://www.yxtechs.cn/getpartyinfo'
        wx.request({
            url: url,
            data: {'party_id': party_id},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                var party = res.data;
                that.setData({party: party});
                //wx.setStorageSync('openId', openId);//存储openid
            }
        })

    },

    bidUpdateSubmit: function (e) {
        var params = e.detail.value;
        var openId = wx.getStorageSync('openId');
        params['openId'] = openId;

        if (e.detail.value.party_time.length == 0 ||
            e.detail.value.party_location.length == 0 || e.detail.value.party_total_num.length == 0) {
            this.setData({
                tip: '提示：全部输入项目不能为空！',
            })
        } else {
            console.log(party_id);
            var url = 'https://www.yxtechs.cn/getpartyinfo';
            //利用wx.request更新Party的信息
        }

    }
})