// pages/add/add.js
import { requestBaseIp, getCookie, } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newName: '',
    newPhone: '',
    newId: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  input(e) {
    let value = e.detail.value;
    let t = e.currentTarget.dataset.t;
    switch (t) {
      case '1': {
        this.setData({
          newName: value,
        })
      } break;
      case '2': {
        this.setData({
          newPhone: value,
        })
      } break;
      case '3': {
        this.setData({
          newId: value,
        })
      } break;
    }
  },
  tap(e) {
    if (this.data.newPhone === '' || this.data.newId === '' || this.data.newName === '') {
      wx.showToast({
        title: '三项内容均不可为空',
        duration: 1000,
        image: '/images/error.png'
      })
    } else {
      wx.request({
        url: requestBaseIp + '/user/contact/add',
        method: 'POST',
        data: {
          phone: this.data.newPhone,
          name: this.data.newName,
          idCard: this.data.newId,
        },
        header: {
          cookie: getCookie(),
        },
        success: (resp) => {
          wx.navigateBack({
            delta: 1,
          })
        }
      })
    }
  }
})