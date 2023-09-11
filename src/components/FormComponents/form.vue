<template>
  <div class="form">
    <component
      ref="formItem"
      :is="comp"
      :attrs="$attrs"
      v-bind="['Mtable'].includes(type) ? $props.props : $props"
      v-model="value"
      style="width: 100%"
      @onInput="onInput"
      @onFilterComp="onInput"
      @onCellAttr="onInput"
      @onBtns="onInput"
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
    onInput (vl, type) {
      this.$emit('onInput', vl, this.index, this.$attrs, type)
    },
    validate () {
      return this.$refs.formItem.validate && this.$refs.formItem.validate()
    },
    // 数据绑定(手动)
    onDataBind () {
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
