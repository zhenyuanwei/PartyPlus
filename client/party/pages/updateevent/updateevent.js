// updateevent.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        party_id: '',
        party: {},
        latitude: '',
        longitude: '',
        party_location: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var party_id = options.party_id;
        //console.log(party_id)
        var that = this;
        that.setData({party_id: party_id})
        var url = app.globalData.baseURL + '/getpartyinfo'
        wx.request({
            url: url,
            data: {'party_id': party_id},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                var party = res.data;
                var party_location = party.party_location;
                var latitude = party.latitude;
                var longitude = party.longitude;
                that.setData({party: party, party_location: party_location, latitude: latitude, longitude: longitude});
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
            //console.log(party_id);
            var url = app.globalData.baseURL + '/updateparty';
            //利用wx.request更新Party的信息
            wx.request({
                url: url,
                data: params,
                method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                // header: {}, // 设置请求的 header
                success: function (res) {
                    //res存储的是Party
                    var party_id = res.data.party_id;
                    //获取attendee list用来发送信息通知参与者party信息已经修改
                    var attendeeList = res.data.attendeeList
                    //console.log(attendeeList);
                    wx.navigateTo({
                        url: '../register/register?id=' + party_id,
                    })
                }
            });
        }

    },

    bindCompanySelect: function(e){
        var that = this;
        wx.chooseLocation({
            type: 'wgs84',
            success: function (res) {
                var latitude = res.latitude
                var longitude = res.longitude
                //console.log(res);
                var party_location = res.name

                that.setData({party_location: party_location, latitude: latitude, longitude: longitude})
            }
        })
    }
})