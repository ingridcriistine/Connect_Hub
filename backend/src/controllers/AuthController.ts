// ESTE ARQUIVO EXISTE PARA MOSTRAR O USO DE JWT E BCRYPT



// import { Request, Response } from "express";
// import User from "../models/Transportadora.ts";
// import jwt from "jsonwebtoken";
// import crypto from "crypto-js";
// import dotenv from "dotenv";

// dotenv.config();

// class AuthController {
//     static async register(req: Request, res: Response): Promise<any> {

//         const { name, email, password } = req.body;

//         const passwordCrypt = crypto.AES.encrypt(password, process.env.SECRET as string).toString()

//         const user = new User({
//             name,
//             email,
//             password: passwordCrypt 
//         });

//         await user.save();
//         return res.status(201).json(user);

//     }

//     static async login(req: Request, res: Response): Promise<any> {
//         const { email, password } = req.body;
//         const user = await User.findOne({email});
//         if(!user)
//             return res.status(400).send({ message: "Invalid Email or password"});
        
//         var bytes = crypto.AES.decrypt(user.password, process.env.SECRET as string);
//         const passwordDecrypted = bytes.toString(crypto.enc.Utf8);

//         if(password !== passwordDecrypted) {
//             return new Error("Usuário e/ou senha inválidos")
//         }

//         const secret = process.env.SECRET;

//         if(secret)
//         {
//             const token = jwt.sign(
//                 {
//                     id: user.id
//                 },
//                 secret,
//                 {
//                     expiresIn: '2 days'
//                 }
//             )
//             return res.status(200).send({token: token})
//         }
//     }
// }

// export default AuthController;