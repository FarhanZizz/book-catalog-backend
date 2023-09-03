import { prisma } from '../../app';
import { ICategory } from './category.interface';

const createCategory = async (title: ICategory): Promise<ICategory | null> => {
  const createdCategory = await prisma.category.create({
    data: title,
  });
  return createdCategory;
};

const getAllCategories = async (): Promise<ICategory[] | null> => {
  const result = await prisma.category.findMany();
  return result;
};

const getSingleCategory = async (id: string): Promise<ICategory | null> => {
  const categoryWithBooks = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      books: true, // Include the 'books' relation
    },
  });

  return categoryWithBooks;
};

const updateCategory = async (
  id: string,
  payload: Partial<ICategory>
): Promise<ICategory | null> => {
  const updatedCategory = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });

  return updatedCategory;
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
};