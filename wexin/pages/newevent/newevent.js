var utils = require('../../utils/util.js')
var app = getApp()
Page({
  data:{
      datestart: '',
      timestart: '',
      dateend: '',
      timeend: ''
  },
  bindDateStartChange: function(e) {
    this.setData({
      datestart: e.detail.value
    })
  },
  bindTimeStartChange: function(e) {
    this.setData({
      timestart: e.detail.value
    })
  },
  bindDateEndChange: function(e) {
    this.setData({
      dateend: e.detail.value
    })
  },
  bindTimeEndChange: function(e) {
    this.setData({
      timeend: e.detail.value
    })
  },
  
  onLoad: function(options) {
      var current_day = utils.getToday()
      var current_time = utils.getNowTime()
      this.setData({
          datestart: current_day
      })
      this.setData({
          timestart: current_time
      })
      this.setData({
          dateend: current_day
      })
      this.setData({
          timeend: current_time
      })
  }
})