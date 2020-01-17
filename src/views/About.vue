<template>
  <div class="about">
    <slot :user="user" />
    {{ aaa }}
    {{ bbb }}
  </div>
</template>
<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'About',
  components: {

  },
  props: ['aaa'],
  data() {
    return {
      bbb: this.aaa,
      user: {

        name: 'zs'
      }
    }
  },
  beforeCreate() {
    console.log('beforeCreate')
  },
  created() {
    console.log('created')
  },
  beforeMount() {
    console.log('beforeMount')
  },
  mounted() {
    console.log('mounted')
  },
  beforeUpdate() {
    console.log('beforeUpdate')
  },
  updated() {
    console.log('updated')
  }
}
</script>
