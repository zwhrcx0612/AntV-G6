<template>
  <input type="text" :value="value" @input="$emit('input',$event.target.value)">
</template>

<script>
export default {
  name: '',

  props: {
    value: {
      Object
    }
  },
  data() {
    return {

    }
  }
}
</script>
