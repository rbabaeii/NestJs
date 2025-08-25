import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("profile")
export class profileEntity{
    @PrimaryGeneratedColumn("increment")
    id : number
    @Column({nullable : true})
    bio : string
    @Column({nullable : true})
    img : string
    @Column()
    userId : number
    @OneToOne(()=>UserEntity , (user)=>user.profile , {onDelete:"CASCADE" ,
        // eager : true
    })
    user = UserEntity
}