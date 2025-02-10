// src/models/estoques.ts

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { Loja } from "./lojas"; // Import do model Lojas

export class Estoque extends Model {
  public idEstoque!: number;
  public Quantidade!: number;
  public Data_Entrada!: Date | null;
  public Status!: string | null;
  public Lojas_idLoja!: number;
  public Local!: string | null;
  public Nome!: string | null;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Estoque.init(
  {
    idEstoque: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Data_Entrada: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Status: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    
    Lojas_idLoja: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Loja, 
        key: 'idLoja',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    Local: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    Nome: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Estoque",
    tableName: "Estoques", // Nome da tabela no banco de dados
    timestamps: true,
  }
);

//Relacionamento com Lojas
// Estoque.belongsTo(Loja, {
//   foreignKey: "Lojas_idLoja",
//   as: "loja",
// });




