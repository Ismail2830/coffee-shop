# Coffee Shop Database - Prisma Setup

## Database Schema

Your PostgreSQL database has been successfully created with the following tables:

### 1. **Category Table**
- `id` - Unique identifier (CUID)
- `name` - Category name (unique)
- `products` - Relation to products
- `createdAt` - Timestamp
- `updatedAt` - Timestamp

### 2. **Product Table**
- `id` - Unique identifier (CUID)
- `name` - Product name
- `description` - Optional description
- `price` - Product price (Float)
- `categoryId` - Foreign key to Category
- `category` - Relation to Category
- `images` - Relation to multiple images
- `createdAt` - Timestamp
- `updatedAt` - Timestamp

### 3. **Image Table**
- `id` - Unique identifier (CUID)
- `url` - Image URL
- `productId` - Foreign key to Product
- `product` - Relation to Product
- `createdAt` - Timestamp

### 4. **User Table**
- `id` - Unique identifier (CUID)
- `email` - User email (unique)
- `name` - Optional user name
- `password` - Hashed password
- `role` - USER or ADMIN (enum)
- `createdAt` - Timestamp
- `updatedAt` - Timestamp

## Usage Examples

### Import Prisma Client
```typescript
import { prisma } from '@/lib/prisma'
```

### Create a Category
```typescript
const category = await prisma.category.create({
  data: {
    name: 'Coffee'
  }
})
```

### Create a Product with Images
```typescript
const product = await prisma.product.create({
  data: {
    name: 'Espresso',
    description: 'Rich and bold shot of pure coffee',
    price: 8.00,
    categoryId: 'your-category-id',
    images: {
      create: [
        { url: '/images/espresso-1.jpg' },
        { url: '/images/espresso-2.jpg' }
      ]
    }
  },
  include: {
    images: true,
    category: true
  }
})
```

### Get All Products with Category and Images
```typescript
const products = await prisma.product.findMany({
  include: {
    category: true,
    images: true
  }
})
```

### Get Products by Category
```typescript
const coffeeProducts = await prisma.product.findMany({
  where: {
    category: {
      name: 'Coffee'
    }
  },
  include: {
    images: true
  }
})
```

### Create an Admin User
```typescript
import bcrypt from 'bcrypt'

const hashedPassword = await bcrypt.hash('your-password', 10)

const admin = await prisma.user.create({
  data: {
    email: 'admin@cafe.com',
    name: 'Admin',
    password: hashedPassword,
    role: 'ADMIN'
  }
})
```

### Update Product
```typescript
const updatedProduct = await prisma.product.update({
  where: { id: 'product-id' },
  data: {
    price: 10.00
  }
})
```

### Delete Product (cascades to images)
```typescript
await prisma.product.delete({
  where: { id: 'product-id' }
})
```

## Prisma Commands

- **Generate Client**: `npx prisma generate`
- **Create Migration**: `npx prisma migrate dev --name migration_name`
- **View Database**: `npx prisma studio`
- **Reset Database**: `npx prisma migrate reset`
- **Check Migration Status**: `npx prisma migrate status`

## Next Steps for Admin Dashboard

1. Create authentication API routes for login/logout
2. Create protected API routes for CRUD operations
3. Build admin UI components for managing:
   - Categories
   - Products
   - Images
   - Users

Your database is ready to use! 🎉
