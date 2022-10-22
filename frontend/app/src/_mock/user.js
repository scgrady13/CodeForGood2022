import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.fullName(),
  company: sample([
    '08143168',
    '48173168',
    '58177168',
    '38173168',
    '48173668',
    '58143168',
    '28173168',
    '08373168',
    '18173158',
    '28273168',
    '58173168',
    '48153168',
  ]),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'inactive']),
  role: sample([
    'Bright Lights',
    'Loud Noises',
    'Low Light',
    'Sensory Overload',
    'High Stimuli',
    'Patience',
    'Spacial Area',
  ]),
}));

export default users;
