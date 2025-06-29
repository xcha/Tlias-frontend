<script setup>
import { Search } from '@element-plus/icons-vue';
import { ref, onMounted, watch } from 'vue'

const searchEmp = ref({
  name: '',
  gender: '',
  date: [],
  begin: '',
  end: ''
})

watch(() => searchEmp.value.date, (newVal, oldVal) => {
  if (newVal.length == 2) {
    searchEmp.value.begin = newVal[0]
    searchEmp.value.end = newVal[1]
  } else {
    searchEmp.value.begin = ''
    searchEmp.value.end = ''
  }
})

const search = () => {
  console.log(searchEmp.value)
}

const clear = () => {
  searchEmp.value = {}
  search()
}

const empList = ref([
  {
    "id": 0,
    "username": "string",
    "password": "string",
    "name": "string",
    "gender": 1,
    "job": 1,
    "salary": 1,
    "image": "string",
    "entryDate": "2019-08-24",
    "deptId": 1,
    "deptName": "string",
    "createTime": "2019-08-24T14:15:22.123Z",
    "updateTime": "2019-08-24T14:15:22.123Z"
  }
])

</script>

<template>
  <h1>员工管理</h1>
  <!-- 搜索栏 -->
  <div class="container">
    <el-form :inline="true" :model="searchEmp" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="searchEmp.name" placeholder="请输入员工姓名" clearable />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="searchEmp.gender" placeholder="请选择性别" clearable>
          <el-option label="男" value="1" />
          <el-option label="女" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="入职时间">
        <el-date-picker v-model="searchEmp.date" type="daterange" range-separator="至" start-placeholder="开始日期"
          end-placeholder="结束日期" :size="size" value-format="YYYY-MM-DD" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="default" @click="clear">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
  <!-- 功能按钮 -->
  <div class="container">
    <el-button type="primary" @click=""> + 新增员工 </el-button>
    <el-button type="danger" @click=""> - 批量删除 </el-button>
  </div>

  <div class="container">
    <el-table :data="empList" border style="width: 100%">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column prop="name" label="姓名" width="120" align="center" />
      <el-table-column prop="gender" label="性别" width="120" align="center">
        <template #default="scope">
          {{ scope.row.gender == 1 ? '男' : '女' }}
        </template>
      </el-table-column>
      <el-table-column label="头像" width="120" align="center">
        <template #default="scope">
          <img :src="scope.row.image" alt="" height="50" width="40px">
        </template>
      </el-table-column>
      <el-table-column prop="deptName" label="所属部门" width="120" align="center" />
      <el-table-column prop="job" label="岗位" width="120" align="center">
        <template #default="scope">
          <span v-if="scope.row.job == 1">班主任</span>
          <span v-else-if="scope.row.job == 2">讲师</span>
          <span v-else-if="scope.row.job == 3">学工主管</span>
          <span v-else-if="scope.row.job == 4">教研主管</span>
          <span v-else-if="scope.row.job == 5">咨询师</span>
          <span v-else>其他</span>
        </template>
      </el-table-column>
      <el-table-column prop="entryDate" label="入职时间" width="180" align="center" />
      <el-table-column prop="updateTime" label="最后操作时间" width="200" align="center" />
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button type="primary" size="small" @click=""> <el-icon>
              <Edit />
            </el-icon>编辑</el-button>
          <el-button type="danger" size="small" @click=""> <el-icon>
              <Delete />
            </el-icon>删除</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<style scoped>
.container {
  margin: 10px 0;
}
</style>