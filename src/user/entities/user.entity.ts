import { BlogEntity } from "src/blog/entities/blog.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { profileEntity } from "./profile.entity";

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
    @Column({nullable: true})
    profileId : number
    @CreateDateColumn()
    created_ad : Date ;
    @OneToMany(()=>BlogEntity , (blog)=> blog.user)
    blog : BlogEntity[]
    @OneToOne(()=>(profileEntity) , (profile)=> profile.user , {onDelete  : "CASCADE" , nullable :true})
    @JoinColumn({name:"profileId"})
    profile : profileEntity

}