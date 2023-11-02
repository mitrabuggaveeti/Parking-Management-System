import React, { useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FormInput from '../../components/shared/form-input'
import { isValidLoginForm, isValidRegisterForm } from '../../validation/validations';
import { toast } from 'react-toastify';
import { resolveByType } from '../../utils/utils';
import Button from '../../components/shared/button';
import { userRegisterAction } from '../../actions/user.actions';

const Register = ({ userRegisterAction, history: { push } }) => {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
        adharNumber: ''
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
            success: () => {
                push('/login');
                toast.success('Sucessfully registered Please login with your credentials')
            },
            failure: () => {
                toast.error(message);
            }
        })
    }
    const submit = (e) => {
        e.preventDefault();
        const validation = isValidRegisterForm(loginInfo);
        if (!validation.isValidForm) return setFormErrors(validation.errors);
        setLoading(true);
        setFormErrors({});
        userRegisterAction(loginInfo, serverCallback);
    }
    return (
        <Fragment>
            <h4 className='text-center' style={{ marginTop: '6%' }}>Register</h4>
            <div className='center'>
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <FormInput name='email' value={loginInfo.email} error={formErrors.email} onChange={handleChange} type="email" className="form-control col-md-12" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Aadhar Number</label>
                        <FormInput name='adharNumber' value={loginInfo.adharNumber} error={formErrors.adharNumber} onChange={handleChange} type="Number" className="form-control col-md-12" id="exampleInputPassword1" placeholder="Aadhar number" />
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



export default connect(null, { userRegisterAction })(withRouter(Register))
