export const useSnackbarStore = defineStore("snackbarStore", () => {
  const snackbar = ref({
    show: false,
    text: "",
    color: "",
  });

  function setSnackbar(text: string, color: string = "primary") {
    snackbar.value.show = true;
    snackbar.value.text = text;
    snackbar.value.color = color;
  }

  return {
    snackbar: snackbar.value,
    setSnackbar,
  };
});
