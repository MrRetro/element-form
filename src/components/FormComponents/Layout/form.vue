<template>
  <div class="form">
    <component
      ref="formItem"
      :is="comp"
      v-bind="$props"
      v-model="value"
      @onInput="onInput"
    />
  </div>
</template>
<script>
import component from '../components/index'

export default {
  name: 'FormLayoutComponent',
  components: component,
  props: {
    name: String,
    value: [String, Number, Array, Boolean, Date],
    type: String,
    props: Object,
    index: [Number, String],
    options: Array
  },
  computed: {
    comp () {
      return `Im${this.type}`
    }
  },
  methods: {
    onInput (vl) {
      this.$emit('onInput', vl, this.index, this.$attrs)
    },
    validate () {
      return this.$refs.formItem.validate && this.$refs.formItem.validate()
    }
  }

}
</script>

<style scoped>
.form{
  display: flex;
}
</style>
