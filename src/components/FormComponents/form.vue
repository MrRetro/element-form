<template>
  <div class="form">
    <component
      ref="formItem"
      :is="comp"
      :attrs="$attrs"
      v-bind="$props"
      v-model="value"
      style="width: 100%"
      @onInput="onInput"
    />
  </div>
</template>
<script>
import component from './components/index'

export default {
  name: 'FormComponent',
  components: component,
  props: {
    name: String,
    value: [String, Number, Array, Boolean, Date, Object],
    type: String,
    props: Object,
    index: [Number, String],
    options: Array,
    isConfig: Boolean,
    // 是否自动双向绑定数据
    isAutoBind: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    comp () {
      return `Im${this.type}`
    }
  },
  methods: {
    onInput (vl) {
      console.log(9994, vl)
      this.$emit('onInput', vl, this.index, this.$attrs)
    },
    validate () {
      return this.$refs.formItem.validate && this.$refs.formItem.validate()
    },
    // 数据绑定(手动)
    onDataBind () {
      console.log(9992, this.$refs.formItem)

      if (this.$refs.formItem) {
        this.$refs.formItem.onDataBind && this.$refs.formItem.onDataBind()
      }
    }
  }

}
</script>

<style scoped>
.form{
  display: flex;
}
</style>
