export const imageUrls = Object.entries(
  import.meta.glob('../../images/*.jpg', { eager: true, as: 'url' })
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map((pair) => pair[1])
