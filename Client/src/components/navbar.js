import React, { Fragment } from 'react';
import { NavLink, withRouter } from 'react-router-dom'

const Navbar = ({ loggedIn, role, history: { push }, userLogoutAction }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark" >
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <NavLink className="navbar-brand" to='/'><h3 style={{ color: '#51A846' }}>Parking Management System</h3></NavLink>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul className="navbar-nav ml-auto mt-2 mt-lg-0 text-center">
                    {!loggedIn ?
                        <Fragment>
                            <li className="nav-item">
                                <NavLink activeClassName='active-class' className="nav-link text-white" to='/login'>Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink activeClassName='active-class' className="nav-link text-white" to='/register'>Register</NavLink>
                            </li>
                        </Fragment> :
                        <Fragment>
                            {role === 'admin' &&
                                <Fragment>
                                    <li className="nav-item">
                                        <NavLink activeClassName='active-class' className="nav-link text-white" to='/add-slot'>Add-Slot</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink activeClassName='active-class' className="nav-link text-white" to='/admin/all-bookings'>AllBookings</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink activeClassName='active-class' className="nav-link text-white" to='/admin/active-bookings'>ActiveBookings</NavLink>
                                    </li>
                                </Fragment>
                            }
                            <li className="nav-item">
                                <NavLink activeClassName='active-class' className="nav-link text-white" to='/slots'>Slots</NavLink>
                            </li>
                            {role === 'user' &&
                                <Fragment>
                                    <li className="nav-item">
                                        <NavLink activeClassName='active-class' className="nav-link text-white" to='/active-bookings'>Active Bookings</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink activeClassName='active-class' className="nav-link text-white" to='/all-bookings'>Profile</NavLink>
                                    </li>
                                </Fragment>
                            }
                            <li className="nav-item">
                                <NavLink activeClassName='active-class' to='/login' className="nav-link text-white" onClick={(e) => {
                                    userLogoutAction()
                                }}>Logout</NavLink>
                            </li>
                        </Fragment>
                    }
                </ul>
            </div>
        </nav>
    )
}

export default withRouter(Navbar)
