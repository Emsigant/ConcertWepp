//index.js
//获取应用实例
//app.globalData获取在app.js中定义的全局变量
const app = getApp();
const log = console.log;
const categoryUrl = '/pages/category/category';
const searchUrl = '/pages/search/search';
Page({
	data: {
		defaultCity: '武汉市',
		defaultLocation: ['湖北省', '武汉市','洪山区'],
		bannerItemList: [
			{ src: '/images/index/microphone.png', text: '演唱会' },
			{ src: '/images/index/dance.png', text: '音乐剧' },
			{ src: '/images/index/music.png', text: '音乐会' }
		],
		recommendationList: {
			col2: [
				{ src: '/images/index/r1.jpg', title: 'title1' },
				{ src: '/images/index/r2.jpg', title: 'title2' }
			],
			col3: [
				{ src: '/images/index/r3.jpg', title: 'title3' },
				{ src: '/images/index/r4.jpg', title: 'title4' },
				{ src: '/images/index/r5.jpg', title: 'title5' }
			]
		}
	},

	onLoad: function () {

	},
	//eventhandlers
	chooseLocation(e) {
		log('choose location')
	},
	tapItem(e) {
		// console.log(e);
		let _id = e.currentTarget.dataset.itemId;
		wx.navigateTo({
			url: categoryUrl + '?from=index&itemId=' + _id
		});
	},
	goToSearch() {
		log('go to search')
		wx.navigateTo({
			url: searchUrl + '?from=index'
		})
	},
	bindRegionChange(e) {
		let v = e.detail.value
		this.setData({
			defaultLocation: [v.shift(), v.shift(), v.shift()]
		})
	}
})
