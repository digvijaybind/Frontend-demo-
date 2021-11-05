import Vue from "vue";
import VueRouter from "vue-router";
import dashboard from "../views/dashboard.vue";
import category from "../views/category.vue";
import manager from "../views/manager.vue";
import admin from "../views/admin.vue";
import participant from "../views/participant.vue";
import about from "../views/about.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: dashboard,
  },
  {
    name: "category",
    path: "/category/:id",
    component: category,
  },
  {
    path: "/manager",
    name: "manager",
    component: manager,
  },
  {
    path: "/admin",
    name: "admin",
    component: admin,
  },
  {
    path: "/participant",
    name: "participant",
    component: participant,
  },
  {
    path: "/about",
    name: "About",
    component: about,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
