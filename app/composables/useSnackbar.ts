import { ref } from "vue"

export const useSnackbar = () => {
    const show = ref(false);
    const text = ref('');
    const color = ref('');

    const showSnackbar = (msg: string, type: string = 'success') => {
        console.log(msg, type)
        text.value = msg;
        color.value = type;
        show.value = true;
    };

    const closeSnackbar = () => {
        show.value = false;
    };

    return {
        show,
        text,
        color,
        showSnackbar,
        closeSnackbar
    };
};
