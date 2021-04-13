<template>
  <div class="parent">
    <slot></slot>
    <div>
      {{data}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'parent',
  mounted () {
    this.$nextTick(() => {
      this.data = this.$slots
    })
  },
  data () {
    return {
      data: null
    }
  }
}
</script>

<style scoped>

</style>
