import { useApiFetch } from "~/utils/shared/useApiFetch";

export const useAuth = () => {
    const token = useCookie('token');
    const user = useState('user');
    const { showSnackbar } = useSnackbar();

    const login = async (form: any) => {
        await useApiFetch('auth/login', {
            method: "POST",
            body: form
        }).then((res: any) => {
            token.value = res.token;
            showSnackbar('Logged in successfully', 'success');
            // We use navigateTo with replace: true to prevent back button from going back to login
            return navigateTo("/admin/", { replace: true });
        }).catch((err) => {
            const message = err.data?.message || err.message || 'Login failed';
            showSnackbar(message, 'error');
            throw err;
        });
    };

    const logout = () => {
        user.value = null;
        token.value = null;
        // We also clear localStorage as it was used in other parts of the app
        if (import.meta.client) {
            localStorage.removeItem("user");
        }
        showSnackbar('Logged out successfully', 'success');
        navigateTo("/", { replace: true });
    };

    const fetchUser = async () => {
        // Check localStorage first for immediate UI update if client-side
        if (import.meta.client && localStorage.getItem('user')) {
            // This assumes the value in localStorage is suitable (e.g. might need parsing if it's an object)
            // Based on previous code: user.value = localStorage.getItem('user')
            // Let's keep it safe.
            user.value = localStorage.getItem('user');
        }

        await useApiFetch("/auth/me").then((res) => {
            user.value = res;
            if (import.meta.client) {
                localStorage.setItem('user', res as string);
            }
        }).catch(() => {
            // If fetching user fails (e.g. token expired), we might want to logout
            // or just silently fail. Detailed error handling can be added later.
        });
    };

    return {
        login,
        logout,
        fetchUser,
        user,
        token
    };
};
