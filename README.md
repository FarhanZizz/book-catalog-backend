### Live Link: https://book-catalog-backend-postgres.vercel.app

### Application Routes:

#### User

- api/v1/auth/signup (POST)
- api/v1/users (GET)
- api/v1/users/856ede5a-1ec0-40c8-a870-f54e6e4f70b8 (Single GET) 
- api/v1/users/856ede5a-1ec0-40c8-a870-f54e6e4f70b8 (PATCH)
- api/v1/users/856ede5a-1ec0-40c8-a870-f54e6e4f70b8 (DELETE) 
- api/v1/profile (GET)

### Category

- api/v1/categories/create-category (POST)
- api/v1/categories (GET)
- api/v1/categories/9f4a4360-10a3-4831-a943-c7f0ea73c8c8 (Single GET) 
- api/v1/categories/9f4a4360-10a3-4831-a943-c7f0ea73c8c8 (PATCH)
- api/v1/categories/9f4a4360-10a3-4831-a943-c7f0ea73c8c8 (DELETE) 

### Books

- api/v1/books/create-book (POST)
- api/v1/books (GET)
- api/v1/books/:categoryId/category (GET)
- api/v1/books/:id (GET)
- api/v1/books/:id (PATCH)
- api/v1/books/:id (DELETE)

### Orders

- api/v1/orders/create-order (POST)
- api/v1/orders (GET) 
- api/v1/orders/:orderId (GET)
