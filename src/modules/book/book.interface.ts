export type IBook = {
  id: string;
  title: string;
  author: string;
  price: number;
  genre: string;
  publicationDate: string;
  categoryId: string; // Assuming this is a reference to the category
};
export type IBookFilters = {
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  category?: string;
};
export type IBookPaginationOptions = {
  page?: number;
  size?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

export const bookSearchableFields = ['title', 'author', 'genre'];

export const bookFilterableFields = [
  'search',
  'minPrice',
  'maxPrice',
  'category',
];

export const paginationFields = ['page', 'size', 'sortBy', 'sortOrder'];
