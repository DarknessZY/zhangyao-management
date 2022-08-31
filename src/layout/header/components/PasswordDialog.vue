<!-- 修改密码弹框 -->
<template>
    <el-dialog v-model="dialogVisible" title="修改密码" width="25%" :before-close="handleClose" draggable>
        <el-form label-width="100px" :model="formPwd" ref="ruleFormRef">
            <el-form-item label="新密码" prop="pass">
                <el-input v-model="formPwd.pass" type="password" autocomplete="off" show-password/>
            </el-form-item>
            <el-form-item label="确认新密码" prop="checkPass">
                <el-input v-model="formPwd.checkPass" type="password" autocomplete="off" show-password/>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                <el-button type="primary" @click="submitForm(ruleFormRef)">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref,reactive } from 'vue'
import { ElMessageBox } from 'element-plus'
import type { FormInstance } from 'element-plus'
const ruleFormRef = ref<FormInstance>()
const dialogVisible = ref(false)
const formPwd = reactive({
    pass:'',
    checkPass: ''
})
const openDialog = ()=>{
    dialogVisible.value = true
}
//关闭
const handleClose = (done: () => void) => {
  resetForm(ruleFormRef.value)
}
// 修改密码提交
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
      dialogVisible.value = false
    } else {
      console.log('error submit!')
      return false
    }
  })
}
//重置
const resetForm = (formEl: FormInstance | undefined) => {
    console.log(formEl);
  if (!formEl) return
  formEl.resetFields()
  dialogVisible.value = false
}
defineExpose({
	handleClose,
    openDialog
});
</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>