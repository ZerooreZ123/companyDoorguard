import Vue from "vue";
import Router from "vue-router";

const Home = resolve => require(["@/components/home"], resolve);
const Scavenging = resolve => require(["@/components/scavenging/scavenging"], resolve);
const Jurisdiction = resolve => require(["@/components/entrance/jurisdiction"], resolve);
const ManagementCenter = resolve => require(["@/components/managementCenter"], resolve);
const SettingName = resolve => require(["@/components/setting/settingName"], resolve);
const SettingPassword = resolve => require(["@/components/setting/settingPassword"], resolve);
const SettingSex = resolve => require(["@/components/setting/settingSex"], resolve);
const SettingInfo = resolve => require(["@/components/setting/settingInfo"], resolve);
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/jurisdiction"
    },
    {
      path: "/home",
      name: "Home",
      component: Home
    },
    {
      path: "/scavenging",
      name: "scavenging",
      component: Scavenging
    },
    {
      path: "/jurisdiction",
      name: "jurisdiction",
      component: Jurisdiction
    },
    {
      path: "/managementCenter",
      name: "ManagementCenter",
      component: ManagementCenter
    },
    {
      path: "/settingName",
      name: "SettingName",
      component: SettingName
    },
    {
      path: "/settingPassword",
      name: "SettingPassword",
      component: SettingPassword
    },
    {
      path: "/settingSex",
      name: "SettingSex",
      component: SettingSex
    },
    {
      path: "/settingInfo",
      name: "SettingInfo",
      component: SettingInfo
    }
  ]
});
