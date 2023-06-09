import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto";

@Controller('/usuarios')
export class UsuarioController {

    constructor(private usuarioRepository: UsuarioRepository) {

    }

    @Post()
    async criaUsuario(@Body() dadosUsuario: CriaUsuarioDTO) {
        this.usuarioRepository.salvar(dadosUsuario)
        return dadosUsuario
    }

    @Get()
    async listaUsuario() {
        return this.usuarioRepository.listar()
    }
}