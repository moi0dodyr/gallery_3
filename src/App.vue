<script setup>
import HeroSection from './components/HeroSection.vue'
import GalleryGrid from './components/GalleryGrid.vue'
import { imageUrls } from './data/images.js'
import { ref } from 'vue'
import { Analytics } from '@vercel/analytics/vue';
import { SpeedInsights } from "@vercel/speed-insights/next";
import IconInstagram from './components/icons/IconInstagram.vue'
import IconPinterest from './components/icons/IconPinterest.vue'

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
      <p class="logo">new urgency</p>
    </div>

    <div class="header-column">
      <p class="header-txt">{{ imageUrls.length }} items</p>
    </div>

    <div class="header-column social-links">
      <a
        href="https://www.instagram.com/newurgency/"
        target="_blank"
        rel="noopener"
        aria-label="Instagram"
        class="social-link"
      >
        <IconInstagram />
      </a>
      <a
        href="https://pin.it/4PiDWdZWJ"
        target="_blank"
        rel="noopener"
        aria-label="Pinterest"
        class="social-link"
      >
        <IconPinterest />
      </a>
    </div>

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
