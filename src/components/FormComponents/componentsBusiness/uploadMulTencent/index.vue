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
        <div class="upload-mul-box">
          <template v-for="(item,index) in form.newValue">
            <div
              class="upload-text"
              :key="index">
                <UploadSingle
                  class="upload-box"
                  :image.sync="item.url"
                  v-bind="$attrs"
                />
              <span class="name">{{item.name}}</span>
            </div>
          </template>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import UploadSingle from './components/UploadSingle'
export default {
  name: 'ImUploadMulTencent',
  components: {
    UploadSingle
  },
  props: {
    value: [String, Number, Array, Object]
  },
  data () {
    return {
      formData: {
        name: '',
        value: '',
        type: 'UploadSingleTencent',
        props: { rules: { required: true, message: '请选择', target: 'blur' } },
        status: '1'
      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      form: {
        newValue: [{url: ''}]
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
          const data = JSON.parse(vl)
          this.form.newValue = data
        } else if (typeof vl === 'object') {
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
          this.form = this.oldForm
        }
        this.isClearVilidate()
      },
      deep: true
    }
  },
  methods: {
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
      if (this.isRequired && this.form.newValue && this.form.newValue.length === 0) {
        state = false
      }
      return state
    },
    validate () {
      let state = false
      // 判断字段是否数据正确，如果正确的话校验通过，否则校验不过
      this.oldForm = JSON.parse(JSON.stringify(this.form))
      if (this.isVilidate()) {
        this.form.newValue = JSON.stringify(this.form.newValue)
      } else {
        this.form.newValue = ''
      }
      state = true
      // 只有分数段 存在才做校验
      this.$refs.form.validate((res) => {
        state = res
      })
      return state
    },
    // 删除
    handleDelete (index) {
      this.form.newValue.splice(index, 1)
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
<style>
  .form-input .avatar-uploader-box .el-upload {
    width: 140px;
    height: 140px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
  }
  .form-input .avatar-uploader-box .el-upload:hover {
    border-color: #409EFF;
  }
  .form-input .avatar-uploader-box .el-icon-plus {
    font-size: 28px;
    color: #8c939d;
  }
</style>
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
.row-box{
  width: 100%;
  display: flex;
  padding: 0px 10px;
  flex-direction: column;
  border: 1px solid #eee;
  margin-bottom: 10px;
  border-radius: 4px;
  position: relative;
}
.row-box .del{
  position: absolute;
  right: 12px;
  top: 6px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
}
.row{
  display: flex;
  flex-direction: row;
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
.upload-mul-box{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.upload-mul-box .upload-box{
  /*margin-right: 10px;*/
  margin: 0px 5px;
}
.upload-text{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.upload-text .name{
  margin-top: 6px;
}
</style>
