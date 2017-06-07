// empconfirm.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        engineer: '',
        engineer_id: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var engineer_id = options.engineer_id;
        var that = this;
        wx.setStorageSync('engineer_id', engineer_id);

        var url = app.globalData.baseURL + "/flow/getengineerinfo";
        wx.request({
            url: url,
            data: {'engineer_id': engineer_id},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                var engineer = res.data;
                that.setData({engineer: engineer})
            }
        })

    },

    /**
     * 表单提交
     */
    bindButtonSubmit: function (e) {
        var engineer_id = e.detail.value.engineer_id;
        var openId = wx.getStorageSync('openId');
        var nickname = wx.getStorageSync('userInfo').nickName;
        var params = {'engineer_id': engineer_id, 'openId': openId, 'nickname': nickname}
        //console.log(params);
        var url = app.globalData.baseURL + "/flow/updateengineerinfo";
        wx.request({
            url: url,
            data: params,
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                var license_num = res.data;
                var url2 = "../emplist/emplist?license_num=" + license_num;
                //console.log(url);
                wx.navigateTo({
                    url: url2
                })
            }
        })
    },

    //增加到分享按钮
    onShareAppMessage: function () {
        var engineer_id = wx.getStorageSync('engineer_id')
        var url = "pages/empconfirm/empconfirm?engineer_id=" + engineer_id;
        /*wx.navigateTo({
         url: url
         })*/
        return {
            title: '请您确认绑定',
            path: url
        }
    }

})