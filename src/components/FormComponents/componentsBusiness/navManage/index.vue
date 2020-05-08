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
          <div class="box">
            <div
              v-for="(item,index) in form.newValue"
              :key="index"
              class="row-box">
              <div style="display: flex;">{{ letter[index] }}</div>
              <div class="row">
                <span class="name">待机动画</span>
                <div class="select-box">
                  <div
                    width="100%"
                    height="100%"
                    type="animation"
                    preview
                  >
                    <span
                      slot="placeholder"
                      class="layout-placeholder"
                    >
                      上传素材
                    </span>
                  </div>
                  <span class="warn">--听音选图二选一、集体朗读、分组PK</span>
                </div>
              </div>
              <div class="row">
                <span class="name">答题动画</span>
                <div class="select-box">
                  <div
                    width="100%"
                    height="100%"
                    type="animation"
                    preview
                  >
                    <span
                      slot="placeholder"
                      class="layout-placeholder"
                    >
                      上传素材
                    </span>
                  </div>
                  <span class="warn">--听音选图二选一、集体朗读、分组PK、抢答类</span>
                </div>
              </div>
              <div class="row">
                <span class="name">正确动画</span>
                <div class="select-box">
                  <div
                    width="100%"
                    height="100%"
                    type="animation"
                    preview
                  >
                    <span
                      slot="placeholder"
                      class="layout-placeholder"
                    >
                      上传素材
                    </span>
                  </div>
                  <span class="warn">--听音选图二选一、集体朗读、分组PK、抢答类</span>
                </div>
              </div>
              <div class="row">
                <span class="name">错误动画</span>
                <div class="select-box">
                  <div
                    width="100%"
                    height="100%"
                    type="animation"
                    preview
                  >
                    <span
                      slot="placeholder"
                      class="layout-placeholder"
                    >
                      上传素材
                    </span>
                  </div>
                  <span class="warn">--听音选图二选一、集体朗读、分组PK</span>
                </div>
              </div>
              <div class="row">
                <span class="name">人物动画</span>
                <div class="select-box">
                  <div
                    width="100%"
                    height="100%"
                    type="animation"
                    preview
                  >
                    <span
                      slot="placeholder"
                      class="layout-placeholder"
                    >
                      上传素材
                    </span>
                  </div>
                  <span class="warn">--听音选图二选一、集体朗读、分组PK、抢答类</span>
                </div>
              </div>
              <div class="row">
                <span class="name">人物动画</span>
                <div class="select-box">
                  <div
                    width="100%"
                    height="100%"
                    type="animation"
                    preview
                  >
                    <span
                      slot="placeholder"
                      class="layout-placeholder"
                    >
                      上传素材
                    </span>
                  </div>
                  <span class="warn">--听音选图二选一、集体朗读、分组PK、抢答类</span>
                </div>
              </div>
              <div class="row">
                <span class="name">奖励页头像框</span>
                <div class="select-box">
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
                      上传素材
                    </span>
                  </div>
                  <span class="warn">--听音选图二选一、集体朗读、分组PK、抢答类</span>
                </div>
              </div>
              <el-button
                v-if="index>0"
                type="danger"
                class="del"
                size="small"
                @click="handleDelete(index)"
              >删除</el-button>
            </div>
          </div>
          <div>
            <el-button
              class="btn"
              size="small"
              @click="handleAdd"
          >添加分组</el-button></div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ImSelectGameForm',
  props: {
    value: [String, Number, Array, Object]
  },
  data () {
    return {
      letter: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      form: {
        newValue: [{
          standbyAnimation: '', // 待机答题
          answerAnimation: '', // 答题动画
          correctAnimation: '', // 正确动画
          errorAnimation: '', // 错误动画
          characterAnimation: '', // 任务动画
          headFrame: '' // 获奖页头像框
        }]
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
    // 分数只能是数字
    inputChange (value) {
      value = value.replace(/[^\d]/g, '')
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
      this.isRequired && this.form.newValue.forEach((v) => {
        Object.values(v).map((q) => {
          if (!q) state = false
        })
      })
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
    // 添加
    handleAdd () {
      this.formClearValidate()
      this.form.newValue.push({
        standbyAnimation: '', // 待机答题
        answerAnimation: '', // 答题动画
        correctAnimation: '', // 正确动画
        errorAnimation: '', // 错误动画
        characterAnimation: '', // 任务动画
        headFrame: '' // 获奖页头像框
      })
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
