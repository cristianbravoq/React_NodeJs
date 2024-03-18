import { model, Schema, Document } from "mongoose";

export interface IProduct extends Document {
    name: string;
    category: string;
}

const productSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
});



export default model<IProduct>("Product", productSchema);
