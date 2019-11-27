<template>
  <div>
    <div
      v-for="(item,index) in newForm"
      :key="index">
      <FormComponents
        ref="form"
        v-bind="item"
        :value="item.value"
        :index="index"
        @onInput="onInput"
      />
    </div>
  </div>
</template>

<script>
import FormComponents from './form'
export default {
  name: 'FormCom',
  components: {
    FormComponents
  },
  props: {
    form: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    form: {
      handler (vl) {
        this.newForm = vl
      },
      deep: true,
      immediate: true
    }
  },
  data () {
    return {
      newForm: this.form
    }
  },
  methods: {
    onInput (target, index) {
      this.newForm[index].value = target
    },
    getFormValue () {
      return this.newForm
    },

    // 表单校验
    validateForm () {
      let state = true
      try {
        if (({}).toString.call(this.$refs.form) === '[object Array]') {
          this.$refs.form.forEach((v) => {
            if (v.validate() === false) {
              state = false
            }
          })
        }
      } catch (e) {
        console.log('err==>', e)
      }
      return state
    }
  }
}
</script>

<style scoped>

</style>
