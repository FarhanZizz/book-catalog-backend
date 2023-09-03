import express from 'express';
import auth from '../../app/middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/auth/signup', UserController.createUser);
router.get('/auth/signin', UserController.loginUser);
router.get('/users', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);

export const UserRoutes = router;
