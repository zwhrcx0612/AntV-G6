<template>
  <div class="">
    <input type="text" :value="value" @input="getValue">

  </div>
</template>
<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'About',
  components: {

  },
  props: {
    value: String
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    getValue(e) {
      this.$emit('sendFather', e.target.value)
      // console.log()
    }
  }
}
</script>
