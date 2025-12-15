export default defineNuxtRouteMiddleware(()=>{
    const token = useCookie('token')
    if(!token.value) {
        localStorage.removeItem('user')
        return navigateTo("/auth/",{
        replace: true
    })}
})