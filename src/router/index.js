import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";
import Main from "../views/Main.vue";
import User from "../views/user/User.vue";
import Page1 from "../views/Page1.vue";
import Page2 from "../views/Page2.vue";
import Login from "../views/Login.vue";
const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
    // redirect: "/home",
    children: [
      // {
      //   path: "/home",
      //   name: "home",
      //   component: Home,
      // },
      // {
      //   path: "/user",
      //   name: "user",
      //   component: User,
      // },
      // {
      //   path: "/page1",
      //   name: "page1",
      //   component: Page1,
      // },
      // {
      //   path: "/page2",
      //   name: "page2",
      //   component: Page2,
      // },
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
