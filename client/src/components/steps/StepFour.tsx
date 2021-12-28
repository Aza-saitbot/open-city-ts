import React from "react";
import '../../App.css'
import {FC} from "react";
import {StepThreeFour} from "../../types/types";

const StepFour:FC<StepThreeFour> =({arrayNumbers}) => (
    <div className="step">
        <div className="StepFour">
            <div className="StepFour__list">
                {arrayNumbers.map(i=>
                    <div
                        className='StepFour__list__item'
                        key={i}>{i}</div>
                )}
            </div>
            <div>
                Итого: {arrayNumbers.reduce(function(sum:number, current:number) {
                return sum + current
            },0)}
            </div>
        </div>
    </div>
)

export default StepFour;