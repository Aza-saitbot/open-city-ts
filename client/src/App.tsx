import React, { useEffect, useState} from "react";
import './App.css'
import {BrowserRouter} from "react-router-dom";
import NavBar from "./components/Navbar";

import {check} from "./http/userAPI";
import {observer} from "mobx-react-lite";
import {useStores} from "./use-stores";
import {AppRouter} from "./components/AppRouter";


const App =observer( () => {

    const { user } = useStores();
    const [loading,setLoading]=useState<boolean>(true)
    
    useEffect(()=>{
        check().then(data=>{
            console.log('data',data)
                user.setUser(data)
                user.setIsAuth(true)
        }).finally(()=>setLoading(false))
    },[])

    if (loading){
        return  <div>Loading...</div>
    }

    return (
        <BrowserRouter>
            <div className="app">
                <NavBar/>
                <div className="app__content">
                    <AppRouter/>
                </div>
            </div>
        </BrowserRouter>
    )
})

export default App;
