<template>
  <div class="tipBox">
    <div class="tip">
      <img class="icon" :src="require('@/assets/img/icon/load.png')" v-if="msg.isShow"> {{msg.name}}
    </div>
  </div>
</template>
<script>
export default {
  name: "TipMes",
  props: ["msg"],
  data() {
    return {};
  }
};
</script>
<style scoped>
.tipBox {
  z-index: 100;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tip {
  padding: 36px 44px;
  border-radius: 61px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 34px;
  color: #fff;
  background: #4c4c4c;
}
.icon {
  display: inline-block;
  width: 33px;
  height: 33px;
  margin-right: 20px;
}
</style>
