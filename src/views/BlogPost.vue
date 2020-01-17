<template>
  <!-- <input type="text" :value="value" @input="$emit('input',$event.target.value)"> -->
  <div>
    {{ post }}
    <span @click="changeSpan()">zzz</span>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    postTitle: {
      Object
    }
  },
  data() {
    return {
      post: this.postTitle
    }
  },
  methods: {
    changeSpan() {
      this.post = 22222
    }
  }
}
</script>
