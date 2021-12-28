import React, {FC, useState} from "react";
import '../../App.css'
import {StepTwoType} from "../../types/types";

const StepTwo:FC<StepTwoType> = ({arrayNumbers, setArrayNumbers}) => {
    const [search, setSearch] = useState('')

    const asc = () => setArrayNumbers([...arrayNumbers.sort((a, b) => a - b)])
    const desc = () =>setArrayNumbers([...arrayNumbers.sort((a, b) => b - a)])
    
    const getFind = () => {
            const isFind =search.length>0 && arrayNumbers.find(i => i === Number(search))
            if (isFind) {
                return <div>{isFind}</div>
            }
            return <div>не найдено</div>
        }

         const getArrayNumbers=arrayNumbers.map((item, index) => {
             return (
                 <div key={index}>{item}</div>
             )
         })


    return (
        <div className="step">
            <div className="confirmation">
                <div className="confirmation__search">
                    <input
                        className="confirmation__search__input"
                        placeholder='Введите число'
                        value={search} onChange={event => setSearch(event.target.value)} type="text"/>
                    <button type='button' className="confirmation__search__button">Найти</button>
                </div>
                <div
                    className="confirmation__search"
                >
                    <button
                        type='button'
                        onClick={asc}
                        className="confirmation__search__button"
                    >По возрастанию
                    </button>
                    <button
                        type='button'
                        onClick={desc}
                        className="confirmation__search__button"
                    >По убыванию
                    </button>
                </div>
                <div>
                    {search.length>0
                        ?getFind()
                    : getArrayNumbers
                    }
                </div>
            </div>
        </div>
    );


};

export default StepTwo;

