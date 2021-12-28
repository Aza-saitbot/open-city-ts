import React from "react";
import {Route, Routes} from "react-router-dom";

import {useStores} from "../use-stores";
import NotFound from "../pages/NotFound";
import Auth from "../pages/Auth";
import Main from "../pages/Main";
import {observer} from "mobx-react-lite";



export const AppRouter = observer(() => {
    const { user } = useStores();

    console.log(' user', user)

    return (
        <Routes>
            <Route path='/registration' element={<Auth/>} />
            <Route path='/' element={<Auth/>} />
            {user.isAuth && <Route path='/main' element={<Main/>} />}
            <Route path='*' element={<NotFound/>} />
        </Routes>
    );
})
