// autenticação/login de usuarios

import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken"; // metodo pra registrar um token

interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: AuthRequest) {
        // verificando se user existe
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if(!user) {
            throw new Error('Usuário ou senha incorretos.')
        }

        // verificando senha que usuario forneceu com senha criptografada
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            throw new Error('Usuário ou senha incorretos.')
        }

        // gerando token pro usuario 
        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET as string, // colocando 'as string' para não dar erro de tipagem
            {
                subject: user.id,
                expiresIn: '30d' // token expira em 30 dias, obrigando o usuario a fazer novo login
            }
        )

        return { 
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
         }
    }
}

export { AuthUserService }