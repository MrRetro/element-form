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
        <div class="row-content">
          <div class="row-box">
            <p
              class="row"
              v-for="(item,index) in form.newValue"
              :key="index"
            >
              <span class="name">
                <el-input
                  v-model="item.name"
                  placeholder="请输入导航名称"
                  @blur="validate"
                ></el-input>
              </span>
              <el-button
                size="mini"
                type="danger"
                @click="remove(index)"
              >删除</el-button>
            </p>
          </div>
          <el-button
            :style="`margin-top: ${form.newValue && form.newValue.length===0?5: 0}px`"
            size="small"
            @click="add"
          >添加</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ImNavManage',
  props: {
    value: [String, Number, Array, Object]
  },
  data () {
    return {
      form: {
        newValue: []
      },
      oldForm: null
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
        if (vl && typeof vl === 'string') {
          this.form.newValue = JSON.parse(vl)
        } else {
          this.form.newValue = vl
        }
      },
      deep: true,
      immediate: true
    },
    'form.newValue': {
      handler (vl) {
        this.$emit('onInput', vl)
        if (vl === '' && this.oldForm) {
          this.form = JSON.parse(this.oldForm)
        }
        this.isClearVilidate()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 添加
    add () {
      let obj = {name: ''}
      if (this.form.newValue === '') {
        this.form.newValue = [obj]
      } else {
        this.form.newValue.push(obj)
      }
    },
    // 删除
    remove (index) {
      this.form.newValue.splice(index, 1)
    },
    // 时时校验-校验通过清除提示
    isClearVilidate () {
      if (this.isVilidate()) {
        const fn = setTimeout(() => {
          this.formClearValidate()
          clearTimeout(fn)
        }, 10)
      }
    },
    // 是否校验通过
    isVilidate () {
      // 所有路径都必须有数据
      let state = true
      if (this.isRequired) {
        if (typeof this.form.newValue === 'string' || this.form.newValue.length === 0) {
          state = false
        } else {
          this.form.newValue.forEach((v) => {
            if (!v.name) state = false
          })
        }
      }
      return state
    },
    validate () {
      let state = false
      // 判断字段是否数据正确，如果正确的话校验通过，否则校验不过
      this.oldForm = JSON.stringify(this.form)
      if (this.isVilidate()) {
        this.form.newValue = JSON.stringify(this.form.newValue)
      } else {
        this.form.newValue = ''
      }
      this.$refs.form && this.$refs.form.validate((res) => {
        state = res
      })
      return state
    },
    // 删除
    handleDelete (index) {
      this.form.newValue.splice(index, 1)
    },
    // 添加
    handleAdd () {
      this.formClearValidate()
      this.form.newValue.push('新导航')
      this.form = JSON.parse(JSON.stringify(this.form))
    },
    // 校验表单
    formValidate () {
      this.$refs.form && this.$refs.form.validate()
    },
    // 清除表单
    formClearValidate () {
      this.$refs.form && this.$refs.form.clearValidate()
    }
  }
}
</script>

<style scoped>
  .warn{
    color: #ff2c2c;
    font-size: 12px;
  }
  .input-box .del >>> span{
    position: relative;
    top: -1px;
  }
  .box{
    width: 500px;
    color: #606266;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .content-box .box:last-of-type .content{
    margin-bottom: 0px;
  }
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
  .row-content{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .row{
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
  }
  .row .name{
    margin-right: 10px;
  }
  .row .select-box{
    display: flex;
    flex-direction: column;
  }
  .row .select-box >>> .div{
    width: 220px;
    height: 40px;
  }

  .item >>> .iconfont{
    font-size: 22px;
  }
</style>
