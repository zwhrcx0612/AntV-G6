<template>
  <div id="app">
    <div id="mountNode" />
  </div>
</template>

<script>
import Vue from 'vue'
import G6 from '@antv/g6'
import ToolTip from './ToolTip'
import minimap from '@/utils/MiniMap'
import grid from '@/utils/Grid'
import '@/utils/LineDash'
import '@/utils/CircleRunning'
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
          { id: 'node0', label: '服务器1', x: 100, y: 100, class: 'server', cpu: 2, nem: 2 },
          { id: 'node1', x: 100, y: 200, class: 'server' },
          { id: 'node2', x: 100, y: 300, class: 'server' },
          { id: 'node3', x: 200, y: 200, class: 'server' },
          { id: 'node4', x: 300, y: 200, class: 'cloud' },
          { id: 'node5', x: 400, y: 200, class: 'base' },
          { id: 'node6', x: 500, y: 200, class: 'cloud' },
          { id: 'node7', x: 600, y: 200, class: 'change' },
          { id: 'node8', x: 700, y: 200, class: 'balance' },
          { id: 'node9', x: 800, y: 100, class: 'computer' },
          { id: 'node10', x: 800, y: 200, class: 'computer' },
          { id: 'node11', x: 800, y: 300, class: 'computer' }
          // { id: 'node12', x: 300, y: 300, color: 'red', shape: 'server' }
        ],
        edges: [
          {
            // shape: 'line-dash',
            shape: 'circle-running',
            source: 'node0', // String，必须，起始点 id
            target: 'node3', // String，必须，目标点 id
            color: '#87e8de'
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
            shape: 'line-dash',
            source: 'node3', // String，必须，起始点 id
            target: 'node4' // String，必须，目标点 id
          },
          {
            shape: 'line-dash',
            source: 'node4', // String，必须，起始点 id
            target: 'node5' // String，必须，目标点 id
          },
          {
            shape: 'line-dash',
            source: 'node5', // String，必须，起始点 id
            target: 'node6' // String，必须，目标点 id
          },
          {
            shape: 'line-dash',
            source: 'node6', // String，必须，起始点 id
            target: 'node7' // String，必须，目标点 id
          },
          {
            shape: 'line-dash',
            source: 'node7', // String，必须，起始点 id
            target: 'node8' // String，必须，目标点 id
          },
          {
            shape: 'line-dash',
            source: 'node8', // String，必须，起始点 id
            target: 'node9' // String，必须，目标点 id
          },
          {
            shape: 'line-dash',
            source: 'node8', // String，必须，起始点 id
            target: 'node10' // String，必须，目标点 id
          },
          {
            shape: 'line-dash',
            source: 'node8', // String，必须，起始点 id
            target: 'node11' // String，必须，目标点 id
          }

        ]
      }
    }
  },
  watch: {
    // 可以设置一个mixin
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
    const _this = this
    const graph = new G6.Graph({
      container: 'mountNode',
      renderer: 'svg', // 绘制图的方式是 canvas 还是 SVG。 3.3版本后暂不支持svg
      // fitView: false, // 是否将图适配到画布大小，可以防止超出画布或留白太多。
      // fitViewPadding: [20, 40, 50, 20], // 画布上的四周留白宽度。
      width: 900,
      height: 500,
      plugins: [minimap, grid], // 将 minimap 实例配置到图上
      // 还需要设置hover，click事件来出发下面的样式
      nodeStateStyles: {
        // 鼠标 hover 上节点，即 hover 状态为 true 时的样式
        hover: {
          fill: 'red'
        },
        // 鼠标点击节点，即 click 状态为 true 时的样式
        click: {
          stroke: '#000',
          lineWidth: 3
        }
      },
      defaultNode: {
        style: {
          fill: 'transparent', // 节点的背景色，默认为蓝色
          stroke: 'transparent' // 节点的border颜色，默认为蓝色
        },
        labelCfg: {
          position: 'right',
          style: {
            fill: '#888'
          }
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
              // 这个是节点的提示信息，也可以为边设置提示信息
              // model是鼠标悬浮的节点的信息
              console.log('model:', model)
              // model.icon.img = 'http://localhost:8080/images/cloud.png'
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
      // 节点背景图的大小
      node.icon.width = 50
      node.icon.height = 50
      switch (node.class) {
        case 'server': {
          node.shape = 'ellipse'
          // img是打包后的目录
          node.icon.img = 'img/server.svg'
          // node.icon.img = 'server.svg' // 会变成http://localhost:8080/server.svg，此处好像只能是http链接
          node.size = [28, 25]
          break
        }
        case 'cloud': {
          node.shape = 'ellipse'
          node.icon.img = 'img/cloud.svg'
          node.size = [30, 18]
          break
        }
        case 'base': {
          node.shape = 'ellipse'
          node.icon.img = 'img/base.svg'
          node.size = [10, 40]
          break
        }
        case 'change': {
          node.shape = 'ellipse'
          node.icon.img = 'img/change.svg'
          node.size = [35, 20]
          break
        }
        case 'balance': {
          node.shape = 'ellipse'
          node.icon.img = 'img/balance.svg'
          node.size = [35, 20]
          break
        }
        case 'computer': {
          node.shape = 'ellipse'
          node.icon.img = 'img/computer.svg'
          node.size = [13, 25]
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
        edge.style.stroke = '#87e8de'
      } else {
        edge.style.stroke = edge.color
      }
      edge.style.offset = 30
    })
    graph.data(this.data) // 读取 Step 2 中的数据源到图上
    graph.render() // 渲染图
    graph.on('node:click', e => {
      console.log('e', e)
      const nodeItem = e.item // 获取鼠标进入的节点元素对象
      graph.setItemState(nodeItem, 'hover', true) // 设置当前节点的 hover 状态为 true
      const item = graph.findById('node0')
      const model = {
        icon: {
          img: 'images/server_red.svg'
        }
      }
      // 可以通过下面这个方法改变icon，实现变色的一些功能，
      // eg：对之前的server.svg做处理，使得蓝色的变为红色，重新保存为server_red.svg，在需要的时候替换图片
      graph.updateItem(item, model)
    })
  }
}
</script>

<style>

</style>
