// pages/category/category.js
const requestBaseIp = 'http://222.20.31.188:8080';
const detailUrl = '/pages/detail/detail';
Page({

	/**
	 * 页面的初始数据
	 */
  data: {
    pageNo: 1,
    pageSize: 10,
    dataList: [],
    dataFetched: false,
  },

	/**
	 * 生命周期函数--监听页面加载
	 */
  onLoad: function (options) {
    let { title, showTypeId, location, } = options;
    if (title && showTypeId && location) {
      wx.setNavigationBarTitle({
        title,
      });
      wx.request({
        url: requestBaseIp + '/show/queryListByType',
        method: 'POST',
        data: {
          typeId: showTypeId,
          location,
          pageNo: this.data.pageNo,
          pageSize: this.data.pageSize,
        },
        success: (resp) => {
          let data = resp.data;
          if (data.code === '1') {
            this.setData({
              dataFetched: true,
              dataList: data.content.dataList.map(item => {
                return {
                  ...item,
                  startTime: item.startTime.split(' ')[0],
                }
              }),
              pageNo: this.data.pageNo + 1,
            })
          }
        },
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
	/**
	 * 自定义事件
	 */
  goDetail(e) {
    let { showId, path, } = e.currentTarget.dataset;
    if (path) {
      wx.navigateTo({
        url: path + '?showId=' + showId,
      })
    }
  }
})