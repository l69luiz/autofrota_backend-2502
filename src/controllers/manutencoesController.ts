// src/controllers/manutencoesController.ts
import { Request, Response } from 'express';
import { Manutencao } from '../models/manutencoes'; // Modelo de Manutenção
import { checkPermission } from '../middlewares/authMiddleware'; // Middleware de permissões

// Função para buscar todas as manutenções
export const getManutencoes = [
  checkPermission('Manutencao', 'ler'), // Verifica permissão de leitura
  async (req: Request, res: Response) => {
    try {
      const manutencoes = await Manutencao.findAll();
      res.json(manutencoes);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar manutenções' });
    }
  },
];

// Função para criar uma nova manutenção
export const createManutencao = [
  checkPermission('Manutencao', 'criar'), // Verifica permissão de criação
  async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        Tipo_Manut,
        Km_Manut,
        Pecas_Manut,
        Servico_Manut,
        Nr_NF_Manut,
        Oficina_Manut,
        Vr_Manut,
        Veiculo_idVeiculo,
        Data_Manutencao,
        Usuarios_idUsuario,
      } = req.body;

      // Criar a nova manutenção
      const manutencao = await Manutencao.create({
        Tipo_Manut,
        Km_Manut,
        Pecas_Manut,
        Servico_Manut,
        Nr_NF_Manut,
        Oficina_Manut,
        Vr_Manut,
        Veiculo_idVeiculo,
        Data_Manutencao,
        Usuarios_idUsuario,
      });

      res.status(201).json(manutencao);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar manutenção' });
    }
  },
];

// Função para excluir uma manutenção
export const deleteManutencao = [
  checkPermission('Manutencao', 'deletar'), // Verifica permissão de deletar
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { idManutencao } = req.params;

      const manutencao = await Manutencao.findOne({ where: { idManutencao } });
      if (!manutencao) {
        res.status(404).json({ message: 'Manutenção não encontrada' });
        return;
      }

      await manutencao.destroy();
      res.status(200).json({ message: 'Manutenção excluída com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir manutenção' });
    }
  },
];

// Função para atualizar os dados de uma manutenção
export const updateManutencao = [
  checkPermission('Manutencao', 'atualizar'), // Verifica permissão de atualizar
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { idManutencao } = req.params;
      const {
        Tipo_Manut,
        Km_Manut,
        Pecas_Manut,
        Servico_Manut,
        Nr_NF_Manut,
        Oficina_Manut,
        Vr_Manut,
        Veiculo_idVeiculo,
        Data_Manutencao,
        Usuarios_idUsuario,
      } = req.body;

      const manutencao = await Manutencao.findOne({ where: { idManutencao } });
      if (!manutencao) {
        res.status(404).json({ message: 'Manutenção não encontrada' });
        return;
      }

      manutencao.Tipo_Manut = Tipo_Manut || manutencao.Tipo_Manut;
      manutencao.Km_Manut = Km_Manut || manutencao.Km_Manut;
      manutencao.Pecas_Manut = Pecas_Manut || manutencao.Pecas_Manut;
      manutencao.Servico_Manut = Servico_Manut || manutencao.Servico_Manut;
      manutencao.Nr_NF_Manut = Nr_NF_Manut || manutencao.Nr_NF_Manut;
      manutencao.Oficina_Manut = Oficina_Manut || manutencao.Oficina_Manut;
      manutencao.Vr_Manut = Vr_Manut || manutencao.Vr_Manut;
      manutencao.Veiculo_idVeiculo = Veiculo_idVeiculo || manutencao.Veiculo_idVeiculo;
      manutencao.Data_Manutencao = Data_Manutencao || manutencao.Data_Manutencao;
      manutencao.Usuarios_idUsuario = Usuarios_idUsuario || manutencao.Usuarios_idUsuario;

      await manutencao.save();
      res.status(200).json(manutencao);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar manutenção' });
    }
  },
];

// Função para buscar manutenção por ID
export const getManutencaoById = [
  checkPermission('Manutencao', 'ler'), // Verifica permissão de leitura
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { idManutencao } = req.params;
      const manutencao = await Manutencao.findByPk(idManutencao);

      if (!manutencao) {
        res.status(404).json({ message: "Manutenção não encontrada com este ID." });
        return;
      }

      res.status(200).json(manutencao);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar manutenção pelo ID' });
    }
  },
];
