<template>
  <div class="filter-comp">
    <ElementForm
      class="form"
      :form="data"
      @onAttr="onAttr($event, data)"
    />
  </div>
</template>

<script>

export default {
  name: 'filter-comp',
  props: {
    data: Array
  },
  watch: {
    data: {
      handler (vl) {
        this.newData = vl
      },
      deep: true,
      immediate: true
    },
    newData: {
      handler (vl) {
        this.$emit('update:data', vl)
      },
      deep: true,
      immediate: true
    }
  },
  data () {
    return {
      newData: this.data
    }
  },
  methods: {
    onAttr (target, item, index) {
      this.$emit('onFilterComp', target, item, index)
    }
  }
}
</script>

<style scoped>
.filter-comp {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
}
.filter-comp .form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  margin-right: 10px;
}
.filter-comp .form >>> .item{
  margin-bottom: 0px;
}
.filter-comp .form >>> .isRequired{
  margin-left: 0px;
  padding-left: 0px;
  margin-right: 16px;
}
.filter-comp .form >>> .btn{
  margin-right: 8px;
}
.filter-comp .form >>> .component .el-form-item__label{
  min-width: 40px;
}
</style>
