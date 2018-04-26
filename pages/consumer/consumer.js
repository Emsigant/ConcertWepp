// pages/consumer/consumer.js
import { getCookie, requestBaseIp, } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList: [],
    dataFetched: false,
    showAddForm: false,
    showEditForm: false,
    newName: '',
    newPhone: '',
    newId: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: requestBaseIp + '/user/contact/queryList',
      header: {
        cookie: getCookie(),
      },
      method: 'POST',
      success: (resp) => {
        if (resp.data.code === '1') {
          this.setData({
            dataFetched: true,
            userList: resp.data.content.dataList,
          });
        }
        this.setData({
          dataFetched: true,
        });
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
    wx.request({
      url: requestBaseIp + '/user/contact/queryList',
      header: {
        cookie: getCookie(),
      },
      method: 'POST',
      success: (resp) => {
        if (resp.data.code === '1') {
          this.setData({
            dataFetched: true,
            userList: resp.data.content.dataList,
          });
        }
        this.setData({
          dataFetched: true,
        });
      }
    })
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
  tap(e) {
    let ct = e.currentTarget;
    let { path, contactId, } = ct.dataset;
    if (path && contactId) {
      wx.navigateTo({
        url: path + '?contactId=' + contactId,
      })
    } else if (path) {
      wx.navigateTo({
        url: path,
      })
    }
  }
})