import React, { Fragment } from 'react'

const FormInput = ({ type, className, style = {}, onChange, error, placeholder, value = '', name, id, required = false }) => {
    return (
        <Fragment>
            <input id={id} name={name} className={className} type={type} style={style} onChange={onChange} placeholder={placeholder} value={value} required={required} />
            {error && <span style={{ color: 'red' }}>{error}</span>}
        </Fragment>
    )
}

export default FormInput
