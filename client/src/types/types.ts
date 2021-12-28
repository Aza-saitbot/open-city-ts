import {Dispatch, SetStateAction} from "react";

export type StepTwoType={
    setArrayNumbers:Dispatch<SetStateAction<Array<number>>>
    arrayNumbers:Array<number>
}
export type StepThreeType={
    setActive:Dispatch<SetStateAction<number>>
}
export type StepThreeFour={
    arrayNumbers:Array<number>
}

export type UserType={
    email:string
    exp:number
    iat:number
    id:number
}

export type SubmitSchemaType={
    stepOne:string
    stepTwo:string
    steps:Array<{value:string}>
}
export type ResponseType={
    token:string
}
export type PayloadType={
    email:string
    password:string
}


