import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { OrderService } from './order.service';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = req.body;

    const result = await OrderService.createOrder(order, req.user?.id);

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
};

const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await OrderService.getAllOrders(
      req?.user?.role,
      req?.user?.id
    );

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Order fetched successfully',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
};

export const OrderController = {
  createOrder,
  getAllOrders,
};
