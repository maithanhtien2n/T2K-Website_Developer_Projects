const sequelize = require("../../configs/connectDatabase");
const { DataTypes } = require("sequelize");
const { UsersInfo } = require("../authentication/config");

const Products = sequelize.define(
  "Products",
  {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sale: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    sold: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "products",
    timestamps: false,
  }
);

const Ratings = sequelize.define(
  "Ratings",
  {
    rating_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    start_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "ratings",
    timestamps: false,
  }
);

const Carts = sequelize.define(
  "Carts",
  {
    cart_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    vip: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "carts",
    timestamps: false,
  }
);

// Lấy mảng thì dùng hasMany lấy object thì dùng belongsTo (nếu mà khác field thì dùng này foreignKey - sourceKey)
Carts.belongsTo(Products, { foreignKey: "product_id", as: "product" });

Products.hasMany(Ratings, { foreignKey: "product_id", as: "evaluate" });

Ratings.belongsTo(UsersInfo, { foreignKey: "user_id", as: "user" });

module.exports = {
  Products,
  Ratings,
  Carts,
  UsersInfo,
};