<template>
  <div>
    <v-navigation-drawer app :permanent="right" v-model="right">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6 text-color-green">
            VEP
          </v-list-item-title>
          <v-list-item-subtitle>
            world of virtual exbhition center
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list class="item-list-section" dense nav>
        <v-list-item
          :to="item.path"
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      v-if="this.$route.name !== 'Login&Register'"
      app
      class="color-SpringGreen"
    >
      <v-app-bar-nav-icon @click.stop="right = !right"></v-app-bar-nav-icon>

      <v-toolbar-title>VEP</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon v-if="!$vuetify.theme.dark" @click="toggleTheme()">
        <v-icon class="mr-1" color="blue-grey darken-4">mdi-lightbulb</v-icon>
      </v-btn>
      <v-btn icon v-if="$vuetify.theme.dark" @click="toggleTheme()">
        <v-icon color="white">mdi-lightbulb-outline</v-icon>
      </v-btn>
      <v-btn class="ma-2" outlined color="primary">
        {{ currentRole }}
      </v-btn>
      <v-btn @click="getLogout()" class="ma-2" outlined color="black">
        Logout
      </v-btn>
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon></v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    // console.log("this.$route", localStorage.getItem("userType"), this.items);
    // this.routeFetch();
  },
  data: () => {
    return {
      items: [
        { title: "dashboard", icon: "mdi-view-dashboard", path: "/dashboard" },
        { title: "manager", icon: "mdi-account-tie", path: "/manager" },
        { title: "admin", icon: "mdi-account-cog", path: "/admin" },
        { title: "participant", icon: "mdi-account", path: "/participant" },
        { title: "about", icon: "mdi-information-outline", path: "/about" },
      ],
      right: true,
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
      font-weight: 300 !important;
    }
  }
  .v-list-item--active {
    color: #000 !important;
    background-color: #8bc34a !important;
    font-weight: 500 !important;
  }
}
</style>
