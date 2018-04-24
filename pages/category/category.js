// pages/category/category.js
const requestBaseIp = 'http://222.20.31.188:8080';
const detailUrl = '/pages/detail/detail'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		pageNo: 1,
		pageSize: 10,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log(options);
		let { title, showTypeId, location, } = options;
		if (title && showTypeId) {
			wx.setNavigationBarTitle({
				title,
			});
			wx.request({
				url: requestBaseIp + '/show/queryListByType',
				data: {
					showTypeId,
					location,
					pageNo: this.data.pageNo,
					pageSize: this.data.pageSize,
				},
				success: (resp) => {
					console.log(resp)
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
		let _id = e.currentTarget.dataset.itemId
		wx.navigateTo({
			url: detailUrl + '?from=cat&id=' + _id
		})
	}
})