// pages/detail/detail.js
import { formatTime, requestBaseIp, } from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailInfo: {},
    detailFetched: false,
    productFetched: false,
    productTypeList: [],
    productDataList: [],
    selectedProductIndex: 0,
    showId: '',
    productId: '',
    showName: '',
    startTime: '',
    showAreaName: '',
    price: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { showId } = options;
    this.setData({
      showId,
    });
    if (showId) {
      // 查询演出详细信息
      wx.request({
        url: requestBaseIp + '/show/query',
        method: 'POST',
        data: {
          showId,
        },
        success: (resp) => {
          let data = resp.data;
          if (data.code === '1') {
            this.setData({
              detailInfo: {
                ...data.content,
                startTime: formatTime(data.content.startTime),
              },
              detailFetched: true,
              showName: data.content.showName,
              startTime: formatTime(data.content.startTime),
            })
          }
        }
      });
      // 查询演出的门票类型列表
      wx.request({
        url: requestBaseIp + '/show/queryProduct',
        method: 'POST',
        data: {
          showId,
        },
        success: (resp) => {
          let data = resp.data;
          if (data.code === '1') {
            this.setData({
              productFetched: true,
              productTypeList: data.content.dataList.map(item => item.showAreaName + '(￥' + (+item.price / 100) + ' 余票：' + item.stock + ')'),
              productDataList: data.content.dataList,
              productId: data.content.dataList[0].productId,
              price: data.content.dataList[0].price,
              showAreaName: data.content.dataList[0].showAreaName,
            })
          }
        }
      })
    }
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

  pickerChange(e) {
    if (e.detail) {
      this.setData({
        selectedProductIndex: +e.detail.value,
        productId: this.data.productDataList[+e.detail.value].productId,
        price: this.data.productDataList[+e.detail.value].price,
        showAreaName: this.data.productDataList[+e.detail.value].showAreaName,
      })
    }
  },
  buy(e) {
    wx.navigateTo({
      url: '/pages/buy/buy?productId=' + this.data.productId + '&price=' + this.data.price + "&showAreaName=" + this.data.showAreaName + '&startTime=' + this.data.startTime + '&showName=' + this.data.showName,
    });
  }
})