// pages/person/person.js
//getApp(): get the wepp
import { checkSession, requestBaseIp, } from '../../utils/util.js';
const log = console.log;
const commonPathPrefix = '/pages';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    needCheckSession: false,
    headerImageUrl: '',
    nickName: '',
    itemList: [
      {
        text: '我的票',
        img: '/images/person/ticket.png',
        path: commonPathPrefix + '/ticket/ticket'
      },
      {
        text: '我的订单',
        img: '/images/person/order.png',
        path: commonPathPrefix + '/order/order'
      },
      {
        text: '购票人',
        img: '/images/person/people.png',
        path: commonPathPrefix + '/consumer/consumer'
      },
      {
        text: '关于产品',
        img: '/images/person/about.png',
        path: commonPathPrefix + '/about/about'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      needCheckSession: true,
      nickName: wx.getStorageSync('nickName') || '未登录',
      headerImageUrl: requestBaseIp + (wx.getStorageSync('headerImageUrl') || '/images/test/user.jpg'),
    })
    checkSession();
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
    if (!this.data.needCheckSession) {
      checkSession();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      needCheckSession: false,
    })
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
	/**
	 * self defined event handlers
	 */
  tapListItem(e) {
    let ct = e.currentTarget;
    let { path } = ct.dataset;
    if (path) {
      wx.navigateTo({
        url: path,
      })
    }
  }
})