import React, { useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import FormInput from '../../components/shared/form-input'
import { isValidLoginForm } from '../../validation/validations';
import { toast } from 'react-toastify';
import { resolveByType } from '../../utils/utils';
import Button from '../../components/shared/button';

const Login = ({ userLoginAction, history: { push } }) => {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setLoginInfo({
            ...loginInfo,
            [e.target.name]: e.target.value
        });
    }
    const serverCallback = ({ type, message }) => {
        setLoading(false);
        resolveByType({
            type,
            success: () => push('/slots'),
            failure: () => {
                toast.error(message);
            }
        })
    }
    const submit = (e) => {
        e.preventDefault();
        const validation = isValidLoginForm(loginInfo);
        if (!validation.isValidForm) return setFormErrors(validation.errors);
        setLoading(true);
        setFormErrors({});
        userLoginAction(loginInfo, serverCallback);
    }
    return (
        <Fragment>
            <h4 className='text-center' style={{ marginTop: '6%' }}>Login</h4>
            <div className='center'>
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <FormInput name='email' value={loginInfo.email} error={formErrors.email} onChange={handleChange} type="email" className="form-control col-md-12" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <FormInput name='password' value={loginInfo.password} error={formErrors.password} onChange={handleChange} type="password" className="form-control col-md-12" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <Button onClick={submit} loading={loading} disabled={loading} type="submit" className="btn btn-primary" title='Submit' />
                </form>
            </div>
        </Fragment>
    )
}

export default withRouter(Login)
