import { Request, Response } from "express";
import Customer from '../models/Customer.ts';
import Order from "../models/Order.ts";

class CustomerController {

    
    static async postCustomer(req: Request, res: Response) {
        const { nome, email, telefone, endereco} = req.body;
        try {
            const task = new Customer({ nome: nome, email: email, telefone: telefone, endereco: endereco});
            await task.save();
            res.status(201).json(task);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao criar pessoa', error });
        }
    }

    static async getCustomer(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const orders = await Order.find({customer: id});           
            res.status(200).json(orders);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao buscar pessoas', error });
        }
    }

    static async deleteCustomer(req: Request, res: Response) {
        const { id } = req.params;

        const orders = await Order.find({customer: id});
        if (orders.length > 0)
            res.status(400).json({ message: 'Você não pode deletar essa pessoa' });
        try {
            const task = await Customer.findByIdAndDelete(id);
            if (!task) {
                res.status(404).json({ message: 'Pessoa não encontrada' });
            }
            res.status(200).json({ message: 'Pessoa deletada com sucesso' });
        } catch (error) {
            res.status(400).json({ message: 'Erro ao deletar pessoa', error });
        }
    }
}
   
export default CustomerController;