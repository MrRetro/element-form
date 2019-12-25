<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      class="form-input">
      <el-form-item
        :label="$attrs.name"
        :rules="$attrs.props.rules"
        :class="{isRequired: !isRequired}"
        prop="newValue"
        class="item"
      >

        <div
          width="100%"
          height="100%"
          type="image"
          preview
        >
          <span
            slot="placeholder"
            class="layout-placeholder"
          >
            选择图片
          </span>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ImSelectImage',
  props: {
    value: [String, Number]
  },
  data () {
    return {
      form: {
        newValue: this.value
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
      let state = false
      this.$refs.form.validate((res) => {
        state = res
      })
      return state
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
  .item >>> .div{
    width: 16vw;
    height: 40px;
  }
.isRequired{
  padding-left: 10px;
}
</style>
