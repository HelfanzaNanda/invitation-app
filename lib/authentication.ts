// 'use server'
import { LoginResult } from '@/models/Login';
// import { cookies } from 'next/headers'
import Cookies from "js-cookie";
// import cookieCutter from 'cookie-cutter'




export const isLogin = async () => {
    // const cookieStore = cookies()
    const token = Cookies.get('_r');
    // console.log('TOKEN AUTH: ', token);
    
    return token ? true : false;
}

export const getJwtToken = async ()  => {
    // const cookieStore = cookies()
    // const token = cookieStore.get('_r');
    const token = Cookies.get('_r');
    return token;
}
export const setAuth = (data : LoginResult)  => {
    // const cookieStore = cookies();
    const name = data.user.name;
    const email = data.user.email;
    const role = data.user.role;
    Cookies.set('_r', data.jwt.token!!);
    Cookies.set('name', name!!);
    Cookies.set('email', email!!);
    Cookies.set('role', role!!);
    Cookies.set('expired', data.jwt.expiresIn!!.toString());


    localStorage.setItem('_r', data.jwt.token!!);
    localStorage.setItem('name', name!!);
    localStorage.setItem('email', email!!);
    localStorage.setItem('role', role!!);
    localStorage.setItem('expired', data.jwt.expiresIn!!.toString());

    // cookieStore.set('_r', data.jwt.token!!);
    // cookieStore.set('name', name!!);
    // cookieStore.set('email', email!!);
    // cookieStore.set('role', role!!);
    // cookieStore.set('expired', data.jwt.expiresIn!!.toString());
}
export const removeAuth = ()  => {
    // const cookieStore = cookies()
    Cookies.remove('_r');
    Cookies.remove('name');
    Cookies.remove('email');
    Cookies.remove('role');
    Cookies.remove('expired');
    localStorage.removeItem('_r');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('expired');
}

export const getRoleName = () => {
    // const cookieStore = cookies()
    const role  = Cookies.get('role');
    return role;
}
export const getUserName = () => {
    // const cookieStore = cookies()
    const name  = Cookies.get('name');
    // console.log('NAME', name);
    
    return name;
}
export const getUserEmail = () => {
    // const cookieStore = cookies()
    const email  = Cookies.get('email');
    return email;
}

export const AuthCheck = () => {
    // const cookieStore = cookies()
    const user  = Cookies.get('_r');
    return user ? true : false;
}