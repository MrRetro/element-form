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
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          v-bind="$attrs.props"
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
        >
          <img
            v-if="form.newValue"
            :src="form.newValue"
            class="avatar">
          <i
            v-else
            class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {common} from '../../mixins/common'

export default {
  name: 'ImUpload',
  mixins: [common],
  methods: {
    handleAvatarSuccess (res, file) {
      this.form.newValue = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
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
.avatar-uploader >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>
