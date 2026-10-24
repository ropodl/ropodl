<script setup lang="ts">
import { blockDefinition, createBlock, sanitizeContentBlockDocument, type ContentBlock, type ContentBlockType } from '#shared/content-blocks'
import { blockEditors } from './editors'

// An editable list of blocks: the whole document, or one column inside a columns block.
const props = withDefaults(defineProps<{ nested?: boolean, max?: number }>(), { max: 50 })
const blocks = defineModel<ContentBlock[]>({ required: true })

// Stable keys for v-for and drag-and-drop without storing ids in the saved content.
const keys = new WeakMap<object, number>()
let nextKey = 0
const keyOf = (block: ContentBlock) => {
  if (!keys.has(block)) keys.set(block, nextKey++)
  return keys.get(block)!
}

const collapsed = ref(new Set<number>())
const focusedKey = ref<number | null>(null)
const root = ref<HTMLElement>()
// Vue doesn't keep template-ref arrays in list order, so rows are looked up by index.
const rowAt = (index: number) => root.value?.querySelector<HTMLElement>(`:scope > ol > li[data-index="${index}"]`) ?? undefined
const full = computed(() => blocks.value.length >= props.max)

const picker = ref<{ index: number, mode: 'insert' | 'replace' } | null>(null)
const pickerOpen = computed({
  get: () => picker.value !== null,
  set: (open) => {
    if (!open) picker.value = null
  }
})

function openPicker(index: number, mode: 'insert' | 'replace' = 'insert') {
  if (mode === 'insert' && full.value) return
  picker.value = { index, mode }
}

async function focusBlock(index: number) {
  await nextTick()
  const row = rowAt(index)
  // Prefer a text field over selects, so typing straight after inserting goes into the content.
  const field = row?.querySelector<HTMLElement>('textarea, input:not([type=file]):not([type=checkbox]):not([role=combobox])')
    ?? row?.querySelector<HTMLElement>('button, [tabindex="0"]')
  field?.focus()
}

let focusAfterClose: number | null = null

function choose(type: ContentBlockType) {
  if (!picker.value) return
  const { index, mode } = picker.value
  blocks.value.splice(index, mode === 'replace' ? 1 : 0, createBlock(type))
  focusAfterClose = index
  picker.value = null
}

// The modal normally returns focus to the button that opened it; send it to the new block instead.
function onPickerClosed(event: Event) {
  if (focusAfterClose === null) return
  event.preventDefault()
  void focusBlock(focusAfterClose)
  focusAfterClose = null
}

function move(index: number, offset: number) {
  const target = index + offset
  if (target < 0 || target >= blocks.value.length) return
  const [block] = blocks.value.splice(index, 1)
  blocks.value.splice(target, 0, block!)
}

function duplicate(index: number) {
  if (full.value) return
  blocks.value.splice(index + 1, 0, JSON.parse(JSON.stringify(blocks.value[index])))
}

function remove(index: number) {
  blocks.value.splice(index, 1)
}

function toggleCollapsed(block: ContentBlock) {
  const key = keyOf(block)
  if (!collapsed.value.delete(key)) collapsed.value.add(key)
}

function menuItems(index: number) {
  return [[
    { label: 'Move up', icon: 'i-lucide-arrow-up', kbds: ['alt', 'arrowup'], disabled: index === 0, onSelect: () => move(index, -1) },
    { label: 'Move down', icon: 'i-lucide-arrow-down', kbds: ['alt', 'arrowdown'], disabled: index === blocks.value.length - 1, onSelect: () => move(index, 1) }
  ], [
    { label: 'Insert above', icon: 'i-lucide-arrow-up-to-line', disabled: full.value, onSelect: () => openPicker(index) },
    { label: 'Insert below', icon: 'i-lucide-arrow-down-to-line', disabled: full.value, onSelect: () => openPicker(index + 1) },
    { label: 'Turn into…', icon: 'i-lucide-replace', onSelect: () => openPicker(index, 'replace') },
    { label: 'Duplicate', icon: 'i-lucide-copy', disabled: full.value, onSelect: () => duplicate(index) }
  ], [
    { label: 'Delete', icon: 'i-lucide-trash-2', color: 'error' as const, onSelect: () => remove(index) }
  ]]
}

// The same validation the server runs, shown on a block once it has been edited and left.
function problem(block: ContentBlock) {
  if (focusedKey.value === keyOf(block) || JSON.stringify(block) === JSON.stringify(createBlock(block.type))) return ''
  try {
    // Nested blocks report their own problems, so a columns block only checks its own fields.
    const own = block.type === 'columns' ? { ...block, columns: block.columns.map(() => ({ blocks: [] })) } : block
    sanitizeContentBlockDocument({ version: 1, blocks: [own] })
    return ''
  } catch (error) {
    return (error as Error).message
  }
}

function summary(block: ContentBlock) {
  const text = blockDefinition(block.type)?.text(block as never).filter(Boolean).join(' · ') || ''
  return text.length > 140 ? `${text.slice(0, 140)}…` : text || 'Empty'
}

// Drag-and-drop reordering within this list.
const dragging = ref<number | null>(null)
const dropTarget = ref<{ index: number, after: boolean } | null>(null)

function onDragStart(event: DragEvent, index: number) {
  dragging.value = index
  event.dataTransfer?.setData('text/plain', String(index))
  if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move'
  const row = rowAt(index)
  if (row && event.dataTransfer) event.dataTransfer.setDragImage(row, 24, 24)
}

function onDragOver(event: DragEvent, index: number) {
  if (dragging.value === null) return
  event.preventDefault()
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  dropTarget.value = { index, after: event.clientY > rect.top + rect.height / 2 }
}

function onDrop() {
  if (dragging.value !== null && dropTarget.value) {
    const from = dragging.value
    let to = dropTarget.value.index + (dropTarget.value.after ? 1 : 0)
    if (from < to) to--
    if (from !== to) move(from, to - from)
  }
  dragging.value = null
  dropTarget.value = null
}

function onFocusOut(event: FocusEvent, block: ContentBlock) {
  if (!(event.currentTarget as HTMLElement).contains(event.relatedTarget as Node | null) && focusedKey.value === keyOf(block)) focusedKey.value = null
}
</script>

<template>
  <div ref="root">
    <ol class="space-y-1">
      <li
        v-for="(block, index) in blocks"
        :key="keyOf(block)"
        :data-index="index"
        class="group/row relative rounded-lg transition-colors focus-within:bg-default/60 hover:bg-default/30"
        :class="dragging === index ? 'opacity-40' : ''"
        @dragover="onDragOver($event, index)"
        @drop.prevent="onDrop"
        @focusin="focusedKey = keyOf(block)"
        @focusout="onFocusOut($event, block)"
        @keydown.alt.up.prevent="move(index, -1)"
        @keydown.alt.down.prevent="move(index, 1)"
      >
        <span
          v-if="dropTarget?.index === index"
          class="pointer-events-none absolute inset-x-2 z-10 h-0.5 rounded-full bg-primary"
          :class="dropTarget.after ? '-bottom-1' : '-top-1'"
          aria-hidden="true"
        />
        <div class="flex gap-1 py-3 pr-2">
          <button
            type="button"
            draggable="true"
            class="flex h-7 w-6 shrink-0 cursor-grab items-center justify-center rounded text-dimmed opacity-0 transition-opacity hover:text-highlighted focus-visible:opacity-100 group-hover/row:opacity-100 group-focus-within/row:opacity-100 active:cursor-grabbing"
            :aria-label="`Reorder ${blockDefinition(block.type)?.label} block ${index + 1}. Drag, or use Alt and the arrow keys.`"
            @dragstart="onDragStart($event, index)"
            @dragend="dragging = null; dropTarget = null"
          >
            <UIcon
              name="i-lucide-grip-vertical"
              class="size-4"
            />
          </button>
          <div class="min-w-0 flex-1">
            <div class="mb-2 flex min-h-7 items-center gap-2">
              <UIcon
                :name="blockDefinition(block.type)?.icon || 'i-lucide-square'"
                class="size-3.5 shrink-0 text-primary"
                aria-hidden="true"
              />
              <span class="text-xs font-medium text-muted">{{ blockDefinition(block.type)?.label }}</span>
              <span
                v-if="problem(block)"
                class="flex min-w-0 items-center gap-1 truncate text-xs text-error"
              >
                <UIcon
                  name="i-lucide-circle-alert"
                  class="size-3.5 shrink-0"
                  aria-hidden="true"
                />
                {{ problem(block) }}
              </span>
              <div class="ml-auto flex shrink-0 items-center opacity-0 transition-opacity focus-within:opacity-100 group-hover/row:opacity-100 group-focus-within/row:opacity-100">
                <UButton
                  size="xs"
                  variant="ghost"
                  color="neutral"
                  :icon="collapsed.has(keyOf(block)) ? 'i-lucide-chevrons-up-down' : 'i-lucide-chevrons-down-up'"
                  :aria-label="collapsed.has(keyOf(block)) ? 'Expand block' : 'Collapse block'"
                  :aria-expanded="!collapsed.has(keyOf(block))"
                  @click="toggleCollapsed(block)"
                />
                <UDropdownMenu
                  :items="menuItems(index)"
                  :content="{ align: 'end' }"
                >
                  <UButton
                    size="xs"
                    variant="ghost"
                    color="neutral"
                    icon="i-lucide-ellipsis"
                    :aria-label="`Actions for ${blockDefinition(block.type)?.label} block ${index + 1}`"
                  />
                </UDropdownMenu>
              </div>
            </div>
            <button
              v-if="collapsed.has(keyOf(block))"
              type="button"
              class="block w-full truncate text-left text-sm text-muted hover:text-highlighted"
              @click="toggleCollapsed(block)"
            >
              {{ summary(block) }}
            </button>
            <component
              :is="blockEditors[block.type]"
              v-else
              v-model:block="blocks[index]"
              @slash="openPicker(index, 'replace')"
            />
          </div>
        </div>
        <div class="absolute inset-x-0 -bottom-2.5 z-10 flex justify-center">
          <UTooltip text="Insert a block here">
            <UButton
              size="xs"
              color="neutral"
              variant="outline"
              icon="i-lucide-plus"
              class="rounded-full bg-default opacity-0 transition-opacity focus-visible:opacity-100 group-hover/row:opacity-100"
              :disabled="full"
              :aria-label="`Insert a block after block ${index + 1}`"
              @click="openPicker(index + 1)"
            />
          </UTooltip>
        </div>
      </li>
    </ol>

    <div class="mt-4 flex items-center gap-3 pl-7">
      <UButton
        size="sm"
        variant="soft"
        color="neutral"
        icon="i-lucide-plus"
        :disabled="full"
        @click="openPicker(blocks.length)"
      >
        Add block
      </UButton>
      <span class="text-xs text-dimmed">{{ blocks.length }}/{{ max }}</span>
    </div>

    <UModal
      v-model:open="pickerOpen"
      :title="picker?.mode === 'replace' ? 'Turn into…' : 'Add a block'"
      description="Search by name or purpose, then press Enter."
      :ui="{ body: 'p-0 sm:p-0' }"
      :content="{ onCloseAutoFocus: onPickerClosed }"
    >
      <template #body>
        <BlocksBlockPicker
          :nested="nested"
          @select="choose"
        />
      </template>
    </UModal>
  </div>
</template>
