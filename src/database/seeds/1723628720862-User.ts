import { User } from 'src/user/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import * as bcrypt from 'bcryptjs';

export class User1723628720862 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(User);

    const adminUser = await repository.findOneBy({ email: 'admin@gmail.com' });

    if (!adminUser) {
      const password = await bcrypt.hash('admin', 10);

      await repository.insert({
        email: 'admin@gmail.com',
        firstName: 'Admin',
        lastName: 'Admin',
        password,
      });
    }

    const userFactory = factoryManager.get(User);

    await userFactory.saveMany(5);
  }
}
