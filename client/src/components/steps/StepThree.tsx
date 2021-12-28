import React from "react";
import {FC, useEffect, useState} from 'react';
import '../../App.css'
import {Transition} from "react-transition-group";
import {StepThreeType} from "../../types/types";

const StepThree:FC<StepThreeType> = ({setActive}) => {
const [loadingVisible,setLoadingVisible]=useState(false)
    useEffect(() => {
        setTimeout(() => setLoadingVisible(true), 1000)
        setTimeout(() => setLoadingVisible(false), 4000)
      if (setActive) setTimeout(() => setActive(3), 5000)
    }, [])

    return (
        <div className="step">
            <div className="stepThree">
                <Transition
                in={loadingVisible}
                timeout={500}
                mountOnEnter
                unmountOnExit
                >
                    {state=> <div className={`circle ${state}`}>Производится расчет...</div>}
                </Transition>
            </div>
        </div>

    );
};

export default StepThree;