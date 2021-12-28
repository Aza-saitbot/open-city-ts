import {UserType} from "../types/types";

export const  getEmail= (data:UserType|null):string |null=> {
   if (data){
       const {email}=data
       let parts = email.split("@");
       let result = parts[0]
       result += "@";
       let domain = parts[1];
       result += domain.charAt(0);
       let dot = domain.indexOf(".");
       for(let i=1; i<dot; i++) {
           result += "*";
       }
       result += domain.substring(dot);

       return result;
   }
   return data
}