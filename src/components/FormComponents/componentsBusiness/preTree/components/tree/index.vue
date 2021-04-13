<template>
  <ul class="treebox">
    <li v-for="(item,index) in newOptions" :key="index+Math.random()">
      <span class="catalog" @click="select(item, index)" :class="{active: newCurNode && newCurNode.key === item.key}">
        <span class="folderIcon"
              :class="{active: item.show}" >
          <span
            v-if="item.children"
            class="angle"> > </span>
        </span>
        <span>
          {{ item.value }}
        </span>
        <span class="btn ml" @click.stop="$emit('onAdd', item)">添加</span>
        <span class="btn" @click.stop="$emit('onEdit', item)">编辑</span>
        <span class="btn" @click.stop="$emit('onDelete', item)">删除</span>
      </span>
      <treebox
        v-if="item.children && item.show"
        :options.sync="item.children"
        :cur-node="newCurNode"
      />
    </li>
  </ul>
</template>

<script>
export default{
  name: 'treebox',
  props: {
    options: {
      type: Array
    },
    curNode: {
      type: Object
    }
  },
  watch: {
    options (vl) { this.newOptions = vl },
    newOptions: {
      handler (vl) {
        this.$emit('update:options', vl)
      },
      deep: true,
      immediate: true
    },
    curNode (vl) { this.newCurNode = vl },
    newCurNode: {
      handler (vl) {
        this.$emit('update:curNode', vl)
      },
      deep: true,
      immediate: true
    }
  },
  data () {
    return {
      newOptions: this.options,
      newCurNode: this.curNode
    }
  },
  methods: {
    select (item, index) {
      let data = JSON.parse(JSON.stringify(this.newOptions))
      data[index].show = !data[index].show
      if (!data[index].children) this.newCurNode['key'] = data[index].key
      this.newOptions = data
    }
  }
}
</script>

<style scoped>
  .ml{
    margin-left: 10px;
  }
  .btn{
    font-size: 12px;
    color: #409EFF;
    opacity: 1;
  }
  .btn:hover{
    color: #3a8ee6;
  }
  .btn:active{
    opacity: 0.5
  }
  .treebox {
    width: 100%;
    padding-left: 12%;
    line-height: 26px;
  }
  .catalog{
    display: flex;
    flex-direction: row;
  }

  .folderIcon{
    width: 5px;
    min-height: 1px;
    display: inline-block;
    transition: all .2s linear;
  }
  .folderIcon .angle{
    position: relative;
    color: #ababab;
  }
  .folderIcon.active{
    transform: rotate(90deg);
  }

  .treebox li {
    position: relative;
    list-style: none;
  }
  .treebox li .catalog {
        display: inline-block;
        margin-left: 12px;
        font-size: 14px;
        height: 100%;
        width: 120%;
        cursor: pointer;
        position: relative;
        right: 25px;
        top: -2px;
        color: #323232;
      }
        .titleIcon{
          color:#C3C3C3;
          font-size:16px;
          position: absolute;
          top:12px;
          left:16px;
        }
        /*.folderIcon{*/
          /*color:#BCBCBC;*/
          /*position: absolute;*/
          /*top:-1px;*/
          /*left:22px;*/
        /*}*/
  .catalog.active{
    background: rgba(237, 240, 245, 0.48);
  }
</style>
