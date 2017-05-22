var qrcode = require('./qrcode');

function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

function getToday() {
    var now = new Date()
    var year = now.getFullYear()      //年
    var month = now.getMonth() + 1    //月
    var day = now.getDate()           //日
    var current_day = formatNumber(year) + '-' +
        formatNumber(month) + '-' + formatNumber(day)
    return current_day
}

function getNowTime() {
    var now = new Date()
    var hh = now.getHours()     //时
    var mm = now.getMinutes()   //分
    var current_time = formatNumber(hh) + ':' + (mm)
    return current_time
}

//发送信息
function sendMessage(message) {

    var access_token = wx.getStorageSync('access_token');
    //console.log(access_token);
    var url = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + access_token
    wx.request({
        url: url,
        data: message,
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
            //var access_token = res.data.access_token
            //wx.setStorageSync('access_token', access_token);
            console.log(res.data);
        }
    });

}

//微信二维码
function getWxCode(page) {
    var access_token = wx.getStorageSync('access_token');
    var url = "https://api.weixin.qq.com/wxa/getwxacode?access_token=" + access_token;
    var params = {"path": page}
    wx.request({
        url: url,
        data: params,
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
            //var access_token = res.data.access_token
            //wx.setStorageSync('access_token', access_token);
            //console.log(res.data);
            return res.data
        }
    });
}

function convert_length(length) {
    return Math.round(wx.getSystemInfoSync().windowWidth * length / 750);
}


function qrc(id, page, width, height) {
    var code = String(getWxCode(page));
    qrcode.api.draw(code, {
        ctx: wx.createCanvasContext(id),
        width: convert_length(width),
        height: convert_length(height)
    })
}

//微信二维码

module.exports = {
    formatTime: formatTime,
    getToday: getToday,
    getNowTime: getNowTime,
    sendMessage: sendMessage,
    getWxCode: getWxCode,
    qrcode: qrc
}
