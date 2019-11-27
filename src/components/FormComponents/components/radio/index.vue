<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      class="form-input">
      <el-form-item
        :label="$attrs.name"
        :class="{isRequired: !isRequired}"
        :rules="$attrs.props.rules"
        prop="newValue"
        class="item"
      >
        <el-radio-group v-model="form.newValue">
          <el-radio
            v-for="item in $attrs.options"
            :label="`${item.key}`"
            :key="item.key"
            v-bind="$attrs.props"
          >{{ item.value }}</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ImRadio',
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
        this.$emit('onInput', `${vl}`)
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
.isRequired{
  padding-left: 10px;
}
</style>
