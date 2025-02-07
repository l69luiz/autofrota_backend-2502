// src/routes/routes.ts
import express from 'express';
import { login } from '../controllers/authController';
import { 
  getUsuarios, 
  createUsuario, 
  updateUsuario, 
  deleteUsuario, 
  getUsuarioByCpfCnpj, 
  getUsuarioByEmail, 
  getUsuarioById,
  getUsuariosByLoja
} from '../controllers/userController';
import { 
  getVeiculos, 
  createVeiculo, 
  updateVeiculo, 
  deleteVeiculo, 
  getVeiculoByPlaca, 
  getVeiculoById 
} from '../controllers/veiculoController';
import { 
  getClientes, 
  createCliente, 
  updateCliente, 
  deleteCliente, 
  getClienteByCPF_CNPJ, 
  getClienteById 
} from '../controllers/clientesController'; // Importando as funções de cliente
import { authMiddleware, checkPermission } from '../middlewares/authMiddleware';

const router = express.Router();

// Rotas de login
router.post('/login', login);

// Rotas de usuários
//router.get('/usuarios', authMiddleware, checkPermission('Usuarios', 'ler'), getUsuarios); // Lista todos usuário de todas as lojas
router.post('/usuarios', authMiddleware, checkPermission('Usuarios', 'criar'), createUsuario); // Verificando permissão 'criar' para a tabela 'Usuarios'
router.get('/usuarios/cpfcnpj/:CPF_CNPJ', authMiddleware, checkPermission('Usuarios', 'ler'), getUsuarioByCpfCnpj); // Verificando permissão 'ler' para a tabela 'Usuarios'
router.get('/usuarios/email/:Email', authMiddleware, checkPermission('Usuarios', 'ler'), getUsuarioByEmail); // Verificando permissão 'ler' para a tabela 'Usuarios'
router.get('/usuarios/:idUsuario', authMiddleware, checkPermission('Usuarios', 'ler'), getUsuarioById); // Verificando permissão 'ler' para a tabela 'Usuarios'
router.get('/usuarios/loja/:Lojas_idLoja', authMiddleware, checkPermission('Usuarios', 'ler'), getUsuariosByLoja); // Verificando permissão 'ler' para a tabela 'Usuarios'
router.put('/usuarios/:idUsuario', authMiddleware, checkPermission('Usuarios', 'atualizar'), updateUsuario); // Verificando permissão 'atualizar' para a tabela 'Usuarios'
router.delete('/usuarios/:idUsuario', authMiddleware, checkPermission('Usuarios', 'deletar'), deleteUsuario); // Verificando permissão 'deletar' para a tabela 'Usuarios'

// Rotas de veículos
router.get('/veiculos', authMiddleware, checkPermission('Veiculo', 'ler'), getVeiculos); // Verificando permissão 'ler' para a tabela 'Veiculos'
router.post('/veiculos', authMiddleware, checkPermission('Veiculo', 'criar'), createVeiculo); // Verificando permissão 'criar' para a tabela 'Veiculos'
router.get('/veiculos/placa/:Placa_Veiculo', authMiddleware, checkPermission('Veiculo', 'ler'), getVeiculoByPlaca); // Verificando permissão 'ler' para a tabela 'Veiculos'
router.get('/veiculos/:idVeiculo', authMiddleware, checkPermission('Veiculo', 'ler'), getVeiculoById); // Verificando permissão 'ler' para a tabela 'Veiculos'
router.put('/veiculos/:idVeiculo', authMiddleware, checkPermission('Veiculo', 'atualizar'), updateVeiculo); // Verificando permissão 'atualizar' para a tabela 'Veiculos'
router.delete('/veiculos/:idVeiculo', authMiddleware, checkPermission('Veiculo', 'deletar'), deleteVeiculo); // Verificando permissão 'deletar' para a tabela 'Veiculos'

// Rotas de clientes
router.get('/clientes', authMiddleware, checkPermission('Clientes', 'ler'), getClientes); // Verificando permissão 'ler' para a tabela 'Clientes'
router.post('/clientes', authMiddleware, checkPermission('Clientes', 'criar'), createCliente); // Verificando permissão 'criar' para a tabela 'Clientes'
router.get('/clientes/cpfcnpj/:CPF_CNPJ', authMiddleware, checkPermission('Clientes', 'ler'), getClienteByCPF_CNPJ); // Verificando permissão 'ler' para a tabela 'Clientes'
router.get('/clientes/:idCliente', authMiddleware, checkPermission('Clientes', 'ler'), getClienteById); // Verificando permissão 'ler' para a tabela 'Clientes'
router.put('/clientes/:idCliente', authMiddleware, checkPermission('Clientes', 'atualizar'), updateCliente); // Verificando permissão 'atualizar' para a tabela 'Clientes'
router.delete('/clientes/:idCliente', authMiddleware, checkPermission('Clientes', 'deletar'), deleteCliente); // Verificando permissão 'deletar' para a tabela 'Clientes'

export default router;
