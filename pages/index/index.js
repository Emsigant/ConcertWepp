//index.js
//获取应用实例
//app.globalData获取在app.js中定义的全局变量
import { checkSession, requestBaseIp, } from '../../utils/util.js'

const app = getApp();

const categoryUrl = '/pages/category/category';
const searchUrl = '/pages/search/search';
const detailUrl = '/pages/detail/detail';

const cimg1 = '/images/index/microphone.png';
const cimg2 = '/images/index/dance.png';
const cimg3 = '/images/index/music.png';

const log = console.log;
const _json = JSON.stringify;

function queryIndex(el, data) {
  if (el) {
    wx.request({
      url: requestBaseIp + '/show/queryIndex',
      method: 'POST',
      data,
      success: function (res) {
        // console.log(res.data)
        if (res.data.code === '1') {
          el.setData({
            topRecommendList: res.data.content.dataList,
          })
        }

      }
    });
  }
}

function queryIndexTypeList(el, data) {
  if (el) {
    wx.request({
      url: requestBaseIp + '/show/queryIndexTypeList',
      method: 'POST',
      data,
      success: function (res) {
        // console.log(res.data)
        if (res.data.code === '1') {
          el.setData({
            recommentListType1: res.data.content.dataList[0].showList,
            recommentListType2: res.data.content.dataList[1].showList,
            recommentListType3: res.data.content.dataList[2].showList,
          })
        }
      }
    });
  }
}

const hanldeQuery = (path, query) => {
  let _query = '?'
  for (let k in query) {
    _query = _query + k + '=' + query[k] + '&';
  }
  _query = _query.substr(0, _query.length - 1);
  return path + _query;
};
Page({
  data: {
    defaultCity: '武汉市',
    defaultLocation: ['湖北省', '武汉市', '洪山区'],
    topRecommendList: [],
    topFetched: false,
    recommendFetched: false,
    recommentListType1: [],
    recommentListType2: [],
    recommentListType3: [],
    bannerItemList: [
      { src: cimg1, text: '演唱会', path: categoryUrl, showTypeId: "STI0000000001", },
      { src: cimg2, text: '音乐剧', path: categoryUrl, showTypeId: "STI0000000002", },
      { src: cimg3, text: '音乐会', path: categoryUrl, showTypeId: "STI0000000003", },
    ],
    multiArray: [[], []],
    multiIndex: [0, 0],
    mapLocationToProvinceCity: {},
    map: [],
    cityFetched: false,
    oldPro: 0,
    oldCity: 0,
    location: '',
    login: false,
  },

  onLoad: function () {
    // 微信登录
    checkSession(this);

    // 获取城市列表
    wx.request({
      url: requestBaseIp + '/show/queryLocation',
      method: 'POST',
      success: (resp) => {
        let arr = resp.data.content.dataList,
          _map = this.data.mapLocationToProvinceCity,
          _multiArray = this.data.multiArray,
          map = this.data.map;
        let l = arr.length;
        for (let i = 0; i < l; i++) {
          let pro = arr[i].province,
            city = arr[i].city;
          if (pro in _map) {
            _map[pro].push(city);
          } else {
            _map[pro] = [city];
          }
        }
        for (let key in _map) {
          _multiArray[0].push(key);
          map.push({
            province: key,
            city: _map[key],
          });
        }
        for (let i = 0; i < map[this.data.oldPro].city.length; i++) {
          _multiArray[1].push(map[this.data.oldPro].city[i]);
        }
        this.setData({
          mapLocationToProvinceCity: _map,
          multiArray: _multiArray,
          map,
          cityFetched: true,
        });
        // 根据地点请求首页推荐
        let location = this.data.multiArray[0][this.data.oldPro] + '|' + this.data.multiArray[1][this.data.oldCity];
        this.setData({
          location,
        });
        queryIndex(this, { location });
        queryIndexTypeList(this, { location });
      },
      fail: (resp) => {
        console.log(resp);
      }
    });
  },
  tapItem(e) {
    // console.log(e);
    let _id = e.currentTarget.dataset.itemId;
    wx.navigateTo({
      url: categoryUrl + '?from=index&itemId=' + _id,
    });
  },
  goToSearch() {
    log('go to search')
    wx.navigateTo({
      url: searchUrl + '?from=index',
    })
  },
  bindRegionChange(e) {
    let v = e.detail.value
    this.setData({
      defaultLocation: [v.shift(), v.shift(), v.shift()],
    })
  },
  goDetail(e) {
    let _path = e.currentTarget.dataset.path
    wx.navigateTo({
      url: _path
    })
  },
  bindMultiPickerChange: function (e) {
    this.setData({
      multiIndex: [e.detail.value[0], e.detail.value[1]],
      oldPro: e.detail.value[0],
      oldCity: e.detail.value[1],
    });
    let location = this.data.multiArray[0][this.data.oldPro] + '|' + this.data.multiArray[1][this.data.oldCity];
    this.setData({
      location,
    });
    queryIndex(this, { location });
    queryIndexTypeList(this, { location });
  },
  bindMultiPickerColumnChange: function (e) {
    let _column = e.detail.column,
      _value = e.detail.value,
      map = this.data.map;
    let _multiArray = this.data.multiArray;
    if (_column === 0) {
      this.setData({
        multiArray: [_multiArray[0], map[_value].city],
        multiIndex: [_value, 0],
      })
    }
  },
  bindMultiPickerCancel(e) {
    let _ma = this.data.multiArray,
      _mltpc = this.data.mapLocationToProvinceCity,
      _op = this.data.oldPro;
    this.setData({
      multiArray: [_ma[0], _mltpc[_ma[0][_op]]],
      multiIndex: [_op, this.data.oldCity],
    })
  },
  bindTap(e) {
    let ctds = e.currentTarget.dataset;
    let { path, showTypeId, title, location, showId, } = ctds;
    if (path && showTypeId && title && location) {
      wx.navigateTo({
        url: hanldeQuery(path, { showTypeId, title, location, }),
      });
    }
    if (path && showId) {
      wx.navigateTo({
        url: hanldeQuery(path, { showId, }),
      });
    }
  }
})
