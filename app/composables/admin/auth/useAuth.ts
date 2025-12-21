import { useApiFetch } from "~/utils/shared/useApiFetch";
import type { LoginResponse, User } from "~/types/auth";

export const useAuth = () => {
   const token = useCookie("token");
   const user = useState<User | null>("user", () => null);
   const { showSnackbar } = useSnackbar();

   const decodeToken = (t: string): User | null => {
      try {
         const base64Url = t.split('.')[1];
         const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
         const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
         }).join(''));

         return JSON.parse(jsonPayload);
      } catch (e) {
         return null;
      }
   };

   const login = async (form: any) => {
      await useApiFetch<LoginResponse>("auth/login", {
         method: "POST",
         body: form,
      })
         .then(async (res: LoginResponse) => {
            showSnackbar("Logged in successfully", "success");
            token.value = res.token;
            user.value = decodeToken(res.token);
            await navigateTo("/admin/", { replace: true });
         })
         .catch(async (err) => {
            const message = err.data?.message || err.message || "Login failed";
            showSnackbar(message, "error");
            throw err;
         });
   };

   const logout = () => {
      user.value = null;
      token.value = null;
      navigateTo("/auth/", { replace: true });
      showSnackbar("Logged out successfully", "success");
   };

   const can = (permission: string) => {
      if (!user.value) return false;
      if (user.value.role === 'admin') return true;
      return user.value.permissions?.includes(permission);
   };

   const fetchUser = () => {
      if (token.value && !user.value) {
         user.value = decodeToken(token.value as string);
         if (!user.value) {
            token.value = null; // Clear invalid token
         }
      }
   };

   return {
      login,
      logout,
      fetchUser,
      user,
      token,
      can,
   };
};
