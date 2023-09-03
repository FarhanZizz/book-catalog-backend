import { prisma } from '../../app';
import { IBook } from './book.interface';

const createBook = async (book: IBook): Promise<IBook | null> => {
  const createdBook = await prisma.book.create({
    data: book,
    include: {
      category: true,
    },
  });
  return createdBook;
};

export const BookService = {
  createBook,
};
