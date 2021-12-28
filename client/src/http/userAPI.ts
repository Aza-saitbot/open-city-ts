import {$authHost, $host} from "./index";
import jwt_decode from 'jwt-decode'
import {UserType,ResponseType} from "../types/types";

export const registration=async (email:string,password:string)=>{
    const {data}=await $host.post<ResponseType>('api/user/registration', {email,password})
    localStorage.setItem('token',data.token)
    return jwt_decode<UserType>(data.token)
}
export const login=async (email:string,password:string)=>{
    const {data}=await $host.post<ResponseType>('api/user/login', {email,password})
    localStorage.setItem('token',data.token)
    return jwt_decode<any>(data.token)
}
export const check=async ()=>{
    const {data}=await $authHost.get<ResponseType>('api/user/auth')
    localStorage.setItem('token',data.token)
    return jwt_decode<UserType>(data.token)
}