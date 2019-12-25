<template>
  <div>
    <LayoutForm
      v-if="newOptions && newOptions.length>0"
      ref="layoutForm"
      :class="{
        left:newPosition === 'left',
        center:newPosition === 'center',
        right:newPosition === 'right',
        justify:newPosition === 'justify',
      }"
      :key="Math.random()"
      :form="newOptions"
      class="layout-box"
    />
  </div>
</template>

<script>

import LayoutForm from '../../Layout/layoutForm.vue'

export default {
  name: 'ImLayout',
  components: {
    LayoutForm
  },
  props: {
    value: [String, Number],
    attrs: [Object, String]
  },
  data () {
    return {
      newOptions: null,
      newPosition: this.attrs.position
    }
  },
  computed: {
    isRequired () {
      return this.$attrs.props.rules && this.$attrs.props.rules.required
    }
  },
  watch: {
    attrs: {
      handler (vl) {
        this.newPosition = vl.position
      },
      deep: true,
      immediate: true
    },
    '$attrs.options': {
      handler (vl) {
        this.newOptions = vl
      },
      deep: true,
      immediate: true
    }
    // value: {
    //   handler (vl) {
    //     this.form.newValue = vl
    //   },
    //   deep: true,
    //   immediate: true
    // },
    // 'form.newValue': {
    //   handler (vl) {
    //     this.$emit('onInput', vl)
    //   },
    //   deep: true
    // }
  },
  methods: {
    validate () {
      return this.$refs.layoutForm.validateForm()
    }
  }
}
</script>

<style scoped>
.layout-box {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.layout-box.left{
  justify-content: flex-start;
}
.layout-box.center{
  justify-content: space-between;
}
.layout-box.right{
  justify-content: flex-end;
}
.layout-box.justify >>> .component{
  width: 50%;
  margin-left: 0px;
  margin-right: 0px;
}
.layout-box >>> .component{
  margin-right: 30px;
}
.layout-box >>> .component:nth-child(1){
  margin-left: 0px;
}
.layout-box.right >>> .component{
  margin-right: 0px;
  margin-left: 30px;
}
</style>
