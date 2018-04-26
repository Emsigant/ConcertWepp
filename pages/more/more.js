// pages/more/more.js
import { requestBaseIp, getCookie, formatTime, } from '../../utils/util.js';
const _mapOrderCodeToStatus = {
  '0': '初始化订单',
  '1': '已付款',
  '2': '已出票',
  '3': '未出票已过期',
  '4': '取消交易',
  '5': '图款申请中',
  '6': '退款申请不通过',
  '7': '退款中',
  '8': '退款成功',
  '9': '退款失败',
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    ready: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { orderId } = options;
    wx.request({
      url: requestBaseIp + '/wechatApp/order/query',
      data: {
        orderId,
      },
      method: 'POST',
      header: {
        cookie: getCookie(),
      },
      success: (resp) => {
        if (resp.data.code === '1') {
          this.setData({
            info: { ...resp.data.content, startTime: formatTime(resp.data.content.startTime), status: _mapOrderCodeToStatus[resp.data.content.status] },
            ready: true,
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

  }
})