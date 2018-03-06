//message.js
Component({
  behaviors: [],

  properties: {
    item: {
      //  信息
      type: Object,
      value: {
        text: '测试一下',
        imgUrl: '../../images/!_top.jpg',
        className: 'bg-green',
        align: 'left',
      },
    },
  },
  data: {}, // 私有数据，可用于模版渲染

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached() {},
  moved() {},
  detached() {},

  methods: {
    onMyButtonTap: function() {
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
      });
    },
  },
});
