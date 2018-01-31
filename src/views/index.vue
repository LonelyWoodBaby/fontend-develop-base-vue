<template>
  <div class="index">{{indexMessage}}</div>
</template>
<script>
export default {
  data() {
    return {
      indexMessage: '欢迎来到开发首页'
    };
  }
};
</script>
<style scoped>
.index {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  text-align: center;
}
</style>
