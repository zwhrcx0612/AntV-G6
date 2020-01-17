<template>
  <div class="">
    <DoubleInputSon :value="value" @sendFather="getValue" />
    {{ value }}
  </div>
</template>
<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import DoubleInputSon from '@/views/DoubleInputSon'
export default {
  name: 'About',
  components: {
    DoubleInputSon
  },
  data() {
    return {
      value: '123'
    }
  },
  mounted() {

  },
  methods: {
    getValue(val) {
      this.value = val
    }
  }
}
</script>
