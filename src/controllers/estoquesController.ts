// src/controllers/estoquesController.ts
import { Request, Response } from 'express';
import { Estoque } from '../models/estoques'; // Modelo de Estoque
import { checkPermission } from '../middlewares/authMiddleware'; // Importando o middleware de permissões

// Função para buscar todos os estoques
export const getEstoques = [
  checkPermission('Estoque', 'ler'), // Verifica permissão de leitura
  async (req: Request, res: Response) => {
    try {
      const estoques = await Estoque.findAll();
      res.json(estoques);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar estoques' });
    }
  },
];

// Função para criar um novo estoque
export const createEstoque = [
  checkPermission('Estoque', 'criar'), // Verifica permissão de criação
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { Quantidade, Data_Entrada, Status, Lojas_idLoja, Local, Nome } = req.body;

      // Criar o novo estoque
      const estoque = await Estoque.create({
        Quantidade,
        Data_Entrada,
        Status,
        Lojas_idLoja,
        Local,
        Nome,
      });

      res.status(201).json(estoque);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar estoque' });
    }
  },
];

// Função para excluir um estoque
export const deleteEstoque = [
  checkPermission('Estoque', 'deletar'), // Verifica permissão de deletar
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { idEstoque } = req.params;

      const estoque = await Estoque.findOne({ where: { idEstoque } });
      if (!estoque) {
        res.status(404).json({ message: 'Estoque não encontrado' });
        return;
      }

      await estoque.destroy();
      res.status(200).json({ message: 'Estoque excluído com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir estoque' });
    }
  },
];

// Função para atualizar os dados de um estoque
export const updateEstoque = [
  checkPermission('Estoque', 'atualizar'), // Verifica permissão de atualizar
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { idEstoque } = req.params;
      const { Quantidade, Data_Entrada, Status, Lojas_idLoja, Local, Nome } = req.body;

      const estoque = await Estoque.findOne({ where: { idEstoque } });
      if (!estoque) {
        res.status(404).json({ message: 'Estoque não encontrado' });
        return;
      }

      estoque.Quantidade = Quantidade !== undefined ? Quantidade : estoque.Quantidade;
      estoque.Data_Entrada = Data_Entrada !== undefined ? Data_Entrada : estoque.Data_Entrada;
      estoque.Status = Status !== undefined ? Status : estoque.Status;
      estoque.Lojas_idLoja = Lojas_idLoja !== undefined ? Lojas_idLoja : estoque.Lojas_idLoja;
      estoque.Local = Local !== undefined ? Local : estoque.Local;
      estoque.Nome = Nome !== undefined ? Nome : estoque.Nome;

      await estoque.save();
      res.status(200).json(estoque);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar estoque' });
    }
  },
];

// Função para buscar estoque por ID
export const getEstoqueById = [
  checkPermission('Estoque', 'ler'), // Verifica permissão de leitura
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { idEstoque } = req.params;
      const estoque = await Estoque.findByPk(idEstoque);

      if (!estoque) {
        res.status(404).json({ message: 'Estoque não encontrado com este ID' });
        return;
      }

      res.status(200).json(estoque);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar estoque pelo ID' });
    }
  },
];
