export const useSnackbar = () => {
  const show = ref(false);
  const text = ref("");
  const color = ref("");
  return { show, text, color };
};
