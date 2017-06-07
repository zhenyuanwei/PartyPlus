// newflow.js
var utils = require('../../utils/util.js');
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        license_num: '',
        hasLicense: true,
        today: '',
        issue_address: '',
        issue_company: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var license_num = options.license_num;
        //license_num = '1495367951'; //测试用数据
        var that = this;
        var today = utils.getToday();
        if (license_num == null) {
            license_num = 'nolicense';
            that.setData(
                {hasLicense: false}
            )
        } else {
            //check使用权限的期限
            var url = app.globalData.baseURL + "/checklicense";
            wx.request({
                url: url,
                data: {'license_num': license_num},
                method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                // header: {}, // 设置请求的 header
                success: function (res) {
                    var hasLicense = res.data;
                    //console.log(hasLicense);
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
        wx.setStorageSync('license_num', license_num);
        //console.log(wx.getStorageSync('userInfo').nickName);


    },
    bindButtonSubmit: function (e) {
        var that = this;

        if (e.detail.value.issue_name.length == 0 || e.detail.value.issue_company.length == 0 ||
            e.detail.value.issue_expect_time.length == 0 || e.detail.value.tel_no.length == 0 ||
            e.detail.value.issue_description.length == 0) {
            this.setData({
                tip: '提示：输入项目不能为空！',
            })
        } else {
            //保存数据
            var url = "../shareflow/shareflow?showbutton=false";
            var url2 = app.globalData.baseURL + '/flow/dosaveissue';
            var params = e.detail.value;
            var formId = e.detail.formId;
            var openId = wx.getStorageSync('openId');
            var nickname = wx.getStorageSync('userInfo').nickName;
            var license_num = wx.getStorageSync('license_num');
            params['openId'] = openId;
            params['nickname'] = nickname;
            params['license_num'] = license_num;
            //console.log(params['license_num']);
            wx.request({
                url: url2,
                data: params,
                method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                // header: {}, // 设置请求的 header
                success: function (res) {
                    var issue_id = res.data.issue_id;
                    console.log(res.data);
                    url = url + '&issue_id=' + issue_id;
                    console.log(url);
                    wx.navigateTo({
                        url: url
                    })
                    var res_openId = res.data.openId;
                    var template_id = "jpU7GAQLjwTMkpS2m-9Wkx3Y-9GwaCuJ8bssFePCbXU";
                    var message = {
                        "touser": res_openId,
                        "template_id": template_id,
                        "form_id": formId,
                        "data": {
                            "keyword1": {
                                "value": utils.getToday() + ' ' + utils.getNowTime(),
                            },
                            "keyword2": {
                                "value": nickname,
                            },
                            "keyword3": {
                                "value": params.issue_company,
                            },
                            "keyword4": {
                                "value": params.tel_no,
                            },
                            "keyword5": {
                                "value": params.issue_description,
                            }
                        }
                    }
                    //console.log(message)
                    utils.sendMessage(message);
                    //console.log(openId)
                }
            })
        }
        //console.log(that.issue_id);
    },
    bindCompanySelect: function(e){
        var that = this;
        wx.chooseLocation({
            type: 'wgs84',
            success: function (res) {
                var latitude = res.latitude
                var longitude = res.longitude
                var speed = res.speed
                var accuracy = res.accuracy
                //console.log(res);
                var issue_company = res.name
                var issue_address = res.address;

                that.setData({issue_address: issue_address, issue_company: issue_company})
            }
        })
    }

})