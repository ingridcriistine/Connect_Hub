import { Request, Response } from "express";
import Delivery from "../models/Delivery.ts";


class DeliveryController {

    static async postDelivery(req: Request, res: Response) {
        const { orderId, carrierId, status} = req.body;
        try {
            const delivery = new Delivery({ orderId: orderId, carrierId: carrierId, status: status});
            await delivery.save();
            res.status(201).json(delivery);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao criar entrega', error });
        }
    }

    static async getDelivery(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const delivery = await Delivery.findById(id);           
            res.status(200).json(delivery);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao buscar entrega', error });
        }
    }

    static async updateDeliveryStatus(req: Request, res: Response) {
        const { id, status } = req.params;
    
        try {
            const task = await Delivery.findByIdAndUpdate(id, {status: status})
            if (!task) {
                res.status(404).json({ message: 'Entrega não encontrado' });
            }
            res.status(200).json({ message: 'Entrega atualizada com sucesso' });
        } catch (error) {
            res.status(400).json({ message: 'Erro ao deletar entrega', error });
        }
    }
}
   
export default DeliveryController;