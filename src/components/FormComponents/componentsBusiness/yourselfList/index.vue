<template>
  <div>
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
          <div
            v-for="(itemList,indexList) in form.newValue.value"
            :key="'lay'+indexList+Math.random()"
            class="list-box">
            <div
              v-if="getIsShowBtn(0)"
              class="delete"
              @click="handleDeleteRow(indexList)"
            >x</div>
            <div
              v-for="(itemComp,indexComp) in itemList"
              :key="`item2`+indexComp+Math.random()"
              class="row"
            >
              <div
                v-if="itemComp.type || itemComp.type === 0"
                class="row-box"
              >
                <FormComp
                  v-if="`${itemComp.type}`"
                  ref="form2"
                  :form="getConfig($attrs.isAutoBind?itemComp:itemComp.type, indexList, indexComp,itemComp)"
                  :key="`item6`+indexComp+Math.random()"
                  :is-auto-bind="$attrs.isAutoBind"
                />
              </div>
              <el-select
                v-else
                v-model="itemComp.type"
                :filterable="true"
                size="small"
                placeholder="请选择"
                class="select-box"
                @change="handleChange(itemComp.type, indexList, indexComp)"
              >
                <el-option
                  v-for="(item,index) in newOptions"
                  :key="'ops'+item.type+Math.random()"
                  :label="item.name"
                  :value="index"/>
              </el-select>
              <el-button
                v-if="getIsShowBtn(1)"
                :class="{isHas:itemComp.type || itemComp.type === 0}"
                class="btn"
                size="small"
                type="danger"
                @click="handleDelete(indexList, indexComp)"
              >删除</el-button>
            </div>
            <el-button
              v-if="getIsShowBtn(1)"
              class="btn"
              style="margin-left: 0px;"
              size="small"
              @click="handleAdd(indexList)"
            >添加组件</el-button>
          </div>

          <el-button
            v-if="getIsShowBtn(0)"
            size="small"
            @click="handleAddRow()"
          >添加队列</el-button>
        </div>
      </el-form-item>
    </el-form>
    </div>
    <div
      v-if="$attrs.isConfig"
      style="width: 500px;"
      class="config-box config-box2"
    >
      <div v-for="(item5,index5) in form.newValue.value" :key="index5">
        <div v-for="(item6,index6) in item5" :key="index6">
          <span style="color: #16b002;">队列{{index5}}-组件{{index6}}</span>
          <el-input v-model="item6.attr" placeholder="key"></el-input>
          <el-input v-model="item6.name" placeholder="名称"></el-input>
          <el-switch v-if="item6.props && item6.props.rules" v-model="item6.props.rules.required"/>
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
</template>

<script>
import SelectContentEdit from '../../SelectContentEdit/index.vue'
import configForm from '../../configForm2'
import FormComp from '../../index.vue'

const btns = ['添加队列', '添加组件']

export default {
  name: 'ImYourselfList',
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
      options: configForm,
      form: {
        newValue: {
          checkboxGroup: this.checkboxGroup,
          ...this.$attrs.value
        }
      },
      oldForm: null
    }
  },
  computed: {
    isRequired () {
      return this.$attrs.props.rules && this.$attrs.props.rules.required
    },
    // 过滤表单选项,隐藏一些组件不让选择
    newOptions () {
      let list = JSON.parse(JSON.stringify(configForm))
      try {
        list = list.filter(v => ![
          'YourselfList',
          'YourselfListMode',
          'YourselfDiy',
          'Layout',
          'Line',
          'Button',
          'Transfer',
          'Upload',
          'Cascader'].includes(v.type) && `${v.status}` !== '2')
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
        console.log(333, typeof vl, vl)
        let newValue = vl
        try {
          if (typeof vl === 'string' && vl) {
            newValue = JSON.parse(vl)
            this.form.newValue = newValue
          }
        } catch (e) {
          console.log('err=>', e)
        }
        this.$attrs.props.isAutoBind && this.$emit('onInput', newValue)
        if (!vl && this.oldForm) {
          this.form = this.oldForm
        }
        this.isClearVilidate()
      },
      deep: true,
      immediate: true
    },
    'form.newValue.checkboxGroup': {
      handler (vl) {
        if (vl) {
          this.checkboxGroup = vl
          // 判断全选状态
          if (vl && vl.length === btns.length) {
            this.checkAll = true
          } else {
            this.checkAll = false
          }
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
    handleCheckAllChange () {
      const state = this.form.newValue.checkboxGroup && this.form.newValue.checkboxGroup.length === 0
      this.form.newValue.checkboxGroup = state ? btns : []
      this.checkboxGroup = state ? btns : []
      this.isIndeterminate = false
    },
    // 改变选中按钮
    handleCheckedChange (value) {
      const checkedCount = value.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkOptions.length
      this.form.newValue.checkboxGroup = this.checkboxGroup
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
    getConfig (item, indexList, indexComp, data) {
      console.log('000', item, data)
      let arr = []
      if (item && item > 0) {
        item = JSON.parse(JSON.stringify(this.newOptions))[item]
        this.form.newValue.value[indexList][indexComp] = item
      } else if (item && typeof item === 'string') {
        item = data
        this.form.newValue.value[indexList][indexComp] = data
      }
      arr = [item]
      if (!item) {
        arr = []
      } else {
        !this.$attrs.props.isAutoBind && this.$emit('onInput', this.form.newValue)
      }
      console.log('001', item, data, arr, this.form.newValue)
      return arr
    },
    // 添加分组内元素
    handleAdd (indexList, indexTemp) {
      this.onDataBind()
      console.log('添加分组内元素1', indexList, indexTemp)
      this.form.newValue.value[indexList].push({ type: '' })
    },
    // 添加队列
    handleAddRow () {
      this.onDataBind()
      if (this.form.newValue.value && this.form.newValue.value[0]) {
        this.form.newValue.value.push(JSON.parse(JSON.stringify(this.form.newValue.value[0])))
      } else {
        this.form.newValue.value.push([{type: ''}])
      }
    },
    handleDelete (indexList, indexComp) {
      this.onDataBind()
      console.log(111, indexList, indexComp)
      const newForm = JSON.parse(JSON.stringify(this.form.newValue.value))
      newForm[indexList] = newForm[indexList].filter((v, i) => i !== indexComp)
      this.form.newValue.value = newForm
    },
    // 删除
    handleDeleteRow (indexList, indexTemp) {
      this.onDataBind()
      if (indexTemp > -1) {
        this.form.newValue.value[indexList].splice(indexTemp, 1)
      } else if (indexList > -1) {
        this.form.newValue.value.splice(indexList, 1)
      }
    },
    validateForm () {
      return this.validate()
    },
    // 是否校验通过
    isVilidate () {
      return true
    },
    validate () {
      let state = true
      this.$refs.form2.map((v) => {
        if (!v.validateForm()) {
          state = false
        }
      })
      return state
    },
    handleAvatarSuccess (res) {
      this.form.newValue = res.url
    },
    // 获取选中后的表单配置
    handleChange (type, indexList, indexComp) {
      this.onDataBind()
      console.log('333-1', type, indexList, indexComp, this.form.newValue.value)
      const newForm = JSON.parse(JSON.stringify(this.form.newValue.value))
      newForm[indexList][indexComp] = JSON.parse(JSON.stringify(this.newOptions))[type]
      console.log('333-2', newForm)
      setTimeout(() => {
        let form = this.form.newValue
        if (typeof form === 'string') {
          form = JSON.parse(form)
        }
        form.value = newForm
        console.log('333-4', form)
        this.form.newValue = form
        console.log('333-5', this.form.newValue)
        // !this.$attrs.props.isAutoBind && this.$emit('onInput', form)
      }, 0)
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
      console.log(9996, this.$refs.form2)

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
    min-width: 300px;
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
  .list-box{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 4px;
    position: relative;
    border: 1px dashed #fc8fff;
    margin-bottom: 10px;
    padding: 10px;
  }
  .row{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>
