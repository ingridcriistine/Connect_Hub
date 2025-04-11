import express, { Request, Response, Router } from 'express';
import UserController from '../controllers/UserController.ts';

const router: Router = express.Router();

export default router
    .get("/", UserController.getUser)
    .post("/register", UserController.postUser)
    .put("/update", UserController.updateUser)
    .delete("/delete", UserController.deleteUser)
