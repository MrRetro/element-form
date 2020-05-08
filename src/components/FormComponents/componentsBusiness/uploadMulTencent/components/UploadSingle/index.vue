<template>
  <div class="upload-box">
    <el-upload
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
        SecretId: self.$store.state.tencent.resource_token.credentials.tmpSecretId,
        SecretKey: self.$store.state.tencent.resource_token.credentials.tmpSecretKey,
        XCosSecurityToken: self.$store.state.tencent.resource_token.credentials.sessionToken,
        ExpiredTime: self.$store.state.tencent.resource_token.expiredTime
      })
      cos.getObject({
        Bucket: self.$store.state.tencent.resource_meta.bucket,
        Region: self.$store.state.tencent.resource_meta.region,
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
        self.imageUrl = `http://${data.Location}`
      })
    }
  }

}
</script>
<style>
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
