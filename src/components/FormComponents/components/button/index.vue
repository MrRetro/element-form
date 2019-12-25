<template>
  <el-button
    v-bind="$attrs.props"
    class="btn"
  >
    {{ $attrs.name }}
  </el-button>
</template>

<script>
export default {
  name: 'ImButton',
  props: {
    value: String
  },
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
    value: {
      handler (vl) {
        this.form.newValue = vl
      },
      deep: true,
      immediate: true
    },
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
.btn{
  width: auto !important;
}
</style>
