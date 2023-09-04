import express from 'express';
import auth from '../../app/middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';
import { OrderController } from './order.controller';

const router = express.Router();

router.post(
  '/orders/create-order',
  auth(ENUM_USER_ROLE.CUSTOMER),
  OrderController.createOrder
);
router.get(
  '/orders',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  OrderController.getAllOrders
);
router.get(
  '/orders/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  OrderController.getSingleOrder
);

export const OrderRoutes = router;
