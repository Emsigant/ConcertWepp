// pages/category/category.js
const mapTable = {
	'0': {
		text: '演唱会'
	},
	'1': {
		text: '音乐剧'
	},
	'2': {
		text: '音乐会'
	}
}
const detailUrl = '/pages/detail/detail'
Page({

  /**
   * 页面的初始数据
   */
	data: {

	},

  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
		let { itemId } = options
		if (itemId) {
			wx.setNavigationBarTitle({
				title: mapTable[itemId].text
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