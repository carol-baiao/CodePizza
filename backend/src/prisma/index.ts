import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default prismaClient;

/* com o prisma client, será possível acessar os models do db, fazer crud completo, etc */