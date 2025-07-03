<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import { queryAllApi, addApi, queryByIdApi, deleteByIdApi, updateApi, queryPageApi ,queryAllApi2} from '@/api/clazz'
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

  const masterResult = await queryAllApi2()


  if (masterResult.code) {
    masterList.value = masterResult.data
  }

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

const reset = () => {
  searchClazz.value = {}
  search()
}


const queryById = async () => {
  const result = await queryByIdApi(searchClazz.value.id)
  if (result.code) {
    searchClazz.value = result.data
  }
}

const update = async () => {
  const result = await updateApi(searchClazz.value)
  if (result.code) {
    ElMessage.success('更新成功')
    search()
  }
}

const del = async () => {
  ElMessageBox.confirm('确定删除该班级吗？', '删除班级', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    const result = await deleteByIdApi(searchClazz.value.id)
    if (result.code) {
      ElMessage.success('删除成功')
      search()
    }
  })
}

const dialogVisible = ref(false)
const dialogTitle = ref('添加班级')
const clazzFormRef = ref()

const clazzForm = ref({
  name: '',
  room: '',
  beginDate: '',
  endDate: '',
  masterId: '',
  subject: ''
})
// 修改addClazz方法
const addClazz = async () => {
  dialogVisible.value = true
  dialogTitle.value = '添加班级'
  clazzForm.value = {
    name: '',
    room: '',
    beginDate: '',
    endDate: '',
    masterId: '',
    subject: ''
  }
  if (clazzFormRef.value) {
    clazzFormRef.value.resetFields()
  }
}

const rules = {
  name: [
    { required: true, message: '请输入班级名称', trigger: 'blur' },
    { min: 2, max: 10, message: '班级名称长度为2-10个字符', trigger: 'blur' },
  ],
  room: [
    { required: true, message: '请输入班级教室', trigger: 'blur' },
    { min: 1, max: 10, message: '班级教室长度为1-10个字符', trigger: 'blur' },
  ],
  beginDate: [
    { required: true, message: '请输入开课时间', trigger: 'blur' },
  ],
  endDate: [
    { required: true, message: '请输入结课时间', trigger: 'blur' },
  ],
  masterId: [
    { required: true, message: '请选择班主任', trigger: 'change' },
  ],
}

const masterList = ref([

])

const save = async () => {
  if (!clazzFormRef.value) return
  clazzFormRef.value.validate(async (valid) => {
    if (valid) {
      let result
      if (clazzForm.value.id) {
        result = await updateApi(clazzForm.value)
      } else {
        result = await addApi(clazzForm.value)
      }
      if (result.code) {
        ElMessage.success('保存成功')
        dialogVisible.value = false
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

const edit = async (id) => {
  dialogTitle.value = '编辑班级'
  if (clazzFormRef.value) {
    clazzFormRef.value.resetFields()
  }
  const result = await queryByIdApi(id)
  if (result.code) {
    dialogVisible.value = true
    clazzForm.value = result.data
  }
}

const delById = async (id) => {
  ElMessageBox.confirm('确定删除该班级吗？', '删除班级', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    const result = await deleteByIdApi(id)
    if (result.code) {
      ElMessage.success('删除成功')
      search()
    }else {
      ElMessage.error(result.msg)
    }
  })

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
        <el-button type="primary" @click="queryById">查询</el-button>
        <el-button type="default" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="container">
      <el-button type="success" @click="addClazz"> + 新增班级 </el-button>
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

  <!-- 分页条 -->
  <div class="container">
    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
      :page-sizes="[5, 10, 20, 30, 50, 75, 100]" :background="background"
      layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </div>

  <!-- 新增班级 对话框 -->
  <el-dialog v-model="dialogVisible" :title="dialogTitle" width="600">
    <el-form :model="clazzForm" :rules="rules" ref="clazzFormRef" label-width="80px">
      <!-- 基本信息 -->
      <el-row :gutter="20">
        <el-col :span="24"> <!-- 添加列容器占满整行 -->
          <el-form-item label="班级名称" prop="name">
            <el-input v-model="clazzForm.name" placeholder="请输入班级名称" style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="班级教室" prop="room">
            <el-input v-model="clazzForm.room" placeholder="请输入班级教室" style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="开课时间" prop="beginDate">
            <el-date-picker v-model="clazzForm.beginDate" type="date" placeholder="请选择开课时间" format="YYYY-MM-DD"
              value-format="YYYY-MM-DD" style="width: 100%"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="结课时间" prop="endDate">
            <el-date-picker v-model="clazzForm.endDate" type="date" placeholder="请选择结课时间" format="YYYY-MM-DD"
              value-format="YYYY-MM-DD" style="width: 100%"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="班主任" prop="masterId">
            <el-select v-model="clazzForm.masterId" placeholder="请选择班主任" style="width: 100%">
              <el-option v-for="m in masterList" :key="m.id" :label="m.name" :value="m.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="学科" prop="subject">
            <el-select v-model="clazzForm.subject" placeholder="请选择学科" style="width: 100%">
              <el-option label="计算机" value="1"></el-option>
              <el-option label="会计" value="2"></el-option>
              <el-option label="医学" value="3"></el-option>
              <el-option label="瓦罗兰特特特" value="4"></el-option>
              <el-option label="Cs gogogo" value="5"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div style="text-align: right; margin-top: 20px;">
      <!-- 按钮区域样式调整 -->
      <el-button type="primary" @click="save">提交</el-button>
      <el-button type="default" @click="dialogVisible = false">取消</el-button>
    </div>
  </el-dialog>
</template>

<style scoped>
.container {
  margin: 10px 0px;
}
</style>