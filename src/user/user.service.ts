import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { And, FindOptionsWhere, LessThanOrEqual, MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
import { isDate, IsEmail, IsNumber, IsString } from 'class-validator';


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
    if (search && isDate(new Date(search))) {
      let date = new Date(search)
      let started_at = new Date(date.setUTCHours(0,0,0))
      let finished_at = new Date(date.setUTCHours(23,59,59))
      where['created_ad'] = And(
        MoreThanOrEqual(started_at) , LessThanOrEqual(finished_at)
      )
    }
    return await this.userRepositoy.find({
      // Like ILike 
      // Not
      // MoreThen , MoreThanOrEqual , LessThan , LessThanOrEqual 
      // where : {id : MoreThan(2)}
      where
    })
    }   


  async orderData() {
    return await this.userRepositoy.find({
      where : {},
      order : {id : "ASC"}
    })
    }    
  async pagination(paginitaionDto : {page : number , limit : number}) {
    let {page = 0, limit = 5} = paginitaionDto
    if(!page || page<=0) page = 0
    else page = page -1

    if (!limit || limit <= 0) limit = 5
    let skip = page * limit
    return await this.userRepositoy.find({
      where : {},
      order : {id : "ASC"} ,
      take : limit ,
      skip
    })
    }    



async selection() {
  return await this.userRepositoy.find(
    {
      where :{},
      // select :{
      //   first_name : true ,
      //   last_name : true ,
      //   age : true
      // }
      select : ["first_name",'last_name' , 'age']
    }
  )   
}

async findOne(id: number) {
    const user = await this.userRepositoy.findOneBy({id})
    console.log(id);
    if(!user) throw new NotFoundException()
    return user
    }
  

  async update(id: number, updateUserDto: UpdateUserDto) {
    const User = await this.findOne(id);
    console.log(id);
    console.log(User.first_name , User.id , User.last_name);
    const {first_name , last_name , email , age} = updateUserDto
    if(first_name && IsString()) User.first_name = first_name ;
    if(last_name && IsString()) User.last_name = last_name
    if(email && IsEmail()) User.email = email
    if(age && IsNumber()) User.age = age
    await this.userRepositoy.save(User)
    return {
      message : "user updated succesfuly"
    }
  }

  async remove(id: number) {
    const user = await this.findOne(id)
    await this.userRepositoy.remove(user)
    return {
      message : "deleted successfully"
    }
  }
}
