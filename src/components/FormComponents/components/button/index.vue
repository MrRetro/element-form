<template>
  <div>
    <el-button
      v-bind="$attrs.props"
    >
      {{ $attrs.name }}
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'ImButton',
  data () {
    return {
      form: {
        newValue: this.$attrs.value
      }
    }
  },
  computed: {
    isRequired () {
      return this.$attrs.props.rules && this.$attrs.props.rules.required
    }
  },
  watch: {
    'form.newValue': {
      handler (vl) {
        this.$emit('onInput', vl)
      },
      deep: true
    }
  },
  methods: {
    validate () {
      // let state = false;
      // this.$refs.form.validate((res) => {
      //   state = res;
      // });
      // return state;
    }
  }
}
</script>

<style scoped>
.form-input{
  display: flex;
  flex-direction: row;
}
  .item{
    display: flex;
    flex-direction: row;
    flex: 1;
    margin-bottom: 20px;
  }
.isRequired{
  padding-left: 10px;
}
</style>
