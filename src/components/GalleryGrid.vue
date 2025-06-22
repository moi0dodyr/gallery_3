<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    default: () => [],
  },
})

let imageList = props.images

const batchSize = 10
const loadedImages = ref([])
let currentIndex = 0
const fullscreenImage = ref(null)

function reset() {
  loadedImages.value = []
  currentIndex = 0
  loadMore()
}

watch(
  () => props.images,
  (val) => {
    imageList = val
    reset()
  }
)

function loadMore() {
  for (let i = 0; i < batchSize && currentIndex < imageList.length; i++, currentIndex++) {
    loadedImages.value.push(imageList[currentIndex])
  }
  nextTick(layoutMasonry)
}

function handleScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement
  if (scrollTop + clientHeight >= scrollHeight - 600) {
    loadMore()
  }
}

function openFullscreen(src) {
  fullscreenImage.value = src
}

function closeFullscreen() {
  fullscreenImage.value = null
}

function layoutMasonry() {
  const grid = document.querySelector('.my-grid')
  if (!grid) return
  const items = Array.from(grid.children)
  const columnCount = 4
  const gap = 20

  const style = window.getComputedStyle(grid)
  const paddingLeft = parseInt(style.paddingLeft, 10)
  const paddingRight = parseInt(style.paddingRight, 10)

  const gridWidth = grid.clientWidth - paddingLeft - paddingRight
  const colWidth = (gridWidth - gap * (columnCount - 1)) / columnCount

  const columnHeights = Array(columnCount).fill(0)

  items.forEach((item) => {
    item.style.width = colWidth + 'px'
    item.style.position = 'absolute'

    const minCol = columnHeights.indexOf(Math.min(...columnHeights))
    const x = paddingLeft + (colWidth + gap) * minCol
    const y = columnHeights[minCol]

    item.style.left = x + 'px'
    item.style.top = y + 'px'

    columnHeights[minCol] += item.offsetHeight + gap
  })

  grid.style.height = Math.max(...columnHeights) + 'px'
}

onMounted(() => {
  loadMore()
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', layoutMasonry)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', layoutMasonry)
})
</script>

<template>
  <div class="my-grid" @click="(e) => e.target.classList.contains('preview-img') && openFullscreen(e.target.src)">
    <div v-for="src in loadedImages" :key="src">
      <img class="preview-img" :src="src" :data-full="src" />
    </div>
  </div>
  <img v-if="fullscreenImage" class="fullscreen-img show" :src="fullscreenImage" @click="closeFullscreen" />
</template>
