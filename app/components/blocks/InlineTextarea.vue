<script setup lang="ts">
// A textarea with a small toolbar and shortcuts for the inline formatting subset
// (Ctrl/⌘ + B bold, I italic, E code, K link). Applying a format twice removes it.
withDefaults(defineProps<{ rows?: number, maxlength?: number, placeholder?: string, ariaLabel?: string }>(), { rows: 3, maxlength: 10000 })
const model = defineModel<string>({ required: true })
const textarea = ref<{ textareaRef: HTMLTextAreaElement | null }>()

const formats = [
  { key: 'b', label: 'Bold', icon: 'i-lucide-bold', before: '**', after: '**', placeholder: 'bold text' },
  { key: 'i', label: 'Italic', icon: 'i-lucide-italic', before: '*', after: '*', placeholder: 'italic text' },
  { key: 'e', label: 'Inline code', icon: 'i-lucide-code', before: '`', after: '`', placeholder: 'code' },
  { key: 'k', label: 'Link', icon: 'i-lucide-link', before: '[', after: '](https://)', placeholder: 'link text' }
] as const

async function apply(format: typeof formats[number]) {
  const element = textarea.value?.textareaRef
  if (!element) return
  const { selectionStart: start, selectionEnd: end, value } = element
  const selected = value.slice(start, end)
  let next: string
  let selection: [number, number]

  if (format.key !== 'k' && value.slice(start - format.before.length, start) === format.before && value.slice(end, end + format.after.length) === format.after) {
    next = value.slice(0, start - format.before.length) + selected + value.slice(end + format.after.length)
    selection = [start - format.before.length, end - format.before.length]
  } else {
    const inner = selected || format.placeholder
    next = value.slice(0, start) + format.before + inner + format.after + value.slice(end)
    const innerStart = start + format.before.length
    // For links, select the URL so it can be typed straight away.
    selection = format.key === 'k'
      ? [innerStart + inner.length + 2, innerStart + inner.length + format.after.length - 1]
      : [innerStart, innerStart + inner.length]
  }

  model.value = next
  await nextTick()
  element.focus()
  element.setSelectionRange(...selection)
}

function onKeydown(event: KeyboardEvent) {
  if (!(event.ctrlKey || event.metaKey) || event.altKey || event.shiftKey) return
  const format = formats.find(item => item.key === event.key.toLowerCase())
  if (!format) return
  event.preventDefault()
  void apply(format)
}
</script>

<template>
  <div class="group/inline relative">
    <UTextarea
      ref="textarea"
      v-model="model"
      :rows="rows"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :aria-label="ariaLabel"
      autoresize
      class="w-full"
      :ui="{ base: 'pr-32 leading-6' }"
      @keydown="onKeydown"
    />
    <div
      class="absolute right-1.5 top-1.5 flex gap-0.5 opacity-60 transition-opacity group-focus-within/inline:opacity-100 group-hover/inline:opacity-100"
      role="toolbar"
      aria-label="Text formatting"
    >
      <UTooltip
        v-for="format in formats"
        :key="format.key"
        :text="format.label"
        :kbds="['meta', format.key]"
      >
        <UButton
          size="xs"
          variant="ghost"
          color="neutral"
          :icon="format.icon"
          :aria-label="format.label"
          @mousedown.prevent
          @click="apply(format)"
        />
      </UTooltip>
    </div>
  </div>
</template>
