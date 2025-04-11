import express, { Request, Response, Router } from 'express';
import DeliveryController from '../controllers/DeliveryController.ts';

const router: Router = express.Router();

export default router
    .post("", DeliveryController.postDelivery)
    .get("/:id", DeliveryController.getDelivery)
    .put("/:id/status", DeliveryController.updateDeliveryStatus)

    