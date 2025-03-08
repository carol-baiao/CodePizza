/*middleware criado para autenticar os usuarios em rotas que devem ser acessadas 
somente por usuários cadastrados*/

import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface Payload {
    sub: string;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    // primeiro de tudo, receber o token
    const authToken = req.headers.authorization;

    if(!authToken) {
        res.status(401).end();
        return;
    }

    const [, token] = authToken.split(" ");

    try {
        // validar token
        const { sub } = verify(token, process.env.JWT_SECRET as string) as Payload;

        // recuperar o id do token e colocar dentro da variavel "user_id", dentro do request
        req.user_id = sub;

        return next();
    } catch (err) {
        console.error("Erro ao validar token:", err);
        return res.status(401).json({ error: "Token inválido" });
    }
}