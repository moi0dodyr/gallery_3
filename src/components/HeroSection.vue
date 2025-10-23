<script setup>
import { imageUrls } from '../data/images.js'

const heroImage = imageUrls[4] || imageUrls[0]
</script>

<template>
  <div class="hero">
    <div class="image-hero">
      <img class="hero-img" :src="heroImage" alt="Hero Image" />
      <p class="hero-text">picture of the day</p>
    </div>
  </div>
</template>
