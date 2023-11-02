import React, { Fragment } from 'react';
import Loader from 'react-loader-spinner'

const AppLoader = (props) => {
    const { loading, failType } = props;
    if (loading) {
        return (
            <div className='app-loader'>
                <Loader
                    type="Bars"
                    color="#002C4D"
                    height={50}
                    width={80}
                />
            </div>
        )
    }
    if (loading === null) return <div>{typeof (failType) === 'function' ? failType() : failType}</div>;
    return <Fragment>{props.children}</Fragment>
};

export default AppLoader;