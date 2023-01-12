<template>
  <div class="user-header">
    <el-button type="primary" @click="handleAdd">+新增</el-button>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="请输入">
        <el-input v-model="formInline.keyword" placeholder="请输入用户名"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table :data="list" style="width: 100%" height="500px">
      <el-table-column
          v-for="item in tableLabel"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          :width="item.width ? item.width : 125"
      />
      <el-table-column fixed="right" label="操作" min-width="180">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)"
          >编辑
          </el-button
          >
          <el-button type="danger" size="small" @click="handleDelete(scope.row)"
          >删除
          </el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        small
        background
        layout="prev, pager, next"
        :total="config.total"
        @current-change="changePage"
        class="pager mt-4"
    />
  </div>
  <el-dialog
      v-model="dialogVisible"
      :title="action === 'add' ? '新增用户' : '编辑用户'"
      width="35%"
      :before-close="handleClose"
  >
    <el-form :inline="true" :model="formUser" ref="userForm">
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="姓名"
            prop="name"
            :rules="[
              { required: true, message: 'name is required' },
            ]"
          >
            <el-input v-model="formUser.name" placeholder="请输入姓名"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="年龄"
            prop="age"
            :rules="[
              { required: true, message: 'age is required' },
              { type: 'number', message: 'age must be a number' },
            ]"
          >
            <el-input v-model.number="formUser.age" placeholder="请输入年龄"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="性别"
            prop="sex"
            :rules="[
              { required: true, message: 'set is required' },
            ]"
          >
            <el-select v-model="formUser.sex" placeholder="请选择">
              <el-option label="男" value="1"/>
              <el-option label="女" value="0"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="出生日期"
            prop="birth"
            :rules="[
            { required: true, message: 'birth is required' },
          ]"
          >
            <el-date-picker
              v-model="formUser.birth"
              type="date"
              placeholder="请输入"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item
          label="地址"
          prop="addr"
          :rules="[
            { required: true, message: 'name is required' },
          ]"
        >
          <el-input v-model="formUser.addr" placeholder="请输入地址"/>
        </el-form-item>
      </el-row>
      <el-row style="justify-content: flex-end">
        <el-form-item>
          <el-button type="primary" @click="handleClose">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import {defineComponent, getCurrentInstance, onMounted, reactive, ref} from "vue";
import ElMessage, {ElMessageBox} from "element-plus";

export default defineComponent({
  name: "User",
  setup() {
    const {proxy} = getCurrentInstance();
    const list = ref([]);
    const tableLabel = reactive([
      {
        prop: "name",
        label: "姓名"
      },
      {
        prop: "age",
        label: "年龄"
      },
      {
        prop: "sexLabel",
        label: "性别"
      },
      {
        prop: "birth",
        label: "出生日期",
        width: 200
      },
      {
        prop: "addr",
        label: "地址",
        width: 320
      }
    ]);
    const config = reactive({
      total: 0,
      page: 1,
      name: ""
    });
    const getUserData = async (config) => {
      const res = await proxy.$api.getUserData(config);
      config.total = res.count;
      list.value = res.list.map((item) => {
        item.sexLabel = item.sex === 1 ? "男" : "女";
        return item;
      });
    };
    const changePage = (page) => {
      config.page = page;
      getUserData(config);
    };
    onMounted(() => {
      getUserData(config);
      getUserData(config);
    });
    const formInline = reactive({
      keyword: ""
    });
    const handleSearch = () => {
      config.name = formInline.keyword;
      getUserData(config);
    };
    const dialogVisible = ref(false);
    const handleClose = (done) => {
      ElMessageBox.confirm("确定关闭吗？")
          .then(() => {
            proxy.$refs.userForm.resetFields();
            done();
          })
          .catch(() => {
            // catch error
          });
    };
    // 添加用户的form数据
    const formUser = reactive({
      name: "",
      age: "",
      sex: "",
      birth: "",
      addr: ""
    });
    const dateFormat = (oldTime) => {
      let date = new Date(oldTime);
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDay();
      return year + "-" + formatZero(month) + "-" + formatZero(day);
    };
    const formatZero = n => {
      n = n < 10 ? "0" + n : "" + n;
      return n;
    };
    const onSubmit = async () => {
      proxy.$refs.userForm.validate(async (valid) => {
        if (valid) {
          console.log("action.value = ", action.value)
          console.log(formUser)
          let res;
          if (action.value === 'add') {
            formUser.birth = dateFormat(formUser.birth);
            res = await proxy.$api.addUser(formUser);
          } else {
            res = await proxy.$api.editUser(formUser);
          }
          if (res) {
            dialogVisible.value = false;
            proxy.$refs.userForm.resetFields();
            await getUserData(config);
          }
        } else {
          ElMessage({
            showClose: true,
            message: "请输入正确的内容",
            type: "error",
          });
        }
      });
    };
    const action = ref("add");
    const handleEdit = async (row) => {
      row.sex = row.sex === '1' ? '男' : '女';
      await proxy.$nextTick(() => {
        Object.assign(formUser, row);
      });
      action.value = 'edit';
      dialogVisible.value = true;
    };
    const handleAdd = () => {
      action.value = 'add';
      dialogVisible.value = true;
    }
    return {
      list,
      tableLabel,
      config,
      changePage,
      formInline,
      handleSearch,
      dialogVisible,
      handleClose,
      formUser,
      onSubmit,
      action,
      handleEdit,
      handleAdd
    };
  }
});
</script>

<style lang="less" scoped>
.table {
  position: relative;
  height: 520px;

  .pager {
    position: absolute;
    right: 0;
    bottom: -20px;
  }
}

.user-header {
  display: flex;
  justify-content: space-between;
}

</style>
