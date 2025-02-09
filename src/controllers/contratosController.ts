// src/controllers/contratosController.ts
import { Request, Response } from 'express';
import { Contrato } from '../models/contratos'; // Modelo de Contrato
import { checkPermission } from '../middlewares/authMiddleware'; // Importando o middleware de permissões

// Função para buscar todos os contratos
export const getContratos = [
  checkPermission('Contrato', 'ler'), // Verifica permissão de leitura
  async (req: Request, res: Response) => {
    try {
      const contratos = await Contrato.findAll();
      res.json(contratos);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar contratos' });
    }
  },
];

// Função para criar um novo contrato
export const createContrato = [
  checkPermission('Contrato', 'criar'), // Verifica permissão de criação
  async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        Dt_inicial,
        Dt_Final,
        Vr_Semanal,
        Vr_Diario,
        Veiculo_idVeiculo,
        Usuarios_idUsuario,
      } = req.body;

      // Criar o novo contrato
      const contrato = await Contrato.create({
        Dt_inicial,
        Dt_Final,
        Vr_Semanal,
        Vr_Diario,
        Veiculo_idVeiculo,
        Usuarios_idUsuario,
      });

      res.status(201).json(contrato);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar contrato' });
      
    }
  },
];

// Função para excluir um contrato
export const deleteContrato = [
  checkPermission('Contrato', 'deletar'), // Verifica permissão de deletar
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { idContrato } = req.params;

      const contrato = await Contrato.findOne({ where: { idContrato } });
      if (!contrato) {
        res.status(404).json({ message: 'Contrato não encontrado' });
        return;
      }

      await contrato.destroy();
      res.status(200).json({ message: 'Contrato excluído com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir contrato' });
    }
  },
];

// Função para atualizar os dados de um contrato
export const updateContrato = [
  checkPermission('Contrato', 'atualizar'), // Verifica permissão de atualizar
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { idContrato } = req.params;
      const {
        Dt_inicial,
        Dt_Final,
        Vr_Semanal,
        Vr_Diario,
        Veiculo_idVeiculo,
        Usuarios_idUsuario,
      } = req.body;

      const contrato = await Contrato.findOne({ where: { idContrato } });
      if (!contrato) {
        res.status(404).json({ message: 'Contrato não encontrado' });
        return;
      }

      contrato.Dt_inicial = Dt_inicial || contrato.Dt_inicial;
      contrato.Dt_Final = Dt_Final || contrato.Dt_Final;
      contrato.Vr_Semanal = Vr_Semanal || contrato.Vr_Semanal;
      contrato.Vr_Diario = Vr_Diario || contrato.Vr_Diario;
      contrato.Veiculo_idVeiculo = Veiculo_idVeiculo || contrato.Veiculo_idVeiculo;
      contrato.Usuarios_idUsuario = Usuarios_idUsuario || contrato.Usuarios_idUsuario;

      await contrato.save();
      res.status(200).json(contrato);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar contrato' });
    }
  },
];

// Função para buscar contrato por ID
export const getContratoById = [
  checkPermission('Contrato', 'ler'), // Verifica permissão de leitura
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { idContrato } = req.params;
      const contrato = await Contrato.findByPk(idContrato);

      if (!contrato) {
        res.status(404).json({ message: "Contrato não encontrado com este ID." });
        return;
      }

      res.status(200).json(contrato);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar contrato pelo ID' });
    }
  },
];
