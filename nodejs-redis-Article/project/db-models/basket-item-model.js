const { mongoose } = require("@hexaworks/node-common");

const Schema = mongoose.Schema;

const basketItemSchema = new Schema(
  {
    basketId: {
      type: mongoose.Types.ObjectId,
      required: false,
    },
    productId: {
      type: mongoose.Types.ObjectId,
      required: false,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    totalProductAmount: { // subtotalproductAmount
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    methods: {
      getDoc() {
        let ret = {};
        ret.id = this._doc._id;
        Object.assign(ret, this._doc);
        delete ret._id;
        return ret;
      },
    },
  }
);
basketItemSchema.set("versionKey", "recordVersion");
basketItemSchema.set("timestamps", true);

module.exports = mongoose.model("BasketItem", basketItemSchema);
