import { Alumno } from "../entity/alumnoEntity";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { getRepository } from "typeorm";

@Resolver()
export class AlumnoResolver{
    alumnoRepository = getRepository(Alumno)

    @Query( () => [Alumno])
    findAllAlumno() {
        return this.alumnoRepository.find()
    }

    @Query( () => Alumno, {nullable: true})
    findOneAlumno( 
        @Arg("id", () => Int) id: number,
        ) {
        return this.alumnoRepository.findOne(id)
    }

    @Mutation( () => Alumno )
    async saveAlumno( 
        @Arg("nombre", () => String) nombre: string,
        @Arg("edad",() => Int) edad: number
        ) {
        const nuevoAlumno = await this.alumnoRepository.create({nombre: nombre,edad: edad})
        return this.alumnoRepository.save(nuevoAlumno)
    }

    @Mutation( () => Alumno, {nullable: true} )
    async updateAlumno( 
        @Arg("id",() => Int) id: number,
        @Arg("nombre", () => String, {nullable: true}) nombre: string,
        @Arg("edad",() => Int, {nullable: true}) edad: number
        ) {
        const esteAlumno = await this.alumnoRepository.findOne(id)
        if(!esteAlumno){
            return null
        }
        esteAlumno.nombre = nombre || esteAlumno.nombre
        esteAlumno.edad = edad || esteAlumno.edad
        return this.alumnoRepository.save(esteAlumno)
    }

    @Mutation( () => Boolean)
    async deleteAlumno( 
        @Arg("id",() => Int) id: number
        ) {
        try{
            const esteAlumno = await this.alumnoRepository.findOneOrFail(id)
            this.alumnoRepository.delete(esteAlumno)
            return true
        } catch {
            return false
        }
    }
}