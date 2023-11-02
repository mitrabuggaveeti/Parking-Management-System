import React, { Fragment } from 'react'

const SelectInput = (props) => {
    const { options, onChange, value, className, error, style } = props
    return (
        <Fragment>
            <select
                onChange={onChange}
                value={value}
                className={className}
                style={style}
            >
                {options.map(option => <option key={option.value} value={option.value}>{option.label} </option>)}
            </select>
            {error && <span className='invalid-feedback'>{error}</span>}
        </Fragment>
    )
}

export default SelectInput
