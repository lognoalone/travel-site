<template>
  <div class="min-h-screen">
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

    <!-- Hero Section -->
    <div class="relative h-[600px] bg-gray-900">
      <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1682686581556-a3f0ee0ed556?auto=format&fit=crop&w=2000');">
        <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      <div class="relative container mx-auto h-full flex items-center">
        <div class="text-white max-w-2xl">
          <h1 class="text-5xl font-bold mb-4">探索世界的美好</h1>
          <p class="text-xl mb-8">发现令人惊叹的目的地，创造永恒的回忆</p>
          <router-link to="/booking" class="btn-primary text-lg">立即预订</router-link>
        </div>
      </div>
    </div>

    <!-- Destinations Section -->
    <section class="py-16">
      <div class="container mx-auto">
        <h2 class="text-3xl font-bold text-center mb-12">热门目的地</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Destination Card 1 -->
          <div class="card group">
            <div class="relative h-64 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1548013146-72479768bada" alt="巴厘岛" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2">巴厘岛</h3>
              <p class="text-gray-600 mb-4">探索印尼最美丽的海岛，体验独特的文化与自然风光</p>
              <div class="flex justify-between items-center">
                <span class="text-primary-blue font-semibold">起价 ¥4,999</span>
                <router-link :to="{ name: 'destination', params: { id: 1 }}" class="btn-secondary">了解更多</router-link>
              </div>
            </div>
          </div>

          <!-- Destination Card 2 -->
          <div class="card group">
            <div class="relative h-64 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e" alt="日本京都" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2">日本京都</h3>
              <p class="text-gray-600 mb-4">感受日本传统文化的魅力，游览古老的寺庙与花园</p>
              <div class="flex justify-between items-center">
                <span class="text-primary-blue font-semibold">起价 ¥5,999</span>
                <router-link :to="{ name: 'destination', params: { id: 2 }}" class="btn-secondary">了解更多</router-link>
              </div>
            </div>
          </div>

          <!-- Destination Card 3 -->
          <div class="card group">
            <div class="relative h-64 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34" alt="巴黎" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2">巴黎</h3>
              <p class="text-gray-600 mb-4">在浪漫之都感受艺术与美食的完美融合</p>
              <div class="flex justify-between items-center">
                <span class="text-primary-blue font-semibold">起价 ¥7,999</span>
                <router-link :to="{ name: 'destination', params: { id: 3 }}" class="btn-secondary">了解更多</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <NewsletterSection />
  </div>
</template>

<script setup lang="ts">
import NewsletterSection from '../components/NewsletterSection.vue'
</script>
