import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { parkingSlotDetails, addBooking } from '../actions/user.actions';
import AppLoader from '../components/shared/app-loader';
import { checkLoading, resolveByType } from '../utils/utils';
import FormInput from '../components/shared/form-input';
import Button from '../components/shared/button';
import { isValidBookingForm } from '../validation/validations';
import { toast } from 'react-toastify';
import Checkout from './checkout';

const SlotDetail = (props) => {
    const { selectedSlot, parkingSlotDetails, match: { params: { slotId } }, history: { push } } = props
    useEffect(() => {
        parkingSlotDetails({ slotId });
    }, [slotId, parkingSlotDetails]);
    const { slots, _id } = selectedSlot || {};
    const ar = new Array(parseInt(slots || 0)).fill(1);
    const [state, setState] = useState(0);
    const [info, setInfo] = useState({
        slotNumber: 1,
        from: '',
        to: ''
    });
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const handleChange = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        });
    }
    const serverCallback = ({ type, message }) => {
        setLoading(false);
        resolveByType({
            type,
            success: () => {
                setState(1);
                // setInfo({ from: '', to: '', slotNumber: 1 });
            },
            failure: () => toast.error(message)
        })
    }
    const serverCallback2 = ({ type, message }) => {
        resolveByType({
            type,
            success: () => {
                toast.success('Booking confirmed');
                push('/active-bookings')
            },
            failure: () => toast.error(message)
        })
    }
    const confirmBooking = (tokenId) => {
        props.addBooking({ ...info, parkingId: _id, check: false, tokenId }, serverCallback2)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors({});
        console.log(info)
        const validation = isValidBookingForm(info);
        if (validation.isValidForm) {
            setLoading(true)
            props.addBooking({ ...info, parkingId: _id, check: true }, serverCallback)
        }
        else {
            setFormErrors(validation.errors);
        }
    }
    if (state === 1) {
        return <Checkout confirmBooking={confirmBooking} />
    }
    const { from, to } = info;
    return (
        <div className='container'>
            <AppLoader loading={checkLoading(selectedSlot)} failType='Coudnt fetch now'>
                {selectedSlot &&
                    <div>
                        <h3 className='text-center' style={{ margin: '10px' }}>Select Time and Slot</h3>
                        <form >
                            <div className='form-row'>
                                <div className="form-group col-md-4">
                                    <label htmlFor="inputEmail4">From</label>
                                    <FormInput error={formErrors.from} value={info.from} name='from' onChange={handleChange} type="datetime-local" className="form-control" id="inputEmail4" required />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="inputEmail4">To</label>
                                    <FormInput error={formErrors.to} value={info.to} name='to' onChange={handleChange} type="datetime-local" className="form-control" id="inputEmail4" required />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="inputEmail4">Slot</label>
                                    <select value={info.slotNumber} onChange={handleChange} name='slotNumber' className='form-control'>
                                        {ar.map((el, i) => {
                                            return <option value={i + 1} key={i}>{i + 1}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            {!(Math.abs(new Date(from) - new Date(to)) / 36e5 > 24) && from && to && !(Math.abs(new Date(from) - new Date()) / 36e5 > 24 * 30) && (Math.abs(new Date(to) - new Date(from) / 60000)) > 30 ? <p>Total Payment is &#x20b9; {Math.abs((new Date(to) - new Date(from)) / 60000)}</p> : null}
                            <Button disabled={loading} loading={loading} className='btn bg-primary text-center' title='check availability' onClick={handleSubmit} />
                        </form>
                    </div>
                }
            </AppLoader>
        </div>
    )
}

const mapStateToProps = (state) => ({
    selectedSlot: state.user.selectedSlot
});

const mapDispatchToProps = (dispatch) => ({
    parkingSlotDetails: (...rest) => dispatch(parkingSlotDetails(...rest)),
    addBooking: (...rest) => dispatch(addBooking(...rest))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SlotDetail))
