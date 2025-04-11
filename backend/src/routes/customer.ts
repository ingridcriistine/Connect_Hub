import express, { Request, Response, Router } from 'express';
import CustomerController from "../controllers/CustomerController.ts";

const router: Router = express.Router();

export default router
    .post("", CustomerController.postCustomer)
    .get("/:id/orders", CustomerController.getCustomer)
    .delete("/:id", CustomerController.deleteCustomer)

