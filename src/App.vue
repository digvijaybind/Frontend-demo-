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

  data: () => {
    return {};
  },

  methods: {},
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
