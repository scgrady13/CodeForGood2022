import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const POST_TITLES = [
  'Whiteboard Templates By Industry Leaders',
  'Today’s class having fun time',
  'Together we are strong',
  '✨What we accomplished today✨',
  'Special art for kids',
  'Come join us Tommorrow',
  'Committed for a better future',
  'knowledge is power',
  'DJ night live',
  'Autism Building The Puzzle Support Group Call',
  'Autism Friendly Inclusion: Leading the Way New England',
  'Autism Friendly Inclusion: National Capital',
  'Autism Friendly Inclusion: North Texas and Southwest System Design',
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
