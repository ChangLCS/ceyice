//index.js
//获取应用实例
import apiIndex from '../../api/index/index';

const app = getApp();

Page({
  data: {
    messageData: {
      text: '你好',
      imgUrl: '../../images/!_top.jpg',
      className: 'bg-green',
      align: 'left',
    },
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    dataList: [],
    imgTop: '../../images/!_top.jpg',
  },
  onReady: function() {
    //获得message组件
    this.message = this.selectComponent('#message');
  },
  //  小程序进入页面自带初始化
  onLoad() {
    wx.setNavigationBarTitle({
      title: '与树洞的聊天',
    });
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#393a3f',
    });
    console.log('进来了', this.data.canIUse);
    if (app.globalData.userInfo) {
      console.log('有没有用户的信息', app.globalData.userInfo);
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      });
      this.dataInit();
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = (res) => {
        console.log('登录成功', res);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        });
        this.dataInit();
      };
    } else {
      console.log('wx.getUserInfo');
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: (res) => {
          console.log('终于拿到用户信息了', res);
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          });
          this.dataInit();
        },
      });
    }
  },
  //  获取到用户信息后先给他发一条消息
  dataInit() {
    this.setDataList({
      id: new Date().getTime(),
      time: new Date(),
      type: 1, //  机器人回复
      text: `${this.data.userInfo.nickName}，天王盖地虎，下一句是什么？？？`,
      imgUrl: this.data.imgTop,
      className: 'bg-green',
      align: 'left',
    });
  },
  //  发送消息
  sendMessage(form) {
    this.setDataList({
      id: new Date().getTime(),
      time: new Date(),
      type: 0, //  用户自己
      text: form.detail.value.text,
      imgUrl: this.data.userInfo.avatarUrl,
      className: 'bg-white',
      align: 'right',
    });

    console.log('发送消息', form);

    apiIndex
      .sendMessage({
        info: form.detail.value.text,
      })
      .then((res) => {
        console.log('res', res);
        if (res.data.code === '10000') {
          const data = res.data.result.text;

          this.setDataList({
            id: new Date().getTime(),
            time: new Date(),
            type: 1, //  机器人回复
            text: data,
            imgUrl: this.data.imgTop,
            className: 'bg-green',
            align: 'left',
          });
        }
      });
  },
  //  给dataList插入新的聊天信息
  setDataList(data) {
    const list = this.data.dataList || [];
    list.push(data);

    this.setData({
      dataList: list,
    });
  },
  //  获取用户信息
  getUserInfo(e) {
    console.log('拿到用户信息', e);
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    });
  },
});
