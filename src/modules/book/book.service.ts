import { Prisma } from '@prisma/client';
import { prisma } from '../../app';
import { IGenericResponse } from '../../interfaces/common';
import { IBook, IBookFilters, IBookPaginationOptions } from './book.interface';

const createBook = async (book: IBook): Promise<IBook | null> => {
  const createdBook = await prisma.book.create({
    data: book,
    include: {
      category: true,
    },
  });
  return createdBook;
};

const getAllBooks = async (
  filters: IBookFilters,
  paginationFields: IBookPaginationOptions
): Promise<IGenericResponse<IBook[]>> => {
  const query: Prisma.BookFindManyArgs = {};

  // Apply filters
  if (filters.search) {
    query.where = {
      OR: [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { author: { contains: filters.search, mode: 'insensitive' } },
        { genre: { contains: filters.search, mode: 'insensitive' } },
      ],
    };
  }

  if (filters.minPrice !== undefined) {
    query.where = {
      ...query.where,
      price: { gte: parseInt(filters.minPrice) },
    };
  }

  if (filters.maxPrice !== undefined) {
    query.where = {
      ...query.where,
      price: { lte: parseInt(filters.maxPrice) },
    };
  }

  if (filters.category) {
    query.where = { ...query.where, categoryId: filters.category };
  }

  // Apply pagination options
  if (
    paginationFields.page !== undefined &&
    paginationFields.size !== undefined
  ) {
    query.take = paginationFields.size;
    query.skip = (paginationFields.page - 1) * paginationFields.size;
  }

  if (paginationFields.sortBy) {
    query.orderBy = {
      [paginationFields.sortBy]: paginationFields.sortOrder || 'asc',
    };
  }

  // Fetch books
  const books = await prisma.book.findMany(query);

  return {
    meta: {
      page: paginationFields.page || 1,
      size: paginationFields.size || 10,
      total: books.length,
      totalPage: Math.ceil(books.length / (paginationFields.size || 10)),
    },
    data: books,
  };
};
const getCatgoryBooks = async (
  categoryid: string,
  paginationFields: IBookPaginationOptions
): Promise<IGenericResponse<IBook[]>> => {
  const query: Prisma.BookFindManyArgs = {};

  // Apply pagination options
  if (
    paginationFields.page !== undefined &&
    paginationFields.size !== undefined
  ) {
    query.take = paginationFields.size;
    query.skip = (paginationFields.page - 1) * paginationFields.size;
  }

  if (paginationFields.sortBy) {
    query.orderBy = {
      [paginationFields.sortBy]: paginationFields.sortOrder || 'asc',
    };
  }

  // Filter by category
  query.where = {
    categoryId: categoryid,
  };

  // Fetch books
  const books = await prisma.book.findMany(query);

  return {
    meta: {
      page: paginationFields.page || 1,
      size: paginationFields.size || 10,
      total: books.length,
      totalPage: Math.ceil(books.length / (paginationFields.size || 10)),
    },
    data: books,
  };
};

export const BookService = {
  createBook,
  getAllBooks,
  getCatgoryBooks,
};
