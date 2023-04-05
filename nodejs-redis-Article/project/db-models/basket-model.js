const { mongoose } = require("@hexaworks/node-common");

const Schema = mongoose.Schema;

const basketSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    totalBasketAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    status: { 
      type: String,
      enum: ['pending', 'approved'],
      default: 'pending',
    },
  }
);
basketSchema.set("versionKey", "recordVersion");
basketSchema.set("timestamps", true);

module.exports = mongoose.model("Basket", basketSchema);
