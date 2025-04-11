import { Request, Response } from "express";
import Order from "../models/Order.ts";

class TrackingController {

    static async getOrderStatus(req: Request, res: Response) {
        const { orderId} = req.params;
        try {
            const orders = await Order.findById(orderId);           
            res.status(200).json(orders?.status);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao buscar ordens', error });
        }
    }
}
   
export default TrackingController;