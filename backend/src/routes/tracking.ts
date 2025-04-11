import express, { Request, Response, Router } from 'express';
import TrackingController from '../controllers/Tracking.ts';

const router: Router = express.Router();

export default router
    .get("/:orderid", TrackingController.getOrderStatus)

    