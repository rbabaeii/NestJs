import { BlogEntity } from "src/blog/entities/blog.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class UserEntity {
    @PrimaryGeneratedColumn("increment")
    id : number ;
    @Column()
    first_name : string ;
    @Column() 
    last_name : string ;
    @Column({nullable : true}) 
    email : string ;
    @Column({nullable : true}) 
    age : number ;
    @CreateDateColumn()
    created_ad : Date ;
    @OneToMany(()=>BlogEntity , (blog)=> blog.user)
    blog : BlogEntity[]

}