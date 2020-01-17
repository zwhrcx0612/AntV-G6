<template>
  <div id="app">
    <div id="mountNode" />
    <!-- <div>
      <el-input></el-input>
    </div> -->
  </div>
</template>

<script>
import G6 from '@antv/g6'
// import BlogPost from './views/BlogPost'
export default {
  name: 'App',
  data() {
    return {
      tipValue: 'tip',
      testLazy: 111,
      searchText: 22,
      activeNames: ['1'],
      flag: 1,
      temp: {},
      data: {
        nodes: [
          { id: 'node0', x: 100, y: 100, class: 'server' },
          { id: 'node1', x: 100, y: 200, class: 'server' },
          { id: 'node2', x: 100, y: 300, class: 'server' },
          { id: 'node3', x: 300, y: 200, class: 'server' },
          { id: 'node4', x: 500, y: 200, class: 'cloud' }
        ],
        edges: [
          {
            shape: 'polyline',
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
  mounted() {
    const _this = this
    const graph = new G6.Graph({
      container: 'mountNode',
      width: 800,
      height: 600,
      // plugins: [minimap, grid], // 将 minimap 实例配置到图上
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
              console.log(_this)
              console.log('model', model)
              setInterval(() => {
                model.cpu = Math.round(Math.random() * 100)
                model.nem = Math.round(Math.random() * 100)
                // console.log(model instanceof Object)
                // _this.temp = JSON.parse(JSON.stringify(model))
                _this['temp'] = model
                // console.log(_this.temp)
              }, 2000)
              // return '1'
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
          // setInterval(async() => {
          //   console.log(node)
          //   // _this.$set(nodes, 0, 'test')
          //   node.cpu = Math.round(Math.random() * 100)
          //   node.nem = Math.round(Math.random() * 100)
          // }, 2000)
          break
        }
        case 'cloud': {
          node.shape = 'ellipse'
          node.icon.img = 'http://localhost:8080/images/cloud.png'
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
  }
}
</script>

<style>

</style>
