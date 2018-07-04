<template>
  <div class="wrap">
    <div class="content" v-for="(item,index) in dataResult" :key="index">
      <div class="flex-between single">
        <div class="place flex-start">
          <div class="adress">{{item.loc}}</div>
          <div class="park">{{item.areaName}}</div>
        </div>
        <div>
          <span :class="item.password?'editPassword':'lockPassword'" @click="setPassword(item.password,item.id,item.loc)">修改密码</span>
          <span class="openDoor" @click="open(item.id,item.password)">开门</span>
        </div>
      </div>
    </div>
    <div class="managerCenter flex-center" @click="onManagement">管理中心</div>
    <div class="ball flex-center" @click="onScavenging">分享</div>
    <div class="buttonBox flex-center">
      <div class="button flex-center" @click="onScavenging">扫码开门</div>
    </div>
    <tip-mes :msg="message" v-if="isDisplay"></tip-mes>
  </div>
</template>

<script>
import NetRequest from "@/utils/NetRequest";
import TipMes from "@/components/common/tipMes";
export default {
  components: {
    TipMes
  },
  data() {
    return {
      message: {},
      isDisplay: false,
      dataResult: [],
      address: JSON.parse(window.sessionStorage.getItem("info")).address,
      room: JSON.parse(window.sessionStorage.getItem("info")).room
    };
  },
  mounted() {
    document.querySelector("title").innerText = "企业门禁";
    this.getCompanyInfo();
  },
  methods: {
    onManagement() {
      this.$router.push({
        path: "/managementCenter"
      });
    },
    onScavenging() {
      this.$router.push({
        path: "/scavenging"
      });
    },
    setPassword(val, num, address) {
      if (val) {
        this.$router.push({ path: "/settingPassword" });
        window.floor = { passWord: val, room: num, loc: address };
      } else {
        return false;
      }
    },
    async getCompanyInfo() {
      const data = await NetRequest.post("getRoomsInfo", { room: this.room });
      this.dataResult = data;
    },
    async open(id, state) {
      if (!state) {
        this.isDisplay = true;
        this.message = { name: "暂无法开锁", isShow: false };
        setTimeout(() => {
          this.isDisplay = false;
        }, 1.5e3);
      } else {
        const data = await NetRequest.postUrl("/openDoor", { room: id });
        if (JSON.stringify(data) === "{}") {
          this.isDisplay = true;
          this.message = { name: "开锁成功", isShow: false };
          setTimeout(() => {
            this.isDisplay = false;
          }, 1.5e3);
        }
      }
    }
  }
};
</script>

<style scoped>
.wrap {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: #f3f3f3;
}
.single {
  height: 138px;
  padding: 0 30px;
  margin-top: 30px;
  border-radius: 6px;
  background: #fff;
}
.adress {
  font-size: 34px;
  color: #000;
  font-weight: 500;
  margin-bottom: 10px;
}
.park {
  color: #777;
}
.editPassword,
.lockPassword,
.openDoor {
  display: inline-block;
  width: 140px;
  border-radius: 4px;
  text-align: center;
  padding: 10px 0;
}
.editPassword {
  border: 2px solid #bbb;
  color: #bbb;
}
.lockPassword {
  border: 2px solid #e1e1e1;
  color: #e1e1e1;
}
.openDoor {
  border: 2px solid #c1daf6;
  color: #65a2e6;
  margin-left: 24px;
}
.content {
  padding: 0 30px;
  font-size: 28px;
}
.ball,
.managerCenter {
  position: fixed;
  right: 30px;
  width: 58px;
  height: 58px;
  padding: 25px;
  border-radius: 50%;
  font-size: 26px;
  color: #4591e4;
  box-shadow: 2px 8px 8px #bfbfbf;
  background: #fff;
}
.ball {
  bottom: 170px;
}
.managerCenter {
  bottom: 300px;
}
.buttonBox {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 140px;
}
.button {
  width: 92%;
  height: 78px;
  font-size: 34px;
  color: #fff;
  border-radius: 4px;
  background: #65a2e6;
}
</style>
