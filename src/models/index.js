const { sequelize, Sequelize } = require("../config/database");

const DataTypes = Sequelize.DataTypes;

const User = sequelize.define(
  "User",
  {
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    passwordHash: { type: DataTypes.STRING, allowNull: false, field: "password_hash" },
    name: { type: DataTypes.STRING },
  },
  { tableName: "users", underscored: false }
);

const Patient = sequelize.define(
  "Patient",
  {
    fullName: { type: DataTypes.STRING, allowNull: false, field: "full_name" },
    phone: { type: DataTypes.STRING },
  },
  { tableName: "patients", underscored: false }
);

const Supplier = sequelize.define(
  "Supplier",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    contactEmail: { type: DataTypes.STRING, field: "contact_email" },
  },
  { tableName: "suppliers", underscored: false }
);

const Inventory = sequelize.define(
  "Inventory",
  {
    sku: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
    unitPrice: { type: DataTypes.DECIMAL(12, 2), field: "unit_price" },
    supplierId: { type: DataTypes.INTEGER, field: "supplier_id" },
  },
  { tableName: "inventory", underscored: false }
);

const Prescription = sequelize.define(
  "Prescription",
  {
    patientId: { type: DataTypes.INTEGER, allowNull: false, field: "patient_id" },
    medicationName: { type: DataTypes.STRING, allowNull: false, field: "medication_name" },
    dosage: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING, defaultValue: "pending" },
  },
  { tableName: "prescriptions", underscored: false }
);

const Billing = sequelize.define(
  "Billing",
  {
    patientId: { type: DataTypes.INTEGER, field: "patient_id" },
    amount: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    description: { type: DataTypes.TEXT },
    status: { type: DataTypes.STRING, defaultValue: "open" },
  },
  { tableName: "billing", underscored: false }
);

Inventory.belongsTo(Supplier, { foreignKey: "supplier_id", as: "supplier" });
Supplier.hasMany(Inventory, { foreignKey: "supplier_id", as: "inventoryItems" });

Prescription.belongsTo(Patient, { foreignKey: "patient_id", as: "patient" });
Patient.hasMany(Prescription, { foreignKey: "patient_id", as: "prescriptions" });

Billing.belongsTo(Patient, { foreignKey: "patient_id", as: "patient" });
Patient.hasMany(Billing, { foreignKey: "patient_id", as: "bills" });

const models = {
  sequelize,
  Sequelize,
  User,
  Patient,
  Supplier,
  Inventory,
  Prescription,
  Billing,
};

module.exports = models;
