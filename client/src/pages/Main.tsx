import React from "react";
import '../App.css'
import {observer} from "mobx-react-lite";
import {getEmail} from "../utlits/utility";
import StepOne from "../components/steps/StepOne";
import StepTwo from "../components/steps/StepTwo";
import StepThree from "../components/steps/StepThree";
import StepFour from "../components/steps/StepFour";
import {useForm, FormProvider} from "react-hook-form";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import { useEffect, useState} from "react";
import {SubmitSchemaType, UserType} from "../types/types";
import {useStores} from "../use-stores";


const addedNumbersSchema = {
    value: Yup.number().typeError('Только числа')
        .min(0, 'Минимум 0')
};

const schema = Yup.object().shape({
    stepOne: Yup.number().typeError('Только числа')
        .min(0, 'Минимум 0').required("Обязательное поле"),
    stepTwo: Yup.number().typeError('Только числа')
        .min(0, 'Минимум 0').required("Обязательное поле"),
    steps: Yup.array().of(Yup.object().shape(addedNumbersSchema))
})

const steps = [
    {title: 'Шаг Ввод данных', Component: StepOne},
    {
        title: 'Шаг Подтверждение данных',
        Component: StepTwo
    },
    {title: 'Шаг Расчет', Component: StepThree},
    {title: 'Шаг Результат', Component: StepFour},
];

const Main = observer(() => {
    const { user } = useStores();
    const [state, setState] = useState< UserType | null>(null)
    const [arrayNumbers, setArrayNumbers] = useState<Array<number>>([])
    const [active, setActive] = useState<number>(0);

    const methods = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const onSubmit = (data:SubmitSchemaType) => {
        const newArray = [Number(data.stepOne), Number(data.stepTwo)]
        if (data.steps.length > 0) data.steps.forEach(i => newArray.push(Number(i.value)))
        setArrayNumbers(newArray)
        setActive(active + 1)
        methods.reset({stepOne: '', stepTwo: ''})
    }

    const comeback = () => setActive(0)


    useEffect(() => {
        if (user.user){
            setState({...user.user})
        }
    }, [user])

    useEffect(() => {
        document.title = steps[active].title
    }, [active])

    return (

        <div className="Main">
            <div className="Main__left">
                <div>Привет, {getEmail(state)}</div>
                <div>{steps[active].title}</div>
            </div>
            <FormProvider {...methods} >
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className="Main__right">
                        <TransitionGroup>
                            {steps.map(({title, Component}, index) => {
                                    if (index === active) {
                                        return (
                                            <CSSTransition
                                                key={active}
                                                timeout={2000}
                                                unmountOnExit
                                                classNames="step">
                                                <Component
                                                    setActive={setActive}
                                                    arrayNumbers={arrayNumbers}
                                                    setArrayNumbers={setArrayNumbers}
                                                />
                                            </CSSTransition>
                                        )
                                    }
                                }
                            )}
                        </TransitionGroup>
                        <div className="Main__right__foot">
                            <div className="Main__right__foot__left">
                                {active === 3
                                    ? <button
                                        onClick={comeback}
                                        className="Main__right__foot__left__button"
                                    >Вернутся к вводу данных</button>
                                    : active !== 0 && active !== 2 && <button
                                    onClick={() => setActive(active - 1)}
                                    className="Main__right__foot__left__button"
                                >Назад</button>
                                }
                            </div>
                            <div className="Main__right__foot__right">
                                {active===0 && <button
                                    type="submit"
                                    className={methods.formState.isValid ? "auth__block__button__active" :"Main__right__foot__right__button"}

                                >Прожолжить</button>}
                                {active !== 3 && active !== 2 && active !==0 &&
                                <button type="button"
                                        onClick={() => setActive(active + 1)}
                                        className="Main__right__foot__right__button"
                                >Прожолжить</button>
                                }
                            </div>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>)
})

export default Main;

