import { Usuario } from "../entity/usuarioEntity";
import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { EntityNotFoundError, getRepository } from "typeorm";
import * as argon from "argon2";
import { MyContext } from "src/types/types";

@ObjectType()
class FieldError {
  @Field()
  field: String;

  @Field()
  message: String;
}

@ObjectType()
class UsuarioResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: [FieldError];

  @Field({ nullable: true })
  usuario?: Usuario;
}

@Resolver()
export class UsuarioResolver {
  usuarioRepository = getRepository(Usuario);

  // CRUD START!
  @Query(() => [Usuario])
  findAllUsuario() {
    return this.usuarioRepository.find();
  }

  @Query(() => UsuarioResponse, { nullable: true })
  async findOneUsuario(
    @Arg("id", () => Int) id: number
  ): Promise<UsuarioResponse> {
    const esteAlumno = await this.usuarioRepository.findOneOrFail(id);
    return {
      usuario: esteAlumno,
      errors: [
        {
          field: "api",
          message: "Error con el api",
        },
      ],
    };
  }

  @Mutation(() => UsuarioResponse)
  async saveUsuario(
    @Arg("nombre", () => String) nombre: string,
    @Arg("contrasena", () => String) contrasena: string,
    @Ctx() { req }: MyContext
  ): Promise<UsuarioResponse> {
    const hash = await argon.hash(contrasena);
    if (nombre.length <= 4) {
      return {
        errors: [
          {
            field: "nombre",
            message: "El nombre debe tener más de 4 caracteres",
          },
        ],
      };
    }
    if (contrasena.length <= 4) {
      return {
        errors: [
          {
            field: "contrasena",
            message: "La contraseña debe tener más de 4 caracteres",
          },
        ],
      };
    }
    const esteAlumno = await this.usuarioRepository.create({
      nombre: nombre,
      contrasena: hash,
    });

    const nuevoAlumno = await this.usuarioRepository.save(esteAlumno);

    req.session.usuarioId = nuevoAlumno.id;

    return {
      usuario: nuevoAlumno,
    };
  }
  @Mutation(() => Usuario, { nullable: true })
  async updateNombreUsuario(
    @Arg("id", () => Int) id: number,
    @Arg("nombre", () => String, { nullable: true }) nombre: string
  ) {
    const esteUsuario = await this.usuarioRepository.findOne(id);
    if (!esteUsuario) {
      return null;
    }
    esteUsuario.nombre = nombre || esteUsuario.nombre;
    return this.usuarioRepository.save(esteUsuario);
  }

  @Mutation(() => Usuario, { nullable: true })
  async updateContrasenaUsuario(
    @Arg("contrasena", () => String) contrasena: string
  ) {
    try {
      const esteUsuario = await this.usuarioRepository.findOneOrFail();
      const nuevaContrasena = await argon.hash(contrasena);
      esteUsuario.contrasena = nuevaContrasena;
      return this.usuarioRepository.save(esteUsuario);
    } catch {
      return null;
    }
  }

  @Mutation(() => Boolean)
  async deleteUsuario(@Arg("id", () => Int) id: number) {
    try {
      const esteUsuario = await this.usuarioRepository.findOneOrFail(id);
      //this.usuarioRepository.delete(esteUsuario);
      return true;
    } catch {
      return false;
    }
  }
  // CRUD FINISH!

  // METHODS START!
  @Query(() => UsuarioResponse)
  async logIn(
    @Arg("nombre", () => String) nombre: string,
    @Arg("contrasena", () => String) contrasena: string,
    @Ctx() { req }: MyContext
  ): Promise<UsuarioResponse> {
    try {
      const parcialAlumno = this.usuarioRepository.create({
        nombre: nombre,
      });
      const esteAlumno = await this.usuarioRepository.findOneOrFail(
        parcialAlumno
      );
      if (!(await argon.verify(esteAlumno.contrasena, contrasena))) {
        return {
          errors: [
            {
              field: "contraseña",
              message: "Las contraseñas no coinciden",
            },
          ],
          usuario: esteAlumno,
        };
      }

      req.session.usuarioId = esteAlumno.id;

      return {
        usuario: esteAlumno,
      };
    } catch (err) {
      if ((err.code = "INTERNAL_SERVER_ERROR")) {
        return {
          errors: [
            {
              field: "usuario",
              message: "No se encuentra usuario",
            },
          ],
        };
      }
      return {
        errors: [
          {
            field: "qpi",
            message: "Hubo un problema con el api",
          },
        ],
      };
    }
  }

  @Query(() => Usuario, { nullable: true })
  async verificarSesion(@Ctx() { req }: MyContext) {
    try {
      console.log(req.session.usuarioId);
      return await this.usuarioRepository.findOneOrFail({
        id: req.session.usuarioId,
      });
    } catch {
      return null;
    }
  }
}
