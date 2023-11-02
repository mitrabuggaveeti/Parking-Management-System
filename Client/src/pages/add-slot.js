import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux'
import { resolveByType } from '../utils/utils';
import { toast } from 'react-toastify';
import { isValidAddSlotForm } from '../validation/validations';
import FormInput from '../components/shared/form-input';
import Button from '../components/shared/button';
import { addParkingSlotAction } from '../actions/admin.actions';


const AddSlot = ({ addParkingSlotAction }) => {
    const [slotInfo, setSlotInfo] = useState({
        name: '',
        slots: 1
    });
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setSlotInfo({
            ...slotInfo,
            [e.target.name]: e.target.value
        });
    }
    const serverCallback = ({ type, message }) => {
        setLoading(false);
        resolveByType({
            type,
            success: () => {
                toast.success('Sucessfully added');
                setSlotInfo({ name: '', slots: 1 })
            },
            failure: () => {
                toast.error(message);
            }
        })
    }
    const submit = (e) => {
        e.preventDefault();
        const validation = isValidAddSlotForm(slotInfo);
        console.log(validation)
        if (!validation.isValidForm) return setFormErrors(validation.errors);
        setLoading(true);
        setFormErrors({});
        addParkingSlotAction(slotInfo, serverCallback);
    }
    return (
        <Fragment>
            <h4 className='text-center' style={{ marginTop: '6%' }}>AddSlot</h4>
            <div className='center'>
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Parking Place Name</label>
                        <FormInput name='name' type='text' value={slotInfo.name} error={formErrors.name} onChange={handleChange} className="form-control col-md-12" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter a name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Slots</label>
                        <FormInput type='Number' name='slots' value={slotInfo.slots} error={formErrors.slots} onChange={handleChange} className="form-control col-md-12" id="exampleInputPassword1" placeholder="no. of slots" />
                    </div>
                    <Button onClick={submit} loading={loading} disabled={loading} type="submit" className="btn btn-primary" title='Submit' />
                </form>
            </div>
        </Fragment>
    )
}

export default connect(null, { addParkingSlotAction })(AddSlot)
