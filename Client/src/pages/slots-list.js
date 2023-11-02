import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'
import AppLoader from '../components/shared/app-loader';
import { checkLoading, resolveByType } from '../utils/utils';
import { allParkingSlots } from '../actions/user.actions';
import { connect } from 'react-redux';
import Button from '../components/shared/button';
import { removeParkingSlotAction } from '../actions/admin.actions';
import { toast } from 'react-toastify';

const SlotsList = (props) => {
    const { parkingSlots, allParkingSlots, role, removeParkingSlotAction } = props;
    const [search, setSearch] = useState('');
    useEffect(() => {
        allParkingSlots();
    }, [allParkingSlots]);
    const serverCallback = ({ type, message }) => {
        resolveByType({
            type,
            failure: () => toast.error(message)
        })
    }
    const handleClick = (e, parkingId) => {
        e.stopPropagation();
        removeParkingSlotAction({ parkingId }, serverCallback)
    }
    if (Array.isArray(parkingSlots) && !parkingSlots[0]) {
        return <div className='display-center'>
            <span className='text-center'>No Slots to display</span>
        </div>
    }
    return (
        <AppLoader loading={checkLoading(parkingSlots)} failType='Coudnt fetch now'>
            {parkingSlots &&
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
                                <th scope="col">Slots</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {parkingSlots.filter(slot => slot.name.includes(search)).map((slot, i) => (
                                <tr>
                                    <th scope="row">{i + 1}</th>
                                    <td>{slot.name}</td>
                                    <td>{slot.slots}</td>
                                    {role === 'admin' ? <td><Button onClick={(e) => handleClick(e, slot._id)} className='btn btn-sm bg-dark text-white' title='remove' /></td> :
                                        <td><NavLink to={`/slot/${slot._id}`}>Book</NavLink></td>}
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            }
        </AppLoader>
    )
}

const mapStateToProps = (state) => ({
    parkingSlots: state.user.parkingSlots,
    role: state.session.profile.role
});

const mapDispatchToProps = (dispatch) => ({
    allParkingSlots: (...rest) => dispatch(allParkingSlots(...rest)),
    removeParkingSlotAction: (...rest) => dispatch(removeParkingSlotAction(...rest))
})

export default connect(mapStateToProps, mapDispatchToProps)(SlotsList)