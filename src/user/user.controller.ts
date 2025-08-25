import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { profileDto } from './dto/profile-dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/create")
  create(@Body() UserDto : CreateUserDto) {
    return this.userService.create(UserDto);
  }
  @Post("/insert")
  insert(@Body() createDto : CreateUserDto) {
    return this.userService.insert(createDto);
  }
  @Post("/profile")
  createProfile(@Body() profileDtto : profileDto) {
    return this.userService.createProfile(profileDtto);
  }

  @Get("/list")
  findAll(@Query("search") search : string) {
    return this.userService.findAll(search);
  }
  @Get("/order")
  orderData() {
    return this.userService.orderData();
  }
  @Get("/pagination")
  pagination(@Query() paginationDto : {page : number , limit : number}) {
    return this.userService.pagination(paginationDto);
  }

  @Get('/blog/:id')
  getBlogOfUser(@Param("userId") userId : number) {
    return this.userService.blogOfUser(userId);
  }

  @Get('/selection')
  selection() {
    return this.userService.selection();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Get("/profile/:id")
  findUserByProfile(@Param("id")id:string){
    return this.userService.findUserByProfile(+id) 
  }
}
