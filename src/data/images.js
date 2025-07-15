export const imageUrls = Object.entries(
  import.meta.glob('../../images/*.jpg', { eager: true, as: 'url' })
)
  .sort(([a], [b]) => b.localeCompare(a))
  .map((pair) => pair[1])
