import React from 'react'
import './form-input.styles.scss';
export default function FormInput({handleChange, label, ...otherProps}) {

    return (
        <div className="group">
            {
                label ?
                (<label className={`${!otherProps.value.length ? "shrink" : ""}`}>
                    {label}
                </label>)
                :
                null
            }
            <input className="form-input" onChange={handleChange} {...otherProps}/>
        </div>
    )
}
