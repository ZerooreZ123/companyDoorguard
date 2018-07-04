<template>
  <div>
    <div class="index-center">
      <img src="@/assets/img/sorry.png" alt="">
      <div class="remarks-one">抱歉, 您暂无开门权限</div>
      <div class="remarks-two">请联系企业管理员</div>
    </div>
  </div>
</template>

<script>
import NetRequest from "@/utils/NetRequest";
export default {
  mounted() {
    // setTimeout(() => {
    //   window.workgo.getAuth(window.appId, window.secretKey, result => {
    //     if (result.success) {
    //       window.workgo.getUserInfo(result => {
    //         this.jump(result.mobile);
    //       });
    //     } else {
    //       alert(result.errMsg);
    //     }
    //   });
    // }, 500);
    document.querySelector("title").innerText = "智能门锁";
    this.jump();
  },
  methods: {
    async jump() {
      // const data = await NetRequest.post("userLogin", { phone: 15015010422 });
      const data = await NetRequest.post("userLogin", { phone: 18617015565 });
      if (data.length > 0) {
        if (data[0].type === "0") {
          this.$router.replace({
            path: "/home"
          });
        } else {
          this.$router.replace({
            path: "/scavenging"
          });
        }
        window.sessionStorage.setItem("info", JSON.stringify(data[0]));
      }
    }
  }
};
</script>

<style>
.index-center {
  position: fixed;
  width: 100%;
  top: 360px;
}

.index-center .remarks-one {
  margin: 32px auto 0;
  font-size: 34px;
  font-weight: 600;
}

.index-center .remarks-two {
  color: #999;
  font-size: 30px;
  margin: 24px auto 0;
}

.index-center img {
  width: 250px;
  height: 250px;
}
</style>
