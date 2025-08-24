import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm"
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
@Module({
  imports: [TypeOrmModule.forRoot({
    type : "postgres" ,
    host : "localhost",
    port : 5432 ,
    username : "postgres",
    password : "@Reza0918",
    database : "typeorm" ,
    // autoLoadEntities : true ,
    entities : ["dist/**/**/*.entity{.ts,.js}"] ,
    synchronize : true 
  }), UserModule, BlogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
