// shareflow.js
var utils = require('../../utils/util.js');
var app = getApp();
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
        wx.setStorageSync('issue_id', issue_id);
        that.setData(
            {issue_id: issue_id}
        )
        var url = app.globalData.baseURL + "/flow/getissueinfo";
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
        var issue_id = wx.getStorageSync('issue_id');
        var url = "pages/shareflow/shareflow?issue_id=" + issue_id;
        /*wx.navigateTo({
         url: url
         })*/
        return {
            title: '您收到的报修申请',
            path: url
        }
    },

    bindButtonSubmit: function (e) {
        var that = this;
        var params = e.detail.value;
        var formId = e.detail.formId;
        var openId = wx.getStorageSync('openId');
        var nickname = wx.getStorageSync('userInfo').nickName;
        var license_num = wx.getStorageSync('license_num')
        params['openId'] = openId;
        params['nickname'] = nickname;
        params['license_num'] = license_num;
        if (e.detail.value.process_comment.length == 0) {
            this.setData({
                tip: '提示：输入项目不能为空！',
            })
        } else {
            var url = app.globalData.baseURL + '/flow/dosavelogs';
            wx.request({
                url: url,
                data: params,
                method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                // header: {}, // 设置请求的 header
                success: function (res) {
                    var messageinfo = res.data;
                    //console.log(message);
                    //发送消息到调度员
                    var message = {
                        "touser": messageinfo.openId,
                        "template_id": messageinfo.template_id,
                        "form_id": formId,
                        "data": {
                            "keyword1": {
                                "value": messageinfo.issue_id,
                            },
                            "keyword2": {
                                "value": messageinfo.issue_company,
                            },
                            "keyword3": {
                                "value": messageinfo.message,
                            }
                        }
                    }
                    //console.log(message)
                    utils.sendMessage(message);
                    //发送消息到调度员

                    var page = "../ownedflow/ownedflow";
                    wx.switchTab({
                        url: page
                    })
                }
            })
        }
        //console.log(params);
    },

    bindCompleteSubmit: function (e) {
        wx.showModal({
            title: '提示',
            content: '报修处理结果已经确认清晰，确认完成报修？',
            success: function (res) {
                if (res.confirm) {
                    var params = e.detail.value;
                    var formId = e.detail.formId;
                    var url = app.globalData.baseURL + '/flow/setstatus';
                    params['issue_status'] = '9';
                    //console.log(url);
                    wx.request({
                        url: url,
                        data: params,
                        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                        // header: {}, // 设置请求的 header
                        success: function (res) {
                            var messageinfo = res.data;
                            //console.log(message);
                            //发送消息到调度员
                            var message = {
                                "touser": messageinfo.openId,
                                "template_id": messageinfo.template_id,
                                "form_id": formId,
                                "data": {
                                    "keyword1": {
                                        "value": messageinfo.issue_id,
                                    },
                                    "keyword2": {
                                        "value": messageinfo.issue_company,
                                    },
                                    "keyword3": {
                                        "value": messageinfo.message,
                                    }
                                }
                            }
                            console.log(message);
                            utils.sendMessage(message);
                            //发送消息到调度员

                            var page = "../index/index";
                            wx.switchTab({
                                url: page
                            })
                        }
                    })

                }
            }
        })
    },

    bindCancelSubmit: function (e){
        wx.showModal({
            title: '提示',
            content: '确认取消报修申请？',
            success: function (res) {
                if (res.confirm){
                    var params = e.detail.value;
                    var formId = e.detail.formId;
                    var url = app.globalData.baseURL + '/flow/setstatus';
                    params['issue_status'] = '0';
                    //console.log(url);
                    wx.request({
                        url: url,
                        data: params,
                        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                        // header: {}, // 设置请求的 header
                        success: function (res) {
                            var messageinfo = res.data;
                            //console.log(message);
                            //发送消息到调度员
                            var message = {
                                "touser": messageinfo.openId,
                                "template_id": messageinfo.template_id,
                                "form_id": formId,
                                "data": {
                                    "keyword1": {
                                        "value": messageinfo.issue_id,
                                    },
                                    "keyword2": {
                                        "value": messageinfo.issue_company,
                                    },
                                    "keyword3": {
                                        "value": messageinfo.message,
                                    }
                                }
                            }
                            console.log(message);
                            utils.sendMessage(message);
                            //发送消息到调度员

                            var page = "../index/index";
                            wx.switchTab({
                                url: page
                            })
                        }
                    })
                }
            }
        })
    }

})