export const useSnackbar = () => {
    const show = useState('snackbar-show', () => false);
    const text = useState('snackbar-text', () => '');
    const color = useState('snackbar-color', () => '');

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
