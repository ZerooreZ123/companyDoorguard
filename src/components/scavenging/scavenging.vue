<template>
  <div class="wrap">
    <div class="wrap-header flex-between">
      <div @click="goCenter">管理中心</div>
      <div @click="halve">分享</div>
    </div>
    <div class="qr-cod flex-column">
      <div class="qrBox flex-center">
        <qrcode :value='qrString' :size=200 type="img"></qrcode>
      </div>
      <p class="scavenging-one">扫码开门</p>
      <p class="scavenging-two">请将二维码对准楼宇门禁的硬件设备扫描</p>
    </div>
    <div class="mask flex-center" v-if="isMask">
      <div class="masktop" @click="closeMask"></div>
      <div class="box flex-center">
        <img class="x" :src="require('@/assets/img/icon/x.png')" @click="closeMask">
        <div class="text">现仅支持截屏通过第三方分享</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Qrcode } from "vux";
import NetRequest from "@/utils/NetRequest";
export default {
  components: { Qrcode },
  data() {
    return {
      qrString: "",
      isMask: false,
      userType: JSON.parse(window.sessionStorage.getItem("info")).type
    };
  },
  mounted() {
    document.querySelector("title").innerText = "扫码开启门禁";
    this.getScanCode(this.userType);
  },
  methods: {
    halve() {
      this.isMask = true;
    },
    goCenter() {
      this.$router.push({
        path: "/managementCenter"
      });
    },
    closeMask() {
      this.isMask = false;
    },
    async getScanCode(codeType) {
      const temp = window.sessionStorage.getItem("info");
      const userRoom = JSON.parse(temp).room;
      const data = await NetRequest.postUrl("/scanCode", { id: userRoom, type: codeType });
      this.qrString = data.code;
    }
  }
};
</script>

<style>
.wrap {
  position: relative;
}
.qr-cod {
  margin-top: 214px;
}
.qrBox {
  padding: 20px 20px 2px;
  border: 2px solid #eff6fd;
  border-radius: 6px;
  box-shadow: 10px 10px 10px #eff6fd;
}
.wrap-header {
  height: 90px;
  padding: 0 30px;
  font-size: 34px;
  color: #4591e4;
  font-weight: 500;
}
.scavenging-one {
  color: #000;
  font-weight: 600;
  margin-top: 20px;
  font-size: 32px;
}

.scavenging-two {
  margin-top: 24px;
  font-size: 28px;
  color: #808080;
}
.mask,
.masktop {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.mask {
  z-index: 100;
  background: rgba(0, 0, 0, 0.5);
}
.masktop {
  z-index: 150;
}
.box {
  z-index: 200;
  position: relative;
  width: 82.6%;
  height: 180px;
  border-radius: 5px;
  background: #fff;
}
.x {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
}
.text {
  font-size: 34px;
  color: #000;
}
</style>
