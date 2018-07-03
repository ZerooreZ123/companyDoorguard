<template>
  <div class="wrap">
    <div class="content" v-for="(item,index) in dataResult" :key="index">
      <div class="flex-between single">
        <div class="place flex-start">
          <div class="adress">{{item.address}}</div>
          <div class="park">{{item.place}}</div>
        </div>
        <div>
          <span class="editPassword">修改密码</span>
          <span class="openDoor">开门</span>
        </div>
      </div>
    </div>
    <div class="managerCenter flex-center" @click="onManagement">管理中心</div>
    <div class="ball flex-center" @click="onScavenging">分享</div>
    <div class="buttonBox flex-center">
      <div class="button flex-center">扫码开门</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataResult: [
        {
          address: "9栋301西门",
          place: "创意中央"
        },
        {
          address: "9栋302东门",
          place: "创意中央"
        },
        {
          address: "9栋303南门",
          place: "创意中央"
        }
      ],
      address: JSON.parse(window.sessionStorage.getItem("info")).address,
      room: JSON.parse(window.sessionStorage.getItem("info")).room
    };
  },
  mounted() {
    document.querySelector("title").innerText = "企业门禁";
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
}
.park {
  color: #777;
}
.editPassword,
.openDoor {
  display: inline-block;
  width: 140px;
  border-radius: 4px;
  text-align: center;
  padding: 10px 0;
}
.editPassword {
  border: 2px solid #e2e2e2;
  color: #bbb;
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
