import { Field, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Usuario{
    @Field()
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column({ unique: true })
    nombre: string

    @Column()
    contrasena: string

    @Field()
    @CreateDateColumn()
    creado_en: Date
}