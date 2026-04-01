import type { User } from '~/types/auth';

export const useAuth = () => {
  const supabase = useSupabaseClient();
  const supabaseUser = useSupabaseUser();
  const token = useCookie('token', {
    maxAge: 60 * 60 * 24, // 1 day
  });
  
  const user = useState<User | null>('user', () => null);
  const { showSnackbar } = useSnackbar();

  // Sync supabase user to our user state
  watch(supabaseUser, (newUser) => {
    if (newUser) {
      user.value = {
        id: newUser.id as unknown as number,
        email: newUser.email!,
        username: newUser.user_metadata?.username || newUser.email?.split('@')[0],
        fullname: newUser.user_metadata?.fullname || newUser.email?.split('@')[0],
      };
    } else {
      user.value = null;
    }
  }, { immediate: true });

  const login = async (form: any) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (error) throw error;

      if (data.session) {
        token.value = data.session.access_token;
        showSnackbar('Logged in successfully', 'success');
        await navigateTo('/admin/', { replace: true });
      }
    } catch (err: any) {
      const message = err.message || 'Login failed';
      showSnackbar(message, 'error');
      throw err;
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      showSnackbar(error.message, 'error');
    } else {
      user.value = null;
      token.value = null;
      await navigateTo('/auth/', { replace: true });
      showSnackbar('Logged out successfully', 'success');
    }
  };

  const fetchUser = () => {
    // Supabase handles this automatically via useSupabaseUser
  };

  return {
    login,
    logout,
    fetchUser,
    user,
    token,
  };
};
