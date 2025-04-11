import { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "E-mail e senha são obrigatórios" });
    }

    next();
};

export const validadeLogin = (req:Request,res:Response, next: NextFunction)=>{
    console.log("VALIDAÇÂO FODA!!!!");
    next();
}

export const validadeRegister = (req:Request,res:Response, next: NextFunction)=>{
    console.log("VALIDAÇÂO FODA!!!!");
    next();
}