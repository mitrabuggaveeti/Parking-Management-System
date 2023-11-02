import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment'
import { userBookingsAction } from '../actions/user.actions';
import AppLoader from '../components/shared/app-loader';
import { checkLoading } from '../utils/utils';

const AllBookings = (props) => {
    const { userBookingsAction, bookings, profile: { email, adharNumber } } = props;
    useEffect(() => {
        userBookingsAction();
    }, [userBookingsAction]);
    const [search, setSearch] = useState('');
    return (
        <div className='container'>
            <div style={{ marginTop: '30px', marginBottom: '30px' }}>
                <form>
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Email </label>
                        <div class="col-sm-10">
                            <span className="form-control-plaintext" id="staticEmail"><pre>: {email}</pre></span>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">AadharNumber</label>
                        <div class="col-sm-10">
                            <span className="form-control-plaintext" id="staticEmail"><pre>: {adharNumber}</pre></span>
                        </div>
                    </div>
                </form>
            </div>
            <AppLoader loading={checkLoading(bookings)} failType='Coudnt fetch now'>
                {
                    bookings &&
                    <div className='container' style={{ marginTop: '20px' }}>
                        {
                            Array.isArray(bookings) && !bookings[0] ?
                                <div className='display-center text-center'>
                                    <span className='text-center'>No Bookings to display</span>
                                </div>

                                :
                                <Fragment>
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
                                                <th scope='col'>Price in &#x20b9;</th>
                                                <th scope='col'>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bookings.filter(slot => slot.name.includes(search)).map((slot, i) => (
                                                <tr>
                                                    <th scope="row">{i + 1}</th>
                                                    <td>{slot.name}</td>
                                                    <td>{slot.slotNumber}</td>
                                                    <td>{moment(slot.from).format("YYYY-MM-DD HH:mm:ss")}</td>
                                                    <td>{moment(slot.to).format("YYYY-MM-DD HH:mm:ss")}</td>
                                                    <td>{Math.abs(new Date(slot.to) - new Date(slot.from)) / 60000}</td>
                                                    <td>{slot.status ? 'Completed' : 'Cancelled'}</td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                </Fragment>
                        }
                    </div>
                }
            </AppLoader>
        </div>
    )
}

const mapStateToProps = (state) => ({
    bookings: state.user.bookings,
    profile: state.session.profile
});

const mapDispatchToProps = (dispatch) => ({
    userBookingsAction: (...rest) => dispatch(userBookingsAction(...rest))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllBookings)
