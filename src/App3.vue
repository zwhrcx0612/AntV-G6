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
            x: 250, 
            y: 100, 
            color: 'red',
            id:'node',
            size:50,
            text: '\ue637',
            label:'123' ,
            shape:'iconfont',
            // style: {
            //   fill:'red'
            // },
             labelCfg: {
              style: {
                fill: 'red',
              },
            },
          }, // 添加颜色
          {
            id: 'node2', // String，该节点存在则必须，节点的唯一标识
            x: 300, // Number，可选，节点位置的 x 值
            y: 200 // Number，可选，节点位置的 y 值
          }
        ],
         edges: [
          {
            source: 'node', // String，必须，起始点 id
            target: 'node2' // String，必须，目标点 id
          }
        ]
        
      }
    }
  },
  beforeCreate() {
    G6.registerNode('iconfont', {
      draw(cfg, group) {
        const {
          backgroundConfig: backgroundStyle,
          // style,
          labelCfg: labelStyle,
        } = cfg;

        if (backgroundStyle) {
          group.addShape('circle', {
            attrs: {
              x: 0,
              y: 0,
              r: cfg.size,
              ...backgroundStyle,
            },
          });
        }

        const keyShape = group.addShape('text', {
          attrs: {
            x: 0,
            y: 0,
            fontFamily: 'iconfont', // 对应css里面的font-family: "iconfont";
            textAlign: 'center',
            textBaseline: 'middle',
            text: cfg.text,
            fontSize: cfg.size,
            // ...style,
          },
        });
        const labelY = backgroundStyle ? cfg.size * 2 : cfg.size;

        group.addShape('text', {
          attrs: {
            x: 0,
            y: labelY,
            textAlign: 'center',
            text: cfg.label,
            ...labelStyle.style,
          },
        });
        return keyShape;
      },
    });
    G6.registerNode('diamond', {
      draw(cfg, group) {
        debugger
        // 如果 cfg 中定义了 style 需要同这里的属性进行融合
        const shape = group.addShape('path', {
          attrs: {
            path: this.getPath(cfg), // 根据配置获取路径
            stroke: cfg.color // 颜色应用到描边上，如果应用到填充，则使用 fill: cfg.color
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
          // ['L', width / 2, 0], // 右侧顶点
          ['L', 0, height / 2], // 下部顶点
          ['L', -width / 2, 0], // 左侧顶点
          ['Z'] // 封闭
        ]
        return path
      }
    })
  },
  mounted() {
    const graph = new G6.Graph({
      container: 'mountNode',
      width: 800,
      height: 600
    })
    graph.data(this.data) // 读取 Step 2 中的数据源到图上
    graph.render() // 渲染图
  },
  render(h) {
    return <div>111</div>
  }
}
</script>


