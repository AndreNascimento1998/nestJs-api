import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { v4 as uuid } from 'uuid'
import { listaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { AtualizaUsuarioDTO } from "./dto/AtualizaUsuario.dto";

@Controller('/usuarios')
export class UsuarioController {

    constructor(private usuarioRepository: UsuarioRepository) {

    }

    @Post()
    async criaUsuario(@Body() dadosUsuario: CriaUsuarioDTO) {
        const usuarioEntity = new UsuarioEntity()
        usuarioEntity.email = dadosUsuario.email
        usuarioEntity.nome = dadosUsuario.nome
        usuarioEntity.senha = dadosUsuario.senha
        usuarioEntity.id = uuid()

        this.usuarioRepository.salvar(usuarioEntity)
        return {
            usuario: new listaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
            message: 'Usuario Criado'
        }
    }

    @Get()
    async listaUsuario() {
        const usuarioSalvo = await this.usuarioRepository.listar()
        const usuariosLista = usuarioSalvo.map( usuario => new listaUsuarioDTO(
                usuario.id,
                usuario.nome
            )
        )
        return usuariosLista
    }

    @Put('/:id')
    async atualizarUsuario(@Param('id') id: string, @Body() novosDados: AtualizaUsuarioDTO) {
        const usuarioAtualizado = await this.usuarioRepository.atualiza(id, novosDados)

        return {
            usuario: usuarioAtualizado,
            message: 'Usuario Atualizado com sucesso'
        }
    }

    @Delete('/:id')
    async removeUsaurio(@Param('id') id: string) {
        const usuarioRemovido = await this.usuarioRepository.remove(id)

        return {
            usuario: usuarioRemovido,
            message: 'Usuário removido com sucesso'
        }
    }
}