import { Request, Response } from "express";
import { prisma } from "../../prisma/client.ts";

class UserController {
    static async getUser(req: Request, res: Response){
        try {
            const { id } = req.body;

            const user = await prisma.user.findUnique({
                where: { id }
            });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json(user);
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: 'Erro ao buscar usuário', error });
        }
    }

    static async postUser(req: Request, res: Response) {
        try {
          const { nome, email, password } = req.body;
    
          const user = await prisma.user.create({
            data: {
              email: email,
              username: nome, 
              password: password
            },
          });
    
          res.status(201).json(user);
        } catch (error) {
          console.error("Erro ao criar usuário:", error);
          res.status(400).json({ message: "Erro ao criar usuário", error });
        }
      }

      static async updateUser(req: Request, res: Response){
        try {
            const { nome, password } = req.body;

            const user = await prisma.user.update({
                where:{
                    username:nome
                },
                data: {
                    password: password
                }
            })
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            res.status(400).json({ message: "Erro ao atualizar usuário", error });
        }
      }

      static async deleteUser(req: Request, res: Response){
        try{
            const { id } = req.body
            const user = await prisma.user.delete({
                where: {
                    id: id
                }
            })
        }
      }
    }


export default UserController;