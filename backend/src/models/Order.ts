import mongoose, { Schema, Document } from 'mongoose';

interface IOrder extends Document {
    clientId: number;
    products: number[];
    status: string;
}

const orderEsquema: Schema = new Schema({
    clientId: { type: mongoose.Types.ObjectId,ref: 'Customer' ,required: true },
    products: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
    status: { type: String, required: true },
});

const Order = mongoose.model<IOrder>('Order', orderEsquema);

export default Order;

