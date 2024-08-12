import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";

export const CategoriaModel = sequelize.define(
  "categorias",
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
  },
  {
    timestamps: false,
  }
);
