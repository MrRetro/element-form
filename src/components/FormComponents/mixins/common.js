// 每个组件公共的属性
export const common = {
  props: {
    value: [Object, Array, String, Number, Boolean, Date]
  },
  computed: {
    // 是否是必填项
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
        console.log(999, this.$attrs.isAutoBind)
        this.$attrs.isAutoBind && this.$emit('onInput', vl)
      },
      deep: true
    }
  },
  data () {
    return {
      form: {
        newValue: this.value
      }
    }
  },
  methods: {
    // 校验
    validate () {
      let state = true
      this.$refs.form && this.$refs.form.validate((res) => {
        state = res
      })
      return state
    },
    // 数据绑定(手动)
    onDataBind () {
      this.$emit('onInput', this.form.newValue)
    }
  }
}
