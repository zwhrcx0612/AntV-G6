<template>
  <div id="app">
    <div id="mountNode" />
    <!-- <div>
      <el-input></el-input>
    </div> -->
  </div>
</template>

<script>
import Vue from 'vue'
import G6 from '@antv/g6'
import ToolTip from './ToolTip'
// import BlogPost from './views/BlogPost'
export default {
  name: 'App',
  data() {
    return {
      tipValue: 'tip',
      testLazy: 111,
      searchText: 22,
      activeNames: ['1'],
      timer: null,
      flag: 1,
      temp: 1,
      data: {
        nodes: [
          { id: 'node0', x: 100, y: 100, class: 'server', cpu: '2', nem: '2' },
          { id: 'node1', x: 100, y: 200, class: 'server' },
          { id: 'node2', x: 100, y: 300, class: 'server' },
          { id: 'node3', x: 300, y: 200, class: 'server' },
          { id: 'node4', x: 500, y: 200, class: 'cloud' }
        ],
        edges: [
          {
            shape: 'line-dash',
            source: 'node0', // String，必须，起始点 id
            target: 'node3', // String，必须，目标点 id
            color: 'black'
          },
          {
            shape: 'polyline',
            source: 'node1', // String，必须，起始点 id
            target: 'node3'// String，必须，目标点 id
          },
          {
            shape: 'polyline',
            source: 'node2', // String，必须，起始点 id
            target: 'node3' // String，必须，目标点 id
          },
          {
            shape: 'polyline',
            source: 'node3', // String，必须，起始点 id
            target: 'node4' // String，必须，目标点 id
          }
        ]
      }
    }
  },
  watch: {
    flag() {
      new Vue({
        data: {
          temp: this.temp
        },
        render: h => h(ToolTip)
      }).$mount('#test-node')
    }
  },
  mounted() {
    // 实例化 minimap 插件
    const minimap = new Minimap({
      size: [100, 100],
      className: 'minimap',
      type: 'delegate'
    })
    // 实例化 grid 插件
    const grid = new Grid()

    const dashArray = [
      [0, 1],
      [0, 2],
      [1, 2],
      [0, 1, 1, 2],
      [0, 2, 1, 2],
      [1, 2, 1, 2],
      [2, 2, 1, 2],
      [3, 2, 1, 2],
      [4, 2, 1, 2]
    ]

    const lineDash = [4, 2, 1, 2]
    const interval = 9 // lineDash 的和
    G6.registerEdge('line-dash', {
      afterDraw(cfg, group) {
        // 获得该边的第一个图形，这里是边的 path
        const shape = group.get('children')[0]
        // 获得边的 path 的总长度
        const length = shape.getTotalLength()
        let totalArray = []
        // 计算出整条线的 lineDash
        for (let i = 0; i < length; i += interval) {
          totalArray = totalArray.concat(lineDash)
        }

        let index = 0
        // 边 path 图形的动画
        shape.animate({
          // 动画重复
          repeat: true,
          // 每一帧的操作，入参 ratio：这一帧的比例值（Number）。返回值：这一帧需要变化的参数集（Object）。
          onFrame() {
            const cfg = {
              lineDash: dashArray[index].concat(totalArray)
            }
            // 每次移动 1
            index = (index + 1) % interval
            // 返回需要修改的参数集，这里只修改了 lineDash
            return cfg
          }
        }, 3000) // 一次动画的时长为 3000
      }
    }, 'polyline')

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
    }, 'cubic') // 该自定义边继承内置三阶贝塞尔曲线 cubic
    const _this = this
    const graph = new G6.Graph({
      container: 'mountNode',
      width: 800,
      height: 600,
      plugins: [minimap, grid], // 将 minimap 实例配置到图上
      defaultNode: {
        style: {
          fill: '#888',
          stroke: '#888'
        }
      },
      defaultEdge: {
        labelCfg: {
          autoRotate: true
        }
      },
      modes: {
        default: [
          'drag-canvas',
          'drag-node',
          'zoom-canvas',
          {
            type: 'tooltip', // 提示框
            formatText(model) {
              // 提示框文本内容
              _this.flag++
              clearInterval(_this.timer)
              _this.timer = setInterval(() => {
                model.cpu = Math.round(Math.random() * 100)
                model.nem = Math.round(Math.random() * 100)
              }, 2000)
              // _this.temp会2S变化一次，但是vue-devtools的temp不会自动变化，在vue-devtools中点击刷新之后就好了
              _this.temp = model
              // clearInterval(id)
              const text = `
                <div id="test-node">

                </div>
              `

              return text
            }
          }
        ]
      }

    })

    const nodes = this.data.nodes
    const edges = this.data.edges
    nodes.forEach(node => {
      if (!node.icon) {
        node.icon = {}
      }
      node.icon.show = true
      node.icon.width = 100
      node.icon.height = 100
      switch (node.class) {
        case 'server': {
          debugger
          node.shape = 'ellipse'
          node.icon.img = 'http://localhost:8080/images/server.png'
          node.size = [85, 55]

          break
        }
        case 'cloud': {
          node.shape = 'ellipse'
          node.icon.img = 'http://localhost:8080/images/cloud.png'
          node.size = [35, 20]
          break
        }
        case 'c2': {
          node.shape = 'ellipse'
          node.size = [35, 20]
          break
        }
      }
    })
    edges.forEach(edge => {
      if (!edge.style) {
        edge.style = {}
      }
      edge.style.radius = 5
      edge.style.lineWidth = 2
      if (!edge.color) {
        edge.style.stroke = edge.color
      } else {
        edge.style.stroke = '#87e8de'
      }
      edge.style.offset = 30
    })
    graph.data(this.data) // 读取 Step 2 中的数据源到图上
    graph.render() // 渲染图
    graph.on('node:dblclick', e => {
      const nodeItem = e.item // 获取鼠标进入的节点元素对象
      graph.setItemState(nodeItem, 'hover', true) // 设置当前节点的 hover 状态为 true
    })
  }
}
</script>

<style>

</style>
