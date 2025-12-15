export const useSnackbar = () => {
    const show = useState<boolean>('snackbar_show', () => false);
    const text = useState<string>('snackbar_text', () => '');
    const color = useState<string>('snackbar_color', () => 'success');

    const showSnackbar = (msg: string, type: string = 'success') => {
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
