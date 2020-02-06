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
          },
          { x: 50, y: 100, color: 'red', shape: 'diamond' }, // 最简单的
          { x: 150, y: 100, color: 'red', shape: 'diamond', size: [50, 100] }, // 添加宽高
          { x: 250, y: 100, color: 'red', shape: 'diamond' }, // 添加颜色
          { x: 350, y: 100, color: 'red', label: '菱形', shape: 'diamond' } // 附加文本
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
    G6.registerNode('diamond', {
      draw(cfg, group) {
        // 如果 cfg 中定义了 style 需要同这里的属性进行融合
        const shape = group.addShape('path', {
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
        return shape
      },
      // 返回菱形的路径
      getPath(cfg) {
        const size = cfg.size || [40, 40] // 如果没有 size 时的默认大小
        const width = size[0]
        const height = size[1]
        //  / 1 \
        // 4     2
        //  \ 3 /
        const path = [
          ['M', 0, 0 - height / 2], // 上部顶点
          ['L', width / 2, 0], // 右侧顶点
          ['L', 0, height / 2], // 下部顶点
          ['L', -width / 2, 0], // 左侧顶点
          ['Z'] // 封闭
        ]
        return path
      }
    })
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
  },
  render(h) {
    return <div>111</div>
  }
}
</script>

<style>
</style>
