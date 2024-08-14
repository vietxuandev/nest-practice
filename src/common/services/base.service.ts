import { Injectable, NotFoundException } from '@nestjs/common';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseEntity } from '../entities/base.entity';

@Injectable()
export class BaseService<Entity extends BaseEntity> {
  constructor(protected readonly repository: Repository<Entity>) {}

  async findAll(options?: FindManyOptions<Entity>): Promise<Entity[]> {
    return this.repository.find(options);
  }

  async findAndCount(options: FindManyOptions<Entity>) {
    const [data, totalCount] = await this.repository.findAndCount(options);

    return { data, totalCount };
  }

  async findOne(options?: FindOneOptions<Entity>): Promise<Entity> {
    return this.repository.findOne(options);
  }

  async findOneOrFail(options?: FindOneOptions<Entity>): Promise<Entity> {
    const entity = await this.repository.findOneOrFail(options);
    if (!entity) {
      throw new NotFoundException('Entity not found');
    }
    return entity;
  }

  async create(entity: DeepPartial<Entity>): Promise<Entity> {
    return this.repository.save(entity);
  }

  async update(
    id: number,
    partialEntity: QueryDeepPartialEntity<Entity>,
  ): Promise<Entity> {
    await this.repository.update(id, partialEntity);
    return this.findOneOrFail({
      where: {
        id: id,
      } as FindOptionsWhere<Entity>,
    });
  }

  async remove(id: number): Promise<Entity> {
    const entity = await this.findOneOrFail({
      where: {
        id: id,
      } as FindOptionsWhere<Entity>,
    });
    return this.repository.softRemove(entity);
  }
}
