import G6 from '@antv/g6'
G6.registerNode('server', {
  draw(cfg, group) {
    // 如果 cfg 中定义了 style 需要同这里的属性进行融合
    group.addShape('path', {
      attrs: {
        path: this.getPath(cfg), // 根据配置获取路径
        stroke: cfg.color // 颜色应用到边上，如果应用到填充，则使用 fill: cfg.color
      }
    })
    if (cfg.label) {
      // 如果有文本
      // 如果需要复杂的文本配置项，可以通过 labeCfg 传入
      // const style = (cfg.labelCfg && cfg.labelCfg.style) || {};
      // style.text = cfg.label;
      group.addShape('text', {
        // attrs: style
        attrs: {
          x: 0, // 居中
          y: 0,
          textAlign: 'center',
          textBaseline: 'middle',
          text: cfg.label,
          fill: '#666'
        }
      })
    }
    return group
  },
  // 返回菱形的路径
  getPath(cfg) {
    const size = cfg.size || [40, 40] // 如果没有 size 时的默认大小
    const width = size[0]
    const height = size[1]
    //  / 1 \
    // 4     2
    //  \ 3 /

    const path = 'M470.9 954.6c-1.2 0-2.3-0.3-3.4-0.9l-240-132.2c-2.2-1.2-3.6-3.6-3.6-6.1V270.6c0-2.5 1.3-4.7 3.4-6L546.9 70.4c1.1-0.7 2.4-1 3.6-1 1.2 0 2.4 0.3 3.4 0.9l242.6 136.9c2.2 1.2 3.6 3.6 3.6 6.1v552.8c0 2.5-1.4 4.9-3.6 6.1L474.4 953.7c-1.1 0.6-2.3 0.9-3.5 0.9z'
    return path
  }
})
