<template>
  <div class="tooltip-node">
    <el-progress :percentage="$root.temp.cpu" />
    <!-- {{ $root.message }} -->
    {{ a }}
  </div>
</template>

<script>
export default {

  data() {
    return {
      a: 1
    }
  },
  mounted() {
    // 这个去掉之后进度条就不会动态变化了，具体原因未知
    setInterval(() => {
      this.a++
    }, 2000)
  }
}
</script>

<style>
.tooltip-node {
  background: #fff;
  padding:20px;
  /* display:flex; */
  width:500px;
  /* flex-wrap: wrap; */
}

</style>
