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
            class="avatar-uploader-box"
            :show-file-list="false"
            :on-change="onChange"
            :http-request="httpRequest"
            :before-upload="beforeUpload"
          >
            <img v-if="['.jpg', '.jpeg', '.png'].includes(getExtend)" :src="form.newValue.url" class="avatar">
            <span v-else-if="form.newValue.url && getExtend" class="extend">{{getExtend}}</span>
            <span v-if="!form.newValue.url" class="el-icon-plus avatar-uploader-icon"></span>
          </el-upload>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
import BMF from 'browser-md5-file'
export default {
  name: 'ImUploadSingleTencent2',
  props: {
    value: [String, Number, Array, Object]
  },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      fileList: [],
      form: {
        newValue: {
          url: ''
        }
      },
      oldForm: null
    }
  },
  computed: {
    // 获取文件扩展名称
    getExtend () {
      let extend = ''
      try {
        let arr = this.form.newValue.url.split('.')
        let name = arr[arr.length - 1]
        extend = name ? `.${name}` : ``
      } catch (e) {
        console.log('获取文件扩展名失败==>', extend)
      }
      return extend
    },
    isRequired () {
      return this.$attrs.props.rules && this.$attrs.props.rules.required
    },
    tencentConfig () {
      return this.$attrs.attrs.isPlat ? this.$store.state.tencentPlatform : this.$store.state.tencent
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
      if (this.isRequired && this.form.newValue && !this.form.newValue.url) {
        state = false
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
      // 只有分数段 存在才做校验
      this.$refs.form && this.$refs.form.validate((res) => {
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
      this.fileList = fileList
    },
    beforeUpload () {
      // console.log('before_upload==>', file)
      // const isJPG = file.type === 'image/jpeg'
      // const isLt2M = file.size / 1024 / 1024 < 2
      //
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!')
      // }
      // return isJPG && isLt2M
    },
    httpRequest () {
      console.log('allUpload')
      this.fileList.map(v => {
        if (v.name) this.upLoad(v.name, v.raw)
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
      const bmf = new BMF()
      bmf.md5(
        file,
        (err, md5) => {
          console.log('err:', err)
          console.log('md5 string:', md5) // md5

          const newFileName = md5 + '.' + fileName.split('.')[1]
          const cos = new COS({
            SecretId: self.tencentConfig.resource_token.credentials.tmpSecretId,
            SecretKey: self.tencentConfig.resource_token.credentials.tmpSecretKey,
            XCosSecurityToken: self.tencentConfig.resource_token.credentials.sessionToken,
            ExpiredTime: self.tencentConfig.resource_token.expiredTime
          })

          // const file = document.getElementById('upload').files[0]
          // if (!file) return
          cos.putObject({
            'x-cos-meta-fileName': encodeURIComponent(fileName),
            Bucket: self.tencentConfig.resource_meta.bucket,
            Region: self.tencentConfig.resource_meta.region,
            Key: newFileName,
            Body: file
          }, function (err, data) {
            console.log('cos==>', err, data)
            self.form.newValue = {
              name: fileName,
              url: `https://${data.Location}`
            }
          })
        },
        progress => {
          console.log('progress number:', progress)
        }
      )
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
    display: flex;
    justify-content: center;
    align-items: center;
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
  .avatar{
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
  .extend{
    color: gainsboro;
  }
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
