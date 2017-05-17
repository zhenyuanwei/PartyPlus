//app.js
var bmap = require('utils/bmap-wx.js')
App({
    onLaunch: function () {
        //调用API从本地缓存中获取数据
        /*var logs = wx.getStorageSync('logs') || []
         logs.unshift(Date.now())
         wx.setStorageSync('logs', logs)*/
        var BMap = new bmap.BMapWX({
            ak: 'idVXx3qbeSgpXsc0KDtIBY2MIXm5eg1q'
        });
        var fail = function(data) {
            console.log(data)
        };
        var success = function(data) {
            var weatherData = data.currentWeather[0];
            weatherData = weatherData.currentCity + '    ' + weatherData.weatherDesc + '    '  + weatherData.temperature + '    '  + weatherData.wind;
            /*that.setData({
                weatherData: weatherData
            });*/
            wx.setStorageSync('weatherData', weatherData)
        }
        // 发起weather请求
        BMap.weather({
            fail: fail,
            success: success
        });
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
                        withCredentials: true,
                        success: function (res) {
                            that.globalData.userInfo = res.userInfo
                            wx.setStorageSync('userInfo', res.userInfo);//存储userInfo
                            //that.globalData.encryptedData = res.encryptedData
                            typeof cb == "function" && cb(that.globalData.userInfo)
                        }
                    })
                    var code = res.code;
                    var appID = that.globalData.appID;
                    var secret = that.globalData.appSecret;
                    var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appID;
                    url = url + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code';
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
                            wx.setStorageSync('access_token', access_token);
                            //console.log(access_token);

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
        appID: 'wxcb5a250615b31903',
        appSecret: '407526ac19488297bcaaf643588faa39',
        //openId: '',
        //code: '',
        encryptedData: '',
        //program_id: '1494670818' //本地测试用
        program_id: '1494894288' //发布用
    }
})