import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors'; // deixar sempre como o segundo import
import cors from 'cors';
import path from 'path';

import { router } from './routes';

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp'))); // criando rota estática pra acesso às imagens

// middleware global p tratar erros - todas as rotas passarão por esse erro
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error) { // se for uma instância do tipo erro
        res.status(400).json({
            error: err.message
        })
        return
    }

    res.status(500).json({
        message: 'Internal Server Error.'
    })
})

app.listen(3333, () => console.log("server rodando...")); // pra inicializar o projeto