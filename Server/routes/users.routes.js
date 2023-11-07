import { Router } from 'express';
import { isValidLoginForm, isValidRegisterForm } from '../validations/validation';
import { postUserLogin, postRegisterUser, getUserDetails } from '../controllers/users.controllers';

const router = Router();

router.post('/login', isValidLoginForm, postUserLogin);
router.post('/register', isValidRegisterForm, postRegisterUser);
router.get('/ping', getUserDetails);

module.exports = router