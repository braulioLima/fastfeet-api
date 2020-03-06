import { factory } from 'factory-girl';
import faker from 'faker';
import User from '../src/app/models/User';

factory.define('user', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('login', User, {
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export default factory;
