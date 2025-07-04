<script setup>
import { ref, onMounted, reactive } from 'vue'
import { ElMessage, ElMessageBox, ElForm, ElFormItem, ElInput, ElDialog } from 'element-plus'
import { useRouter } from 'vue-router'
// 导入图标
import { EditPen, SwitchButton, Promotion, Menu, HomeFilled, UserFilled, Tools, HelpFilled, Avatar, Histogram, InfoFilled, Share, Document } from '@element-plus/icons-vue'

const loginName = ref('')
const router = useRouter()

// 添加修改密码相关变量
const showPasswordDialog = ref(false)
const passwordFormRef = ref(null)
const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 密码验证规则
const passwordRules = {
  oldPassword: [
    { required: true, message: '请输入旧密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== passwordForm.newPassword) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

onMounted(() => {
  const loginUser = JSON.parse(localStorage.getItem('loginUser'))
  if (loginUser) {
    loginName.value = loginUser.name
  }
})

// 打开修改密码对话框
const openPasswordDialog = () => {
  showPasswordDialog.value = true
  // 重置表单
  if (passwordFormRef.value) {
    passwordFormRef.value.resetFields()
  }
}

// 提交密码修改
const submitPasswordChange = async () => {
  if (!passwordFormRef.value) return
  try {
    await passwordFormRef.value.validate()
    const result = await updatePasswordApi({
      // 获取表单数据 新的密码的值
      id: loginUser.id,
      password: passwordForm.value.password
    })
    if (result.code) {
      ElMessage.error(result.msg)
      return
    }

    // 模拟API请求
    console.log('修改密码参数:', {
      userId: loginUser.id,
      oldPassword: passwordForm.oldPassword,
      newPassword: passwordForm.newPassword
    })

    // 假设API调用成功
    ElMessage.success('密码修改成功，请重新登录')
    showPasswordDialog.value = false
    // 密码修改成功后退出登录
    router.push('/login')
  } catch (error) {
    ElMessage.error('表单验证失败，请检查输入')
  }
}
const logout = () => {
  ElMessageBox.confirm('是否退出登录？', '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      ElMessage({
        type: 'success',
        message: '退出登录成功',
      })
      router.push('/login')
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消退出登录',
      })
    })
}



</script>

<template>
  <div class="common-layout">
    <el-container>
      <!-- Header 区域 -->
      <el-header class="header">
        <span class="title">Tlias智能学习辅助系统</span>
        <span class="right_tool">
          <a href="javascript:void(0)" @click="openPasswordDialog">
            <el-icon>
              <EditPen />
            </el-icon> 修改密码 &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
          </a>
          <a href="javascript:void(0)" @click="logout">
            <el-icon>
              <SwitchButton />
            </el-icon> 退出登录 【{{ loginName }}】
          </a>
        </span>
      </el-header>

      <el-container>
        <!-- 左侧菜单 -->
        <el-aside width="200px" class="aside">
          <!-- 左侧菜单栏 -->
          <el-menu router>
            <!-- 首页菜单 -->
            <el-menu-item index="/index">
              <el-icon>
                <Promotion />
              </el-icon> 首页
            </el-menu-item>
            <!-- 班级管理菜单 -->
            <el-sub-menu index="/manage">
              <template #title>
                <el-icon>
                  <Menu />
                </el-icon> 班级学员管理
              </template>
              <el-menu-item index="/clazz">
                <el-icon>
                  <HomeFilled />
                </el-icon>班级管理
              </el-menu-item>
              <el-menu-item index="/stu">
                <el-icon>
                  <UserFilled />
                </el-icon>学员管理
              </el-menu-item>
            </el-sub-menu>

            <!-- 系统信息管理 -->
            <el-sub-menu index="/system">
              <template #title>
                <el-icon>
                  <Tools />
                </el-icon>系统信息管理
              </template>
              <el-menu-item index="/dept">
                <el-icon>
                  <HelpFilled />
                </el-icon>部门管理
              </el-menu-item>
              <el-menu-item index="/emp">
                <el-icon>
                  <Avatar />
                </el-icon>员工管理
              </el-menu-item>
            </el-sub-menu>

            <!-- 数据统计管理 -->
            <el-sub-menu index="/report">
              <template #title>
                <el-icon>
                  <Histogram />
                </el-icon>数据统计管理
              </template>
              <el-menu-item index="/empReport">
                <el-icon>
                  <InfoFilled />
                </el-icon>员工信息统计
              </el-menu-item>
              <el-menu-item index="/stuReport">
                <el-icon>
                  <Share />
                </el-icon>学员信息统计
              </el-menu-item>
              <el-menu-item index="/log">
                <el-icon>
                  <Document />
                </el-icon>日志信息统计
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>




        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>


    </el-container>


  </div>

  <el-dialog v-model="showPasswordDialog" title="修改密码" width="30%">
    <h2 style="color: red;">"修改密码功能维护中...暂时不可用!"</h2>
    <el-form :model="passwordForm" :rules="passwordRules" ref="passwordFormRef" label-width="100px">
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input v-model="passwordForm.oldPassword" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="passwordForm.newPassword" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input v-model="passwordForm.confirmPassword" type="password" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showPasswordDialog = false">取消</el-button>
        <el-button type="primary" @click="submitPasswordChange">确认</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<style scoped>
.header {
  background-image: linear-gradient(to right, #00547d, #007fa4, #00aaa0, #00d072, #a8eb12);
}

.title {
  color: white;
  font-size: 40px;
  font-family: 楷体;
  line-height: 60px;
  font-weight: bolder;
}

.right_tool {
  float: right;
  line-height: 60px;
}

a {
  color: white;
  text-decoration: none;
}

.aside {
  width: 220px;
  border-right: 1px solid #ccc;
  height: 730px;
}
</style>
