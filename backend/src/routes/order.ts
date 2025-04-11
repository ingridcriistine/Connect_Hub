import express, { Request, Response, Router } from 'express';
import OrderController from '../controllers/OrderController.ts';

const router: Router = express.Router();

export default router
    .post("", OrderController.postOrder)
    .get("", OrderController.getOrderByStatus)
    .put("/:id/cancel", OrderController.cancelOrder)

    