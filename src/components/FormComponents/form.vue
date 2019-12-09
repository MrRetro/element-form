<template>
  <div class="form">
    <component
      style="width: 100%"
      ref="formItem"
      :is="comp"
      :attrs="$attrs"
      v-bind="$props"
      v-model="value"
      @onInput="onInput"
    />
  </div>
</template>
<script>
import ImButton from './components/button'
import ImRadio from './components/radio'
import ImRadioGroup from './components/radioGroup'
import ImCheckBox from './components/checkBox'
import ImInput from './components/input'
import ImInputNumber from './components/inputNumber'
import ImSelect from './components/select'
import ImCascader from './components/cascader'
import ImSwitch from './components/switch'
import ImSlider from './components/slider'
import ImTimePicker from './components/timePicker'
import ImDatePicker from './components/datePicker'
import ImUpload from './components/upload'
import ImRate from './components/rate'
import ImColorPicker from './components/colorPicker'
import ImTransfer from './components/transfer'
import ImLayout from './components/layout'
import ImLine from './components/line'

export default {
  name: 'FormComponent',
  components: {
    ImInput,
    ImButton,
    ImRadio,
    ImRadioGroup,
    ImCheckBox,
    ImInputNumber,
    ImSelect,
    ImCascader,
    ImSwitch,
    ImSlider,
    ImTimePicker,
    ImDatePicker,
    ImUpload,
    ImRate,
    ImColorPicker,
    ImTransfer,
    ImLayout,
    ImLine
  },
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
