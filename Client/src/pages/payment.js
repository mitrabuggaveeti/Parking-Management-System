import React, { Component } from 'react';
import { injectStripe, CardNumberElement, CardCVCElement, CardExpiryElement } from 'react-stripe-elements';
import Button from '../components/shared/button';
import { toast } from 'react-toastify';

class Payment extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.state = {
            loding: false
        }
    }

    async submit(ev) {
        try {
            this.setState({
                loading: true
            })
            let { token } = await this.props.stripe.createToken({ name: "Name" });
            this.props.confirmBooking(token.id)
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong Please try again')
        }

    }

    render() {
        return (
            <div className="checkout col-md-4">
                <label>Card Number (12 digit)</label>
                <div className="my-input" id="card-element">
                    <CardNumberElement />
                </div>
                <span className='expiry'>
                    <label>Expiry Date</label>
                    <div className='a'>
                        <CardExpiryElement />
                    </div>
                </span>
                <span className='cvc'>
                    <label>CVV</label>
                    <div className='a'>
                        <CardCVCElement />
                    </div>
                </span>
                <Button disabled={this.state.loding} loading={this.state.loding} style={{ width: '100%', marginTop: '10px' }} className='btn btn-primary' onClick={this.submit} title='Pay' />
            </div >
        );
    }
}

export default injectStripe(Payment);