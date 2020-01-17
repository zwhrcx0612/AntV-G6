<template>
  <div class="home">
    <About :aaa="a">
      123
      <template v-slot:defaults="slotProps">
        {{ slotProps.user.name }}
      </template>
    </About>

    <div @click="changeA()">changeA</div>
    <!-- <div class="form-group">
      <label for="select3" class="col-sm-3 control-label">
        A searchable select with groups and localized in zh-CN:
      </label>
      <div class="col-sm-5">
        <v-select class="vue-select3" name="select3"
                    :options="options1" :model.sync="result1"
                    :searchable="true" language="zh-CN">
        </v-select>
      </div>
      <div class="col-sm-4">
        <p class="form-control-static">
          Selected Result: <span class="vue-result3">{{result3}}</span>
        </p>
      </div>
    </div> -->
    <!-- <v-select class="vue-select1" name="select1"
                    :options="options1" :model.sync="result1"
                    language="">
        </v-select> -->
    <!-- <select2 :data="data"
    :value="value"
    @update="update($event)">
</select2> -->
    <select />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import select2 from 'select2'
import About from '@/views/About.vue'
// import "select2-vue-component";
export default {
  name: 'Home',
  components: {
    About
    // "vue-select": require("vue-select")
  },
  data() {
    return {
      a: 1,
      data: [
        'value1',
        'value2',
        'value3'
      ],
      value: {
        required: true,
        twoWay: true
      },
      options1: [
        { id: 1, text: 'value1' },
        { id: 2, text: 'value2' },
        { id: 3, text: 'value3' }
      ]
    //   result1: {
    //   required: true,
    //   twoWay: true
    // }
    }
  },
  mounted() {
    // $('select').select2({
    //   data: this.options1
    // })
  },
  methods: {
    changeA() {
      this.a = 2
      console.log(this.a)
    }
  }
}
</script>
