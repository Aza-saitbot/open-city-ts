import React from "react";
import '../App.css'
import {Navigate, NavLink, useLocation, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useForm} from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import * as Yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import {login, registration} from "../http/userAPI";
import {useStores} from "../use-stores";
import { AxiosError } from "axios";
import {PayloadType} from "../types/types";


const schema=Yup.object().shape({
    email: Yup.string().email('Введите корректный email').required("Обязательное поле"),
    password: Yup.string().required("Обязательное поле")
})

const Auth = observer(() => {
    const { user } = useStores();
    const {handleSubmit,register,formState:{errors,isValid}}=useForm({
        resolver:yupResolver(schema),
        mode:"onChange",
        defaultValues:{
            email:'',
            password:''
        }
    })

    const navigate = useNavigate();
    const {pathname}=useLocation()
    const isLogin=pathname === '/registration'

    const click = async (payload:PayloadType) => {
        try {
            let data
            if (isLogin){
                data=await registration(payload.email,payload.password)
            }else {
                data=await login(payload.email,payload.password)
            }
            user.setUser(data)
            user.setIsAuth(true)
            navigate('/main')

        }catch (error) {
            const err = error as AxiosError
            if (err.response) {
                alert(err.response.data.message)
            }

        }
    }

    return (
        <form onSubmit={handleSubmit(click)}>
            <div className="auth">
                <div className="auth__block">
                    <input
                        placeholder="Введите ваш email"
                        {...register('email')}
                        className="auth__block__input" type="text"/>
                    <ErrorMessage errors={errors} name="email"
                                  render={({ message }) => <p style={{color:'red'}}>{message}</p>}
                    />
                    <input
                        placeholder="Введите ваш пароль"
                        {...register('password')}
                        className="auth__block__input" type="password"/>
                    <ErrorMessage errors={errors} name="password"
                                  render={({ message }) => <p style={{color:'red'}}>{message}</p>}
                    />
                    <div className="auth__block__linkButton">
                        {isLogin
                            ?<div>Есть аккаунт, <NavLink to={'/'}>Войдите!</NavLink> </div>
                            :<div>Нет аккаунта, <NavLink to={'/registration'}>Зарегистрируйся!</NavLink> </div>
                        }

                        {isLogin
                            ?< button
                                onClick={()=> <Navigate to="/" replace/>}
                                type="submit"
                                className={isValid
                                ?"auth__block__button__active"
                                    :"auth__block__button"
                                }>Зарегистрировать</button>
                            :< button
                                type="submit"
                                className={isValid
                                    ?"auth__block__button__active"
                                    :"auth__block__button"
                                }>Войти</button>
                        }
                    </div>
                </div>
            </div>
        </form>
    );
})

export default Auth;