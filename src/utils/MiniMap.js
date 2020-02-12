// 上面这个为什么不能在main.js一次性引入，而必须要在此文件去引入
export default new Minimap({
  size: [100, 100],
  className: 'minimap',
  type: 'delegate'
})
