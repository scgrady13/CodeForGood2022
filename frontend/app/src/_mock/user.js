import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.fullName(),
  company: faker.company.name(),
  isVerified: faker.datatype.boolean(),
  status: sample(['Yes', 'No']),
  role: sample([
    '80.32%',
    '37.2%',
    '16.4%',
    '63.6%',
    '61.3%',
    ' 2.9%',
    '32.8%',
    '27.2%',
    '31.9%',
    '29.1%',
  ]),
}));


export default users;
