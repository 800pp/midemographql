import { Field, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Alumno {
    @Field()
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    nombre: string

    @Field()
    @Column()
    edad: number
    
}