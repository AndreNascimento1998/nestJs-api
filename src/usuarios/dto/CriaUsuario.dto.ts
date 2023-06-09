import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { EmailEhUnico } from "../validacao/emailUnico.validator"

export class CriaUsuarioDTO {
    
    @IsNotEmpty()
    nome: string
    
    @EmailEhUnico({message: 'Nome existente'})
    @IsEmail()
    email: string

    @MinLength(6)
    senha: string
}