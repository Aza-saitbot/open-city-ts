import React from 'react';
import '../App.css'
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useStores} from "../use-stores";

const NavBar = observer(() => {
    const { user } = useStores();
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser(null)
        user.setIsAuth(false)
        navigate('/')
    }

    return (
        <div className='navbar_header'>
            <div>
                {user.isAuth
                    ?<div style={{color: 'white'}}>
                        <button
                            onClick={()=>logOut()}
                            className='navbar_header__button'>Выйти</button>
                    </div>
                    :<div>
                        <button className='navbar_header__button' onClick={() => navigate('/')}>
                            Войти
                        </button>
                    </div>
                }
            </div>
        </div>
    );
})

export default NavBar;