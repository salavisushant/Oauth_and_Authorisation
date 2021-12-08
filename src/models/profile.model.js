const { Schema, model } = require("mongoose");

const profileSchema = new Schema(
  {
    product: { type: String, required: true },
    price: { type: Number, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("profile", profileSchema);
