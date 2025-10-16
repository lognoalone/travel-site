<template>
  <section class="bg-primary-blue text-white py-16">
    <div class="container mx-auto text-center">
      <h2 class="text-3xl font-bold mb-4">订阅我们的旅行资讯</h2>
      <p class="mb-8">获取最新的旅行优惠和目的地推荐</p>
      <form @submit.prevent="handleSubmit" class="max-w-md mx-auto">
        <div class="flex gap-4">
          <input
            type="email"
            v-model="email"
            :class="{ 'border-red-500': error }"
            placeholder="输入您的邮箱"
            class="input flex-1 text-gray-800"
            required
          />
          <button
            type="submit"
            class="btn-secondary whitespace-nowrap"
            :disabled="isSubscribing"
          >
            {{ isSubscribing ? '订阅中...' : '立即订阅' }}
          </button>
        </div>
        <p v-if="error" class="text-red-300 text-sm mt-2 text-left">{{ error }}</p>
        <p v-if="success" class="text-green-300 text-sm mt-2 text-left">{{ success }}</p>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const error = ref('')
const success = ref('')
const isSubscribing = ref(false)

const handleSubmit = async () => {
  error.value = ''
  success.value = ''
  isSubscribing.value = true

  try {
    // 这里模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (!email.value.includes('@')) {
      throw new Error('请输入有效的邮箱地址')
    }

    success.value = '订阅成功！感谢您的关注'
    email.value = ''
  } catch (e: any) {
    error.value = e.message
  } finally {
    isSubscribing.value = false
  }
}
</script>
