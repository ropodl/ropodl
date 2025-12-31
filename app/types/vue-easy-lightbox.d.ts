declare module 'vue-easy-lightbox' {
  import { DefineComponent } from 'vue';
  const VueEasyLightbox: DefineComponent<{
    visible?: boolean;
    imgs?: string | string[] | { src: string; title?: string }[];
    index?: number;
    loop?: boolean;
    teleport?: string | HTMLElement;
    scrollDisabled?: boolean;
    moveDisabled?: boolean;
    maskClosable?: boolean;
    closeOnEsc?: boolean;
  }>;
  export default VueEasyLightbox;
}
