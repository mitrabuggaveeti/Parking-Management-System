import { Router } from 'express';
import { getUserBookings, postBookSlot, deleteBooking, getUserActiveBookings, getSlotDetails, checkSlot, getAllCompletedBookings, getAllActiveBookings } from '../controllers/bookings.contoller';
import { isUserLoggedIn } from '../utils/authenticate';
import { isValidBookingForm } from '../validations/validation';

const router = Router();

router.get('/', isUserLoggedIn, getUserBookings);
router.get('/all', getAllCompletedBookings);
router.get('/all-active', getAllActiveBookings);
router.post('/', isUserLoggedIn, isValidBookingForm, postBookSlot);
router.post('/check', isUserLoggedIn, isValidBookingForm, checkSlot);
router.get('/active', isUserLoggedIn, getUserActiveBookings);
router.get('/slot/:slotId', isUserLoggedIn, getSlotDetails)
router.delete('/:bookingId', isUserLoggedIn, isUserLoggedIn, deleteBooking);

module.exports = router;