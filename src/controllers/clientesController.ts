// src/controllers/clientesController.ts
import { Request, Response } from 'express';
import { Cliente } from '../models/clientes'; // Modelo de Cliente
import { checkPermission } from '../middlewares/authMiddleware'; // Importando o middleware de permissões

// Função para buscar todos os clientes
export const getClientes = [
  checkPermission('Cliente', 'ler'), // Verifica permissão de leitura
  async (req: Request, res: Response) => {
    try {
      const clientes = await Cliente.findAll();
      res.json(clientes);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar clientes' });
    }
  },
];

// Função para criar um novo cliente
export const createCliente = [
  checkPermission('Cliente', 'criar'), // Verifica permissão de criação
  async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        Nome,
        CPF_CNPJ,
        Rua,
        Numero,
        Bairro,
        Cidade,
        Celular,
        Celular2,
        RG,
        Tipo_Cliente,
        Email,
        Grupo,
        Data_Nascimento,
        Sexo,
        Estado_Civil,
        Lojas_idLoja,
      } = req.body;

      // Verificar se o CPF/CNPJ já existe
      const clienteExistente = await Cliente.findOne({ where: { CPF_CNPJ } });
      if (clienteExistente) {
        res.status(400).json({ message: "CPF/CNPJ já está em uso." });
        return;
      }

      // Criar o novo cliente
      const cliente = await Cliente.create({
        Nome,
        CPF_CNPJ,
        Rua,
        Numero,
        Bairro,
        Cidade,
        Celular,
        Celular2,
        RG,
        Tipo_Cliente,
        Email,
        Grupo,
        Data_Nascimento,
        Sexo,
        Estado_Civil,
        Lojas_idLoja,
      });

      res.status(201).json(cliente);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar cliente' });
    }
  },
];

// Função para excluir um cliente
export const deleteCliente = [
  checkPermission('Cliente', 'deletar'), // Verifica permissão de deletar
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { idCliente } = req.params;

      const cliente = await Cliente.findOne({ where: { idCliente } });
      if (!cliente) {
        res.status(404).json({ message: 'Cliente não encontrado' });
        return;
      }

      await cliente.destroy();
      res.status(200).json({ message: 'Cliente excluído com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir cliente' });
    }
  },
];

// Função para atualizar os dados de um cliente
export const updateCliente = [
  checkPermission('Cliente', 'atualizar'), // Verifica permissão de atualizar
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { idCliente } = req.params;
      const {
        Nome,
        CPF_CNPJ,
        Rua,
        Numero,
        Bairro,
        Cidade,
        Celular,
        Celular2,
        RG,
        Tipo_Cliente,
        Email,
        Grupo,
        Data_Nascimento,
        Sexo,
        Estado_Civil,
        Lojas_idLoja,
      } = req.body;

      const cliente = await Cliente.findOne({ where: { idCliente } });
      if (!cliente) {
        res.status(404).json({ message: 'Cliente não encontrado' });
        return;
      }

      cliente.Nome = Nome || cliente.Nome;
      cliente.CPF_CNPJ = CPF_CNPJ || cliente.CPF_CNPJ;
      cliente.Rua = Rua || cliente.Rua;
      cliente.Numero = Numero || cliente.Numero;
      cliente.Bairro = Bairro || cliente.Bairro;
      cliente.Cidade = Cidade || cliente.Cidade;
      cliente.Celular = Celular || cliente.Celular;
      cliente.Celular2 = Celular2 || cliente.Celular2;
      cliente.RG = RG || cliente.RG;
      cliente.Tipo_Cliente = Tipo_Cliente || cliente.Tipo_Cliente;
      cliente.Email = Email || cliente.Email;
      cliente.Grupo = Grupo || cliente.Grupo;
      cliente.Data_Nascimento = Data_Nascimento || cliente.Data_Nascimento;
      cliente.Sexo = Sexo || cliente.Sexo;
      cliente.Estado_Civil = Estado_Civil || cliente.Estado_Civil;
      cliente.Lojas_idLoja = Lojas_idLoja || cliente.Lojas_idLoja;

      await cliente.save();
      res.status(200).json(cliente);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar cliente' });
    }
  },
];

// Função para buscar cliente por CPF/CNPJ

export const getClienteByCPF_CNPJ = [
  checkPermission('Cliente', 'ler'), // Verifica permissão de leitura
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { CPF_CNPJ } = req.params;
      const cliente = await Cliente.findOne({ where: { CPF_CNPJ } });

      if (!cliente) {
        res.status(404).json({ message: "Cliente não encontrado com este CPF/CNPJ." });
        return;
      }

      res.status(200).json(cliente);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar cliente pelo CPF/CNPJ' });
    }
  },
];

// Função para buscar cliente por ID
export const getClienteById = [
  checkPermission('Cliente', 'ler'), // Verifica permissão de leitura
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { idCliente } = req.params;
      const cliente = await Cliente.findByPk(idCliente);

      if (!cliente) {
        res.status(404).json({ message: "Cliente não encontrado com este ID." });
        return;
      }

      res.status(200).json(cliente);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar cliente pelo ID' });
    }
  },
];
