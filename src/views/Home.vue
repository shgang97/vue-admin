<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img src="http://blog-img.shgang.cn/assets/images/avatar.png">
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="role">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2022-7-11</span></p>
          <p>上次登录地点：<span>南京</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" style="margin-top: 20px" height="450px">
        <el-table :data="tableData">
          <el-table-column
              v-for="(val, key) in tableLabel"
              :key="key"
              :prop="key"
              :label="val"
          >

          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 20px">
      <div class="num">
        <el-card
            :body-style="{display: 'flex', padding: 0}"
            v-for="item in countData"
            :key="item.name"
        >
          <component
              class="icons"
              :is="item.icon"
              :style="{background: item.color}"
          ></component>
          <div class="details">
            <p class="num">¥{{item.value}}</p>
            <p class="txt">{{item.name}}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px">
        <div ref="echart" style="height: 280px"></div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import {defineComponent, getCurrentInstance, onMounted, ref} from "vue";
import axios from "axios";

export default defineComponent({
  setup() {
    const {proxy} = getCurrentInstance();
    const tableData = ref([]);
    const countData = ref([]);
    const tableLabel = {
      name: "课程",
      todayBuy: "今日购买",
      monthBuy: "本月购买",
      totalBuy: "总购买"
    };
    const getTableList = async () => {
      // await axios.get("/api/home").then((res) => {
      //   tableData.value = res.data.data.tableData
      // })
      let res = await proxy.$api.getTableData();
      tableData.value = res.tableData;
    };
    const getCountData = async () => {
      let res = await proxy.$api.getCountData();
      console.log("getCountData.res = ", res)
      countData.value = res.countData;
    };
    onMounted(() => {
      getTableList();
      getCountData()
    });
    return {
      tableData,
      tableLabel,
      countData
    };
  }
});
</script>

<style lang="less" scoped>
.home {
  .user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid;
    margin-bottom: 20px;

    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 40px;
    }
  }

  .login-info {
    p {
      line-height: 30px;
      font-size: 14px;
      color: #999;
      span {
        color: #666;
        margin-left: 60px;
      }
    }
  }
  .num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card {
      width: 32%;
      margin-bottom: 20px;
    }
    .icons {
      width: 80px;
      height: 80px;
      font-size: 30px;
      text-align: center;
      line-height: 80px;
      color: #ffffff;
    }
    .details {
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .num {
        font-size: 30px;
        margin-bottom: 10px;
      }
      .txt {
        font-size: 14px;
        text-align: center;
        color: #999;
      }
    }
  }
}
</style>
