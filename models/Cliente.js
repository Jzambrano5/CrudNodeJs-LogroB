// ClienteModel.js
import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";
import { CategoriaModel } from "./Categoria.js";

export const ClienteModel = sequelize.define(
  "clientes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

CategoriaModel.hasMany(ClienteModel, { foreignKey: "categoria_id" });
ClienteModel.belongsTo(CategoriaModel, { foreignKey: "categoria_id" });
