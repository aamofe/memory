// pages/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: null, // 标题
    content: null,// 内容
  },
  bindTitle(event) {
    this.data.title = event.detail.value
  },
  toEdit(event) {
    let index = event.currentTarget.dataset.index
    let isClickItem = index >= 0
    if (isClickItem) {
      // 从列表点击
      wx.navigateTo({
        url: '/pages/edit/edit?index=' + index,
      })
    } else {
      // 从新建按钮点击
      wx.navigateTo({
        url: '/pages/edit/edit',
      })
    }
  },
  // 监听内容
  bindContent(event) {
    this.data.content = event.detail.value
  },
  // 保存数据
  save() {
    let title = this.data.title
    let content = this.data.content
    if (this.isEmpty(title)) {
      wx.showToast({
        title: '标题不能为空',
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (this.isEmpty(content)) {
      wx.showToast({
        title: '内容不能为空',
        icon: 'error',
        duration: 2000
      })
      return
    }
    
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000
    })
    let list = wx.getStorageSync('list')||[]
    // 组装数据对象
    let data = {
      title: title,
      content: content,
      date: this.getNowDate(),
      time: this.getNowTime()
    }
    if (this.data.index) {
      // 删除
      list.splice(this.data.index, 1)
    }
    // 在开头插入到数组中
    list.unshift(data)
    // 设置到本地缓存
    wx.setStorageSync('list', list)

    // 省略提示代码
    
    // 回到上一页面
    wx.navigateBack()
  },
  del(event) {
    let that = this
    let index = event.currentTarget.dataset.index
    wx.showModal({
      title: '提示',
      content: '你确定删除?',
      success(res) {
        if (res.confirm) {
          that.data.list.splice(index, 1)
          wx.setStorageSync('list', that.data.list)
          that.setData({
            list: that.data.list,
            isEmpty:!that.data.list.length>0
          })
        }
      }
    })
  },
  // 判断字符串是否为空
  isEmpty(str) {
    if (str != null && str.trim().length > 0) {
      return false;
    }
    return true;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.index) {
      // 显示已有数据
      let list = wx.getStorageSync('list')
      let item = list[options.index]
      this.setData({
        title: item.title,
        content: item.content,
        nowDate: item.date,
        nowTime: item.time,
        index: options.index
      })

    } else {
      // 显示最新数据
      this.setData({
        nowDate: this.getNowDate(),
        nowTime: this.getNowTime()
      })
    }
  },
  getNowDate:function(){
    let dateTime
    let YYYY = new Date().getFullYear()
    let MM = new Date().getMonth() + 1
    let DD = new Date().getDate()
    dateTime = YYYY + '-' + MM + '-' + DD
    return dateTime
  },
  getNowTime: function () {
    let dateTime
    let HH = new Date().getHours()
    let mm = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() :
      new Date().getMinutes()
    dateTime = HH + ':' + mm
    return dateTime
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady:function() {
    console.log("onRead ","监听页面初次渲染完成")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow:function() {
    console.log("onShow ","监听页面显示")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide','监听页面隐藏')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload','监听页面卸载')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})