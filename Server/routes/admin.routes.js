import { Router } from 'express';
import { isAdmin, isUserLoggedIn } from '../utils/authenticate';
import { postParkingSlot, deleteParkingSlot, getParkingSlots } from '../controllers/parking-slots.controller';

const router = Router();


router.post('/parking', isAdmin, postParkingSlot);
router.get('/parkingslot', isUserLoggedIn, getParkingSlots);
router.delete('/parking/:slotId', isAdmin, deleteParkingSlot);

module.exports = router;