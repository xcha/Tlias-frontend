<script setup>
import { ref, onMounted } from 'vue';
import { queryAllApi, addApi, queryByIdApi, updateApi, deleteByIdApi } from '@/api/dept'
import { ElMessage, ElMessageBox } from 'element-plus'

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
const formTitle = ref('')

const addDept = () => {
  formTitle.value = '新增部门'
  dialogFormVisible.value = true
  dept.value = {}
  if (deptFormRef.value) {
    deptFormRef.value.resetFields()
  }
}
const save = async () => {
  if (!deptFormRef.value) return
  deptFormRef.value.validate(async (valid) => {
    if (valid) {
      let result
      if (dept.value.id) {
        result = await updateApi(dept.value)
      } else {
        result = await addApi(dept.value)
      }
      if (result.code) {
        ElMessage.success('保存成功')
        dialogFormVisible.value = false
        search()
      } else {
        ElMessage.error(result.msg)
      }
    }
    else {
      ElMessage.error('请填写正确的信息')
    }
  })
}

// 表单校验
const rules = ref({
  name: [
    { required: true, message: '请输入部门名称', trigger: 'blur' },
    { min: 2, max: 10, message: '部门名称长度为2-10个字符', trigger: 'blur' },
  ]
})

const deptFormRef = ref()

// 编辑
const edit = async (id) => {
  formTitle.value = '编辑部门'
  if (deptFormRef.value) {
    deptFormRef.value.resetFields()
  }
  const result = await queryByIdApi(id)
  if (result.code) {
    dialogFormVisible.value = true
    dept.value = result.data
  }
}
// 删除
const delById = async (id) => {
  ElMessageBox.confirm('是否删除该部门？', '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      const result = await deleteByIdApi(id)
      console.log(id)
      console.log(result)

      if (result.code) {
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
        search()
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}


</script>


<template>
  <h1>部门管理</h1>
  <div class="container">
    <el-button type="primary" @click="addDept"> + 新增部门</el-button>
  </div>

  <!-- 表格 -->
  <div class="container">
    <el-table :data="deptList" border style="width: 100%">
      <el-table-column type="index" width="100" align="center" />
      <el-table-column prop="name" label="部门名称" width="260" align="center" />
      <el-table-column prop="updateTime" label="最后操作时间" width="300" align="center" />
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
    </template>
  </el-dialog>
</template>


<style scoped>
.container {
  margin: 10px 0px;
}
</style>