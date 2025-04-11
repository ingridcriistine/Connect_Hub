import { Request, Response } from "express";
import Transportadora from "../models/Transportadora.ts";
import Order from "../models/Order.ts";

class CarrierController {

    static async postCarrier(req: Request, res: Response) {
        const { nome, cnpj, tipo_transporte} = req.body;
        try {
            const carrier = new Transportadora({ nome: nome, CNPJ: cnpj, tipo_transporte: tipo_transporte});
            await carrier.save();
            res.status(201).json(carrier);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao criar transporte', error });
        }
    }

    static async getCarrier(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const orders = await Order.find({carrier: id});           
            res.status(200).json(orders);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao buscar transportadoras', error });
        }
    }
}
   
export default CarrierController;