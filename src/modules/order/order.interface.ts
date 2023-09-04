export type IOrder = {
  id: string;
  userId: string;
  orderedBooks: IOrderedBook[];
  status: string;
  createdAt: Date;
};

type IOrderedBook = {
  id: string;
  bookId: string;
  quantity: number;
};
