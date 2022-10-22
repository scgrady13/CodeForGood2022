import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const POST_TITLES = [

  'Inclusive DJ Education Classes',
  'Inclusive Music Production Classe',
  'FAQ Documentation',
  '✨What is Done is Done ✨',
  'Article Title - Author',
  'Article Title - Author',
  'Article Title - Author',
  'Article Title - Author',
  'Article Title - Author',
  'Article Title - Author',
  'Article Title - Author',
  'Article Title - Author',
  'Article Title - Author',
  'Article Title - Author',
  'Article Title - Author',
  'Article Title - Author',
  'Article Title - Author',
  'Article Title - Author',
  'Article Title - Author',
  'Article Title - Author',
  'Article Title - Author',
  'Article Title - Author',
  'Article Title - Author',
  'Article Title - Author',

];

const posts = [...Array(11)].map((_, index) => ({
  id: faker.datatype.uuid(),
  cover: `/assets/images/covers/cover_${index + 1}.jpg`,
  title: POST_TITLES[index + 1],
  createdAt: faker.date.past(),
  view: faker.datatype.number(),
  comment: faker.datatype.number(),
  share: faker.datatype.number(),
  favorite: faker.datatype.number(),
  author: {
    name: faker.name.fullName(),
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  },
}));

export default posts;
