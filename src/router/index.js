import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";
import Main from "../views/Main.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
    children: [
      {
        path: "/",
        name: "home",
        component: HomeView,
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
