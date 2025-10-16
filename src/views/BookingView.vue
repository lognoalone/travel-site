<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Navigation -->
    <nav class="bg-primary-blue text-white shadow-lg">
      <div class="container mx-auto py-4">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold">Travel Site</h1>
          <div class="space-x-6">
            <router-link to="/" class="hover:text-secondary-blue transition-colors">首页</router-link>
            <router-link to="/booking" class="hover:text-secondary-blue transition-colors">预订</router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Booking Section -->
    <div class="container mx-auto py-12">
      <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-bold mb-6">预订您的旅程</h2>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Destination Selection -->
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">目的地</label>
                <select v-model="formData.destination" class="input">
                  <option value="">请选择目的地</option>
                  <option v-for="dest in destinations" :key="dest.id" :value="dest.id">
                    {{ dest.name }} - ¥{{ dest.price }}起
                  </option>
                </select>
              </div>

              <!-- Number of Travelers -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">出行人数</label>
                <input type="number" v-model="formData.travelers" min="1" class="input" placeholder="请输入出行人数" />
              </div>
            </div>

            <!-- Date Selection -->
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">出发日期</label>
                <input type="date" v-model="formData.startDate" class="input" :min="minDate" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">返回日期</label>
                <input type="date" v-model="formData.endDate" class="input" :min="formData.startDate" />
              </div>
            </div>

            <!-- Room Type -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">房间类型</label>
              <div class="grid md:grid-cols-3 gap-4">
                <div v-for="room in roomTypes" :key="room.id"
                     class="border rounded-lg p-4 cursor-pointer"
                     :class="{'border-primary-blue bg-blue-50': formData.roomType === room.id}"
                     @click="formData.roomType = room.id">
                  <h4 class="font-semibold">{{ room.name }}</h4>
                  <p class="text-sm text-gray-600">{{ room.description }}</p>
                  <p class="text-primary-blue font-semibold mt-2">¥{{ room.price }}/晚</p>
                </div>
              </div>
            </div>

            <!-- Additional Services -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">附加服务</label>
              <div class="space-y-2">
                <label v-for="service in additionalServices" :key="service.id" class="flex items-center">
                  <input type="checkbox"
                         v-model="formData.services"
                         :value="service.id"
                         class="rounded text-primary-blue focus:ring-primary-blue" />
                  <span class="ml-2">{{ service.name }} (¥{{ service.price }})</span>
                </label>
              </div>
            </div>

            <!-- Contact Information -->
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">联系人姓名</label>
                <input type="text" v-model="formData.name" class="input" placeholder="请输入联系人姓名" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">联系电话</label>
                <input type="tel" v-model="formData.phone" class="input" placeholder="请输入联系电话" />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">电子邮箱</label>
                <input type="email" v-model="formData.email" class="input" placeholder="请输入电子邮箱" />
              </div>
            </div>

            <!-- Price Summary -->
            <div class="bg-gray-50 p-6 rounded-lg">
              <h3 class="text-lg font-semibold mb-4">价格明细</h3>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span>基础价格</span>
                  <span>¥{{ basePrice }}</span>
                </div>
                <div class="flex justify-between" v-if="roomPrice">
                  <span>房间费用</span>
                  <span>¥{{ roomPrice }}</span>
                </div>
                <div class="flex justify-between" v-if="servicesPrice">
                  <span>附加服务</span>
                  <span>¥{{ servicesPrice }}</span>
                </div>
                <div class="border-t pt-2 mt-2 font-semibold">
                  <div class="flex justify-between">
                    <span>总价</span>
                    <span class="text-primary-blue text-xl">¥{{ totalPrice }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="flex justify-end">
              <button type="submit" class="btn-primary text-lg px-8">确认预订</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { format, addDays } from 'date-fns'

interface Destination {
  id: number
  name: string
  price: number
}

interface RoomType {
  id: number
  name: string
  description: string
  price: number
}

interface AdditionalService {
  id: number
  name: string
  price: number
}

// 模拟数据
const destinations = [
  { id: 1, name: '巴厘岛', price: 4999 },
  { id: 2, name: '日本京都', price: 5999 },
  { id: 3, name: '巴黎', price: 7999 },
]

const roomTypes = [
  { id: 1, name: '标准房', description: '舒适双人间，含早餐', price: 688 },
  { id: 2, name: '豪华房', description: '宽敞双人间，含早餐和晚餐', price: 1088 },
  { id: 3, name: '套房', description: '豪华套房，含三餐和SPA', price: 1888 },
]

const additionalServices = [
  { id: 1, name: '接送机服务', price: 300 },
  { id: 2, name: '旅游保险', price: 200 },
  { id: 3, name: '当地导游', price: 500 },
]

// 表单数据
const formData = ref({
  destination: '',
  travelers: 1,
  startDate: '',
  endDate: '',
  roomType: 1,
  services: [] as number[],
  name: '',
  phone: '',
  email: '',
})

// 计算最小日期（明天）
const minDate = computed(() => {
  return format(addDays(new Date(), 1), 'yyyy-MM-dd')
})

// 计算价格
const basePrice = computed(() => {
  const dest = destinations.find(d => d.id === Number(formData.value.destination))
  return (dest?.price || 0) * formData.value.travelers
})

const roomPrice = computed(() => {
  const room = roomTypes.find(r => r.id === formData.value.roomType)
  if (!room || !formData.value.startDate || !formData.value.endDate) return 0
  const days = Math.max(1, Math.ceil(
    (new Date(formData.value.endDate).getTime() - new Date(formData.value.startDate).getTime())
    / (1000 * 60 * 60 * 24)
  ))
  return room.price * days
})

const servicesPrice = computed(() => {
  return formData.value.services.reduce((total, serviceId) => {
    const service = additionalServices.find(s => s.id === serviceId)
    return total + (service?.price || 0)
  }, 0)
})

const totalPrice = computed(() => {
  return basePrice.value + roomPrice.value + servicesPrice.value
})

// 提交表单
const handleSubmit = () => {
  // 这里添加表单验证和提交逻辑
  console.log('提交预订信息：', formData.value)
  alert('预订成功！我们将尽快与您联系确认详情。')
}
</script>
