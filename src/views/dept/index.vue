<script setup>
import { ref, onMounted } from 'vue';
import { queryAllApi } from '@/api/dept'

onMounted(() => {
  search()
})
const search = async () => {
  // const result = await axios.get('https://m1.apifoxmock.com/m1/6430447-6127879-default/detps')
  // if (result.data.code) {
  //   deptList.value = result.data.data
  // }

  const result = await queryAllApi()
  if (result.code) {
    deptList.value = result.data
  }

}


const deptList = ref([])

// dialog对话框
const dialogFormVisible = ref(false)
const dept = ref({
  name: ''
}) 
const save = () => {
  dialogFormVisible.value = false
}


</script>


<template>

  <!-- 表格 -->
  <div class="container">
    <el-button type="primary"> + 新增部门</el-button>
  </div>
  <div>
    <el-table :data="deptList" border style="width: 100%">
      <el-table-column type="index" width="100" align="center" />
      <el-table-column prop="name" label="部门名称" width="260" align="center" />
      <el-table-column prop="updateTime" label="最后操作时间" width="300" align="center" />
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button type="primary" size="small"> <el-icon>
              <Edit />
            </el-icon>编辑</el-button>
          <el-button type="danger" size="small"> <el-icon>
              <Delete />
            </el-icon>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!-- 对话框组件 -->
  <el-dialog v-model="dialogFormVisible" title="新增部门" width="500">
    <el-form :model="dept">
      <el-form-item label="部门名称 name" :label-width="formLabelWidth">
        <el-input v-model="dept.name" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>


<style scoped>
.container {
  margin: 10px 0px;
}
</style>