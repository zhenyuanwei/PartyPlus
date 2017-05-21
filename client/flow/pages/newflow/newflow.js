// newflow.js
var utils = require('../../utils/util.js');
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        license_num: '',
        hasLicense: true,
        today: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var license_num = options.license_num;
        license_num = '1495367951'; //测试用数据
        var that = this;
        var today = utils.getToday()
        if (license_num == null) {
            license_num = 'nolicense';
            that.setData(
                {hasLicense: false}
            )
        } else {
            //check使用权限的期限
            var url = "https://www.yxtechs.cn/checklicense"
            wx.request({
                url: url,
                data: {'license_num': license_num},
                method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                // header: {}, // 设置请求的 header
                success: function (res) {
                    var hasLicense = res.data;
                    console.log(hasLicense);
                    that.setData(
                        {hasLicense: hasLicense}
                    )
                }
            })
            //check使用权限的期限
        }
        that.setData(
            {
                license_num: license_num,
                today: today
            }
        )
        console.log(wx.getStorageSync('userInfo').nickName);


    },
    bindButtonSubmit: function (e) {
        var that = this;
        var url = "../shareflow/shareflow?showbutton=false";
        if (that.license_num == 'nolicense') {
            wx.navigateTo({
                url: url
            })
        } else {
            //保存数据
            var url2 = 'https://www.yxtechs.cn/flow/dosaveissue';
            var params = e.detail.value;
            var openId = wx.getStorageSync('openId');
            var nickname = wx.getStorageSync('userInfo').nickName;
            params['openId'] = openId;
            params['nickname'] = nickname;
            params['license_num'] = that.license_num;
            //console.log(nickname);
            wx.request({
                url: url2,
                data: params,
                method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                // header: {}, // 设置请求的 header
                success: function (res) {
                    var issue_id = res.data;
                    //console.log(issue_id);
                    url = url + '&issue_id=' + issue_id;
                    console.log(url);
                    wx.navigateTo({
                        url: url
                    })
                }
            })

            console.log(that.issue_id);

        }

    }
})