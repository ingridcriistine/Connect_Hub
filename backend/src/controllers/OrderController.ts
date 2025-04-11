import { Request, Response } from "express";
import Order from "../models/Order.ts";

class OrderController {

    static async postOrder(req: Request, res: Response) {
        const { clientId, products, status} = req.body;
        try {
            const task = new Order({ clientId: clientId, products: products, status: status});
            await task.save();
            res.status(201).json(task);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao criar pedido', error });
        }
    }

    static async getOrderByStatus(req: Request, res: Response) {
        try {
            const { status } = req.query
            const orders = await Order.find({status: status});           
            res.status(200).json(orders);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao buscar ordens', error });
        }
    }

    static async cancelOrder(req: Request, res: Response) {
        const { id } = req.params;

        const order = await Order.findById(id);
        
        if (order?.status == "enviado")
            res.status(400).json({ message: 'Você não pode cancelar uma ordem que foi enviada' });
    
        try {
            const task = await Order.findByIdAndUpdate(id, {status: "cancelado"})
            if (!task) {
                res.status(404).json({ message: 'Pedido não encontrado' });
            }
            res.status(200).json({ message: 'Pedido deletado com sucesso' });
        } catch (error) {
            res.status(400).json({ message: 'Erro ao deletar pedido', error });
        }
    }
}
   
export default OrderController;