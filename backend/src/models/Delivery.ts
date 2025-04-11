import mongoose, { Schema, Document } from 'mongoose';

interface IDelivery extends Document {
    orderId: number;
    carrierId: string;
    status: string;
}

const deliveryEsquema: Schema = new Schema({
    orderId: { type: mongoose.Types.ObjectId, ref: 'Order',required: true },
    carrierId: { type: mongoose.Types.ObjectId,ref: 'Transportadora', required: true },
    status: { type: String, required: true },
});

const Delivery = mongoose.model<IDelivery>('Delivery', deliveryEsquema);

export default Delivery;

