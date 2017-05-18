var bmap = require('../../utils/bmap-wx.js');
var wxMarkerData = [];
Page({
    data: {
        markers: [],
        latitude: '',
        longitude: '',
        placeData: {}
    },
    makertap: function (e) {
        var that = this;
        var id = e.markerId;
        that.showSearchInfo(wxMarkerData, id);
        that.changeMarkerColor(wxMarkerData, id);
    },
    onLoad: function () {
        var that = this;
        var BMap = new bmap.BMapWX({
            ak: 'idVXx3qbeSgpXsc0KDtIBY2MIXm5eg1q'
        });
        var fail = function (data) {
            console.log(data)
        };
        var success = function (data) {
            wxMarkerData = data.wxMarkerData;
            that.setData({
                markers: wxMarkerData
            });
            that.setData({
                latitude: wxMarkerData[0].latitude
            });
            that.setData({
                longitude: wxMarkerData[0].longitude
            });
        }
        BMap.search({
            "query": '海之乡日本料理',
            fail: fail,
            success: success,
            iconPath: '../../resource/img/marker_red.png',
            iconTapPath: '../../resource/img/marker_red.png'
        });
    },
    showSearchInfo: function (data, i) {
        var that = this;
        that.setData({
            placeData: {
                title: '名称：' + data[i].title + '\n',
                address: '地址：' + data[i].address + '\n',
                telephone: '电话：' + data[i].telephone
            }
        });
    },
    changeMarkerColor: function (data, id) {
        var that = this;
        var markersTemp = [];
        for (var i = 0; i < data.length; i++) {
            if (i === id) {
                data[i].iconPath = "../../resource/img/marker_yellow.png";
            } else {
                data[i].iconPath = "../../resource/img/marker_red.png";
            }
            markersTemp[i] = data[i];
        }
        that.setData({
            markers: markersTemp
        });
    }
})