import G6 from '@antv/g6'
G6.registerEdge('circle-running', {
  afterDraw(cfg, group) {
    // 获得当前边的第一个图形，这里是边本身的 path
    const shape = group.get('children')[0]
    // 边 path 的起点位置
    const startPoint = shape.getPoint(0)

    // 添加红色 circle 图形
    const circle = group.addShape('circle', {
      attrs: {
        x: startPoint.x,
        y: startPoint.y,
        fill: '#1890ff',
        r: 3
      }
    })

    // 对红色圆点添加动画
    circle.animate({
      // 动画重复
      repeat: true,
      // 每一帧的操作，入参 ratio：这一帧的比例值（Number）。返回值：这一帧需要变化的参数集（Object）。
      onFrame(ratio) {
        // 根据比例值，获得在边 path 上对应比例的位置。
        const tmpPoint = shape.getPoint(ratio)
        // 返回需要变化的参数集，这里返回了位置 x 和 y
        return {
          x: tmpPoint.x,
          y: tmpPoint.y
        }
      }
    }, 3000) // 一次动画的时间长度
  }
}, 'polyline') // 该自定义边继承内置三阶贝塞尔曲线 cubic
