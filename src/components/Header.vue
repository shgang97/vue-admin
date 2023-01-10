<template>
  <el-header>
    <div class="l-content">
      <el-button size="small" @click="shiftCollapse">
        <el-icon :size="20">
          <Menu/>
        </el-icon>
      </el-button>
      <el-breadcrumb separator="/" class="bread">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">{{current.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="user" :src="getImgSrc()">
          <el-icon class="el-icon--right">
            <arrow-down/>
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>

</template>

<script>
import {computed, defineComponent} from "vue";
import {useStore} from "vuex";

export default defineComponent({
  name: "Header",
  setup() {
    let store = useStore();
    const getImgSrc = () => {
      return "http://blog-img.shgang.cn/assets/images/avatar.png";
    };
    let shiftCollapse = () => {
      store.commit("UPDATE_ISCOLLAPSE");
    };
    // 计算属性
    const current = computed(() => {
      return store.state.currentMenu;
    });
    return {
      getImgSrc,
      shiftCollapse,
      current,
    };
  }
});
</script>

<style lang="less" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: #333;
}
.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
.l-content {
  display: flex;
  align-items: center;
  button {
    margin-right: 20px;
  }
  h3 {
    color: #fff;
  }
}
.bread /deep/ span {
  color: #ffffff !important;
  cursor: pointer !important;
}
</style>
