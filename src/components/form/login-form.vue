<!--
 * @Author: Carlos
 * @Date: 2023-01-31 23:53:54
 * @LastEditTime: 2023-02-02 17:46:49
 * @FilePath: /vue3-cms/src/components/form/login-form.vue
 * @Description: null
-->
<template>
  <n-form ref="loginFormRef" :model="model" :show-label="false" :rules="rules">
    <n-form-item label="name" path="name">
      <n-input placeholder="name" v-model:value="model.name">
        <template #prefix>
          <n-icon :component="Person" />
        </template>
      </n-input>
    </n-form-item>
    <n-form-item label="password" path="password">
      <n-input
        type="password"
        show-password-on="mousedown"
        placeholder="password"
        v-model:value="model.password"
        @keydown.enter="signIn"
      >
        <template #prefix>
          <n-icon :component="LockClosed" />
        </template>
      </n-input>
    </n-form-item>
    <div class="flex justify-end">
      <n-space>
        <button
          class="leading-[34px] hover:underline active:text-indigo-500"
          @click="signInAnonymous"
        >
          Anonymous
        </button>
        <n-button type="primary" @click="signIn">Sign in</n-button>
      </n-space>
    </div>
  </n-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { User } from '@/interface/user'
import { injectToken } from '@/utils/request'
import { Person, LockClosed } from '@vicons/ionicons5'
import { useMessage, type FormInst, type FormRules } from 'naive-ui'
import useRequest from '@/hooks/useRequest'
import { userApi } from '@/api/user'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const { setUser } = useUserStore()

const loginFormRef = ref<FormInst | null>(null)
const { run: login } = useRequest(userApi.login, { manual: true })
const message = useMessage()
const model = ref<Partial<User>>({
  name: '',
  password: ''
})

const rules: FormRules = {
  name: [{ required: true }, { min: 6 }],
  password: [{ required: true }, { min: 6 }]
}
const signInAnonymous = () => {
  handleSign({
    name: 'anonymous',
    password: '123456'
  })
}
const handleSign = (submitData: Partial<User>) => {
  login(submitData)
    .then(res => {
      if (res.token) {
        console.log('token', res.token)
        localStorage.setItem('token', res.token)
        setUser(submitData as User)
        injectToken(res.token)
        router.push('/')
      }
    })
    .catch(err => {
      console.log('err', err)
      message.error(err?.message)
    })
}
const signIn = (e: MouseEvent | KeyboardEvent) => {
  e.preventDefault()
  loginFormRef.value?.validate(errors => {
    if (!errors) {
      // message.success('验证成功')
      handleSign({ ...model.value })
    } else {
      console.log(errors)
      // message.error('验证失败')
    }
  })
}
</script>

<style scoped></style>
