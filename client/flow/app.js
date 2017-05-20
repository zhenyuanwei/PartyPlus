//app.js
App({
    onLaunch: function () {
        //调用API从本地缓存中获取数据
        /*var logs = wx.getStorageSync('logs') || []
         logs.unshift(Date.now())
         wx.setStorageSync('logs', logs)*/
    },
    getUserInfo: function (cb) {
        var that = this
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.login({
                success: function (res) {
                    wx.getUserInfo({
                        //withCredentials: true,
                        success: function (res) {
                            that.globalData.userInfo = res.userInfo;
                            //console.log(res.userInfo)
                            wx.setStorageSync('userInfo', res.userInfo);//存储userInfo
                            //that.globalData.encryptedData = res.encryptedData
                            typeof cb == "function" && cb(that.globalData.userInfo)
                        }
                    })
                    var code = res.code;
                    //console.log(that.globalData.userInfo)
                    var appID = that.globalData.appID;
                    var secret = that.globalData.appSecret;
                    var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appID;
                    url = url + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code';
                    //console.log(url);
                    wx.request({
                        url: url,
                        data: {},
                        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                        // header: {}, // 设置请求的 header
                        success: function (res) {
                            var openId = res.data.openid;
                            //that.globalData.openId = openId
                            //console.log(openId);
                            wx.setStorageSync('openId', openId);//存储openid
                        }
                    })

                    var url = 'https://api.weixin.qq.com/cgi-bin/token';
                    var params = {'grant_type': 'client_credential', 'appid': appID, 'secret': secret}
                    wx.request({
                        url: url,
                        data: params,
                        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                        // header: {}, // 设置请求的 header
                        success: function (res) {
                            var access_token = res.data.access_token
                            //console.log(access_token);
                            wx.setStorageSync('access_token', access_token);
                        }
                    });

                    var accessToken = wx.getStorageSync('access_token');
                    //console.log(accessToken);
                    var program_id = that.globalData.program_id;
                    //console.log(program_id);
                    var url = 'https://www.yxtechs.cn/saveaccesstoken';
                    wx.request({
                        url: url,
                        data: {'program_id': program_id, 'access_token': accessToken},
                        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                        // header: {}, // 设置请求的 header
                        success: function (res) {
                            console.log(res.data);
                        }
                    });

                    //显示提醒消息
                    //console.log(accessToken);
                    var program_id = that.globalData.program_id;
                    //console.log(program_id);
                    var url = 'https://www.yxtechs.cn/getannouncement';
                    wx.request({
                        url: url,
                        data: {'program_id': program_id},
                        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                        // header: {}, // 设置请求的 header
                        success: function (res) {
                            //console.log(res.data);
                            var message = res.data;
                            if (message != '') {
                                wx.showToast({
                                    title: message,
                                    icon: 'success',
                                    duration: 2000
                                })
                            }

                        }
                    });

                }
            })
        }
    },
    globalData: {
        userInfo: null,
        appID: 'wx8fc44649e3138a91',
        appSecret: 'a14ec392eaf98d6ed6734908268e5b0f',
        program_id: '1495234523',
    }
})