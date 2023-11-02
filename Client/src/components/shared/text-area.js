import React, { Fragment } from 'react'

const TextArea = ({ type, className, style = {}, onChange, error, placeholder, value = '', name, id, rows }) => {
    return (
        <Fragment>
            <textarea rows={rows} id={id} name={name} className={className} type={type} style={style} onChange={onChange} placeholder={placeholder} value={value} />
            {error && <span style={{ color: 'red' }}>{error}</span>}
        </Fragment>
    )
}

export default TextArea
