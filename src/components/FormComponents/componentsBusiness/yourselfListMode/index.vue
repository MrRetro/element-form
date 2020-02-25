<template>
  <div>
    <div
      v-if="form.newValue.isShowBtn"
      class="select-box2">
      <el-checkbox
        :indeterminate="checkboxGroup.length > 0 && checkboxGroup.length < checkOptions.length"
        v-model="checkAll"
        border
        size="small"
        @change="handleCheckAllChange"
      >全选</el-checkbox>
      <div style="margin: 4px 0;"/>
      <el-checkbox-group
        v-model="checkboxGroup"
        class="group"
        size="small"
        @change="handleCheckedChange"
      >
        <el-checkbox
          v-for="(item,index) in checkOptions"
          :label="item"
          :key="index"
          border
        />
      </el-checkbox-group>
    </div>
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
              v-if="indexMode && getIsShowBtn(0)"
              class="delete"
              @click="handleDeleteRow(indexMode)"
            >x</div>
            <span
              v-if="itemMode.name"
              class="title">{{ itemMode.name }}</span>
            <div
              v-for="(itemComp,indexComp) in itemMode.value"
              :key="'lay'+indexComp+Math.random()"
              class="list-box">
                <div
                  v-if="getIsShowBtn(1)"
                  class="delete"
                  @click="handleDeleteRow(indexMode, indexComp)"
                >x</div>
                <span
                  class="title">{{ itemComp.name || `组件${indexComp}` }}</span>
                <div
                  v-if="itemComp.value[0].type || itemComp.value[0].type === 0"
                  class="row-box"
                >
                  <FormComp
                    v-if="typeof itemComp.value[0].type === 'string'"
                    ref="form2"
                    :form="itemComp.value"
                    :key="`item6`+itemComp.value[0].type+Math.random()"
                    :is-auto-bind="$attrs.isAutoBind"
                  />
                </div>
                <el-select
                  v-else
                  v-model="itemComp.value[0].type"
                  :filterable="true"
                  size="small"
                  placeholder="请选择"
                  class="select-box"
                  @change="handleChange(itemComp.value[0].type,indexMode, indexComp)"
                >
                  <el-option
                    v-for="(item,index) in newOptions"
                    :key="'ops'+item.type+Math.random()"
                    :label="item.name"
                    :value="index"/>
                </el-select>

            </div>
            <el-button
              v-if="getIsShowBtn(1)"
              style="margin-top: 20px"
              size="small"
              @click="handleAddComp(indexMode)"
            >添加</el-button>
          </div>
          <el-button
            v-if="getIsShowBtn(0)"
            style="margin-top: 20px"
            size="small"
            @click="handleAddMode"
          >添加模式</el-button>
        </div>
      </el-form-item>
    </el-form>
    <!--队列配置-->
    <div
      v-if="$attrs.isConfig && newForm && newForm.length>0"
      style="width: 500px;"
      class="config-box config-box2"
    >
      <div v-for="(item7,index7) in newForm" :key="index7">
        <span style="color: #16b002;">{{item7.name}}</span>
        <el-input v-model="item7.attr" placeholder="key"></el-input>
        <el-input v-model="item7.name" placeholder="名称"></el-input>
        <div v-if="item7.type === 'YourselfList'">
          <div v-for="(item5,index5) in item7.value.value" :key="index5" style="padding-bottom: 20px;padding-top: 20px">
            <div v-for="(item6,index6) in item5" :key="index6" style="padding-bottom: 20px;">
              <span style="color: #16b002;">{{item7.name}}-队列{{index5}}-组件{{index6}}</span>
              <el-input v-model="item6.attr" placeholder="key"></el-input>
              <el-input v-model="item6.name" placeholder="名称"></el-input>
              <div v-if="item6.options">
                <span style="text-align:center;vertical-align:middle;">选项</span>
                <span>
                  <SelectContentEdit
                    :value="item6.options" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import configForm from '../../configForm2'
import FormComp from '../../index.vue'
import SelectContentEdit from '../../SelectContentEdit/index.vue'

const btns = ['添加模式', '添加']

export default {
  name: 'ImYourselfListMode',
  components: {
    FormComp,
    SelectContentEdit
  },
  props: {
    value: [String, Array, Object]
  },
  data () {
    return {
      checkAll: true,
      isIndeterminate: true,
      checkboxGroup: JSON.parse(JSON.stringify(btns)),
      checkOptions: btns,

      select: '',
      options: configForm,
      form: {
        newValue: {
          checkboxGroup: this.checkboxGroup,
          ...this.$attrs.value
        }
      },
      newForm: {
        newValue: {value: [[{type: ''}]]}
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
        list = list.filter(v => !['SelectComponent', 'YourselfListMode', 'YourselfDiy', 'Layout', 'Line', 'Button', 'Transfer', 'Upload', 'Cascader'].includes(v.type) && `${v.status}` !== '2')
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
        console.log(8989, vl)
        // this.$emit('onInput', vl)
        // 如果为字符串，转成json
        try {
          if (typeof vl === 'string') {
            this.form = JSON.parse(vl)
          }
        } catch (e) {
          console.log('转换错误==>', e)
        }
        if (vl === '' && this.oldForm) {
          this.form = this.oldForm
        }
        // this.isClearVilidate()
        this.newForm = []
        vl.data[vl.curMode].value.map(v => {
          // if (v.value[0].type === 'YourselfList') {
          if (v && v.value && v.value[0]) {
            this.newForm.push(v.value[0])
          }
        })
      },
      deep: true,
      immediate: true
    },
    'form.newValue.checkboxGroup': {
      handler (vl) {
        this.checkboxGroup = vl
      },
      deep: true,
      immediate: true
    },
    // 兼容旧数据(没有这个字段情况下)
    'form.newValue.isShowBtn': {
      handler (vl) {
        if (typeof vl === 'undefined') {
          this.form.newValue.isShowBtn = true
          this.form.newValue.checkboxGroup = JSON.parse(JSON.stringify(btns))
          this.isIndeterminate = false
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 按钮是否显示
    getIsShowBtn (index) {
      let state = false
      if (this.checkboxGroup && this.checkboxGroup.includes(JSON.parse(JSON.stringify(btns))[index])) {
        state = true
      }
      return state
    },
    // 按钮全选
    handleCheckAllChange (val) {
      this.form.newValue.checkboxGroup = val ? btns : []
      this.checkboxGroup = val ? btns : []
      this.isIndeterminate = false
    },
    // 改变选中按钮
    handleCheckedChange (value) {
      this.onDataBind()
      const checkedCount = value.length
      this.checkAll = checkedCount === this.checkOptions.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkOptions.length
      this.form.newValue.checkboxGroup = this.checkboxGroup
    },
    // 添加模式
    handleAddMode () {
      this.onDataBind()
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
    // 添加组件
    handleAddComp (indexMode) {
      this.onDataBind()
      this.form.newValue.data[indexMode].value.push({
        value: [
          { type: '' }
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
    // 添加分组内元素
    handleAdd (indexMode, indexComp, indexTemp) {
      console.log('添加分组内元素', indexMode, indexComp, indexTemp)
      this.form.newValue.data[indexMode].value[indexComp].value[indexTemp].push({ type: '' })
    },
    // 添加整个模版
    handleAddRow (indexMode, indexComp) {
      this.form.newValue.data[indexMode].value[indexComp].value.push(JSON.parse(JSON.stringify(this.form.newValue.data[indexMode].value[indexComp].value[0])))
    },
    handleDelete (indexMode, indexComp, indexTemp) {
      // console.log(111, indexMode, indexComp, indexTemp, indexComp)
      // const newForm = JSON.parse(JSON.stringify(this.form.newValue.data))
      // newForm[indexMode].value[indexComp].value[indexTemp] = newForm[indexMode].value[indexComp].value[indexTemp].filter((v, i) => i !== indexComp)
      // this.form.newValue.data = newForm
    },
    // 删除
    handleDeleteRow (indexMode, indexComp, indexTemp) {
      console.log('删除', indexMode, indexComp, indexTemp)
      if (Number.isInteger(indexTemp)) {
        this.form.newValue.data[indexMode].value[indexComp].value.splice(indexTemp, 1)
      } else if (Number.isInteger(indexComp)) {
        this.form.newValue.data[indexMode].value.splice(indexComp, 1)
      } else if (Number.isInteger(indexMode)) {
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
    handleChange (type, indexMode, indexComp) {
      const newForm = JSON.parse(JSON.stringify(this.form.newValue.data))
      const newObj = JSON.parse(JSON.stringify(this.newOptions))
      console.log(444, newObj)
      newForm[indexMode].value[indexComp].value = [newObj[type]]
      setTimeout(() => { this.form.newValue.data = newForm }, 0)
    },
    // 校验表单
    formValidate () {
      this.$refs.form && this.$refs.form.validate()
    },
    // 清除表单
    formClearValidate () {
      this.$refs.form && this.$refs.form.clearValidate()
    },
    // 数据绑定(手动)
    onDataBind () {
      console.log(999, this.$refs.form2)
      if (this.$refs.form2) {
        this.$refs.form2.map(v => {
          v.onDataBind && v.onDataBind()
        })
      }
    }
  }
}
</script>

<style scoped>
  .group >>> .el-checkbox{
    margin-right: 0px;
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
  .select-box2{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 10px;
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
    border: 1px dashed #1ce4ff;
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
