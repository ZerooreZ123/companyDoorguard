<template>
  <div class="wrap">
    <div class="floor flex-between">
      <span>房号</span>
      <span class="num">{{floor}}</span>
    </div>
    <div class="setting ">
      <div class="item flex-between">
        <span>旧密码</span>
        <input type="password" placeholder="请输入旧密码" v-model="oldCode">
      </div>
      <div class="item flex-between">
        <span>新密码</span>
        <input type="password" placeholder="请输入新密码" v-model="newCode">
      </div>
      <div class="setPassword flex-between">
        <span>确认密码</span>
        <input type="password" placeholder="请再次输入新密码" v-model="confirmCode">
      </div>
    </div>
    <div class="tip flex-end">密码必须是6至8位纯数字</div>
    <div class="buttonBox flex-center">
      <div @click="refer" :class="oldCode&&newCode&&confirmCode?'buttonDeep flex-center':'buttonTint flex-center'">完成</div>
    </div>
    <tip-mes :msg="message" v-if="isDisplay"></tip-mes>
  </div>
</template>
<script>
import TipMes from "@/components/common/tipMes";
import NetRequest from "@/utils/NetRequest";
export default {
  components: {
    TipMes
  },
  data() {
    return {
      devicePwd: window.sessionStorage.getItem("passWord"),
      oldCode: "",
      newCode: "",
      confirmCode: "",
      isDisplay: false,
      message: {},
      roomId: JSON.parse(window.sessionStorage.getItem("info")).room,
      floor: JSON.parse(window.sessionStorage.getItem("info")).address
    };
  },
  mounted() {
    document.querySelector("title").innerText = "设置设备密码";
  },
  watch: {},
  methods: {
    match(Num) {
      const Regular = /^\d{6,8}$/;
      if (Regular.test(Num)) {
        return true;
      } else {
        return false;
      }
    },
    async refer() {
      console.log(`设备密码:${this.devicePwd}  旧密码:${this.oldCode}  新密码:${this.newCode}  确认新密码:${this.confirmCode}`);
      if (
        this.match(this.oldCode) &&
        this.match(this.newCode) &&
        this.match(this.confirmCode) &&
        this.devicePwd === this.oldCode &&
        this.newCode === this.confirmCode
      ) {
        await NetRequest.postUrl("/updateDevicePwd", { room: this.roomId, password: this.newCode });
        window.history.go(-1);
      } else {
        this.isDisplay = true;
        this.message = { name: "密码错误,请重新填写", isShow: false };
        setTimeout(() => {
          this.isDisplay = false;
        }, 1.5e3);
        return false;
      }
    }
  }
};
</script>

<style scoped>
.wrap {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #f3f3f3;
}
.floor {
  height: 90px;
  font-size: 28px;
  padding: 0 28px;
  border-bottom: 2px solid #f0f0f0;
  color: #666;
}
.floor:nth-child(2) {
  color: #000;
}
.setting {
  background: #fff;
  font-size: 26px;
}
.item {
  height: 90px;
  border-bottom: 2px solid #f0f0f0;
  margin: 0 28px;
}
.setPassword {
  height: 90px;
  border-bottom: 2px solid #f0f0f0;
  padding: 0 28px;
  color: #666;
}
.item > span {
  color: #666;
}
.num {
  color: #000;
}
.item > input,
.setPassword > input {
  width: 70%;
  border: 0;
  outline: none;
  background: #fff;
  text-align: right;
  color: #000;
}
input::-webkit-input-placeholder {
  color: #c6c6c6;
}
.tip {
  font-size: 24px;
  height: 74px;
  margin-right: 28px;
  color: #666;
}
.buttonBox {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
}
.buttonDeep,
.buttonTint {
  width: 83.2%;
  height: 78px;
  font-size: 30px;
  border-radius: 4px;
}
.buttonDeep {
  color: #65a2e6;
  border: 2px solid #65a2e6;
}
.buttonTint {
  color: #c8daef;
  border: 2px solid #c8daef;
}
</style>
