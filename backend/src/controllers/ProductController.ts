import { Request, Response } from "express";
import Product from "../models/Product.ts";
import Order from "../models/Order.ts";


class ProductController {

    static async postProduct(req: Request, res: Response) {
        const { nome, preco, estoque} = req.body;
        try {
            const task = new Product({ nome: nome, preco: preco, estoque: estoque});
            await task.save();
            res.status(201).json(task);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao criar produto', error });
        }
    }

    static async getProducts(req: Request, res: Response) {
        try {

            const orders = await Product.find();           
            res.status(200).json(orders);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao buscar produtos', error });
        }
    }

    static async deleteProduct(req: Request, res: Response) {
        const { id } = req.params;

        const productOrders = await Order.find({Product: id})

        if (productOrders.length > 0)
            res.status(400).json({message: 'Erro, este produto está vinculado a um pedido'});
    
        try {
            const task = await Product.findByIdAndDelete(id);
            if (!task) {
                res.status(404).json({ message: 'Produto não encontrado' });
            }
            res.status(200).json({ message: 'Produto deletado com sucesso' });
        } catch (error) {
            res.status(400).json({ message: 'Erro ao deletar produto', error });
        }
    }
}
   
export default ProductController;