import mongoose, { Schema, Document } from "mongoose";

interface ITransportadora extends Document {
    nome: string;
    CNPJ: number;
    tipo_transporte: string;
}

const TransportadoraEsquema = new Schema<ITransportadora>({
    nome: { type: String, required: true },
    CNPJ: { type: Number, required: true, unique: true },
    tipo_transporte: { type: String, required: true }
});

const Transportadora = mongoose.model<ITransportadora>("Transportadora", TransportadoraEsquema);

export default Transportadora;