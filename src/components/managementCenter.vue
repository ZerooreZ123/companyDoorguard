<template>
  <div class="wrap">
    <div class="group">
      <div class="item flex-between">
        <span class="tag">手机号</span>
        <span>{{phone}}</span>
      </div>
      <div class="item flex-between" @click="setName">
        <span class="tag">姓名</span>
        <span class="flex-center">{{name}}
          <img class="icon" :src="require('@/assets/img/icon/go.png')" alt="">
        </span>
      </div>
      <div class="item flex-between" @click="setSex">
        <span class="tag">性别</span>
        <span class="flex-center" :class="sex?'deepColor':'setColor'" @click="setSex">{{sex|setStatus}}
          <img class="icon" :src="require('@/assets/img/icon/go.png')" alt="">
        </span>
      </div>
    </div>
    <div class="group lie">
      <div class="item flex-between">
        <span class="tag">人脸识别</span>
        <span class="flex-center" :class="faceSet? 'deepColor': 'setColor' ">{{faceSet|setStatus}}
          <img class="icon " :src="require( '@/assets/img/icon/go.png') " alt=" ">
        </span>
      </div>
      <input @change="getBase64 " class="upload " ref="files" type="file" multiple="multiple " />
    </div>
  </div>
</template>
<script>
import NetRequest from "@/utils/NetRequest";
export default {
  data() {
    return {
      name: "",
      sex: "",
      type: JSON.parse(window.sessionStorage.getItem("info")).type,
      phone: JSON.parse(window.sessionStorage.getItem("info")).phone,
      faceSet: ""
    };
  },
  filters: {
    setStatus(value) {
      return value ? value.toString() : "未设置";
    }
  },
  mounted() {
    this.info();
    document.querySelector("title").innerText = "管理中心";
  },
  methods: {
    getBase64(event) {
      var data = event.target.files;
      var file = [];
      for (var i in data) {
        if (data.hasOwnProperty(i)) {
          file.push(data[i]);
        }
      }
      file.forEach(el => {
        if (window.FileReader) {
          var fr = new FileReader();
          fr.onloadend = e => {
            var result = e.target.result.split(",");
            this.uploadFace(result[1]);
          };
          fr.readAsDataURL(el);
        } else {
          alert("NO FileReader!");
        }
      });
    },
    async uploadFace(stringBase64) {
      const Id = JSON.parse(window.sessionStorage.getItem("info")).id;
      const userType = JSON.parse(window.sessionStorage.getItem("info")).type;
      const data = await NetRequest.postUrl("/uploadFace", { image: stringBase64, id: Id, type: userType });
      if (JSON.stringify(data) === "{}") {
        this.info();
      }
    },
    setName() {
      this.$router.push({ path: "/settingName" });
    },
    setSex() {
      this.$router.push({ path: "/settingSex" });
    },
    async info() {
      const userId = JSON.parse(window.sessionStorage.getItem("info")).id;
      const type = JSON.parse(window.sessionStorage.getItem("info")).type;
      if (type === "0") {
        const data = await NetRequest.post("getAdminInfo", { id: userId });
        this.name = data[0].name;
        this.sex = data[0].sex;
        window.sessionStorage.setItem("userSex", this.sex);
        if (data[0].faceSet) {
          this.faceSet = "已开启";
        } else {
          this.faceSet = "";
        }
      } else {
        const data = await NetRequest.post("getEmployeeInfo", { id: userId });
        this.name = data[0].name;
        this.sex = data[0].sex;
        window.sessionStorage.setItem("userSex", this.sex);
        window.sessionStorage.setItem("passWord", data[0].password);
        window.userSex = data[0].sex;
        if (data[0].faceSet) {
          this.faceSet = "已开启";
        } else {
          this.faceSet = "";
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
  right: 0;
  bottom: 0;
  left: 0;
  background: #f3f5f7;
  font-size: 28px;
}
.group {
  padding: 0 30px;
  margin-bottom: 20px;
  background: #fff;
  border-top: 2px solid #f6f6f6;
  border-bottom: 2px solid #f6f6f6;
}
.lie {
  position: relative;
}
.upload {
  z-index: 220;
  position: absolute;
  top: 0;
  left: 0;
  color: transparent;
  opacity: 0;
  width: 100%;
  height: 100%;
}
.item {
  height: 90px;
  border-bottom: 1px solid #f6f6f6;
}
.icon {
  width: 16px;
  height: 24px;
  margin-left: 14px;
}
.tag {
  color: #666;
}
.setColor {
  color: #b3b3b3;
}
.deepColor {
  color: #000;
}
</style>
