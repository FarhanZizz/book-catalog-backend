import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { BookService } from './book.service';

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = req.body;

    const result = await BookService.createBook(book);

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Book created successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
};

export const BookController = {
  createBook,
};
