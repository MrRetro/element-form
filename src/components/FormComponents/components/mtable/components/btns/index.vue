<template>
  <div class="btns-box">
    <el-button
      class="btn"
      size="small"
      v-for="(item, index) in newForm"
      :key="index"
      v-bind="item.props"
      @click="handleClick(item)"
      >{{ item.value }}</el-button>
  </div>
</template>

<script>
export default {
  name: 'btns',
  props: {
    form: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    form (vl) {
      this.newForm = vl
    },
    newForm (vl) {
      this.$emit('update:form', vl)
    }
  },
  data () {
    return {
      newForm: this.form
    }
  },
  methods: {
    handleClick (item) {
      this.$emit('onBtns', item)
    }
  }
}
</script>

<style scoped>
.btns-box .btn{ margin-left: 10px;}
</style>
