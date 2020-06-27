const autopopulate = require("mongoose-autopopulate");
const db = require("../config/db");

var emplyeeSchema = new db.mongoose.Schema(
  {
    name: {
      type: String,
      default: null
    },
    age: {
      type: Number
    },
    designation: {
      type: String,
      enum: ["manager", "developer"],
      default: "developer"
    },
    salary: {
      type: Number
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true, minimize: false, collection: "employee" }
);

emplyeeSchema.plugin(autopopulate);

module.exports = db.mongoose.model("employeeModel", emplyeeSchema);
