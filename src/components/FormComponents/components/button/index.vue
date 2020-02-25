<template>
  <el-button
    v-bind="$attrs.props"
    class="btn"
  >
    {{ $attrs.name }}
  </el-button>
</template>

<script>
import { common } from '../../mixins/common'

export default {
  name: 'ImButton',
  mixins: [common]
}
</script>

<style scoped>
.btn{
  width: auto !important;
}
</style>
