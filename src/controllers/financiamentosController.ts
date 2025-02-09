// src/controllers/financiamentosController.ts
import { Request, Response } from 'express';
import { Financiamento } from '../models/financiamentos'; // Modelo de Financiamento
import { checkPermission } from '../middlewares/authMiddleware'; // Middleware de permissões

// Função para buscar todos os financiamentos
export const getFinanciamentos = [
  checkPermission('Financiamento', 'ler'), // Verifica permissão de leitura
  async (req: Request, res: Response) => {
    try {
      const financiamentos = await Financiamento.findAll();
      res.json(financiamentos);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar financiamentos' });
    }
  },
];

// Função para criar um novo financiamento
export const createFinanciamento = [
  checkPermission('Financiamento', 'criar'), // Verifica permissão de criação
  async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        Valor_Total,
        Entrada,
        Parcelas,
        Valor_Parcela,
        Taxa_Juros,
        Data_Inicio,
        InstituicaoFinanceira,
        Clientes_idCliente,
        Vendas_idVenda
      } = req.body;

      // Criar o novo financiamento
      const financiamento = await Financiamento.create({
        Valor_Total,
        Entrada,
        Parcelas,
        Valor_Parcela,
        Taxa_Juros,
        Data_Inicio,
        InstituicaoFinanceira,
        Clientes_idCliente,
        Vendas_idVenda
      });

      res.status(201).json(financiamento);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar financiamento' });
    }
  },
];

// Função para excluir um financiamento
export const deleteFinanciamento = [
  checkPermission('Financiamento', 'deletar'), // Verifica permissão de deletar
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { idFinanciamento } = req.params;

      const financiamento = await Financiamento.findOne({ where: { idFinanciamento } });
      if (!financiamento) {
        res.status(404).json({ message: 'Financiamento não encontrado' });
        return;
      }

      await financiamento.destroy();
      res.status(200).json({ message: 'Financiamento excluído com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir financiamento' });
    }
  },
];

// Função para atualizar os dados de um financiamento
export const updateFinanciamento = [
  checkPermission('Financiamento', 'atualizar'), // Verifica permissão de atualizar
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { idFinanciamento } = req.params;
      const {
        Valor_Total,
        Entrada,
        Parcelas,
        Valor_Parcela,
        Taxa_Juros,
        Data_Inicio,
        InstituicaoFinanceira,
        Clientes_idCliente,
        Vendas_idVenda
      } = req.body;

      const financiamento = await Financiamento.findOne({ where: { idFinanciamento } });
      if (!financiamento) {
        res.status(404).json({ message: 'Financiamento não encontrado' });
        return;
      }

      financiamento.Valor_Total = Valor_Total || financiamento.Valor_Total;
      financiamento.Entrada = Entrada || financiamento.Entrada;
      financiamento.Parcelas = Parcelas || financiamento.Parcelas;
      financiamento.Valor_Parcela = Valor_Parcela || financiamento.Valor_Parcela;
      financiamento.Taxa_Juros = Taxa_Juros || financiamento.Taxa_Juros;
      financiamento.Data_Inicio = Data_Inicio || financiamento.Data_Inicio;
      financiamento.InstituicaoFinanceira = InstituicaoFinanceira || financiamento.InstituicaoFinanceira;
      financiamento.Clientes_idCliente = Clientes_idCliente || financiamento.Clientes_idCliente;
      financiamento.Vendas_idVenda = Vendas_idVenda || financiamento.Vendas_idVenda;

      await financiamento.save();
      res.status(200).json(financiamento);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar financiamento' });
    }
  },
];

// Função para buscar financiamento por ID
export const getFinanciamentoById = [
  checkPermission('Financiamento', 'ler'), // Verifica permissão de leitura
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { idFinanciamento } = req.params;
      const financiamento = await Financiamento.findByPk(idFinanciamento);

      if (!financiamento) {
        res.status(404).json({ message: "Financiamento não encontrado com este ID." });
        return;
      }

      res.status(200).json(financiamento);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar financiamento pelo ID' });
    }
  },
];
