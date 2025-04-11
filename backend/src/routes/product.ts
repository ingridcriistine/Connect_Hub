import express, { Request, Response, Router } from 'express';
import ProductController from '../controllers/ProductController.ts';

const router: Router = express.Router();

export default router
    .post("", ProductController.postProduct)
    .get("", ProductController.getProducts)
    .delete("/:id", ProductController.deleteProduct)

    