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

function getMockData() {
  var array = [
      {
        id: "0001",
        name: "Blockchain session",
        time: "5/12 14:00 - 15:00",
        localtion: "R302",
        attendNum: 20,
        totalNum : 20
      },
      {
        id: "0002",
        name: "Watson session",
        time: "5/21 15:00 - 16:00",
        localtion: "R302",
        attendNum: 15,
        totalNum : 20
      },
      {
        id: "0003",
        name: "Watson session2",
        time: "5/25 15:00 - 16:00",
        localtion: "R302",
        attendNum: 18,
        totalNum : 20
      }
    ]
    return array
}

function getMockUserData() {
  var array = [
      {
        id: "0001",
        name: "张三",
        time: "5/12 14:00",
        tel: "13904110001",
      },
      {
        id: "0002",
        name: "李四",
        time: "5/12 14:00",
        tel: "13904110002",
      },
      {
        id: "0003",
        name: "王五",
        time: "5/12 14:00",
        tel: "13904110002",
      }
    ]
    return array
}

module.exports = {
  formatTime: formatTime,
  getToday: getToday,
  getNowTime: getNowTime,
  getMockData: getMockData,
  getMockUserData: getMockUserData
}
