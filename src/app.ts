import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

import { PrismaClient } from '@prisma/client';
import cookieParser from 'cookie-parser';
import { BookRoutes } from './modules/book/book.routes';
import { CategoryRoutes } from './modules/category/category.routes';
import { OrderRoutes } from './modules/order/order.routes';
import { UserRoutes } from './modules/user/user.routes';

const app: Application = express();
export const prisma = new PrismaClient();

app.use(cors());
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/', UserRoutes);
app.use('/api/v1/', CategoryRoutes);
app.use('/api/v1/', BookRoutes);
app.use('/api/v1/', OrderRoutes);

//global error handler
app.use(globalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
