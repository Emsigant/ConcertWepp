// pages/buy/buy.js
import { requestBaseIp, getCookie, } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList: [],
    userFetched: false,
    productId: '',
    price: 0,
    buyUserList: [],
    showAreaName: '',
    showName: '',
    startTime: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { productId, price, showAreaName, showName, startTime, } = options;
    this.setData({
      productId,
      price: +price,
      showAreaName,
      showName,
      startTime,
    });
    wx.request({
      url: requestBaseIp + '/user/contact/queryList',
      header: {
        cookie: getCookie(),
      },
      method: 'POST',
      success: (resp) => {
        if (resp.data.code === '1') {
          this.setData({
            userFetched: true,
            userList: resp.data.content.dataList,
            buyUserList: resp.data.content.dataList.slice(0, 1),
          });
        }
        this.setData({
          userFetched: true,
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
            userFetched: true,
            userList: resp.data.content.dataList,
            buyUserList: resp.data.content.dataList.slice(0, 1),
          });
        }
        this.setData({
          userFetched: true,
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
  checkbox(e) {
    let value = e.detail.value;
    this.setData({
      buyUserList: value.map(item => (
        this.data.userList[item]
      ))
    })
  },
  deal(e) {
    if (this.data.buyUserList.length !== 0) {
      wx.request({
        url: requestBaseIp + '/wechatApp/order/init',
        method: 'POST',
        data: {
          productId: this.data.productId,
          productCount: this.data.buyUserList.length,
          unitPrice: this.data.price,
          userContacts: this.data.buyUserList,
        },
        header: {
          cookie: getCookie(),
        },
        success: (resp) => {
          if(resp.data.code === '1') {
            wx.request({
              url: requestBaseIp +'/wechatApp/order/place',
              data: {
                orderId: resp.data.content.orderId,
              },
              header:{
                cookie: getCookie(),
              },
              method:'POST',
              success:(placeRes) =>{
                
              }
            })
          }
        }
      })
    }
    else {
      wx.showToast({
        title: '请至少购买一张票',
        image: '/images/error.png',
        duration: 1000,
      });
    }
  },
  addBuyUser(e) {
    wx.navigateTo({
      url: '/pages/add/add',
    })
  }
})