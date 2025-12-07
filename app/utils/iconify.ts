import type { IconAliases, IconProps, IconSet } from "vuetify";
import { h } from "vue";
import { Icon } from "@iconify/vue";

const aliases: IconAliases = {
  // System and Status Icons
  collapse: 'carbon:chevron-up',
  complete: 'carbon:checkmark-filled',
  cancel: 'carbon:close-filled',
  close: 'carbon:close',
  delete: 'carbon:trash-can',
  clear: 'carbon:close',
  success: 'carbon:checkmark-filled',
  info: 'carbon:information-filled',
  warning: 'carbon:warning-alt-filled',
  error: 'carbon:error-filled',

  // Navigation and Data Table
  prev: 'carbon:chevron-left',
  next: 'carbon:chevron-right',
  sortAsc: 'carbon:arrow-up',
  sortDesc: 'carbon:arrow-down',
  expand: 'carbon:chevron-down',
  menu: 'carbon:menu',
  subgroup: 'carbon:caret-right',
  dropdown: 'carbon:chevron-down',

  // Form Controls
  checkboxOn: 'carbon:checkbox-checked-filled',
  checkboxOff: 'carbon:checkbox',
  checkboxIndeterminate: 'carbon:checkbox-indeterminate-filled',
  delimiter: 'carbon:circle-dash',
  radioOn: 'carbon:radio-button-checked',
  radioOff: 'carbon:radio-button',

  // Actions and Loaders
  edit: 'carbon:edit',
  loading: 'carbon:circle-dash', // closest loader-type icon
  first: 'carbon:skip-backward',
  last: 'carbon:skip-forward',
  unfold: 'carbon:unfold-more',
  plus: 'carbon:add',
  minus: 'carbon:subtract',
  calendar: 'carbon:calendar',

  // Files and other
  file: 'carbon:document',
  // You would need to check the Carbon Icon list for rating/treeview specific names
  ratingEmpty: 'carbon:star',
  ratingFull: 'carbon:star-filled',
  ratingHalf: 'carbon:star-half-filled',
  treeviewCollapse: 'carbon:caret-down',
  treeviewExpand: 'carbon:caret-right',
  upload: 'carbon:cloud-upload',
  color: 'carbon:color-palette',
  eyeDropper: 'carbon:eyedropper',

  // Custom key/arrow icons (use the Iconify name directly if needed)
  command: 'carbon:command',
  ctrl: 'carbon:text-wrap',
  space: 'carbon:space-bar',
  shift: 'carbon:arrow-up-right',
  alt: 'carbon:align-box-top-center',
  enter: 'carbon:enter',
  arrowup: 'carbon:arrow-up',
  arrowdown: 'carbon:arrow-down',
  arrowleft: 'carbon:arrow-left',
  arrowright: 'carbon:arrow-right',
  backspace: 'carbon:undo-outline',
};

const iconify: IconSet = {
  component: (props: IconProps) => {
    return h(Icon, {
      icon: props.icon as string,
      tag: props.tag,
    });
  },
};

export { aliases, iconify };
