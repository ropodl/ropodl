<script setup lang="ts">
interface GalleryImage { src: string, alt: string, caption?: string }

const props = withDefaults(defineProps<{ images: GalleryImage[], label?: string, priority?: boolean }>(), { priority: false })
const dialog = ref<HTMLDialogElement>()
const closeButton = ref<HTMLButtonElement>()
const activeIndex = ref<number | null>(null)
const zoom = ref(1)
const rotation = ref(0)
const pan = reactive({ x: 0, y: 0 })
const visibleImages = computed(() => props.images.slice(0, 4))
const remainingCount = computed(() => Math.max(0, props.images.length - visibleImages.value.length))
const activeImage = computed(() => activeIndex.value === null ? null : props.images[activeIndex.value] ?? null)
const imageStyle = computed(() => ({ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom.value}) rotate(${rotation.value}deg)` }))
let drag: { pointerId: number, startX: number, startY: number, panX: number, panY: number } | null = null

function resetView() {
  zoom.value = 1
  rotation.value = 0
  pan.x = 0
  pan.y = 0
}

function setZoom(value: number) {
  zoom.value = Math.min(3, Math.max(0.5, Math.round(value * 100) / 100))
  if (zoom.value <= 1) pan.x = pan.y = 0
}

function open(index: number) {
  resetView()
  activeIndex.value = index
  dialog.value?.showModal()
  document.documentElement.style.overflow = 'hidden'
  closeButton.value?.focus()
}

function close() {
  dialog.value?.close()
}

// Runs for every way the dialog closes: the close button, Escape, or a backdrop click.
function onClosed() {
  activeIndex.value = null
  document.documentElement.style.overflow = ''
}

function step(direction: 1 | -1) {
  if (activeIndex.value === null) return
  resetView()
  activeIndex.value = (activeIndex.value + direction + props.images.length) % props.images.length
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowRight') step(1)
  else if (event.key === 'ArrowLeft') step(-1)
  else if (event.key === '+' || event.key === '=') setZoom(zoom.value + 0.25)
  else if (event.key === '-') setZoom(zoom.value - 0.25)
  else return
  event.preventDefault()
}

function onWheel(event: WheelEvent) {
  setZoom(zoom.value - Math.sign(event.deltaY) * 0.25)
}

function onPointerDown(event: PointerEvent) {
  if (zoom.value <= 1) return
  drag = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, panX: pan.x, panY: pan.y }
  ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
}

function onPointerMove(event: PointerEvent) {
  if (!drag || drag.pointerId !== event.pointerId) return
  pan.x = drag.panX + event.clientX - drag.startX
  pan.y = drag.panY + event.clientY - drag.startY
}

function onPointerUp() {
  drag = null
}

watch(() => props.images.length, (count) => {
  if (activeIndex.value !== null && activeIndex.value >= count) close()
})

onBeforeUnmount(() => {
  if (activeIndex.value !== null) document.documentElement.style.overflow = ''
})
</script>

<template>
  <section
    v-if="images.length"
    :aria-label="label || 'Image gallery'"
    class="space-y-3"
  >
    <div class="grid grid-cols-2 gap-1.5 overflow-hidden rounded-xl sm:gap-2">
      <Motion
        v-for="(image, index) in visibleImages"
        :key="`${image.src}-${index}`"
        as="button"
        type="button"
        :while-hover="{ scale: 1.02 }"
        :while-press="{ scale: 0.985 }"
        :transition="{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }"
        class="group relative aspect-square overflow-hidden bg-elevated focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        :class="images.length === 1 ? 'col-span-2' : ''"
        :aria-label="`Open image ${index + 1} of ${images.length}: ${image.alt || 'Gallery image'}`"
        @click="open(index)"
      >
        <NuxtImg
          :src="image.src"
          :alt="image.alt || image.caption || `${label || 'Gallery'} image ${index + 1}`"
          width="900"
          height="900"
          sizes="sm:50vw md:50vw lg:40vw"
          format="webp"
          quality="78"
          :loading="priority && index === 0 ? 'eager' : 'lazy'"
          :fetchpriority="priority && index === 0 ? 'high' : 'auto'"
          decoding="async"
          class="size-full object-cover transition-transform duration-300 group-hover:scale-[1.025]"
        />
        <span
          v-if="index === visibleImages.length - 1 && remainingCount > 0"
          class="absolute inset-0 flex items-center justify-center bg-black/65 text-2xl font-semibold text-white sm:text-3xl"
          aria-hidden="true"
        >
          +{{ remainingCount }} more
        </span>
        <span
          v-else
          class="absolute bottom-2 right-2 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          View
        </span>
      </Motion>
    </div>
    <p class="text-xs text-muted">
      {{ images.length }} {{ images.length === 1 ? 'image' : 'photos' }} · Select to browse
    </p>

    <dialog
      ref="dialog"
      class="m-0 size-full max-h-none max-w-none overflow-hidden bg-black/90 p-0 text-white backdrop-blur-md backdrop:bg-transparent"
      :aria-label="`${label || 'Image gallery'} preview`"
      @close="onClosed"
      @click.self="close"
      @keydown="onKeydown"
    >
      <div
        v-if="activeImage"
        class="flex size-full touch-none items-center justify-center p-4 sm:p-16"
        @click.self="close"
        @wheel.prevent="onWheel"
      >
        <img
          :key="activeImage.src"
          :src="activeImage.src"
          :alt="activeImage.alt || activeImage.caption || `${label || 'Gallery'} image`"
          class="max-h-full max-w-full select-none object-contain transition-transform duration-200"
          :class="zoom > 1 ? 'cursor-grab active:cursor-grabbing' : ''"
          :style="imageStyle"
          draggable="false"
          @pointerdown="onPointerDown"
          @pointermove="onPointerMove"
          @pointerup="onPointerUp"
          @pointercancel="onPointerUp"
        >
      </div>
      <p
        v-if="activeIndex !== null"
        class="absolute left-4 top-6 text-sm text-white/70"
        aria-live="polite"
      >
        {{ activeIndex + 1 }} / {{ images.length }}
      </p>
      <button
        ref="closeButton"
        type="button"
        class="absolute right-4 top-4 z-20 flex size-11 items-center justify-center rounded-full border border-white/15 bg-neutral-950/70 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-white/15"
        aria-label="Close image preview"
        @click="close"
      >
        <UIcon
          name="i-lucide-x"
          class="size-5"
        />
      </button>
      <template v-if="images.length > 1">
        <button
          type="button"
          class="absolute left-3 top-1/2 z-10 -translate-y-1/2 sm:left-6 flex size-11 items-center justify-center rounded-full border border-white/15 bg-neutral-950/70 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-white/15"
          aria-label="Previous image"
          @click="step(-1)"
        >
          <UIcon
            name="i-lucide-chevron-left"
            class="size-6"
          />
        </button>
        <button
          type="button"
          class="absolute right-3 top-1/2 z-10 -translate-y-1/2 sm:right-6 flex size-11 items-center justify-center rounded-full border border-white/15 bg-neutral-950/70 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-white/15"
          aria-label="Next image"
          @click="step(1)"
        >
          <UIcon
            name="i-lucide-chevron-right"
            class="size-6"
          />
        </button>
      </template>
      <div
        class="absolute bottom-[calc(1.5rem+env(safe-area-inset-bottom))] left-1/2 flex max-w-[calc(100vw-1.5rem)] -translate-x-1/2 items-center gap-1 rounded-full border border-white/10 bg-neutral-950/80 p-1.5 text-white shadow-2xl backdrop-blur-xl"
        role="group"
        aria-label="Image tools"
      >
        <button
          type="button"
          class="flex size-11 items-center justify-center gap-2 rounded-full px-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:w-auto"
          aria-label="Zoom out"
          title="Zoom out"
          @click="setZoom(zoom - 0.25)"
        >
          <UIcon
            name="i-lucide-zoom-out"
            class="size-4"
          />
          <span class="hidden sm:inline">Zoom out</span>
        </button>
        <button
          type="button"
          class="flex size-11 items-center justify-center gap-2 rounded-full px-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:w-auto"
          aria-label="Reset zoom and rotation"
          title="Reset zoom and rotation"
          @click="resetView"
        >
          <UIcon
            name="i-lucide-rotate-ccw"
            class="size-4"
          />
          <span class="hidden sm:inline">Reset</span>
        </button>
        <button
          type="button"
          class="flex size-11 items-center justify-center gap-2 rounded-full px-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:w-auto"
          aria-label="Zoom in"
          title="Zoom in"
          @click="setZoom(zoom + 0.25)"
        >
          <UIcon
            name="i-lucide-zoom-in"
            class="size-4"
          />
          <span class="hidden sm:inline">Zoom in</span>
        </button>
        <span
          class="mx-1 h-6 w-px bg-white/15"
          aria-hidden="true"
        />
        <button
          type="button"
          class="flex size-11 items-center justify-center gap-2 rounded-full px-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:w-auto"
          aria-label="Rotate image clockwise"
          title="Rotate image clockwise"
          @click="rotation += 90"
        >
          <UIcon
            name="i-lucide-rotate-cw"
            class="size-4"
          />
          <span class="hidden sm:inline">Rotate</span>
        </button>
      </div>
    </dialog>
  </section>
</template>
