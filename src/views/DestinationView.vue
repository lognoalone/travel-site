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

    <template v-if="destination">
      <!-- Hero Section -->
      <div class="relative h-[500px]">
        <div class="absolute inset-0 bg-cover bg-center" :style="{ backgroundImage: `url(${destination.image})` }">
          <div class="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        <div class="relative container mx-auto h-full flex items-end pb-12">
          <div class="text-white">
            <h1 class="text-5xl font-bold mb-4">{{ destination.name }}</h1>
            <p class="text-xl mb-6">{{ destination.shortDescription }}</p>
            <div class="flex items-center space-x-4">
              <span class="text-2xl font-bold">¥{{ destination.price }}起</span>
              <router-link :to="{ name: 'booking', query: { destination: destination.id }}"
                        class="btn-primary">
                立即预订
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Section -->
      <div class="container mx-auto py-12">
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="md:col-span-2 space-y-8">
            <section>
              <h2 class="text-2xl font-bold mb-4">目的地介绍</h2>
              <p class="text-gray-600 leading-relaxed">{{ destination.description }}</p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">行程亮点</h2>
              <div class="grid md:grid-cols-2 gap-4">
                <div v-for="(highlight, index) in destination.highlights"
                     :key="index"
                     class="bg-white p-4 rounded-lg shadow-sm">
                  <h3 class="font-semibold text-lg mb-2">{{ highlight.title }}</h3>
                  <p class="text-gray-600">{{ highlight.description }}</p>
                </div>
              </div>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4">图片展示</h2>
              <div class="grid grid-cols-2 gap-4">
                <img v-for="(image, index) in destination.gallery"
                     :key="index"
                     :src="image"
                     :alt="'${destination.name} 图片 ' + (index + 1)"
                     class="rounded-lg w-full h-48 object-cover" />
              </div>
            </section>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Quick Info -->
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-xl font-bold mb-4">基本信息</h3>
              <ul class="space-y-3">
                <li v-for="(info, index) in destination.quickInfo"
                    :key="index"
                    class="flex items-start">
                  <span class="text-primary-blue mr-2">•</span>
                  <span>{{ info }}</span>
                </li>
              </ul>
            </div>

            <!-- Weather -->
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-xl font-bold mb-4">天气信息</h3>
              <div class="space-y-2">
                <p><span class="font-medium">最佳旅游季节：</span>{{ destination.weather.bestSeason }}</p>
                <p><span class="font-medium">平均温度：</span>{{ destination.weather.temperature }}</p>
                <p class="text-sm text-gray-600">{{ destination.weather.description }}</p>
              </div>
            </div>

            <!-- Transportation -->
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-xl font-bold mb-4">交通信息</h3>
              <div class="space-y-2">
                <p v-for="(transport, index) in destination.transportation"
                   :key="index"
                   class="flex items-start">
                  <span class="text-primary-blue mr-2">•</span>
                  <span>{{ transport }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

interface Destination {
  id: number
  name: string
  price: number
  shortDescription: string
  description: string
  image: string
  gallery: string[]
  highlights: Array<{
    title: string
    description: string
  }>
  quickInfo: string[]
  weather: {
    bestSeason: string
    temperature: string
    description: string
  }
  transportation: string[]
}

const route = useRoute()
const destination = ref<Destination>({
  id: 1,
  name: '巴厘岛',
  price: 4999,
  shortDescription: '探索印尼最美丽的海岛，体验独特的文化与自然风光',
  description: '巴厘岛是印度尼西亚最受欢迎的旅游目的地之一，以其迷人的海滩、壮观的火山、梯田和丰富的文化遗产而闻名。这里的寺庙、传统舞蹈和手工艺品展现了独特的巴厘文化，而现代化的度假村、水疗中心和美食则为游客提供了奢华的享受。',
  image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2000',
  gallery: [
    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800',
    'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800',
    'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=800',
    'https://images.unsplash.com/photo-1542897644-e04428948020?auto=format&fit=crop&w=800',
  ],
  highlights: [
    {
      title: '乌布文化之旅',
      description: '探访著名的乌布皇宫、传统市场和艺术画廊，感受巴厘岛的文化中心。'
    },
    {
      title: '海滩休闲时光',
      description: '在库塔海滩或努沙杜瓦享受阳光、冲浪和精彩的夕阳。'
    },
    {
      title: '特格拉朗梯田',
      description: '欣赏世界文化遗产，体验传统的稻作文化。'
    },
    {
      title: '神庙巡礼',
      description: '参观海神庙和圣泉寺等标志性建筑，领略巴厘岛的宗教文化。'
    }
  ],
  quickInfo: [
    '时差：与北京时间相差0小时',
    '货币：印尼盾',
    '语言：印尼语、英语',
    '签证：落地签证',
    '建议游玩天数：5-7天'
  ],
  weather: {
    bestSeason: '4月至10月（旱季）',
    temperature: '全年25-32℃',
    description: '巴厘岛属于热带气候，分为旱季和雨季。旱季（4月至10月）是最佳旅游季节，天气晴朗，适合各种户外活动。'
  },
  transportation: [
    '可从中国多个城市直飞登巴萨机场',
    '岛内交通可选择包车、出租车或租摩托车',
    '建议提前预订接送机服务',
    '主要景点间可通过旅行社预订一日游行程'
  ]
})

onMounted(() => {
  // 这里可以根据路由参数加载不同的目的地数据
  console.log('Destination ID:', route.params.id)
})
</script>
