import React, { useEffect, useState } from 'react';
import moment from 'moment'
import { connect } from 'react-redux';
import { userActiveBookingsAction, deleteBookingAction } from '../actions/user.actions';
import AppLoader from '../components/shared/app-loader';
import { checkLoading } from '../utils/utils';
import Button from '../components/shared/button';

const AllBookings = (props) => {
    const { userActiveBookingsAction, activeBookings, deleteBookingAction } = props;
    useEffect(() => {
        userActiveBookingsAction();
    }, [userActiveBookingsAction]);
    const [search, setSearch] = useState('');
    if (Array.isArray(activeBookings) && !activeBookings[0]) {
        return <div className='display-center text-center'>
            <span className='text-center'>No Bookings to display</span>
        </div>
    }
    const handleClick = (e, id) => {
        e.stopPropagation();
        deleteBookingAction({ bookingId: id });
    }
    return (
        <div className='container'>
            <AppLoader loading={checkLoading(activeBookings)} failType='Coudnt fetch now'>
                {
                    activeBookings &&
                    <div className='container' style={{ marginTop: '20px' }}>
                        <form className="my-2 my-lg-0 col-md-6" onSubmit={(e) => e.preventDefault()}>
                            <div style={{ marginBottom: '10px' }}>
                                <input onChange={(e) => setSearch(e.target.value)} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            </div>
                        </form>
                        <table class="table">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Place</th>
                                    <th scope="col">SlotNumber</th>
                                    <th scope="col">From</th>
                                    <th scope="col">To</th>
                                    <th scope="col">Price in &#x20b9;</th>
                                    <th scope='col'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {activeBookings.filter(slot => slot.name.includes(search)).map((slot, i) => (
                                    <tr>
                                        <th scope="row">{i + 1}</th>
                                        <td>{slot.name}</td>
                                        <td>{slot.slotNumber}</td>
                                        <td>{moment(slot.from).format("YYYY-MM-DD HH:mm:ss")}</td>
                                        <td>{moment(slot.to).format("YYYY-MM-DD HH:mm:ss")}</td>
                                        <td>{Math.abs(new Date(slot.to) - new Date(slot.from)) / 60000}</td>
                                        <td><Button className='btn btn-sm bg-dark text-white' title='Cancel' onClick={(e) => handleClick(e, slot._id)} /></td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                }
            </AppLoader>
        </div>
    )
}

const mapStateToProps = (state) => ({
    activeBookings: state.user.activeBookings
});

const mapDispatchToProps = (dispatch) => ({
    userActiveBookingsAction: (...rest) => dispatch(userActiveBookingsAction(...rest)),
    deleteBookingAction: (...rest) => dispatch(deleteBookingAction(...rest))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllBookings)
