const formatTime = timeStamp => {
  const date = new Date(+timeStamp)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const requestBaseIp = 'http://222.20.31.188:80';

const checkSession = (el) => {
  wx.login({
    success: (info) => {
      let cookie = wx.getStorageSync('cookie') || '';
      // check session
      wx.request({
        url: requestBaseIp + '/wechatApp/checkSession',
        method: 'POST',
        header: {
          cookie: 'JSESSIONID=' + cookie,
        },
        success: (resp) => {
          if (resp.data.code === '6') {
            // session过期 code='6'
            wx.setStorageSync('cookie', resp.data.content.sessionId);
            cookie = wx.getStorageSync('cookie');
            wx.request({
              url: requestBaseIp + '/wechatApp/login',
              method: 'POST',
              header: {
                cookie: 'JSESSIONID=' + cookie,
              },
              data: {
                code: info.code,
              },
              success: (loginres) => {
                if (loginres.data.code === '10000') {
                  // 用户不存在，开始注册
                  wx.getUserInfo({
                    success: (info) => {
                      wx.request({
                        url: requestBaseIp + '/wechatApp/register',
                        method: 'POST',
                        header: {
                          cookie: 'JSESSIONID=' + wx.getStorageSync('cookie'),
                        },
                        data: {
                          userInfo: info.userInfo,
                          signature: info.signature,
                          rawData: info.rawData,
                          encryptedData: info.encryptedData,
                          iv: info.iv,
                        },
                        success: (registres) => {
                          if (registres.data.code === '1') {
                            wx.setStorageSync('nickName', registres.data.content.nickName);
                            wx.setStorageSync('headerImageUrl', registres.data.content.headerImageUrl);
                          }
                        },
                      })
                    }
                  })
                } else if (loginres.data.code === '1') {
                  wx.setStorageSync('nickName', loginres.data.content.nickName);
                  wx.setStorageSync('headerImageUrl', loginres.data.content.headerImageUrl);
                  if (el) {
                    el.setData({
                      login: true,
                    })
                  }
                }
              }
            })
          } else if (resp.data.code === '1') {
            // session未过期 code='1'
            if (el) {
              el.setData({
                login: true,
              })
            }
          }
        },
      });
    }
  });
}

function getCookie() {
  return 'JSESSIONID=' + wx.getStorageSync('cookie');
}

module.exports = {
  formatTime: formatTime,
  checkSession,
  getCookie,
  requestBaseIp,
}
