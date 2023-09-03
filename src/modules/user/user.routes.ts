import express from 'express';
import auth from '../../app/middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/auth/signup', UserController.createUser);
router.get('/auth/signin', UserController.loginUser);
router.patch(
  '/users/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.updateUser
);
router.get(
  '/users/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.getSingleUser
);
router.delete(
  '/users/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.deleteUser
);
router.get('/users', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);

export const UserRoutes = router;
