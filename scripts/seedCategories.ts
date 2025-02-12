import { seedCategories } from '@/lib/actions/category.actions';

(async () => {
  try {
    await seedCategories();
    console.log('Categories seeded successfully!');
    process.exit(0); 
  } catch (error) {
    console.error('Error seeding categories:', error);
    process.exit(1); 
  }
})();
