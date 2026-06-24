import { Schema, model, type InferSchemaType } from 'mongoose';

const productSchema = new Schema(
  {
    code: { type: String, required: true, trim: true, unique: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    stockMin: { type: Number, required: true, min: 0, default: 0 },
    image: { type: String, default: null },
    featured: { type: Boolean, default: false },
    status: {
      type: String,
      required: true,
      enum: ['active', 'inactive'],
      default: 'active'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export type ProductDocument = InferSchemaType<typeof productSchema>;

export const ProductModel = model('Product', productSchema);
