// src/controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/usuarios';
import { Permissoes } from '../models/permissoes'; // Model Permissoes

export const login = async (req: Request, res: Response): Promise<void> => {
  const { Email, Senha } = req.body;
  
  try {
    const usuario = await Usuario.findOne({ where: { Email } });
    
    if (!usuario) {
      res.status(400).json({ message: 'Usuário não encontrado' });
      return;
    }

    const senhaValida = await bcrypt.compare(Senha, usuario.Senha);
    if (!senhaValida) {
      res.status(401).json({ message: 'Senha incorreta' });
      return;
    }

    // Obter permissões do usuário diretamente da tabela 'Permissoes'
    const permissoes = await Permissoes.findAll({
      where: { Usuarios_idUsuario: usuario.idUsuario }
    });

   
    // Criar um array de permissões
    const permissoesArray = permissoes.map((permissao: any) => {
      const permissoesUsuario = [];
      if (permissao.ler) permissoesUsuario.push('ler');
      if (permissao.atualizar) permissoesUsuario.push('atualizar');
      if (permissao.criar) permissoesUsuario.push('criar');
      if (permissao.deletar) permissoesUsuario.push('deletar');
      return permissoesUsuario;
    }).flat(); // Flatten para uma lista única de permissões

    // Criar token incluindo o grupo e permissões
    const token = jwt.sign(
      { 
        id: usuario.idUsuario, 
        grupo: usuario.Grupo, 
        permissoes: permissoesArray 
      },
      process.env.JWT_SECRET!, 
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao autenticar usuário' });
    
  }
};




