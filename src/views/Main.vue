<template>
  <div class="common-layout">
    <el-container class="lay-container">
      <Aside/>
      <el-container class="r-container">
        <Header/>
        <Tab/>
        <el-main class="right-main">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import Header from '../components/Header.vue'
import Aside from "../components/Aside.vue";
import Tab from "../components/Tab.vue";

export default defineComponent({
  components: {
    Header,
    Aside,
    Tab
  }
});
</script>

<style lang="less" scoped>
.el-container {
  flex-wrap: wrap;
  align-items: flex-start;
  height: 100%;
}
.common-layout {
  .lay-container {
    flex-wrap: nowrap;
    .right-main {
      height: calc(100% - 124px) !important;
    }
  }
  height: 100%;
  & > .el-container {
    height: 100%;
    & > .el-aside {
      height: 100%;
      background-color: #545c64;
    }
  }
}
//.r-container {
//  flex-wrap: wrap;
//}

</style>
