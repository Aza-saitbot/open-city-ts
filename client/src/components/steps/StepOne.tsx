
import React from "react";
import {useFieldArray, useFormContext} from "react-hook-form";
import '../../App.css'
import {ErrorMessage} from "@hookform/error-message";

const StepOne = () => {
    const { register,control,formState:{errors}} = useFormContext()
    const { fields, append,remove } = useFieldArray({
        control,
        name: "steps",
    });

    return (
        <div className="step">
          <div className="steps__list">
              <input className="steps__inputs"
                     placeholder="Напишите число"
                     {...register(`stepOne`)}
              />
              <ErrorMessage errors={errors} name="stepOne"
                            render={({ message }) => <p style={{color:'red'}}>{message}</p>}
              />
              <input className="steps__inputs"
                     placeholder="Напишите число"
                     {...register(`stepTwo`)}
              />
              <ErrorMessage errors={errors} name="stepTwo"
                            render={({ message }) => <p style={{color:'red'}}>{message}</p>}
              />


              {fields.map((field, index) => (
                  < div key={field.id} className="steps__delete">
                      <input
                          placeholder="Напишите число"
                          className="steps__inputs" type="text"
                             {...register(`steps.${index}.value`)}
                      />
                      <div >
                          <button
                              className="steps__buttons"
                              type="button"
                              style={{color:'white',background:'red'}}
                              onClick={() => remove(index)}
                          >
                              Удалить
                          </button>
                      </div>
                  </div>
              ))}
              <div >
                  <button
                      className="steps__buttons"
                      type="button"
                      style={{color:'white',background:'green'}}
                      onClick={() => append({})}
                  >
                      Добавить
                  </button>
              </div>
          </div>
        </div>
    );
};

export default StepOne;