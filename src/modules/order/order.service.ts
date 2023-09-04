import { prisma } from '../../app';
import { IOrder } from './order.interface';

const createOrder = async (
  order: IOrder,
  userId: string
): Promise<IOrder | null> => {
  const createdOrder = await prisma.order.create({
    data: {
      userId,
      orderedBooks: {
        create: order.orderedBooks,
      },
      createdAt: new Date(),
    },
    include: {
      orderedBooks: true, // Include the orderedBooks in the response
    },
  });

  // Return the created order
  return createdOrder;
};

const getAllOrders = async (
  role: string,
  id: string
): Promise<IOrder[] | null> => {
  const result = await prisma.order.findMany({
    where: role === 'admin' ? {} : { userId: id },
    include: {
      orderedBooks: true,
    },
  });
  return result;
};

export const OrderService = {
  createOrder,
  getAllOrders,
};
