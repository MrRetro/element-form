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
        <div>
          <el-upload
            v-bind="$attrs.props"
            ref="upload"
            action="#"
            class="avatar-uploader"
            list-type="picture-card"
            :file-list="form.newValue"
            :on-change="onChange"
            :http-request="httpRequest"
            :before-upload="beforeUpload"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url" alt=""
              >
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog
            :visible.sync="dialogVisible"
            :append-to-body="true"
          >
            <img width="100%" :src="dialogImageUrl" alt="big-img" />
          </el-dialog>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
export default {
  name: 'ImUploadTencent',
  props: {
    value: [String, Number, Array, Object]
  },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
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
    },

    handleRemove (file, fileList) {
      console.log(file, fileList)
      let index = -1
      this.form.newValue.map((v, i) => {
        if (v.name === file.name) {
          index = i
        }
      })
      this.form.newValue.splice(index, 1)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    onChange (file, fileList) {
      console.log('handleChange')
      this.form.newValue = fileList
    },
    beforeUpload (file) {
      console.log('before_upload==>', file)
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    httpRequest () {
      console.log('allUpload')
      this.form.newValue.map(v => {
        if (!v.url.startsWith('http')) this.upLoad(v.name, v.raw)
      })
    },
    allHandleSuccess (res, file) {
      console.log('allHandleSuccess', res, file)
      // this.imageUrl = URL.createObjectURL(file.raw)
    },
    // 上传文件
    upLoad (fileName, file) {
      console.log('file==>', fileName, file)
      const self = this
      const newFileName = self.$md5(file.toString()) + '.' + fileName.split('.')[1]
      const cos = new COS({
        SecretId: self.$store.state.tencent.resource_token.credentials.tmpSecretId,
        SecretKey: self.$store.state.tencent.resource_token.credentials.tmpSecretKey,
        XCosSecurityToken: self.$store.state.tencent.resource_token.credentials.sessionToken,
        ExpiredTime: self.$store.state.tencent.resource_token.expiredTime
      })

      // const file = document.getElementById('upload').files[0]
      // if (!file) return
      cos.putObject({
        'x-cos-meta-fileName': encodeURIComponent(fileName),
        Bucket: self.$store.state.tencent.resource_meta.bucket,
        Region: self.$store.state.tencent.resource_meta.region,
        Key: newFileName,
        Body: file
      }, function (err, data) {
        console.log('cos==>', err, data)
        const url = `https://${data.Location}`
        self.form.newValue.map(v => {
          if (v.name === fileName) {
            v.url = url
            v.md5 = newFileName
          }
        })
      })
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
</style>
