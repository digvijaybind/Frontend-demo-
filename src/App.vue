<template>
  <v-app>
    <side-nav-and-header
      v-if="this.$route.name !== 'loginAndRegister'"
    ></side-nav-and-header>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import SideNavAndHeader from "@/components/SideNavAndHeader";

export default {
  components: {
    SideNavAndHeader,
  },
  name: "App",
  created() {
    // console.log("this.$route", this.$route.name === "loginAndRegister");
    // this.routeFetch();
  },

  data: () => {
    return {
      // items: [
      //   { title: "dashboard", icon: "mdi-view-dashboard" },
      //   { title: "manager", icon: "mdi-account-tie" },
      //   { title: "admin", icon: "mdi-account-cog" },
      //   { title: "participant", icon: "mdi-account" },
      //   { title: "about", icon: "mdi-information-outline" },
      // ],
      // right: true,
    };
  },
  watch: {
    // "$route.name": function (newVal) {
    //   console.log("newval", newVal);
    //   this.$store.commit("setRoute", newVal);
    //   this.routeFetch();
    // },
  },
  methods: {
    // routeFetch() {
    //   if (localStorage.getItem("userType") === "admin") {
    //     this.items = [
    //       { title: "dashboard", icon: "mdi-view-dashboard" },
    //       { title: "admin", icon: "mdi-account-cog" },
    //       { title: "participant", icon: "mdi-account" },
    //       { title: "about", icon: "mdi-information-outline" },
    //     ];
    //   } else if (localStorage.getItem("userType") === "participant") {
    //     this.items = [
    //       { title: "dashboard", icon: "mdi-view-dashboard" },
    //       { title: "participant", icon: "mdi-account" },
    //       { title: "about", icon: "mdi-information-outline" },
    //     ];
    //   } else {
    //     this.items = [
    //       { title: "dashboard", icon: "mdi-view-dashboard" },
    //       { title: "manager", icon: "mdi-account-tie" },
    //       { title: "admin", icon: "mdi-account-cog" },
    //       { title: "participant", icon: "mdi-account" },
    //       { title: "about", icon: "mdi-information-outline" },
    //     ];
    //   }
    // },
    // gotoLink(currenttLink) {
    //   console.log("currenttLink", `/${currenttLink}`);
    //   this.$router.push({
    //     path: `/${currenttLink}`,
    //   });
    // },
    // getLogout() {
    //   localStorage.removeItem("accessToken");
    //   localStorage.removeItem("userType");
    //   this.$router.push({ name: "Login&Register" });
    // },
    // toggleTheme() {
    //   this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    // },
    // validate() {
    //   this.$refs.form.validate();
    // },
    // reset() {
    //   this.$refs.form.reset();
    // },
    // resetValidation() {
    //   this.$refs.form.resetValidation();
    // },
  },
  computed: {
    currentRole() {
      return localStorage.getItem("userType");
    },
  },
};
</script>

<style lang="scss">
.color-SpringGreen {
  color: #000 !important;
  background-color: #8bc34a !important;
}
.item-list-section {
  .v-list-item__content {
    .v-list-item__title {
      font-size: 18px !important;
    }
  }
}
</style>
