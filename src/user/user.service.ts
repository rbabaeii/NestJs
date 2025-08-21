import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { FindOptionsWhere, MoreThan, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepositoy : Repository<UserEntity>
  ){}
  
  async create(UserDto : CreateUserDto) {
    const {first_name , last_name , age , email} = UserDto
    const user = this.userRepositoy.create({first_name , last_name , age , email})
    return await this.userRepositoy.save(user)
  
  }
  
  async insert(UserDto : CreateUserDto) {
      const {first_name , last_name , age , email} = UserDto
    return await this.userRepositoy.insert({first_name , last_name , age , email
    })
  
  }

  async findAll(search : string) {
    let where : FindOptionsWhere<UserEntity> = {}
    if (search) {
      where["first_name"] = search ;
      
    }
    return await this.userRepositoy.find({
      // Like ILike 
      // Not
      // MoreThen , MoreThanOrEqual , LessThan , LessThanOrEqual 
      // where : {id : MoreThan(2)}
      where
    })
    }    
  async findOne(id: number) {
    }
  

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
