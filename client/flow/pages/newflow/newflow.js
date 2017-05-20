// newflow.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        license_num: '',
        license: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var license_num = options.license_num;
        var that = this;
        if (license_num == null) {
            license_num = 'nolicense';
            that.setData(
                {license: false}
            )

        }
        that.setData(
            {license_num: license_num}
        )
        //console.log(license_num)


    },
    bindButtonTap: function (e) {
        var that = this;
        var url = "../shareflow/shareflow?showbutton=false";
        if (that.license_num == 'nolicense') {
            wx.navigateTo({
                url: url
            })
        } else {
            //ToBe add save data to DB
            //ToBe add save data to DB
            var flow_id = '';
            url = url + '&flow_id=' + flow_id;
            wx.navigateTo({
                url: url
            })
        }

    }
})