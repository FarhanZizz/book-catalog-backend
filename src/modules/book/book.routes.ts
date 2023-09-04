import express from 'express';
import auth from '../../app/middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';
import { BookController } from './book.controller';

const router = express.Router();

router.post(
  '/books/create-book',
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.createBook
);
router.get(
  '/books',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  BookController.getAllBooks
);
router.get(
  '/books/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  BookController.getSingleBook
);
router.patch(
  '/books/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.updateBook
);
router.delete(
  '/books/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.deleteBook
);
router.get(
  '/books/:categoryid/category',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  BookController.getCatgoryBooks
);

export const BookRoutes = router;
