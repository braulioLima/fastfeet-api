import { factory } from 'factory-girl';
import faker from 'faker';

import Deliveryman from '../src/app/models/Deliveryman';

import User from '../src/app/models/User';
import Recipient from '../src/app/models/Recipient';

/**
 * Factorys of user
 */
factory.define('user', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('login', User, {
  email: faker.internet.email(),
  password: faker.internet.password(),
});

/**
 * Factories of recipient
 */
factory.define('recipient', Recipient, {
  name: faker.name.findName(),
  street: faker.address.streetName(),
  number: faker.address
    .streetAddress()
    .split(' ')
    .slice(0, 1)[0],
  complement: faker.address.secondaryAddress(),
  city: faker.address.city(),
  state: faker.address.stateAbbr(),
  zip_code: faker.address.zipCode('########'),
});

factory.define('deliveryman', Deliveryman, {
  name: faker.name.findName(),
  email: faker.internet.email(),
});

export default factory;
