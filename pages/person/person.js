// pages/person/person.js
//getApp(): get the wepp
const log = console.log;
Page({

  /**
   * 页面的初始数据
   */
	data: {
		userInfo: null,
		itemList: [
			{
				text: '我的票',
				img: '/images/person/ticket.png',
				path: 'ticket'
			},
			{
				text: '我的订单',
				img: '/images/person/order.png',
				path: 'order'
			},
			{
				text: '我的收藏',
				img: '/images/person/collection.png',
				path: 'collection'
			},
			{
				text: '购票人',
				img: '/images/person/people.png',
				path: 'people'
			},
			{
				text: '关于产品',
				img: '/images/person/about.png',
				path: 'about'
			}
		]
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
	/**
	 * self defined event handlers
	 */
	tapListItem(e) {
		let ct = e.currentTarget;
		console.log(ct.dataset)
		wx.navigateTo({
			url: '/pages/about/about?path=' + ct.dataset.targetPath
		})
	}
})