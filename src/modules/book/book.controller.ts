import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import pick from '../../shared/pick';
import { bookFilterableFields, paginationFields } from './book.interface';
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

const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = pick(req.query, bookFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await BookService.getAllBooks(filters, paginationOptions);

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Books fetched successfully',
      meta: {
        // Metadata
        page: result.meta.page,
        size: result.meta.size,
        total: result.meta.total,
        totalPage: result.meta.totalPage,
      },
      data: result.data, // Data
    });
  } catch (error) {
    return next(error);
  }
};

const getSingleBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const result = await BookService.getSingleBook(id);

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Book fetched successfully',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
};

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await BookService.updateBook(id, updatedData);

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Book updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    const result = await BookService.deleteBook(id);

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Book Deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getCatgoryBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryId = req.params.categoryid;
    const paginationOptions = pick(req.query, paginationFields);
    const result = await BookService.getCatgoryBooks(
      categoryId,
      paginationOptions
    );

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Books with associated category data fetched successfully',
      meta: {
        // Metadata
        page: result.meta.page,
        size: result.meta.size,
        total: result.meta.total,
        totalPage: result.meta.totalPage,
      },
      data: result.data, // Data
    });
  } catch (error) {
    return next(error);
  }
};

export const BookController = {
  createBook,
  getAllBooks,
  getCatgoryBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
