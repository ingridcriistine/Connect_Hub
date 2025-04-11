import mongoose, { Schema, Document } from 'mongoose';

interface ICustomer extends Document {
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
}

const customerEsquema: Schema = new Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    telefone: { type: String, required: true },
    endereco: { type: String, required: true },
});

const Customer = mongoose.model<ICustomer>('Customer', customerEsquema);

export default Customer;

