import React from 'react';
import Loader from 'react-loader-spinner';

const Button = (props) => {
    const { title, onClick, className = 'btn-square btn-blue', loading = false, disabled = false, style = {} } = props;
    return (
        <button style={style} onClick={onClick} className={`btn ${className}`} disabled={disabled}>
            {
                loading ? <Loader
                    type="ThreeDots"
                    color="#FFFFFF"
                    height={20}
                    width={20}
                /> : title
            }
        </button>
    )
}


export default Button;