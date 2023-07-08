// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  toEdit(){
    wx.navigateTo({
      url: '/pages/edit/edit',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      isEmpty:!this.data.list.isEmpty>0
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 添加后更新数据
    let list = wx.getStorageSync('list') || []
    this.udpateList(list)
  },
  // 删除
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
          that.udpateList(that.data.list)
        }
      }
    })
  },
  // 更新列表数据
  udpateList(list){
    this.setData({
      list: list,
      isEmpty:!list.length>0
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

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