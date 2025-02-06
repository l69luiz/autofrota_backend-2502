// src/models/clientes.ts

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { Loja } from "./lojas"; // Import do model Loja

export class Cliente extends Model {
  public idCliente!: number;
  public Nome!: string;
  public CPF_CNPJ!: string;
  public Rua!: string | null;
  public Numero!: string | null;
  public Bairro!: string | null;
  public Cidade!: string | null;
  public Celular!: string | null;
  public Celular2!: string | null;
  public RG!: string | null;
  public Tipo_Cliente!: "Pessoa Física" | "Pessoa Jurídica" | null;
  public Email!: string;
  public Grupo!: string | null;
  public Data_Nascimento!: Date | null;
  public Sexo!: "Masculino" | "Feminino" | "Outro" | null;
  public Estado_Civil!: "Solteiro" | "Casado" | "Divorciado" | "Viúvo" | null;
  public Lojas_idLoja!: number;
}

Cliente.init(
  {
    idCliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    CPF_CNPJ: {
      type: DataTypes.STRING(18),
      allowNull: false,
      unique: true,
    },
    Rua: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Numero: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    Bairro: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Cidade: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Celular: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    Celular2: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    RG: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    Tipo_Cliente: {
      type: DataTypes.ENUM("Pessoa Física", "Pessoa Jurídica"),
      allowNull: true,
    },
    Email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    Grupo: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    Data_Nascimento: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Sexo: {
      type: DataTypes.ENUM("Masculino", "Feminino", "Outro"),
      allowNull: true,
    },
    Estado_Civil: {
      type: DataTypes.ENUM("Solteiro", "Casado", "Divorciado", "Viúvo"),
      allowNull: true,
    },
    // createdAt: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    //   defaultValue: DataTypes.NOW,
    // },
    // updatedAt: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    //   defaultValue: DataTypes.NOW,
    // },
    Lojas_idLoja: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Loja, // Relacionamento com a tabela Lojas
        key: "idLoja",
      },
    },
  },
  {
    sequelize,
    modelName: "Cliente",
    tableName: "Clientes",
    timestamps: true,
  }
);

// Relacionamento com Lojas (Um cliente pertence a uma loja)
Cliente.belongsTo(Loja, {
  foreignKey: "Lojas_idLoja",
  as: "loja",
});
