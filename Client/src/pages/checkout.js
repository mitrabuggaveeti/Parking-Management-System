import React from 'react'
import Payment from './payment'
import { StripeProvider, Elements } from 'react-stripe-elements'

const Checkout = ({ confirmBooking }) => {
    return (
        <div style={{ margin: '60px' }}>
            <h4 className='text-center' style={{ marginBottom: '30px' }}>Payment Details</h4>
            <StripeProvider apiKey="pk_test_94eLnl3sSQUDrIVgt2TYjDHW00z9Z5dRaS">
                <Elements>
                    <Payment confirmBooking={confirmBooking} />
                </Elements>
            </StripeProvider>
        </div>
    )
}

export default Checkout
