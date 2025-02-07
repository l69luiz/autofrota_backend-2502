// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Permissoes } from '../models/permissoes'; // Supondo que você tenha um model Permissoes
import { Usuario } from '../models/usuarios';

interface JwtPayload {
  id: number;
  //grupo: string;
  loja: string;
  permissoes: string[]; // Array de permissões do usuário
}

interface CustomRequest extends Request {
  user?: {
    id: number;
    //grupo: string;
    loja: string;
    permissoes: string[]; // Array de permissões
  };
}

// Função de autenticação para verificar o token
const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ message: 'Acesso negado!' });
    return; // Impede a execução de código posterior
  }

  try {
    // Decodificando o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = {
      id: decoded.id,
      //grupo: decoded.grupo,
      loja: decoded.loja,
      permissoes: decoded.permissoes, // Armazenando as permissões no Request
    };

    next(); // Prosseguindo com o próximo middleware ou handler
  } catch (error) {
    res.status(400).json({ message: 'Token inválido!' });
    return; // Impede a execução de código posterior
  }
};

// Middleware para verificar permissões antes de permitir o acesso a uma rota
const checkPermission = (nomeTabela: string, acao: string) => {

  return async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    
    const usuario = req.user; // Pegando os dados do req
    const idUsuarioReq  =  Number(req.params.idUsuario); // Obter o id do usuario do req
    //const idUsuario  =  Number(req.user?.id); // Obter o id do usuario do req
    const idLojaToken = Number(req.user?.loja); // Obter o id da loja do Token
    

    //console.log(idUsuarioReq, "IDUserREQ", );
    //console.log(idUsuario, "IDUserTOKEN", idLojaToken, "IDLojaToken");
    
 
    if (!usuario) {
      res.status(401).json({ message: 'Usuário não autenticado!' });
      return;
    }

        // Verificar se o usuário está no banco de dados
        const usuarioNoBanco = await Usuario.findOne({ where: { idUsuario: idUsuarioReq } });
        
        //console.log(usuarioNoBanco, "BDDDDDD");
        
        if (!usuarioNoBanco) {
          res.status(404).json({ message: 'Usuário não encontrado no banco de dados.' });
          return;
        }

    // Verificar se o idLoja do token e o Lojas_idLoja do usuário coincidem
    if (usuarioNoBanco.Lojas_idLoja !== idLojaToken) {
        res.status(403).json({ message: 'Verifique a Loja a qual o usuário pertence.' });
     return;
     }


    // Carregar as permissões do banco de dados
    const permissoes = await Permissoes.findAll({
      
      where: {
        Usuarios_idUsuario: usuario.id,
        NomeTabela: nomeTabela

        
      }
    });
    //console.log(permissoes);

    if (!permissoes || permissoes.length === 0) {
      res.status(403).json({ message: 'Permissão insuficiente para acessar essa tabela.' });
      return;
    }



    

    // Verifica a permissão de acordo com a ação solicitada
    const permissao = permissoes[0]; // Assumindo que temos no máximo 1 permissão por tabela
    const permissaoNecessaria = permissao[acao as keyof typeof permissao];

    if (permissaoNecessaria) {
      next(); // Permissão concedida, passa para o próximo middleware ou rota
    } else {
      res.status(403).json({ message: 'Acesso negado. Permissão insuficiente.' });
    }
  };
};

export { authMiddleware, checkPermission };

