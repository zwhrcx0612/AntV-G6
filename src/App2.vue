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
      data: {
        nodes: [
          {
            shape: 'circle',
            label: '11',
            id: 'node1', // String，该节点存在则必须，节点的唯一标识
            x: 200, // Number，可选，节点位置的 x 值
            y: 200, // Number，可选，节点位置的 y 值,
            size: 80,
            style: {
              fill: 'green',
              stroke: '#eaff8f',
              lineWidth: 5
            },
            icon: {
              show: true,
              img: 'server.png', // 可更换为其他图片地址
              width: 100,
              height: 100
            }

          },
          {
            id: 'node2', // String，该节点存在则必须，节点的唯一标识
            x: 300, // Number，可选，节点位置的 x 值
            y: 200 // Number，可选，节点位置的 y 值
          }
        ],
        // 边集
        edges: [
          {
            source: 'node1', // String，必须，起始点 id
            target: 'node2' // String，必须，目标点 id
          }
        ]
      }
    }
  },

  mounted() {
    const _this = this
    const graph = new G6.Graph({
      // layout: {
      //   type: 'force',
      //   preventOverlap: true
      // },
      // modes: {
      //   default: [
      //     // ...
      //     {
      //       type: 'tooltip', // 提示框
      //       formatText(model) {
      //         // 提示框文本内容
      //         // const text = 'label: ' + model.label + '<br/> class: ' + model.class;
      //         const text = `<input value='${_this.tipValue}'/>`
      //         return text
      //       }
      //     }
      //   ]
      // },
      modes: {
        default: ['drag-canvas', 'drag-node', 'zoom-canvas']
      },
      // 节点不同状态下的样式集合
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
      container: 'mountNode', // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
      width: 800, // Number，必须，图的宽度
      height: 500 // Number，必须，图的高度
    })
    graph.data(this.data) // 读取 Step 2 中的数据源到图上
    graph.render() // 渲染图
    graph.on('node:dblclick', e => {
      const nodeItem = e.item // 获取鼠标进入的节点元素对象
      graph.setItemState(nodeItem, 'hover', true) // 设置当前节点的 hover 状态为 true
    })
  },
  render(h) {
    return <div>111</div>
  }
}
</script>

<style>
</style>
