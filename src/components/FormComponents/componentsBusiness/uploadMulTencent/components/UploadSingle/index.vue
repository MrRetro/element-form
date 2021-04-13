<template>
  <div class="upload-box">
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
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
export default {
  name: 'upload-single-one',
  props: {
    image: String
  },
  computed: {
    isRequired () {
      return this.$attrs.props.rules && this.$attrs.props.rules.required
    },
    tencentConfig () {
      return this.$attrs.attrs.isPlat ? this.$store.state.tencentPlatform : this.$store.state.tencent
    }
  },
  watch: {
    image (vl) { this.imageUrl = vl },
    imageUrl (vl) { this.$emit('update:image', vl) }
  },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      fileList: [],
      imageUrl: this.image
    }
  },
  methods: {
    getData (fileMd5, callback) {
      const self = this
      const cos = new COS({
        SecretId: self.tencentConfig.resource_token.credentials.tmpSecretId,
        SecretKey: self.tencentConfig.resource_token.credentials.tmpSecretKey,
        XCosSecurityToken: self.tencentConfig.resource_token.credentials.sessionToken,
        ExpiredTime: self.tencentConfig.resource_token.expiredTime
      })
      cos.getObject({
        Bucket: self.tencentConfig.resource_meta.bucket,
        Region: self.tencentConfig.resource_meta.region,
        Key: fileMd5
      }, function (err, data) {
        console.log('cosback==>', err, data)
        callback && callback(data)
      })
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
      let index = -1
      this.fileList.map((v, i) => {
        if (v.name === file.name) {
          index = i
        }
      })
      this.fileList.splice(index, 1)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    onChange (file, fileList) {
      console.log('handleChange', file, fileList)
      this.fileList = fileList
    },
    beforeUpload (file) {
      console.log('before_upload==>', file)
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
      console.log('file==>', fileName, file, this.$md5(JSON.stringify(file)))
      const self = this
      const newFileName = self.$md5(JSON.stringify(file)) + '.' + fileName.split('.')[1]
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
        self.imageUrl = `https://${data.Location}`
      })
    }
  }

}
</script>
<style>
  .upload-box .avatar{
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
  .avatar-uploader-box .el-upload {
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
  .avatar-uploader-box .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-box .el-icon-plus {
    font-size: 28px;
    color: #8c939d;
  }
</style>
