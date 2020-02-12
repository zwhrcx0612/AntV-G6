<template>
  <div class="tooltip-node" style="font-size:12px">
    <div class="nem" style="display:flex">
      <div style="width:40px;text-align:right;height:20px">nem:</div>
      <el-progress style="width:160px;padding-left:5px" :stroke-width="16" :text-inside="true" :format="format" :color="customColors" :percentage="nem" />
    </div>
    <div class="cpu" style="display:flex">
      <div style="width:40px;text-align:right;height:20px">cpu:</div>
      <el-progress style="width:160px;padding-left:5px" :stroke-width="16" :text-inside="true" :format="format" :color="customColors" :percentage="cpu" />
    </div>
    <!-- {{ $root.message }} -->
    <!-- 这个去掉之后进度条就不会动态变化了，具体原因未知 -->
    <div style="text-align:center">
      Incoming: 1

    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      // a: 1,
      customColors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 }
      ]
    }
  },
  computed: {
    nem() {
      return this.$root.temp.nem
    },
    cpu() {
      return this.$root.temp.cpu
    }
  },
  mounted() {
    // 这个去掉之后进度条就不会动态变化了，具体原因未知
    // setInterval(() => {
    //   this.a++
    // }, 2000)
  },
  methods: {
    format(percentage) {
      return percentage
    }
  }
}
</script>

<style>
.tooltip-node {
  background: #fff;
  padding:10px;
  /* display:flex; */
  width:200px;
  border-radius: 5px;
  box-shadow: 1px 1px 5px #888, -1px -1px 5px #888;
  /* flex-wrap: wrap; */
}

</style>
