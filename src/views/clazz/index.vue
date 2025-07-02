<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import { queryAllApi, addApi, queryByIdApi, deleteByIdApi, updateApi, queryPageApi } from '@/api/clazz'
onMounted(() => {
  search()
})

const search = async () => {
  const result = await queryPageApi(searchClazz.value.name,
    searchClazz.value.begin,
    searchClazz.value.end,
    currentPage.value,
    pageSize.value
  )
  if (result.code) {
    clazzList.value = result.data.rows
    total.value = result.data.total
  }
}

const searchClazz = ref({
  name: '',
  begin: '',
  end: ''
})

const clazzList = ref([
  {
    "id": 11,
    "name": "瓦学弟养成1期",
    "room": "1",
    "beginDate": "2025-06-01",
    "endDate": "2025-06-30",
    "masterId": 52,
    "subject": 1,
    "createTime": "2025-06-03",
    "updateTime": "2025-06-03",
    "masterName": null,
    "status": null
  }
])

const currentPage = ref(1)
const pageSize = ref(10)
const background = ref(true)
const total = ref(0)
const handleSizeChange = (val) => {
  search()
  pageSize.value = val
}
const handleCurrentChange = (val) => {
  search()
  currentPage.value = val
}


</script>

<template>
  <h1>班级管理</h1>
  <div class="container">
    <el-form :inline="true" :model="searchClazz" class="demo-form-inline">
      <el-form-item label="班级名称">
        <el-input v-model="searchClazz.name" placeholder="请输入班级名称" clearable />
      </el-form-item>
      <el-form-item label="结课时间">
        <el-date-picker v-model="searchClazz.date" type="daterange" range-separator="至" start-placeholder="开课日期"
          end-placeholder="结课日期" :size="size" value-format="YYYY-MM-DD" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="default" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="container">
      <el-button type="success" @click="addEmp"> + 新增班级 </el-button>
    </div>
  </div>

  <!-- 表格 -->
  <div class="container">
    <el-table :data="clazzList" border style="width: 100%">
      <el-table-column type="index" label="序号" width="100" align="center" />
      <el-table-column prop="name" label="班级名称" width="180" align="center" />
      <el-table-column prop="room" label="班级教室" width="120" align="center" />
      <el-table-column prop="masterName" label="班主任" width="120" align="center" />
      <el-table-column prop="beginDate" label="开课时间" width="150" align="center" />
      <el-table-column prop="endDate" label="结课时间" width="150" align="center" />
      <el-table-column prop="status" label="状态" width="150" align="center" />
      <el-table-column prop="updateTime" label="最后操作时间" width="180" align="center" />
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button type="primary" size="small" @click="edit(scope.row.id)"> <el-icon>
              <Edit />
            </el-icon>编辑</el-button>
          <el-button type="danger" size="small" @click="delById(scope.row.id)"> <el-icon>
              <Delete />
            </el-icon>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!-- 对话框组件 -->
  <el-dialog v-model="dialogFormVisible" :title="formTitle" width="500">
    <el-form :model="dept" :rules="rules" ref="deptFormRef">
      <el-form-item label="部门名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="dept.name" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </div>

      <!-- 分页条 -->
      <div class="container">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
          :page-sizes="[5, 10, 20, 30, 50, 75, 100]" :background="background"
          layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </div>
    </template>
  </el-dialog>






</template>

<style scoped>
.container {
  margin: 10px 0px;
}
</style>