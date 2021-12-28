import {createContext} from "react";
import UserStore from "./userStore";


export const rootStoreContext = createContext({
    user: new UserStore()
});