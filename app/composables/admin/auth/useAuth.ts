import { useApiFetch } from "~/utils/shared/useApiFetch";
import type { LoginResponse } from "~/types/auth";

export const useAuth = () => {
    const token = useCookie('token');
    const user = useState('user');
    const { showSnackbar } = useSnackbar();

    const login = async (form: any) => {
        await useApiFetch<LoginResponse>('auth/login', {
            method: "POST",
            body: form
        }).then(async (res: LoginResponse) => {
            token.value = res.token;
            showSnackbar('Logged in successfully', 'success');
            await navigateTo("/admin/", { replace: true });
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
        navigateTo("/", { replace: true });
        showSnackbar('Logged out successfully', 'success');
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
            if (import.meta.client) {
                localStorage.removeItem("user");
            }
            showSnackbar('Failed to fetch user', 'error');
            navigateTo("/admin/login", { replace: true });
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
