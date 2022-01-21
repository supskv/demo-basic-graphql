import { Inject, Injectable } from '@nestjs/common';
import { NewUserInput } from './dto/new-user.input';
import { UsersArgs } from './dto/users.args';
import { User as UserEntity } from './user.entity';
import { User } from './models/user.model';


@Injectable()
export class UserService {
    constructor(@Inject('USERS_REPOSITORY') private usersRepository: typeof UserEntity) {}

    async create(data: NewUserInput): Promise<User> {
        const newUser: UserEntity = this.usersRepository.build({
            username: data.username,
            description: data.description || ""
        })
        return await newUser.save();
    }

    async findOneById(id: number): Promise<User> {
        return await this.usersRepository.findByPk(id)
    }

    async findAll(usersArgs: UsersArgs): Promise<User[]> {
        return await this.usersRepository.findAll()
    }

    async remove(id: number): Promise<boolean> {
        const deletedRows = await this.usersRepository.destroy({ where: { id } })
        return deletedRows > 0
    }
}
