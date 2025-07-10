<script setup>
import HeroSection from './components/HeroSection.vue'
import GalleryGrid from './components/GalleryGrid.vue'
import { imageUrls } from './data/images.js'
import { ref } from 'vue'
import { Analytics } from '@vercel/analytics/vue';

const galleryImages = ref([...imageUrls])

function shuffleArray(arr) {
  return arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

function shuffleImages() {
  galleryImages.value = shuffleArray([...galleryImages.value])
}

function sortByDate() {
  galleryImages.value = [...imageUrls]
}
</script>

<template>
<Analytics />
  <header>
    <div class="header-column">
      <p class="logo">му gаlleгу</p>
      <p class="header-txt" style="padding-left: 10px; padding-right: 4px;">( сuгаted bу </p>
      <a class="header-txt" href="https://x.com/stepanchykov"> ме )</a>
    </div>
    <div class="header-column">
      <p class="header-txt">{{ imageUrls.length }} items</p>
    </div>
    <div class="header-column"></div>
    <div class="header-last-column">
      <button @click="shuffleImages">
        гandom
      </button>
      <svg width="1" height="20" viewBox="0 0 1 20">
        <rect width="1" height="20" fill="#000000" />
      </svg>
      <button @click="sortByDate">
        by date
      </button>
    </div>
  </header>
  <HeroSection />
  <GalleryGrid :images="galleryImages" />
</template>

<style scoped>
</style>
