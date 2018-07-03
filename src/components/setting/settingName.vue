<template>
  <div class="wrap">
    <div class="inputBox flex-between">
      <input ref="inputFocus" type="text" class="inputName" v-model="inputText">
      <img class="icon" :src="require('@/assets/img/icon/x.png')" v-if="isShow" @click="clear" alt="">
    </div>
    <div class="buttonBox flex-center">
      <div @click="refer" :class="inputText === ''?'buttonTint flex-center' : 'buttonDeep flex-center'">完成</div>
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
      sex: "",
      isDisplay: false,
      message: {},
      inputText: "",
      isShow: false,
      userId: JSON.parse(window.sessionStorage.getItem("info")).id,
      type: JSON.parse(window.sessionStorage.getItem("info")).type
    };
  },
  mounted() {
    document.querySelector("title").innerText = "设置名字";
    this.info();
  },
  watch: {
    inputText() {
      if (this.inputText) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    }
  },
  methods: {
    clear() {
      this.inputText = "";
    },
    async refer() {
      if (this.inputText === "") {
        this.isDisplay = true;
        this.message = { name: "没有输入名字，请重新填写", isShow: false };
        setTimeout(() => {
          this.isDisplay = false;
        }, 1.5e3);
        return false;
      }
      this.isDisplay = true;
      this.message = { name: "正在加载", isShow: true };
      if (this.type === "0") {
        await NetRequest.post("updateAdminInfo", { name: this.inputText, sex: this.sex, id: this.userId });
      } else {
        await NetRequest.post("updateTenantInfo", { name: this.inputText, sex: this.sex, id: this.userId });
      }
      this.message = { name: "设置成功", isShow: false };
      setTimeout(() => {
        this.isDisplay = false;
        window.history.go(-1);
      }, 1.5e3);
    },
    async info() {
      this.$refs.inputFocus.focus();
      if (this.type === "0") {
        const data = await NetRequest.post("getAdminInfo", { id: this.userId });
        this.sex = data[0].sex;
      } else {
        const data = await NetRequest.post("getTenantInfo", { id: this.userId });
        this.sex = data[0].sex;
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
.inputBox {
  width: 100%;
  height: 90px;
  background: #fff;
  border-bottom: 2px solid #f0f0f0;
}
.inputName {
  height: 48%;
  width: 80%;
  font-size: 30px;
  padding: 0;
  border: none;
  outline: none;
  text-indent: 20px;
}
.icon {
  display: inline-block;
  width: 26px;
  height: 26px;
  margin-right: 28px;
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
