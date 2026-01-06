import { prisma } from '../lib/prisma';

async function main() {
  console.log('Start seeding...');

  // Create categories
  const coffee = await prisma.category.upsert({
    where: { name: 'Coffee' },
    update: {},
    create: { name: 'Coffee' }
  });

  const food = await prisma.category.upsert({
    where: { name: 'Food' },
    update: {},
    create: { name: 'Food' }
  });

  const desserts = await prisma.category.upsert({
    where: { name: 'Desserts' },
    update: {},
    create: { name: 'Desserts' }
  });

  const drinks = await prisma.category.upsert({
    where: { name: 'Drinks' },
    update: {},
    create: { name: 'Drinks' }
  });

  console.log('Categories created:', { coffee, food, desserts, drinks });

  // Create some products
  const espresso = await prisma.product.create({
    data: {
      name: 'Espresso',
      description: 'Rich and bold shot of pure coffee',
      price: 8.00,
      categoryId: coffee.id,
      images: {
        create: {
          url: '/images/jeremy-yap-jn-HaGWe4yw-unsplash.jpg'
        }
      }
    }
  });

  const cappuccino = await prisma.product.create({
    data: {
      name: 'Cappuccino',
      description: 'Espresso with steamed milk and foam',
      price: 10.00,
      categoryId: coffee.id,
      images: {
        create: {
          url: '/images/joe-hepburn-EcWFOYOpkpY-unsplash.jpg'
        }
      }
    }
  });

  const croissant = await prisma.product.create({
    data: {
      name: 'Croissant',
      description: 'Buttery, flaky French pastry',
      price: 3.50,
      categoryId: food.id,
      images: {
        create: {
          url: '/images/kobby-mendez-iyM-XTsTiek-unsplash.jpg'
        }
      }
    }
  });

  const chocolateCake = await prisma.product.create({
    data: {
      name: 'Chocolate Cake',
      description: 'Rich chocolate layers',
      price: 5.50,
      categoryId: desserts.id,
      images: {
        create: {
          url: '/images/umesh-soni-LDnmyOaA-ew-unsplash.jpg'
        }
      }
    }
  });

  console.log('Products created:', { espresso, cappuccino, croissant, chocolateCake });
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
