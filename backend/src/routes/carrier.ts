import express, { Request, Response, Router } from 'express';
import CarrierController from '../controllers/CarrierController.ts';

const router: Router = express.Router();

export default router
    .post("/", CarrierController.postCarrier)
    .get("/:id/deliveries", CarrierController.getCarrier)

    