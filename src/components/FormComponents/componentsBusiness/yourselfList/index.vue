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
        <div class="img-container">
          <el-radio-group
            v-model="form.newValue.curMode"
            size="small"
            style="margin-bottom: 20px;">
            <el-radio-button
              v-for="(item,index) in form.newValue.data"
              :label="index"
              :key="index"
            >{{ item.name }}</el-radio-button>
          </el-radio-group>
          <div
            v-for="(itemMode,indexMode) in form.newValue.data"
            v-if="indexMode === form.newValue.curMode"
            :key="'lay'+indexMode+Math.random()"
            class="mode-box">
            <div
              v-if="indexMode"
              class="delete"
              @click="handleDeleteRow(indexMode)"
            >x</div>
            <span class="title">模式{{ indexMode }}</span>
            <div
              v-for="(itemList,indexList) in itemMode.value"
              :key="'lay'+indexList+Math.random()"
              class="list-box">
              <div
                v-if="indexList"
                class="delete"
                @click="handleDeleteRow(indexMode, indexList)"
              >x</div>
              <span class="title">队列{{ indexList }}</span>
              <div
                v-for="(itemTemp,indexTemp) in itemList.value"
                :key="'lay'+indexTemp+Math.random()"
                class="box"
              >
                <div
                  v-if="indexTemp"
                  class="delete"
                  @click="handleDeleteRow(indexMode, indexList, indexTemp)"
                >x</div>
                <div
                  v-for="(itemComp,indexComp) in itemTemp.value"
                  :key="`item2`+indexComp+Math.random()"
                  class="row"
                >
                  <div
                    v-if="itemComp.type || itemComp.type === 0"
                    class="row-box"
                  >
                    <FormComp
                      v-if="typeof itemComp.type === 'string'"
                      ref="form2"
                      :form="getConfig(itemComp)"
                      :key="`item6`+indexComp+Math.random()"
                    />
                  </div>
                  <el-select
                    v-else
                    v-model="itemComp.type"
                    :filterable="true"
                    size="small"
                    placeholder="请选择"
                    class="select-box"
                    @change="handleChange(itemComp.type,indexMode, indexList, indexTemp,indexComp)"
                  >
                    <el-option
                      v-for="(item,index) in newOptions"
                      :key="'ops'+item.type+Math.random()"
                      :label="item.name"
                      :value="index"/>
                  </el-select>
                  <el-button
                    v-if="form.newValue.data[indexMode].value[indexList].value.length === 1"
                    :class="{isHas:itemComp.type || itemComp.type === 0}"
                    class="btn"
                    size="small"
                    type="danger"
                    @click="handleDelete(indexMode,indexList,indexTemp, indexComp)"
                  >删除</el-button>
                </div>
                <el-button
                  v-if="form.newValue.data[indexMode].value[indexList].value.length === 1"
                  class="btn"
                  style="margin-left: 0px;"
                  size="small"
                  @click="handleAdd(indexMode,indexList,indexTemp)"
                >添加组件</el-button>
              </div>

              <el-button
                size="small"
                @click="handleAddRow(indexMode,indexList)"
              >添加模版</el-button>
            </div>
            <el-button
              style="margin-top: 20px"
              size="small"
              @click="handleAddList(indexMode)"
            >添加队列</el-button>
          </div>
          <el-button
            style="margin-top: 20px"
            size="small"
            @click="handleAddMode"
          >添加模式</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import configForm from '../../configForm2'
import FormComp from '../../index.vue'

export default {
  name: 'ImYourselfList',
  components: {
    FormComp
  },
  props: {
    value: [String, Array, Object]
  },
  data () {
    return {
      select: '',
      options: configForm,
      form: {
        newValue: this.$attrs.value
      }
    }
  },
  computed: {
    isRequired () {
      return this.$attrs.props.rules && this.$attrs.props.rules.required
    },
    // 过滤表单选项,隐藏一些组件不让选择
    newOptions () {
      let list = this.options
      try {
        list = list.filter(v => !['YourselfList', 'YourselfDiy', 'Layout', 'Line', 'Button', 'Transfer', 'Upload', 'Cascader'].includes(v.type) && `${v.status}` !== '2')
      } catch (e) {
        console.log('err==>', e)
      }
      return list
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
    // 添加模式
    handleAddMode () {
      this.form.newValue.data.push(
        {
          name: `模式${this.form.newValue.data.length}`,
          value: [
            {
              value: [
                {
                  value:
                      [
                        { type: '' }
                      ]
                }
              ]
            }
          ]
        }
      )
    },
    // 添加队列
    handleAddList (indexMode) {
      this.form.newValue.data[indexMode].value.push({
        value: [
          {
            value:
                [
                  { type: '' }
                ]
          }
        ]
      })
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
    // 获取表单配置
    getConfig (item) {
      return [item]
    },
    // 添加模版内元素
    handleAdd (indexMode, indexList, indexTemp) {
      console.log('添加模版内元素', indexMode, indexList, indexTemp)
      this.form.newValue.data[indexMode].value[indexList].value[indexTemp].value.push({ type: '' })
    },
    // 添加整个模版
    handleAddRow (indexMode, indexList) {
      this.form.newValue.data[indexMode].value[indexList].value.push(JSON.parse(JSON.stringify(this.form.newValue.data[indexMode].value[indexList].value[0])))
    },
    handleDelete (indexMode, indexList, indexTemp, indexComp) {
      console.log(111, indexMode, indexList, indexTemp, indexComp)
      const newForm = JSON.parse(JSON.stringify(this.form.newValue.data))
      newForm[indexMode].value[indexList].value[indexTemp].value = newForm[indexMode].value[indexList].value[indexTemp].value.filter((v, i) => i !== indexComp)
      this.form.newValue.data = newForm
    },
    // 删除
    handleDeleteRow (indexMode, indexList, indexTemp) {
      if (indexTemp) {
        this.form.newValue.data[indexMode].value[indexList].value.splice(indexTemp, 1)
      } else if (indexList) {
        this.form.newValue.data[indexMode].value.splice(indexList, 1)
      } else if (indexMode) {
        this.form.newValue.data.splice(indexMode, 1)
        this.form.newValue.curMode = this.form.newValue.curMode - 1
      }
    },
    // 是否校验通过
    isVilidate () {
      let state = false
      const arr = []
      this.$refs.form2 && this.$refs.form2.map((v) => {
        if (v.validateForm) {
          arr.push(v.validateForm())
        }
      })
      if (arr.indexOf(false) === -1) {
        state = true
      }
      return state
    },
    validate () {
      console.log(888, this.form)
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
    handleAvatarSuccess (res) {
      this.form.newValue = res.url
    },
    // 获取选中后的表单配置
    handleChange (type, indexMode, indexList, indexTemp, indexComp) {
      const newForm = JSON.parse(JSON.stringify(this.form.newValue.data))
      newForm[indexMode].value[indexList].value[indexTemp].value[indexComp] = this.newOptions[type]
      setTimeout(() => { this.form.newValue.data = newForm }, 0)
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
  .img-container{
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .img-container .btn{
    margin-left: 10px;
  }
  .img-container .btn.isHas{
    margin-bottom: 20px;
  }
  .img-container .box{
    border: 1px dashed #00bfff;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .delete{
    position: absolute;
    top: -7px;
    right: -7px;
    width: 14px;
    height: 14px;
    line-height: 11px;
    border-radius: 50%;
    background-color: #f56e6e;
    color: white;
    text-align: center;
    font-size: 12px;
    cursor: pointer;
  }
  .img-container .box .row{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .app-qiniu-box{
    z-index: 1;
  }
  .img-box{
    position: absolute;
    top: -2px;
    left: -2px;
    width: 162px;
    height: 162px;
    object-fit: cover;
    display: inline-block;
    border: 1px solid #eee;
    border-radius: 4px;
    z-index: 0;
  }
  .mode-box,.list-box{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: 1px dashed #00bfff;
    border-radius: 4px;
    padding: 20px;
    position: relative;
  }
  .mode-box{
    border: 1px dashed #ff81a7;
  }
  .list-box{
    border: 1px dashed #fc8fff;
    margin-bottom: 10px;
  }
  .title{
    display: inline-block;
    background-color: white;
    font-size: 12px;
    color: #323232;
    position: absolute;
    top: -8px;
    left: 8px;
    padding: 0 6px;
    z-index: 10;
    height: 12px;
    line-height: 12px;
  }
</style>
