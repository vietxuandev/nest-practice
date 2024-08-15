import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/entities/base.entity';
import { tableNames } from 'src/database/helpers/migration';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity(tableNames.users)
export class User extends BaseEntity {
  @Field()
  @Column('varchar', { unique: true })
  email: string;

  @Field()
  @Column('varchar')
  firstName: string;

  @Field()
  @Column('varchar')
  lastName: string;

  @Field()
  @Column('varchar')
  password: string;
}
