import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppLoader from './shared/app-loader'
import AuthRoute from './auth-route';
import slotsList from '../pages/slots-list';
import slotDetail from '../pages/slot-detail';
import allBookings from '../pages/all-bookings';
import activeBookings from '../pages/active-bookings';
import addSlot from '../pages/add-slot';
import Home from '../pages/home';
import AdminAllBookings from '../pages/admin/all-bookings';
import AdminActiveBookings from '../pages/admin/active-bookings'

const login = lazy(() => import('../containers/auth/login'));
const register = lazy(() => import('../containers/auth/register'));

const AppRouter = ({ loggedIn, role }) => {
    return (
        <Suspense fallback={<AppLoader loading={true} />}>
            <Switch>
                <Route path='/' exact component={Home} />
                <AuthRoute loggedIn={loggedIn} isValidRole={role === 'admin'} component={AdminActiveBookings} path='/admin/active-bookings' />
                <AuthRoute loggedIn={loggedIn} isValidRole={role === 'admin'} component={AdminAllBookings} path='/admin/all-bookings' />
                <AuthRoute loggedIn={!loggedIn} isValidRole={!loggedIn} component={login} path='/login' />
                <AuthRoute loggedIn={!loggedIn} isValidRole={!loggedIn} component={register} path='/register' />
                <AuthRoute loggedIn={loggedIn} isValidRole={loggedIn} component={slotsList} path='/slots' />
                <AuthRoute loggedIn={loggedIn} isValidRole={loggedIn} component={slotDetail} path='/slot/:slotId' />
                <AuthRoute loggedIn={loggedIn} isValidRole={role === 'user'} component={allBookings} path='/all-bookings' />
                <AuthRoute loggedIn={loggedIn} isValidRole={role === 'user'} component={activeBookings} path='/active-bookings' />
                <AuthRoute loggedIn={loggedIn} isValidRole={role === 'admin'} component={addSlot} path='/add-slot' />
            </Switch>
        </Suspense>
    )
}

export default AppRouter
