//index.js
//获取应用实例
//app.globalData获取在app.js中定义的全局变量
const app = getApp()
const log = console.log
Page({
	data: {
		defaultCity: '武汉',
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
		let _ct = e.currentTarget
		log('itemid: %d', _ct.dataset.itemid)
	},
	goToSearch() {
		log('go to search')
	}
})
