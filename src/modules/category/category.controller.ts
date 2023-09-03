import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { CategoryService } from './category.service';

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body;

    const result = await CategoryService.createCategory(user);

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Category created successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
};

const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await CategoryService.getAllCategories();

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Categories fetched successfully',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
};
const getSingleCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const result = await CategoryService.getSingleCategory(id);

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Category fetched successfully',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
};

const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await CategoryService.updateCategory(id, updatedData);

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Category updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const result = await CategoryService.deleteCategory(id);

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Category Deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const CategoryController = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
