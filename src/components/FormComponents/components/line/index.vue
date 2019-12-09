<template>
  <div class="line-box">
    <p
      class="line"
      :class="{
        left:newPosition === 'left',
        center:newPosition === 'center',
        right:newPosition === 'right',
      }"
    >
      <span
        class="name"
      >{{$attrs.name}}</span>
    </p>
  </div>
</template>

<script>

export default {
  name: 'ImLine',
  props: {
    value: [String, Number],
    attrs: [Object, String]
  },
  data () {
    return {
      newOptions: null,
      newPosition: this.attrs.position
    }
  },
  computed: {
    isRequired () {
      return this.$attrs.props.rules && this.$attrs.props.rules.required
    }
  },
  watch: {
    attrs: {
      handler (vl) {
        this.newPosition = vl.position
      },
      deep: true,
      immediate: true
    },
  },
  methods: {
    validate () {
      return true
    }
  }
}
</script>

<style scoped>
.line-box{
  width: 100%;
  height: 30px;
}
.line{
  width: 100%;
  height: 2px;
  background-color: #eee;
  z-index: 1;
  margin-top: 14px;
  overflow-y: hidden;
}
.name{
  position: absolute;
  font-size: 14px;
  font-weight: bold;
  top: 0px;
  left: -2px;
  z-index: 2;
  color: #323232;
  background-color: white;
  line-height: 30px;
  padding: 0px 6px;
}
.line.left .name{

}
.line.right .name{
  left: initial;
  right: -2px
}
.line.center{
  overflow-y: initial;
}
.line.center .name{
  position: relative;
  left: initial;
  top: -15px;
}
</style>
