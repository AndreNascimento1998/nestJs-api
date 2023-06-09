import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { UsuarioRepository } from "../usuario.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailUnicoValidator implements ValidatorConstraintInterface {

    constructor(private usuarioRepository: UsuarioRepository) {}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const usuarioComEmailExiste = await this.usuarioRepository.existeComEmail(value)

        return !usuarioComEmailExiste
    }
}

export const EmailEhUnico = (options: ValidationOptions) => {
    return (obj: Object, props: string) => {
        registerDecorator({
            target: obj.constructor,
            propertyName: props,
            options: options,
            constraints: [],
            validator: EmailUnicoValidator
        })
    }
}