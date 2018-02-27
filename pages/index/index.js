//index.js
//获取应用实例
import api from '../../utils/api/index';

const app = getApp();

Page({
  data: {
    motto: '测一测你的2018',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    sexOption: [
      {
        name: 1,
        value: '男',
      },
      {
        name: 2,
        value: '女',
      },
    ],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs',
    });
  },
  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '与自卑的树洞聊天',
    });
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#393a3f',
    });
    console.log('进来了');
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      });
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        });
        console.log('res.userInfo.gender', res.userInfo.gender);
        this.setSex(res.userInfo.gender);
      };
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: (res) => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          });
        },
      });
    }
  },
  sendMessage(data) {
    console.log('发送消息', data);

    // api
    //   .get('/turing/turing', {
    //     info: '你好',
    //   })
    //   .callback((res) => {
    //     console.log('我回调成功了', res);
    //   });
  },
  //  获取用户信息
  getUserInfo: function(e) {
    console.log('拿到用户信息', e);
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    });
  },
  //  设置性别默认
  setSex(value) {
    console.log(value);
    const data = [];
    let checked = false;
    for (let i = 0; i < this.data.sexOption.length; i += 1) {
      const item = this.data.sexOption[i];
      if (item.name === value) {
        checked = true;
      } else {
        checked = false;
      }
      data.push({
        ...item,
        checked,
      });
    }
    this.setData({
      sexOption: data,
    });
  },
  //  表单提交
  onSubmit(form) {
    const i = Math.ceil(Math.random() * 8);
    wx.navigateTo({
      // url: '../detail/detail',
      url: `../detail/detail?id=${i}`,
    });
  },
});
