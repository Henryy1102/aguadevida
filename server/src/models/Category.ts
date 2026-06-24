import { Schema, model, type InferSchemaType } from 'mongoose';

const categorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, required: true, trim: true },
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

export type CategoryDocument = InferSchemaType<typeof categorySchema>;

export const CategoryModel = model('Category', categorySchema);
