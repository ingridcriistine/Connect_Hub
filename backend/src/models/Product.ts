import mongoose, { Schema, Document } from 'mongoose';

interface IProduct extends Document {
    nome: string;
    preco: number;
    estoque: number;
}

const productEsquema: Schema = new Schema({
    nome: { type: String, required: true },
    preco: { type: Number, required: true },
    estoque: { type: Number, required: true },
});

const Product = mongoose.model<IProduct>('Product', productEsquema);

export default Product;

