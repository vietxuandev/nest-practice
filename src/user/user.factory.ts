import { setSeederFactory } from 'typeorm-extension';
import { User } from './entities/user.entity';

export default setSeederFactory(User, (faker) => {
  const user = new User();
  user.firstName = faker.person.firstName('male');
  user.lastName = faker.person.lastName('male');
  user.email = faker.internet.email({
    firstName: user.firstName,
    lastName: user.lastName,
  });
  user.password = faker.internet.password();

  return user;
});
