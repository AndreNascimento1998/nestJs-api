import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator"
import { EmailEhUnico } from "../validacao/emailUnico.validator"

export class AtualizaUsuarioDTO {
    
    @IsNotEmpty()
    @IsOptional()
    nome: string
    
    @EmailEhUnico({message: 'Nome existente'})
    @IsEmail()
    @IsOptional()
    email: string

    @MinLength(6)
    @IsOptional()
    senha: string
}