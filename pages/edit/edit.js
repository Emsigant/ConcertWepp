// pages/edit/edit.js
import { requestBaseIp, getCookie } from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldPhone: '',
    oldName: '',
    oldId: '',
    p: '',
    n: '',
    i: '',
    contactId: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: requestBaseIp + '/user/contact/query',
      method: 'POST',
      data: {
        contactId: options.contactId,
      },
      header: {
        cookie: getCookie(),
      },
      success: (resp) => {
        if (resp.data.code === '1') {
          this.setData({
            contactId: options.contactId,
            oldPhone: resp.data.content.phone,
            oldName: resp.data.content.name,
            oldId: resp.data.content.idCard,
            p: resp.data.content.phone,
            n: resp.data.content.name,
            i: resp.data.content.idCard,
          })
        }
      }
    })
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
          n: value,
        })
      } break;
      case '2': {
        this.setData({
          p: value,
        })
      } break;
      case '3': {
        this.setData({
          i: value,
        })
      } break;
    }
  },
  tap(e) {
    if (this.data.p === '' || this.data.i === '' || this.data.n === '') {
      wx.showToast({
        title: '三项内容均不可为空',
        duration: 1000,
        image: '/images/error.png'
      })
    } else {
      wx.request({
        url: requestBaseIp + '/user/contact/modify',
        method: 'POST',
        data: {
          phone: this.data.p,
          name: this.data.n,
          idCard: this.data.i,
          contactId: this.data.contactId,
        },
        header: {
          cookie: getCookie(),
        },
        success: (resp) => {
          if(resp.data.code === '1') {
            wx.navigateBack({
              delta: 1,
            })
          } else if(resp.data.code === '0'){
            wx.showToast({
              title: '数据格式不正确',
              image:'/images/error.png',
              duration: 1000,
            })
          }
        }
      })
    }
  }
})