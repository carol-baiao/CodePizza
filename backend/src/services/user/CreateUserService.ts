import prismaClient from "../../prisma";

interface UserRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({name, email, password}: UserRequest) {
        // verificação do request
        if(!email) {
            throw new Error("Email incorreto.");
        }

        // verificando se email já existe
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if(userAlreadyExists) {
            throw new Error("Usuário já existe.")
        }

        const user = await prismaClient.user.create({
            data: { // informando os dados a salvar no banco
                name: name,
                email: email,
                password: password,
            },
            select: { // para informar o que retornar do create
                id: true,
                name: true,
                email: true,
            }
        })

        return user;
    }
}

export { CreateUserService };