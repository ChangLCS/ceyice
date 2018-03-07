//index.js
//获取应用实例
import apiIndex from '../../api/index/index';

const app = getApp();

Page({
  data: {
    navTitle: '与树洞的聊天',
    windowHeight: 0, //  设备高度
    windowWidth: 0, //  设备宽度
    mainHeight: 0, //  聊天窗口高度
    scrollId: 'message',
    messageData: {},
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    dataList: [],
    imgTop: '../../images/!_top.jpg',
    inputValue: '',
  },
  onReady: function() {
    //获得message组件
    this.message = this.selectComponent('#message');
  },
  //  小程序进入页面自带初始化
  onLoad() {
    const that = this;
    wx.setNavigationBarTitle({
      title: that.data.navTitle,
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
        success(res) {
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
    const message = {
      id: new Date().getTime(),
      time: new Date(),
      type: 1, //  机器人回复
      text: `${this.data.userInfo.nickName}，天王盖地虎，下一句是什么？？？`,
      imgUrl: this.data.imgTop,
      className: 'bg-green',
      align: 'left',
    };

    this.setDataList(message);

    this.setData({
      scrollId: `message-${message.id}`,
    });

    const that = this;
    //  获取设备信息
    wx.getSystemInfo({
      success(res) {
        that.setData({
          //  rpx 与 px 的转换为 300/750
          mainHeight: res.windowHeight - 100 / 750 * 300,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
        });
      },
    });
  },
  //  发送消息
  sendMessage(form) {
    const info = form.detail.value.text;
    if (!info) {
      return false;
    }

    const that = this;
    wx.setNavigationBarTitle({
      title: `${that.data.navTitle}(输入中...)`,
    });

    const message = {
      id: new Date().getTime(),
      time: new Date(),
      type: 0, //  用户自己
      text: info,
      imgUrl: that.data.userInfo.avatarUrl,
      className: 'bg-white',
      align: 'right',
    };

    that.setDataList(message);

    that.setData({
      inputValue: '',
      scrollId: `message-${message.id}`,
    });

    console.log('发送消息', form);

    apiIndex
      .sendMessage({
        info,
      })
      .then((res) => {
        console.log('res', res);
        if (res.data.code === '10000') {
          const data = res.data.result.text;

          const message = {
            id: new Date().getTime(),
            time: new Date(),
            type: 1, //  机器人回复
            text: data,
            imgUrl: this.data.imgTop,
            className: 'bg-green',
            align: 'left',
          };

          this.setDataList(message);

          this.setData({
            inputValue: '',
            scrollId: `message-${message.id}`,
          });

          wx.setNavigationBarTitle({
            title: `${that.data.navTitle}`,
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
